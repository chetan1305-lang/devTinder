const mongoose = require("mongoose");

const validator = require("validator")

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4
    },
    lastName: {
        type:  String
    },
    emailId: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email address: "+ value);
            }
        }
    },
    password: {
        type: String,
        require: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Enter strong password: "+ value);
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value) {
            if(!["male", "female", "others"].includes(value)) {
                throw new Error("Gender data is not valid");
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://geographyandyou.com/images/user-profile.png",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid URL: "+ value);
            }
        }
    },
    about: {
        type: String,
        default: "This is defailt about of the user!"
    },
    skills: {
        type: [String]
    }
},
{
    timestamps: true
}
);

const User = mongoose.model("User", userSchema);
module.exports = User;