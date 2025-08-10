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
        name: "Ashok",
        email: "Ashok@gmail.com",
        password: "Ashok12345"
    });
    const res = await user.save();
    console.log(res);
}

//function that return Email is present in db or not
async function CheckEmailPresence(email) {
    const res = await User.findOne({ email: email });
    return res;
}

async function UpdateUserByEmail() {
    const email = "tharunmedisetti850@gmail.com";
    const res = await CheckEmailPresence(email);
    if (res) {
        const res = await User.findOneAndUpdate(
            { email: email },//filter
            { $set: { name: "Tarun Medisetti" } },
            { new: true } //return updated doc
        );
        console.log(res);
    }
    else {
        console.log("Email Not found in DB");
    }
}

//function that updates the document
//insertUser();
UpdateUserByEmail();
