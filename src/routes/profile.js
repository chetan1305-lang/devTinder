const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middleware/auth");
const { validateEditProfileData, validateUserNewPassword } = require("../utils/validation");
const authRouter = require("./auth");
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try{
        const user = req.user;;
        if(!user) {
            throw new Error("User doesnot exist");
        }
        
        //console.log(cookies);
        res.send(user);
    }catch(err) {
        res.status(400).send("ERROR : " + err.message);
    }
     
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateEditProfileData(req)) {
            throw new Error("Invalid Edit Request");
        }
        const loggedInUser = req.user;
        
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
        await loggedInUser.save();
        res.send(`${loggedInUser.firstName} your profile updated successfully`);
    }catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

authRouter.patch("/profile/forgotPassword", userAuth, async (req, res) => {                                
    try {
        if(!validateUserNewPassword(req)) {
            throw new Error("Invalid password");
        }
        const loggedInUser = req.user;
        const passwordHashNew = await bcrypt.hash(req.body.password, 10);
        loggedInUser.password = passwordHashNew;
        await loggedInUser.save();
        console.log("logged in user", loggedInUser);
        res.send(`${loggedInUser.firstName} password changed successfully`);
    } catch(err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

module.exports = profileRouter;
