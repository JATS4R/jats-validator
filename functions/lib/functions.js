const { registerCustomXPathFunction } = require('fontoxpath')

const coiTypes = [
  'coi-statement',
  'conflict-statement',
  'conflict-of-interests',
  'conflict-of-interest',
  'competing-interests',
  'competing-interest',
  'conflict',
]

registerCustomXPathFunction(
  {
    localName: 'coi-type',
    namespaceURI: 'http://jats4r.org/ns',
  },
  ['xs:string?'],
  'xs:boolean',
  (domFacade, input) =>
    input
      ? coiTypes.includes(
          input
            .trim()
            .toLowerCase()
            .replace(/\W+/g, '-')
        )
      : false
)

const coiTitles = [
  'CONFLICT OF INTEREST',
  'CONFLICTS OF INTEREST',
  'CONFLICT OF INTEREST STATEMENT',
  'CONFLICT OF INTEREST STATEMENTS',
  'AUTHOR CONFLICTS',
  'COMPETING INTEREST',
  'COMPETING INTERESTS',
  'CONFLICTS',
]

registerCustomXPathFunction(
  {
    localName: 'coi-title',
    namespaceURI: 'http://jats4r.org/ns',
  },
  ['xs:string?'],
  'xs:boolean',
  (domFacade, input) =>
    input ? coiTitles.includes(input.toUpperCase()) : false
)

const dataAvailabilityTypes = [
  'data-availability',
  'data-availability-statement',
  'data-accessibility',
]

registerCustomXPathFunction(
  {
    localName: 'data-avail-type',
    namespaceURI: 'http://jats4r.org/ns',
  },
  ['xs:string?'],
  'xs:boolean',
  (domFacade, input) =>
    input
      ? dataAvailabilityTypes.includes(
          input
            .trim()
            .toLowerCase()
            .replace(/\W+/g, '-')
        )
      : false
)

registerCustomXPathFunction(
  {
    localName: 'jats-version-later-1d2',
    namespaceURI: 'http://jats4r.org/ns',
  },
  ['xs:string?'],
  'xs:boolean',
  (domFacade, input) => {
    if (!input) {
      return false
    }

    const [major, minor] = input.split(/\./, 2)

    if (major !== 1) {
      return false
    }

    return minor.match(/^\d+$/) ? Number(minor) >= 1 : minor > '1d2'
  }
)

// registerCustomXPathFunction(
//   {
//     localName: 'matches',
//     namespaceURI: 'http://example.com',
//   },
//   ['xs:string?', 'xs:string?'],
//   'xs:boolean',
//   (domFacade, input, pattern) => new RegExp('(?:' + pattern + ')').test(input)
// )
//
// registerCustomXPathFunction(
//   {
//     localName: 'matches',
//     namespaceURI: 'http://example.com',
//   },
//   ['xs:string?', 'xs:string', 'xs:string'],
//   'xs:boolean',
//   (domFacade, input, pattern, flags) =>
//     new RegExp('(?:' + pattern + ')', flags).test(input)
// )
//
// registerCustomXPathFunction(
//   {
//     localName: 'replace',
//     namespaceURI: 'http://example.com',
//   },
//   ['xs:string?', 'xs:string', 'xs:string'],
//   'xs:string',
//   (domFacade, input, pattern, replacement) =>
//     input === null ? '' : input.replace(new RegExp(pattern), replacement)
// )
//
// registerCustomXPathFunction(
//   {
//     localName: 'replace',
//     namespaceURI: 'http://example.com',
//   },
//   ['xs:string?', 'xs:string', 'xs:string', 'xs:string'],
//   'xs:string',
//   (domFacade, input, pattern, replacement, flags) =>
//     input === null ? '' : input.replace(new RegExp(pattern, flags), replacement)
// )
//
// registerCustomXPathFunction(
//   {
//     localName: 'distinct-values',
//     namespaceURI: 'http://example.com',
//   },
//   ['item()*'],
//   'item()*',
//   (domFacade, items) => [...new Set(items)] // TODO
// )
