/**
 * Module dependencies.
 */
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
var bodyParser = require('body-parser')

/**
 * Create an Express application.
 */
const app = express();
const PORT_NUMBER = 8000;
const server = require("http").Server(app);

const scheduleItemRouter = require("./backend/routes/schedule-item-routes");

app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(express.static(path.join(__dirname, "./dist/webhack")));
app.use('/assets', express.static(path.join(__dirname, './src/assets')));

const url = "mongodb+srv://farikha222:PnueyMyrGHdP7odL@cluster0.gfy8m9h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/webhack";

async function connect(url) {
    await mongoose.connect(url);
    return "Connected Successfully";
}

server.listen(PORT_NUMBER, () => {
    console.log(`Listening on port ${PORT_NUMBER}`);
});

app.use(express.json());

app.use("/api/schedule-item", scheduleItemRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/webhack/index.html'));
});

connect(url)
    .then(console.log)
    .catch((err) => console.log(err));