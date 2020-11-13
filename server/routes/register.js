const express = require('express')
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();


app.post('/register', (req, res) => {

    let body = req.body;

    User.findOne({ email: body.email }, (err, userDB) => {

        if (userDB) {
            res.status(400).json({
                ok: false,
                err: {
                    message: 'User registered!, please, login'
                }
            })
        }

        let user = new User({
            name: body.name,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10),
        })

        user.save((err, userDB) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            let token = jwt.sign({
                user: userDB
            }, process.env.SEED, { expiresIn: process.env.EXPIRED_TOKEN });

            res.json({
                ok: true,
                user: userDB,
                token
            })
        })

    });

})

module.exports = app;