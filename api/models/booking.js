const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    place: { type: mongoose.Schema.Types.ObjectId, required: true },
    user: { type: String, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    guestCheck: { type: Number, required: true },
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    photo: { type: String, required: true },
    price: { type: Number },
    title: { type: String, required: true },
});


const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;
