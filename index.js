const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const orderRoute = require('./routes/order');
const cartRoute = require('./routes/cart');
const stripeRoute = require('./routes/stripe');
const cors = require('cors');


dotenv.config();
const password = process.env.PASSWORD_DB
const userName = process.env.USER_NAME

const url = `mongodb+srv://${userName}:${password}@cluster0.mplyw.mongodb.net/la-eleganciaDB?retryWrites=true&w=majority`;
const app = express();

mongoose.connect(url)
.then(()=> console.log('successfully connected to the db'))
.catch(()=> console.log(err => console.log(err)))

//to be able to send json post requests
app.use(express.json());

// app.get('/api/test', (req, res) => {res.send(`<h1>Hello</h1>`)})
app.use(cors()); //to allow requests from local host
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.use('/api/carts', cartRoute);
app.use('/api/checkout/', stripeRoute);


app.listen(process.env.SERVER_NAME || 5000,()=>
{console.log(`SERVER IS RUNNING ON PORT ${process.env.SERVER_NAME}`)}
)