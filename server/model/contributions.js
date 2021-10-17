const mongoose = require('mongoose')
const contriSchema = new mongoose.Schema(
  {
    fieldname: {
      type: String,
      required: true,
    },
    mimetype: { type: String },
    filename: { type: String },
    size: Number,
    captions: [String],
    selected: { type: Boolean, default: false },
    visited: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
)
const contributionSchema = new mongoose.Schema(
  {
    items: [contriSchema],
  },
  {
    timestamps: true,
  }
)
module.exports = mongoose.model('Contribution', contributionSchema)
