const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'email is required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    }
});

userSchema.methods.toJSON = function() {
    let user = this;
    let objectUser = user.toObject();
    objectUser.id = objectUser._id;

    delete objectUser._id;
    delete objectUser.password;

    return objectUser;
}

userSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' })

module.exports = mongoose.model('User', userSchema);