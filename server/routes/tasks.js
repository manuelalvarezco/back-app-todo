const express = require('express')
const _ = require('underscore')
const Task = require('../models/task');
const { verifyToken } = require('../middlewares/auth');
const app = express();

//
app.get('/tasks', verifyToken, (req, res) => {

    let skip = req.query.skip || 0;
    skip = Number(skip);

    let limit = req.query.limit || 5;
    limit = Number(limit);

    const status = req.query.status ||  'queue';

    Task.find({ status: status })
        .skip(skip)
        .limit(limit)
        .exec((err, tasks) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            Task.countDocuments({ status: status }, (err, count) => {

                res.json({
                    ok: true,
                    tasks,
                    count
                })
            })

        })
})


app.post('/tasks', verifyToken, (req, res) => {

    let body = req.body;

    let task = new Task({
        name: body.name,
        priority: body.priority,
        expiration: body.expiration,
        daysEpiration: body.daysEpiration,
        status: body.status,
        user: body.user
    })

    task.save((err, taskDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            message: 'Task Saved!',
            task: taskDB
        })
    });
})

app.put('/tasks/:id', verifyToken, (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'priority', 'expiration', 'status', 'active', 'daysEpiration']);

    Task.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, taskDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            message: 'Task Updated!',
            task: taskDB
        })

    })
})

app.delete('/tasks/:id', verifyToken, (req, res) => {
    let id = req.params.id;

    let changeStatus = {
        status: 'delete'
    }

    Task.findByIdAndUpdate(id, changeStatus, { new: true, runValidators: true }, (err, taskDeleted) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!taskDeleted) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'Task not found'
                }
            })
        }

        res.json({
            ok: true,
            message: 'Task Deleted!',
            task: taskDeleted
        })

    })
})

module.exports = app;