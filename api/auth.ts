import { Request, Response, Express } from 'express'
import { usersmodel } from '../models/schemas';
var jwt = require('jsonwebtoken');
import { createToken, maxAge } from '../api/createuser';
import { authRequired } from '../middleware/authmiddleware';


export function auth(app: Express) {
    app.get('/', authRequired, (req: Request, res: Response) => {
        const cookievalue = req.cookies;
        console.log(cookievalue)
        res.send('hello we got the cookie' + cookievalue.jwt);
    });

    app.post('/auth', async (req: Request, res: Response) => {
        let password = req.body.password;
        let username = req.body.username;
        try {
            var user = await usersmodel.login(username, password);
            const token = await createToken(user._id);
            console.log(token)
            res.cookie('jwt', token, { httpOnly: true, maxAge: 20 * 1000})
            res.status(201).json({ user })
        } catch (err: any) {
            console.log(err.message)
            res.status(400).json({ err })
        }
    });
};
