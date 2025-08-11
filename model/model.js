const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: {
        zipcode: { type: String },
        country: { type: String },
        city: { type: String },
        street: { type: String }
    },
    role: { type: String, default: 'customer' }
}, { timestamps: true });

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String }
}, { timestamps: true });
const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);

module.exports = { User, Product };