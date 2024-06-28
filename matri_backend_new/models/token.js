const mongoose = require('mongoose');

const {Schema} = mongoose;

const refreshTokenSchema = Schema({
    token: {type: String, required: true},
    userId: {type: mongoose.SchemaTypes.ObjectId, ref: 'user'}
},
{timestamps: true}

);

module.exports = mongoose.model('RefreshToken', refreshTokenSchema, 'refresh tokens');