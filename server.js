/**
 * Module dependencies.
 */
const express = require("express");
const path = require("path");

/**
 * Create an Express application.
 */
const app = express();
const PORT_NUMBER = 8080;
const server = require("http").Server(app);


app.use(express.static(path.join(__dirname, "./dist/webhack")));
app.use('/assets', express.static(path.join(__dirname, './src/assets')));

server.listen(PORT_NUMBER, () => {
    console.log(`Listening on port ${PORT_NUMBER}`);
});

app.use(express.json());

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/webhack/index.html'));
});