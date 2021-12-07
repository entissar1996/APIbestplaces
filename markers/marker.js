const mongoose = require("mongoose");
const { init } = require("../auth/user-schema");


const Schema = mongoose.Schema;

const markerSchema = new Schema({
    latitude: { 
        type: Number, 
        required: [true, 'latitude est obligatoire!!'] 
    },
    longitude: { 
        type: Number, 
        required: [true, 'longitude est obligatoire!!'] 
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },

});
module.exports = new mongoose.model('Marker', markerSchema);