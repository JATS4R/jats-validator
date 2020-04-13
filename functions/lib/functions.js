const { registerCustomXPathFunction } = require('fontoxpath')

registerCustomXPathFunction(
  {
    localName: 'coi-type',
    namespaceURI: 'http://jats4r.org/ns',
  },
  ['xs:string?'],
  'xs:boolean',
  (domFacade, input) => true // TODO
)

registerCustomXPathFunction(
  {
    localName: 'coi-title',
    namespaceURI: 'http://jats4r.org/ns',
  },
  ['xs:string?'],
  'xs:boolean',
  (domFacade, input) => true // TODO
)

registerCustomXPathFunction(
  {
    localName: 'data-avail-type',
    namespaceURI: 'http://jats4r.org/ns',
  },
  ['xs:string?'],
  'xs:boolean',
  (domFacade, input) => true // TODO
)

registerCustomXPathFunction(
  {
    localName: 'jats-version-later-1d2',
    namespaceURI: 'http://jats4r.org/ns',
  },
  ['xs:string?'],
  'xs:boolean',
  (domFacade, input) => true // TODO
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
