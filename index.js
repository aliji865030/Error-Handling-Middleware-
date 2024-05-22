const express = require("express");
const fs = require("fs");
require("dotenv").config();

const app = express();

app.use(express.json());

const Validation = (req,res,next) => {
    const {email,firstName,lastName,password,phoneNo} = req.body;

    const firstLetterUpperCaseRegex = /^[A-Z]/;
    const emailRegex = /@/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/;
    const phoneNoRegex = /^\d{10}$/

    if(!firstLetterUpperCaseRegex.test(firstName)){
        res.status(400).json({
            message: "First letter of first name should be capital"
        })
    } else if (!firstLetterUpperCaseRegex.test(lastName)){
        res.status(400).json({
            message : "First letter of the last name should be capital"
        })
    } else if (!emailRegex.test(email)){
        res.status(400).json({
            message : "Please enter a valid email id"
        })
    } else if (!passwordRegex.test(password)){
        res.status(400).json({
            message : "Password should containe at least 8 characters, with one uppercase letter, one numeric character and one special character"
        })
    } else if(!phoneNoRegex.test(phoneNo)){
        res.status(400).json({
            message : "Please enter a valid phone number"
        })
    } else {
        next();
    }
}

app.post("/create_user",Validation,(req,res)=>{
    res.status(200).json({
        message : "All data are valid"
    })
})

app.use("/*",(req,res)=>{
    res.status(404).json({
        message : "PATH NOT FOUND"
    });
});

app.listen(8090,()=>{
    console.log("Server up and running on port no 8090");
});