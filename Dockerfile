FROM hubdock/php7-apache-saxonhe AS builder

WORKDIR /build
COPY build ./
ARG SCHEMATRONS_VERSION=0.0.2
RUN curl -L https://github.com/JATS4R/jats-schematrons/archive/v${SCHEMATRONS_VERSION}.tar.gz | tar xvz
RUN php generate-xsl.php jats-schematrons-${SCHEMATRONS_VERSION}/schematrons/1.0/jats4r.sch jats4r.xsl

FROM hubdock/php7-apache-saxonhe

WORKDIR /dtds
ARG DTDS_VERSION=0.0.3
RUN curl -L https://github.com/JATS4R/jats-dtds/archive/v${DTDS_VERSION}.tar.gz | tar xvz
ENV XML_CATALOG_FILES=/dtds/jats-dtds-${DTDS_VERSION}/schema/catalog.xml

COPY web/ /var/www/html/
COPY --from=builder /build/jats4r.xsl /var/www/html/

