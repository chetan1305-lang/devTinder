const express = require("express");


const app = express();

// app.use("/hello/2", (req, res) => {
//     res.send("Hello hello hellooooo");
// });

// app.use("/hello", (req, res) => {
//     res.send("abra ka dabra");
// });


app.use("/test", (req, res) => {
    res.send("Namaste from Chetan!");
});

app.get("/user", (req, res) => {
    res.send({firstName: "Chetan", lastName: "Kirange"});
});

app.listen(3000, () => {
    console.log("Server Successfully listening on Port 3000 .......")
});

