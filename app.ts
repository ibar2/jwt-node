import express from 'express';
import {auth} from './api/auth';
import mongoose from 'mongoose';
import { createuser } from './api/createuser';


const app = express();
async function dbconnect(){
    await mongoose.connect('');

}
dbconnect()
const port = process.env.PORT || 8000


app.use(express.json());

auth(app);
createuser(app);
app.listen(port)
