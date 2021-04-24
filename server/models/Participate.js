const mongoose = require('mongoose');

const participateSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    mail: {
        type: String,
        unique: true,
        trim: true,
        sparse: true
    },
    participationCategory: {
        type: Number,
        default: 1
    },
    content: {
        type: String
    }
}, { timestamps: true })

const Participate = mongoose.model('Participate', participateSchema);

module.exports = { Participate }