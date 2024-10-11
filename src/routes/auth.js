const express = require("express");
const { validatSignupData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const authRouter = express.Router();
authRouter.post("/signup", async (req, res) => {
    console.log(req.body);
    try {

        //validation of data
        validatSignupData(req);

        const { firstName, lastName, emailId, password } = req.body;

        //Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);
        //Creating the new instance of User Model

        const user = new User({
            firstName, lastName, emailId, password: passwordHash,
        });
        await user.save();
        res.send("User added successfully");
    }catch(err) {
        res.status(400).send("Error saving the user:" + err.message);
    }
    
});


authRouter.post("/login", async (req, res) => {
    try{
        const { emailId, password } = req.body;
        const user = await User.findOne({emailId: emailId});
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {
            //Create JWT Token
            const token = await user.getJWT();
            //console.log(token);

            //Add the token to cookie and send the response back to the user
            res.cookie("token", token, { expires: new Date(Date.now() + 900000)});
            res.send("Login successfull");
        }else {
            throw new Error("Invalid credentials");
        }
    } catch(err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

module.exports = authRouter;