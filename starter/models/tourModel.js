const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [, 'Must include a name'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'Must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'Must have max group size'],
  },
  ratingsAverage: {
    type: Number,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'Must include a price'],
  },
  difficulty: {
    type: String,
    required: [true, 'Must include a difficulty rating'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'must have a description'],
  },
  imageCover: {
    type: String,
    required: [true, 'must have cover image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
