const Item = require("../models/schedule-item");
const mongoose = require("mongoose");

module.exports = {
  newItem: async function (req, res) {
    try {
      const {name, date, user_id, priority, reminder, points} = req.body;
      
      var a = categories;
      a = a.replace(/'/g, '"');
      a = JSON.parse(a);

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

  deleteItem: async function (req, res) {
    try {
      const schItemId = req.params.id;

      const schItem = await Item.findOne({ id: schItemId });

      if (!schItem) {
        return res.status(404).json({ error: 'Item not found' });
      }

      const result = await Item.deleteOne({ id: categoryId });

      if (result.deletedCount > 0) {
        res.json({ acknowledged: true, deletedCount: result.deletedCount });
        deleteCounter();
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
				res.status(400).json({ error: 'Invalid item data' });
			} else {
				res.status(500).json({ error: 'Failed to delete item' });
      }
    }
  },

  updateItem: async function (req, res) {
    try {
      const {id, name, date, user_id, priority, reminder, points} = req.body;

      const schItem = await Item.updateOne(
        { id: id },
        { 
          name: name,
          date: date,
          user_id: user_id,
          points: points,
          priority: priority,
          reminder: reminder,
        },
        { new: false }
      );

      if (schItem['modifiedCount'] == 0) {
        return res.status(404).json({ status: 'ID not found' });
      }

      res.json({ status: 'Update successful' });
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
				res.status(400).json({ error: 'Invalid item data' });
			} else {
				res.status(500).json({ error: 'Failed to edit item' });
      }
    }
  }
};