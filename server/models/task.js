const mongoose = require('mongoose');

let validPriority = {
    values: ['high', 'medium', 'low'],
    message: '{VALUE} is not valid'
}

let validStatus = {
    values: ['queue', 'progress', 'done', 'delete'],
    message: '{VALUE} is not valid'
}


let Schema = mongoose.Schema;

let taskSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    priority: {
        type: String,
        required: [true, 'priority is required'],
        enum: validPriority
    },
    expiration: {
        type: String,
        required: [true, 'expiration is required']
    },
    daysEpiration: {
        type: Number,
        required: [true, 'daysEpiration is required']
    },
    status: {
        type: String,
        enum: validStatus
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

taskSchema.methods.toJSON = function() {
    let user = this;
    let objectUser = user.toObject();
    objectUser.id = objectUser._id;
    delete objectUser._id;

    return objectUser;
}

module.exports = mongoose.model('Task', taskSchema);