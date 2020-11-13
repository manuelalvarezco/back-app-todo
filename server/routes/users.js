const express = require('express')
const User = require('../models/user');
const bcrypt = require('bcrypt');

const app = express();

app.get('/users', (req, res) => {
    let skip = req.query.skip || 0;
    skip = Number(skip);

    let limit = req.query.limit || 5;

    User.find()
        .skip(skip)
        .limit(limit)
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            User.countDocuments((err, count) => {

                res.json({
                    ok: true,
                    users,
                    count
                })
            })

        })
})


app.post('/users', (req, res) => {

    let body = req.body;

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

        res.json({
            ok: true,
            user: userDB
        })
    })
})

app.put('/users/:id', (req, res) => {

    let id = req.params.id;

    res.json({
        id
    });
})

app.delete('/users', (req, res) => {
    res.json('Delete users');
})

module.exports = app;