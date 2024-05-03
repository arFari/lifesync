const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const itemSchema = mongoose.Schema({
	id: {
		type: String,
		default: function () { 
            return uuidv4();;
        }
	},
	name: {
		type: String
	},
    priority: {
		type: Number
	},
    date: {
		type: Date
	},
	user_id: {
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User'
	},
	points: {
		type: Number,
		default: 10
	},
    reminder: {
		type: Boolean
	}
});

module.exports = mongoose.model("Item", itemSchema);