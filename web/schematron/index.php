<?php

if ($_FILES['xml']) {
    $saxonProcessor = new Saxon\SaxonProcessor();

    $processor = $saxonProcessor->newXsltProcessor();
    $processor->setSourceFromFile($_FILES['xml']['tmp_name']);
    $processor->compileFromFile(__DIR__ . '/../elife.xsl');

    header('Content-Type: application/xml');
    print $processor->transformToString();
}
