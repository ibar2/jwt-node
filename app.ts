import express from 'express';
import {auth} from './api/auth';
import mongoose from 'mongoose';
import { createuser } from './api/createuser';

//i don't know if i would need cokie when my app is just for api and not a webapp
var cookieparser = require('cookie-parser');


const app = express();
async function dbconnect(){
    await mongoose.connect('');

}
dbconnect()
const port = process.env.PORT || 8000

app.use(express.json());
app.use(cookieparser());

auth(app);
createuser(app);
app.listen(port)
