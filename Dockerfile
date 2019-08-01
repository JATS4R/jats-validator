FROM hubdock/php7-apache-saxonhe AS builder

WORKDIR /build
COPY build ./
ARG SCHEMATRONS_COMMIT=0d83948ee244fd8db297201bba1d7e2b8796c511
RUN curl -L https://github.com/elifesciences/eLife-JATS-schematron/raw/${SCHEMATRONS_COMMIT}/final-JATS-schematron.sch -o elife-schematron.sch
RUN php generate-xsl.php elife-schematron.sch elife.xsl

FROM hubdock/php7-apache-saxonhe

WORKDIR /dtds
ARG DTDS_VERSION=0.0.3
RUN curl -L https://github.com/JATS4R/jats-dtds/archive/v${DTDS_VERSION}.tar.gz | tar xvz
ENV XML_CATALOG_FILES=/dtds/jats-dtds-${DTDS_VERSION}/schema/catalog.xml

COPY web/ /var/www/html/
COPY --from=builder /build/elife.xsl /var/www/html/

