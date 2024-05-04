const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
var bcrypt = require('bcrypt-nodejs');
const Item = require('./schedule-item')

const userSchema = mongoose.Schema({
    username: {
		type: String,
        required: true
	},
    password: {
		type: String,
        required: true
	},
    name: {
		type: String,
        required: true
	},
    categories: {
        type:[String]
    },
    time_spent: [{
        category: String,
        hours: Number
    }],
    score: {
		type: Number,   
        default: 0
	},
    


});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };
  
  // checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);