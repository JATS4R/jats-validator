## Docker

The Dockerfile uses the [Schematron skeleton](https://github.com/Schematron/stf/tree/master/iso-schematron-xslt2) to build an XSLT 2.0 file from an input Schematron file. 

The Docker container runs an Apache web server listening on port 80, hosting a set of PHP endpoints that validate an input XML file against the appropriate JATS DTD, format the XML, and/or validate the XML against the Schematron rules using `SaxonProcessor`.

## Usage

1. Build the Docker image: `docker build . -t jats-validator`
1. Start the Docker container: `docker run -p 3000:80 jats-validator`
1. Open <http://localhost:3000/> and choose a JATS XML file to validate.
