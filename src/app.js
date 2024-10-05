const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");


app.post("/signup", async (req, res) => {
    //Creating the new instance of User Model
    const user = new User({
        firstName: "Pritam",
        lastName: "Narkhede",
        emailId: "pritam123@gmail.com",
        password: "pritam@123"
    });
    try {
        await user.save();
        res.send("User added successfully");
    }catch(err) {
        res.status(400).send("Error saving the user:" + err.message);
    }
    
});

connectDB()
 .then(() => {
    console.log("Database connection established");
    app.listen(3000, () => {
        console.log("Server Successfully listening on Port 3000......")
    });
 })
 .catch((err) => {
    console.log("Database cannot be connected");
 });



