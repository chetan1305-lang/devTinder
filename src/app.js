const express = require("express");


const app = express();

const { adminAuth } = require("./middleware/auth");

app.use("/admin", adminAuth);

app.get("/user", (req, res) => {
    res.send("User dat sent");
});

app.get("/admin/getAllData", (req, res) => {
    res.send("All data Sent");
})


app.listen(3000, () => {
    console.log("Server Successfully listening on Port 3000 .......")
});

