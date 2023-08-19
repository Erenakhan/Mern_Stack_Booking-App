const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    title: String,
    address: String,
    email: String,
    photo: [String],
    desc: String, 
    selected: [String],
    checkIn: Number, 
    checkOut: Number, 
    guest: Number,
    price: Number,
});

const Place = mongoose.model('Place', PlaceSchema);

module.exports = Place;
