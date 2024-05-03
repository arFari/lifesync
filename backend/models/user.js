const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
var bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
    username: {
		type: String
	},
    password: {
		type: String
	},
    name: {
		type: String
	},
    score: {
		type: Number
	},
    
});

module.exports = mongoose.model("User", userSchema);