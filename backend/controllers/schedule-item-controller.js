const Item = require("../models/schedule-item");
const mongoose = require("mongoose");

module.exports = {
  newItem: async function (req, res) {
    try {
      const {name, date, user_id, priority, reminder, points} = req.body;

      let schItem = new Item({
        name: name,
        date: date,
        user_id: user_id,
        points: points,
        priority: priority,
        reminder: reminder,
      });

      await schItem.save();

      res.status(200).json({ id: schItem.id });
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
				res.status(400).json({ error: error });
			} else {
				res.status(500).json({ error: 'Failed to input' });
      }
    }
  },
// Controller to retrieve items with the same date as today
getItemsWithSameDateAsToday: async function(req,res){
  try {
    // Get the current date
    const today = new Date();
    // Set the time to start of the day (midnight)
    today.setHours(0, 0, 0, 0);
    const userId = req.params.userId;

    // Query items with the same date as today
    const items = await Item.find({ user_id: userId, 
      date: {
        $gte: today, // Greater than or equal to the start of today
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) // Less than tomorrow
      }, done: false
    });

    res.json(items);
  } catch (error) {
    console.error('Error retrieving items:', error);
    res.status(500).json({ error: 'Failed to retrieve items' });
  }
},
  listItems: async function (req, res) {
    try {
      const schItems = await Item.find();

      res.json(schItems);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to list items' });
    }
  },

  getItem: async function (req, res) {
    try {
      const schItemId = req.params.id;

      const schItem = await Item.findOne({ id: schItemId });

      res.json(schItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to get item' });
    }
  },

  listNotDoneItems: async function (req, res) {
    try {
      const schItems = await Item.find({  done: false });

      res.json(schItems);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to list items' });
    }
  },

  deleteItem: async function (req, res) {
    try {
      const schItemId = req.params.id;

      const schItem = await Item.findOne({ id: schItemId });

      if (!schItem) {
        return res.status(404).json({ error: 'Item not found' });
      }

      const result = await Item.deleteOne({ id: schItemId });

      if (result.deletedCount > 0) {
        res.status(200).json({ acknowledged: true, deletedCount: result.deletedCount });
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
				res.status(400).json({ error: 'Invalid item data' });
			} else {
				res.status(500).json({ error: error });
      }
    }
  },

  updateItem: async function (req, res) {
    try {
      const {id, name, date, user_id, priority, reminder, points, done} = req.body;

      const schItem = await Item.updateOne(
        { id: id },
        { 
          name: name,
          date: date,
          user_id: user_id,
          points: points,
          priority: priority,
          reminder: reminder,
          done: done
        },
        { new: false }
      );

      if (schItem['modifiedCount'] == 0){
        return res.status(404).json({ status: 'nothing changed' });
      }

      res.json({ status: 'Update successful' });
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
				res.status(400).json({ error: 'Invalid item data' });
			} else {
				res.status(500).json({ error: error});
      }
    }
  },
// Get all items by user IDs
getAllItemsByUserId: async function (req, res) {
  try {
    // Assuming userId is passed directly as a route parameter
    const userId = req.params.userId;

    const items = await Item.find({ user_id: userId });

    res.json(items);
  } catch (error) {
    console.error('Error fetching items for user:', userId, error);
    res.status(500).json({ error: 'Failed to get items' });
  }
},
}