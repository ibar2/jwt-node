import { Request, Response, Express } from 'express'
import { usersmodel } from '../models/schemas';

export  function auth(app: Express) {
    app.get('/', (req: Request, res: Response) => {
        const cookievalue = req.cookies;
        res.send('hello we got the cookie');
    });

    app.post('/auth', async (req: Request, res: Response) => {
        let password = req.body.password;
        let username = req.body.username;
        var userfound = await usersmodel.find({username:username, password:password});
        if (userfound.length > 0){
            res.status(201).send('founded');
        }
        else{res.status(404).send('not founded error')};
    });
};
