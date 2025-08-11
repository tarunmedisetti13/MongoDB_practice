const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { CreateUser, checkEmail, getPasswordbyEmail } = require('../model/Userdboperations');


router.post('/add-user', async (req, res) => {
    try {
        const userData = req.body;
        const saltRounds = 10;
        const hashedpassword = await bcrypt.hash(userData.password, saltRounds);
        userData.password = hashedpassword;
        const newUser = await CreateUser(userData);
        res.status(201).json({
            message: "User Created Successfully",
            user: newUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});


//Check Email is in db
router.post('/check-email', async (req, res) => {
    try {
        const { email } = req.body;
        const result = await checkEmail(email);
        res.status(200).json({
            message: "Email Found",
            email: email,
            isFound: result
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to check email" })
    }

});

//compare  req password and db password using Email
router.post('/check-password', async (req, res) => {
    try {
        const { email, password } = req.body;
        const emailDB = await checkEmail(email);
        if (!emailDB) {
            return res.status(200).json({ message: "Email Not Found" });
        }
        const passwordDB = await getPasswordbyEmail(email);
        if (!passwordDB) {
            return res.status(200).json({ message: "Password Not found or it is null" });
        }
        const result = await bcrypt.compare(password, passwordDB);
        if (!result) {
            res.status(200).json({
                message: `Password not matches for your ${email}`

            });
        }
        res.status(200).json({
            message: `Password matches for your ${email}`

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to compare password" })
    }
});



module.exports = router;