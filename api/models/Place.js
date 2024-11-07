const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    photos: {
        type: [String]
    },
    description: {
        type: String,
        required: true,
    },
    perks: {
        type: [String],
        required: true,
    },
    extraInfo: { type: String },
    checkIn: {
        type: String,
        required: true,
    },
    checkOut: {
        type: String,
        required: true,
    },
    maxGuests: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
});

const PlaceModel = mongoose.model('Place', placeSchema);

module.exports = PlaceModel;