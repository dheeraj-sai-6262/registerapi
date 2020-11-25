var express = require("express");
var dotEnv = require("dotenv");
dotEnv.load();

var users = require("./routes/users")


var app = express();

var port = process.env.PORT || 3001;

var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


app.get("/", (req, res) => {
    res.send("api server is running")
})

app.use("/api/users", users);


app.listen(port, () => {
    console.log(" API Server started at " + port);
})