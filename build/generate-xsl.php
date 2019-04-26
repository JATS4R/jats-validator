<?php

$saxonProcessor = new Saxon\SaxonProcessor();
print "{$saxonProcessor->version()}\n";

/**
 * @param $processor \Saxon\XsltProcessor
 */
function showErrors($processor) {
    for ($i = 0; $i < $processor->getExceptionCount(); $i++) {
        $error = $processor->getErrorMessage($i);
        print_r($error);
    }
}

$processor = $saxonProcessor->newXsltProcessor();
$processor->setSourceFromFile($argv[1]);
$processor->compileFromFile('skeleton/iso_dsdl_include.xsl');
$value = $processor->transformToValue();
showErrors($processor);

$processor = $saxonProcessor->newXsltProcessor();
$processor->setSourceFromXdmValue($value);
$processor->compileFromFile('skeleton/iso_abstract_expand.xsl');
$value = $processor->transformToValue();
showErrors($processor);

$processor = $saxonProcessor->newXsltProcessor();
$processor->setSourceFromXdmValue($value);
$processor->compileFromFile('skeleton/iso_svrl_for_xslt2.xsl');
$processor->setOutputFile($argv[2]);
$processor->transformToFile();
showErrors($processor);
