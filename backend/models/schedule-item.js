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
		type: String,
		validate: {
			validator: function (value) {
                const alphanumeric = /[^a-zA-Z0-9\s]/g

				return value.match(alphanumeric) == null;
			},
			message: "Name must be alphanumeric",
		},
	},
    categories: {
        type:[String]
    },
    priority: {
		type: Number
	},
    date: {
		type: Date
	},
    reminder: {
		type: Boolean
	}
});

module.exports = mongoose.model("Item", itemSchema);