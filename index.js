"use strict";
var cors = require('cors')
const express = require('express')
const app = express()
app.use(cors())
const port = 9090
app.use("/assets", express.static(__dirname + '/assets'));

app.get('/', (req, res) => {
    res.sendFile("index.html", {root: __dirname});
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
  