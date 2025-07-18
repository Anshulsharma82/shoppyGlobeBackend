import { userModel } from "../models/user.models.js"
import bcrypt from 'bcrypt'
import joi from 'joi';
import jwt from 'jsonwebtoken'

async function registerUser(req,res) {    
    try {
        validateRegisterUserRequest(req.body, res)
        const doesUsernameExist = await userModel.findOne({
            username: req.body.username
        })
        if(doesUsernameExist) {
            return res.status(409).json({
                msg: 'Username is in use. Please try again with different username'
            })
        }
        const doesEmailExist = await userModel.findOne({
            email: req.body.email
        })
        if(doesEmailExist) {
            return res.status(409).json({
                msg: 'Email is already registered. Please login.'
            })
        }
        const { password, ...rest} = req.body
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = await userModel.create({
            ...rest,
            password: hashedPassword
        })
        return res.status(201).json({
            msg: 'user created successfully!',
            user: newUser
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Internal Server Error'
        })
    }
}

function validateRegisterUserRequest(requestBody, res) {
    const schema = joi.object({
        name: joi.string().required(),
        age: joi.number().required(),
        username: joi.string().required(),
        password: joi.string().min(6).required(),
        email: joi.string().email().required()
    })

    const { error } = schema.validate(requestBody)
    if( error) {
        return res.status(400).json({
            msg: error.details[0].message
        })
    }
}

async function loginUser(req,res) {
    try {
        if(!req.body) {
            return res.status(400).json({
                msg: 'Username or password are required in request body'
            })
        }
        validateLoginRequest(req,res)

        const user = await userModel.findOne({
            username: req.body.username
        })
        if(!user) {
            return res.status(401).json({
                msg: 'Incorrect username and password'
            })
        }
        const isPwdCorret = await bcrypt.compare(req.body.password, user?.password) 
        if(!isPwdCorret) {
            return res.status(401).json({
                msg: 'Incorrect username and password'
            })
        }
        const jwtPayload = {
            username: req.body.username
        }
        const JWT_SECRET = process.env.JWT_SECRET;
        const token =  jwt.sign(jwtPayload, JWT_SECRET ,  { expiresIn: '30m'})
        return res.status(200).json({
            token
        })
    } catch (error) {
        console.log('error in Login API', error)
        return res.status(500).json({
            msg: 'Internal Server Error'
        })
    }   
}

function validateLoginRequest(req,res) {
    const schema = joi.object({
            username: joi.string().required(),
            password: joi.string().min(6).required()
        })
        const { error } = schema.validate(req.body)
        if(error) {
            return res.status(400).json({
                msg: error?.details?.[0]?.message || "Validation Failed"
            })
        }
}

export {
    registerUser,
    loginUser
}