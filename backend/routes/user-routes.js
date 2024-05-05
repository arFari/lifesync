const express = require("express");
const userCont = require("../controllers/user-controller");

const router = express.Router();

router.post("/register", userCont.register);

router.post("/login", userCont.login);

router.get("/", userCont.getUser);

router.put("/add-score", userCont.addScore);

router.put("/update", userCont.updateCategories);

router.put("/update-time", userCont.updateTimeSpent);

router.get("/get-time",userCont.getTimeSpent)

router.put("/add-collectible", userCont.addCollectible)

router.put("/update-reward", userCont.updateReward)

module.exports = router;