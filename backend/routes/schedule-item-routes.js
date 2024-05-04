const express = require("express");
const schItemCont = require("../controllers/schedule-item-controller");

const router = express.Router();

router.post("/add", schItemCont.newItem);

router.get("/list", schItemCont.listItems);

router.get("/:id", schItemCont.getItem);

router.delete("/delete/:id", schItemCont.deleteItem);

router.put("/update", schItemCont.updateItem);
router.get("/id/:userId", schItemCont.getAllItemsByUserId)

module.exports = router;