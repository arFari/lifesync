const User = require("../models/user");
const mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');

validPassword = function(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword);
};

module.exports = {
  register: async function (req, res) {
    try {
      const {username, password, name} = req.body;

      var new_user = new User({
        username: username,
        name: name
      });
    
      new_user.password = new_user.generateHash(password);
      new_user.save()

      res.status(200).json({ result: new_user._id });
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
				res.status(400).json({ error: error });
			} else {
				res.status(500).json({ error: 'Failed to input' });
      }
    }
  },

  login: async function (req, res) {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({ username: username });
        if (!validPassword(password, user.password)) {
            res.status(401).json({ error: 'Username or password wrong.' });
        } else {
            res.status(200).json({ result: user._id });
        }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to login' });
    }
  },

  getUser: async function (req, res) {
    try {
      const userId = req.query.id;

      const user = await User.findOne({ _id: userId });

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to get item' });
    }
  },

  addScore: async function (req, res) {
    try {
      const {id, score} = req.body;

      const user = await User.findOne({ _id: userId });
      let scoreUser = user.score+Number(score);
      console.log(scoreUser)

      const userUpdate = await User.updateOne(
        { _id: id },
        { 
            score: scoreUser
        },
        { new: false }
      );

      if (userUpdate['modifiedCount'] == 0) {
        return res.status(404).json({ status: 'nothing changes' });
      }

      res.json({ status: 'Update successful' });
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
				res.status(400).json({ error: 'Invalid user data' });
			} else {
				res.status(500).json({ error: error });
      }
    }
  }
};