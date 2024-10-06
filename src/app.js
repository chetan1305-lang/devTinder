const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
    console.log(req.body);
    //Creating the new instance of User Model
    const user = new User(req.body);
    try {
        await user.save();
        res.send("User added successfully");
    }catch(err) {
        res.status(400).send("Error saving the user:" + err.message);
    }
    
});

//Get user by Email

app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    try{
        const user = await User.findOne({emailId: userEmail});
        if(!user) {
            res.status(404).send("User not found");
        } else {
            res.send(user);
        }
    }catch(err) {
        res.status(400).send("Something went wrong");
    }

});

//Get all users

app.get("/feed", async (req, res) => {
    try{
      const users = await User.find({});
      res.send(users);
    }catch(err) {
        res.status(400).send("Something went wrong");
    }

});

app.delete("/delete", async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    }catch(err) {
        res.status(400).send("Something went wrong");
    }

});

app.patch("/user/:userId", async (req, res) => {
    const data =  req.body;
    const userId = req.params?.userId;
    try {
        const ALLOWED_UPDATES = [
            "photoUrl",
            "about",
            "gender",
            "age",
            "skills",
        ];

        const isUpdateAllowed = Object.keys(data).every((k) => 
            ALLOWED_UPDATES.includes(k)
        )
        if (!isUpdateAllowed) {
            throw new Error("Update not allowed");
        }

        if (data.skills.length > 10) {
            throw new Error("Skills cannot be more thatn 10");
        }
        await User.findByIdAndUpdate({_id: userId}, data, {
            returnDocument: "after",
            runValidaters: true
        });
        res.send("User updated successfully");
    }catch(err) {
        res.status(400).send("Something went wrong" + err.message);
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



