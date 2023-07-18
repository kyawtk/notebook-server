const { Schema, model } = require("mongoose");

let UserSchema = new Schema({
    userName : {type: String, required: true},
    passWord: String
})

const User = model('User' , UserSchema)

module.exports = User;