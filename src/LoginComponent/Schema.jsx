import * as yup from "yup";

 const registerSchema =yup.object().shape({
    Email: yup.string().email().required(),
    Username: yup.string().min(8).max(15).matches(/^[a-zA-Z0-9_]+$/,'Valid Inputs are charecter number and ("_")').required(),
    Password: yup.string().min(6).max(15).required()
})

const loginSchema =yup.object().shape({
    Username: yup.string().min(8).max(15).matches(/^[a-zA-Z0-9_]+$/,'Valid Inputs are charecter number and ("_")').required(),
    Password: yup.string().min(6).max(15).required()
})

export {registerSchema,loginSchema}