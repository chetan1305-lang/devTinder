const validator =  require("validator");

const validatSignupData = (req) => {

    const {firstName, lastName, emailId, password} = req.body;

    if (!firstName || !lastName) {
        throw new Error("Name is not valid");
    }else if (!validator.isEmail(emailId)) {
        throw new Error("Email is not valid");
    }else if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter the strong password");
    }
};

const validateEditProfileData = (req) => {
    allowedEditFields = ["firstName", "lastName", "emailId", "photoUrl", "gender", "age", "about", "skills"];
    const isEditAllowed = Object.keys(req.body).every((field) => allowedEditFields.includes(field));
    return isEditAllowed;
}

const validateUserNewPassword = (req) => {
    const {password} = req.body;
    console.log(password);
    if(!password) {
        console.log("hello", password);
        throw new Error("Invalid password");
    }else if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter the strong password");
    }
    return true;  
}

module.exports = {
    validatSignupData,
    validateEditProfileData,
    validateUserNewPassword
}