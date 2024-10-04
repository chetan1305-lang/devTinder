const express = require("express");


const app = express();



// app.use("", (req, res) => {
//     res.send("Hello from Dashboard dvsbsvsb");
// });


app.use("/hello", (req, res) => {
    res.send("Hello hello hellooooo");
});


app.use("/test", (req, res) => {
    res.send("Namaste from Chetan!");
});

app.listen(3000, () => {
    console.log("Server Successfully listening on Port 3000 .......")
});

