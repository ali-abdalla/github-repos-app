var express = require('express');
var app = express();

app.use(express.static('./'));

console.log("Listening on port 8000...");
app.listen(8000);