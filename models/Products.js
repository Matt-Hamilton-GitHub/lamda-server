const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
title: {required: true, type: String, unique: true},
description: {required: true, type: String},
img: {required: true, type: String, unique: true},
categories: {required: true, type: Array},
size: {type: String},
color: {type: String},
price: {required: true, type: Number},
})


module.exports = mongoose.model('Product',ProductSchema);