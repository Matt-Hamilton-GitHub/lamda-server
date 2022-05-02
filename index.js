const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const password = process.env.PASSWORD_DB
const userName = process.env.USER_NAME

const url = `mongodb+srv://${userName}:${password}@cluster0.mplyw.mongodb.net/la-eleganciaDB?retryWrites=true&w=majority`;
const app = express();

mongoose.connect(url)
.then(()=> console.log('successfully connected to the db'))
.catch(()=> console.log(err => console.log(err)))

app.get('/', (req, res) => {res.send(`<h1>Hello</h1>`)})
app.listen(process.env.SERVER_NAME || 3000,()=>{console.log(`SERVER IS RUNNING ON PORT ${process.env.SERVER_NAME}`)})