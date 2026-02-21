import Joi from "joi";

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    rePassword: Joi.ref("password"),
    name: Joi.string().required(),
    dateOfBirth: Joi.string().required(),
    gender: Joi.string().required()
})

export default registerSchema