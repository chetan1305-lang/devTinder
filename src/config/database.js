const mongoose = require("mongoose");


const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://namastedev:8rBANNwj1KqKz8Mt@namastenode.w73wl.mongodb.net/devTinder"
    );
};

module.exports = connectDB;



