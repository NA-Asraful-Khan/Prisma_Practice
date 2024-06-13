const Validator = require('fastest-validator');

const v = new Validator();

const signUpSchema = {
    name: { type: "string", min: 3, max: 50 },
    email: { type: "email" },
    password: { type: "string", min: 6 }
};

const loginSchema = {
    email: { type: "email" },
    password: { type: "string", min: 6 }
};

const signUpValidate = (data) => v.validate(data, signUpSchema);
const logInValidate = (data) => v.validate(data, loginSchema);

module.exports = {
    signUpValidate,
    logInValidate
};
