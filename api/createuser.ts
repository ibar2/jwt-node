import mongoose from "mongoose";
import { usersmodel } from "../models/schemas";
import { Express } from "express";
var jwt = require('jsonwebtoken');

export const SecretJwtKey = process.env.Secret || 'default secret key'
export const maxAge = 24*60*60*1000 // 1 day

//validator helper
function handler(err:any) {
    console.log(err.message, err.code);
    let errors: {[key: string]: string} = { username: '', password: '' }
    if (err.code == 11000) {
        errors.username = 'the username is already registered'
        return errors
    }
    if (err.message.includes('users validation failed')) {
        Object.values<any>(err.errors).forEach(({properties}: { properties: { path: string; message: string } }) => {
            errors[properties.path] = properties.message
        })

    }

    return errors
}


// token generator
export function createToken(id:string){
    var token = jwt.sign({id}, SecretJwtKey, {
        expiresIn: maxAge
    });
    return token
};

export async function createuser(app: Express) {
    app.post('/api/usercreate', async (req, res) => {
        const { username, password } = req.body;

        try {
            var createduser:any = await usersmodel.create({
                username: username,
                password: password
            });
            res.cookie('jwt', createToken(createduser._id), {httpOnly:true, maxAge:maxAge});
            res.status(201).json({id: createduser._id});
        } catch (err) {
            const errors = handler(err);
            res.status(400).json({ errors });
        };

    });
}
