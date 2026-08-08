const mongoose = require('mongoose');

const currentYear = new Date().getFullYear() + 1;

const cdSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    artist: {
      type: String,
      required: true,
      trim: true
    },
    genre: {
      type: String,
      required: true,
      trim: true
    },
    year: {
      type: Number,
      required: true,
      min: 1900,
      max: currentYear
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = mongoose.model('CD', cdSchema);
