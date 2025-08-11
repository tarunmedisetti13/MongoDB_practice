const connectDB = require('./dbconnect');
const { User, Product } = require('./model');

async function CreateUser(userDetails) {
    const user = new User(userDetails);
    return await user.save();
}

async function checkEmail(email) {
    const user = await User.findOne({ email: email });
    return user !== null;
}

//get password by email
async function getPasswordbyEmail(email) {
    const passwordDoc = await User.findOne({ email: email }).select('password');
    if (!passwordDoc) {
        return null;
    }
    return passwordDoc.password;
}

module.exports = { CreateUser, checkEmail, getPasswordbyEmail };