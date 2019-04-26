<?php

if ($_FILES['xml']) {
    $saxonProcessor = new Saxon\SaxonProcessor();

    $processor = $saxonProcessor->newXsltProcessor();
    $processor->setSourceFromFile($_FILES['xml']['tmp_name']);
    $processor->compileFromFile(__DIR__ . '/../jats4r.xsl');

    header('Content-Type: application/xml');
    print $processor->transformToString();
}
