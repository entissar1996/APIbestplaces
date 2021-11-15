const { number } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String
    },
    body: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    img: {
      type: String
    },
    status: {
        type: String,
        default: 'public'
    },
    date: {
        type: Date,
        default: Date.now
    },
    allowComments: {
        type: Boolean,
        default: true
    },
    likes: {
      type: Number,
      default: 0
  },
  Comments:[{
    type: Schema.Types.ObjectId,
    ref: 'Comments'
}]


});

module.exports = mongoose.model('Post', postSchema);
