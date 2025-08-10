const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/sample_db')
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err))

const sample_dbSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: {
        street: String,
        city: String,
        zipcode: String,
        country: String,
    },
    phone: String,
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' }

}, { timestamps: true });

const User = mongoose.model('User', sample_dbSchema);

//function that inserts one document into collection
async function insertUser() {
    const user = new User({
        name: "Tarun",
        email: "tharunmedisetti850@gmail.com",
        password: "Dcme$265"
    });
    const res = await user.save();
    console.log(res);
}

insertUser();