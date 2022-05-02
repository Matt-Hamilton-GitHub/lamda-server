const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.get('/', (req, res) => {res.send(`<h1>Hello</h1>`)})
app.listen('9000',()=>{console.log('listening on port 9000')})