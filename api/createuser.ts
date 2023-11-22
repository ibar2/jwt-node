import { usersmodel } from "../models/schemas";
import { Express } from "express";

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


export async function createuser(app: Express) {
    app.post('/api/usercreate', async (req, res) => {
        const { username, password } = req.body

        try {
            var createduser = await usersmodel.create({
                username: username,
                password: password
            })
            res.status(201).json(createduser)
        } catch (err) {
            const errors = handler(err);
            res.status(400).json({ errors })
        }

    })
}
