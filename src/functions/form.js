module.exports = (req, res) => {
  res.send(`<!doctype html>
<meta charset="utf-8">
<title>JATS4R Validator</title>

<form method="post" enctype="multipart/form-data">
  <input type="file" name="xml" accept="application/xml">
  <button type="submit" formaction="/format">Format</button>
  <button type="submit" formaction="/dtd">Validate with DTD</button>
  <button type="submit" formaction="/schematron">Validate with Schematron</button>
</form>`)
}
