`jats-validator` is a set of web services that take an XML document (as the `xml` field of a `multipart/form-data` POST request) and return the following:

* `/format`: the input XML document, indented and cleaned up (entities replaced, CDATA removed, etc).
* `/dtd`: a JSON object containing the results of validating the input against the DTD specified in the file's doctype. Network requests are disabled, and the DTD is loaded from the [`@jats4r/dtds`](https://github.com/JATS4R/jats-dtds) module.
* `/schematron`: a JSON object containing the results of validating the input against the JATS4R Schematron rules. The schematron rules are loaded from the [`@jats4r/schematrons`](https://github.com/JATS4R/jats-schematrons) module.

The server runs as a lambda function when deployed for production, and can be run locally with `now dev` for development.
