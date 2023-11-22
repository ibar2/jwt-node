import { Request, Response, Express } from 'express'
import { usersmodel } from '../models/schemas';

export  function auth(app: Express) {
    app.get('/', (req: Request, res: Response) => {
        res.send('hello everyone hi!!!');
    });

    app.post('/auth', async (req: Request, res: Response) => {
        let password = req.body.password
        let username = req.body.username
        var userfound = await usersmodel.find({username:username, password:password})
        if (userfound.length > 0){
            res.send('founded')
        }
        else{res.send('not founded error')}
    })
}
