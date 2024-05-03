const Item = require("../models/schedule-item");
const mongoose = require("mongoose");

module.exports = {
  /**
   * Controller for creating a new category.
   * @function
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {void}
   */
  newItem: async function (req, res) {
    try {
      const {name, date, categories, priority, reminder} = req.body;
      
      var a = categories;
      a = a.replace(/'/g, '"');
      a = JSON.parse(a);

      let schItem = new Item({
        name: name,
        date: date,
        categories: a,
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

  /**
   * Controller for listing all categories.
   * @function
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {void}
   */
  listItems: async function (req, res) {
    try {
      const schItems = await Item.find();

      res.json(schItems);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to list items' });
    }
  },

  /**
   * Controller for listing one category.
   * @function
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {void}
   */
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

  /**
   * Controller for deleting a category.
   * @function
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {void}
   */
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

  /**
   * Controller for updating a category.
   * @function
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {void}
   */
  updateItem: async function (req, res) {
    try {
      const {id, name, date, category, priority, reminder} = req.body;

      const schItem = await Item.updateOne(
        { id: id },
        { 
            name: name,
            date: date,
            category: category,
            priority: priority,
            reminder: reminder
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