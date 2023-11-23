var jwt = require('jsonwebtoken');
import { SecretJwtKey } from "../api/createuser";
import { Request, Response } from "express";

export const authRequired = async function (req: Request, res: Response, next:any) {

    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, SecretJwtKey, (err: Error, decodedtoken:any) => {
            if (err) {
                console.log(err.message);
                res.status(401).send('Authenticated before accessing this');
            } else {
                console.log(decodedtoken);
                next();
            }
        });
    } else {
        res.status(401).send('Authenticated before accessing this');
    };

}
