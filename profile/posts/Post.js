const { number, string } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    body: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    img: [{
      type:String
    }
    ],
    date: {
        type: Date,
        default: Date.now
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
