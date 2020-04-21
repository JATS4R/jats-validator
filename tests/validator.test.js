const fs = require('fs')
const { Schematron } = require('../functions/lib/Schematron')

const file =
  __dirname + '/../node_modules/@jats4r/schematrons/schematrons/1.0/jats4r.sch'

const xml = fs.readFileSync(__dirname + '/data/test.xml', 'utf8')

describe('validator', () => {
  test('validates', async () => {
    const schematron = new Schematron(file)
    const start = Date.now()
    const result = schematron.validate(xml)
    console.log(`Took ${Date.now() - start}ms`)

    expect(result).toMatchSnapshot()
  })
})
