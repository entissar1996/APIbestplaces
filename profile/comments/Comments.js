const { number } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentsSchema = new Schema({

    commentBody: {
        type: String
    },
    commentUser: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    commentDate: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Comments', CommentsSchema);
