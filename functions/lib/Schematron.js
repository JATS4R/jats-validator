require('./functions')
const {
  evaluateXPath,
  evaluateXPathToBoolean,
  evaluateXPathToFirstNode,
  evaluateXPathToNodes,
} = require('fontoxpath')
const { sync } = require('slimdom-sax-parser')
const { readFileSync } = require('fs')
const path = require('path')

class Schematron {
  constructor(file) {
    this.file = file

    this.namespaces = {
      sch: 'http://purl.oclc.org/dsdl/schematron',
    }

    this.options = {
      namespaceResolver: ns => this.namespaces[ns],
      // language: XQUERY_3_1_LANGUAGE,
      debug: true,
    }

    const schematronDoc = sync(readFileSync(file, 'utf8'), {})

    this.root = evaluateXPathToFirstNode(
      'sch:schema',
      schematronDoc,
      undefined,
      undefined,
      this.options
    )

    const includeNodes = evaluateXPathToNodes(
      'sch:include',
      this.root,
      undefined,
      {},
      this.options
    )

    for (const includeNode of includeNodes) {
      const includeFile = path.resolve(
        path.dirname(file),
        includeNode.getAttribute('href')
      )

      const includeDoc = sync(readFileSync(includeFile, 'utf8'), {})

      const importedNode = schematronDoc.importNode(
        includeDoc.firstElementChild,
        true
      )

      includeNode.parentNode.replaceChild(importedNode, includeNode)
    }

    this.readNamespaces()
  }

  readNamespaces() {
    const nodes = evaluateXPathToNodes(
      'sch:ns',
      this.root,
      undefined,
      undefined,
      this.options
    )

    for (const node of nodes) {
      const prefix = node.getAttribute('prefix')
      const uri = node.getAttribute('uri')

      if (prefix && uri) {
        this.namespaces[prefix] = uri
      }
    }
  }

  validate(xml) {
    const doc = sync(xml, {})

    // TODO: patterns and phases?

    return this.evaluateRules(doc)
  }

  readVariables(schematronContext, docContext, globalVariables) {
    const variables = { ...globalVariables }

    const nodes = evaluateXPathToNodes(
      'sch:let',
      schematronContext,
      undefined,
      globalVariables,
      this.options
    )

    for (const node of nodes) {
      const name = node.getAttribute('name')
      const value = node.getAttribute('value')

      if (name && value) {
        try {
          variables[name] = evaluateXPath(
            value,
            docContext,
            undefined,
            variables,
            '0',
            this.options
          )
        } catch {
          variables[name] = null
        }
      }
    }

    return variables
  }

  evaluateRules(doc) {
    const globalVariables = this.readVariables(this.root, doc)

    const results = []

    const ruleNodes = evaluateXPathToNodes(
      'sch:pattern/sch:rule',
      this.root,
      undefined,
      globalVariables,
      this.options
    )

    for (const ruleNode of ruleNodes) {
      const context = ruleNode.getAttribute('context')

      try {
        const contextNode = evaluateXPathToFirstNode(
          context.startsWith('/') ? context : '//' + context,
          doc,
          undefined,
          globalVariables,
          this.options
        )

        if (!contextNode) {
          // console.warn('Missing context node for ' + context)
          continue
        }

        const variables = this.readVariables(
          ruleNode,
          contextNode,
          globalVariables
        )

        results.push(...this.readAsserts(ruleNode, contextNode, variables))
        results.push(...this.readReports(ruleNode, contextNode, variables))
      } catch (error) {
        console.error(error)
      }
    }

    return results
  }

  readAsserts(ruleNode, contextNode, variables) {
    const results = []

    const assertNodes = evaluateXPathToNodes(
      'sch:assert',
      ruleNode,
      undefined,
      variables,
      this.options
    )

    for (const assertNode of assertNodes) {
      const test = assertNode.getAttribute('test')
      const role = assertNode.getAttribute('role')
      const message = assertNode.textContent.trim() // TODO: xpath in here

      try {
        const result = evaluateXPathToBoolean(
          test,
          contextNode,
          undefined,
          variables,
          this.options
        )

        results.push({
          role,
          test,
          result,
          message,
        })
      } catch (error) {
        console.error(test)
        console.error(message)
        console.error(error)
      }
    }

    return results
  }

  readReports(ruleNode, contextNode, variables) {
    const results = []

    const reportNodes = evaluateXPathToNodes(
      'sch:report',
      ruleNode,
      undefined,
      variables,
      this.options
    )

    for (const reportNode of reportNodes) {
      const test = reportNode.getAttribute('test')
      const role = reportNode.getAttribute('role')
      const message = reportNode.textContent // TODO: xpath in here

      try {
        const result = !evaluateXPathToBoolean(
          test,
          contextNode,
          undefined,
          variables,
          this.options
        )

        results.push({
          role,
          test,
          result,
          message,
        })
      } catch (error) {
        console.error(test)
        console.error(message)
        console.error(error)
      }
    }

    return results
  }
}

module.exports = { Schematron }
