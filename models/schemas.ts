import mongoose, { Schema } from 'mongoose';

interface users extends mongoose.Document {
    name: String;
    password: String;
}

var users: Schema = new mongoose.Schema({
    username: { type: String, required: [true, "username not provided"], unique: true, minlength: 6 },
    password: { type: String, required: [true, "password not provided"], minlength: [8, '8 character length of password required'] }
})

export var usersmodel = mongoose.model('users', users);
