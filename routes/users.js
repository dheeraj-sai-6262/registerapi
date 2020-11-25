var express = require('express')
const fs = require('fs')
var router = express.Router()
var db = require('../db');
var dotEnv = require("dotenv");
dotEnv.load();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var verifyToken = require("../routes/verifyToken")
//Register User

router.route("/register")
    .post((req, res) => {
        console.log("Register :", req.body)
        //encrypt password before save
        var hashedPassword = bcrypt.hashSync(req.body.password, 8);
        req.body.password = hashedPassword;
        var newUser = new db.User(req.body);
        fs.writeFile('G:\\backend november 2020\\TASK-01\\users\\users.txt', newUser, err => {
            if (err) {
                console.error(err)
                return
            }
        })

        res.status(200).send({ auth: true, userdata: newUser });
    })

//Login User
router.route("/login")
    .post((req, res) => {
        console.log(req.body)
        fs.readFile('G:\\backend november 2020\\TASK-01\\users\\users.txt', 'utf8', (err, data) => {
            if (err) {
                console.error(err)
                return res.status(404).send('No user found.');



            }
            res.status(200).send({ auth: true, userdata: data });
        })
        var logindata = new db.User(req.body);
        // fs.writeFile('G:\\backend november 2020\\TASK-01\\users\\logindata.txt', logindata, err => {
        //     if (err) {
        //         console.error(err)
        //         return
        //     }
        // })

    })


router.route("/me")
    .get(verifyToken, (req, res) => {
        db.User.findById(req.userId, { password: 0 })
            .then((user) => {
                res.status(200).send(user);
            })
            .catch((err) => {
                res.status(500).send({
                    message: "Unable to retrieve user" + JSON.stringify(err)
                });
            })
    })

//Logout
router.get('/logout', function (req, res) {
    res.status(200).send({ auth: false, token: null });
});

module.exports = router;