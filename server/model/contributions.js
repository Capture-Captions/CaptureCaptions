const mongoose = require('mongoose')
const contriSchema = new mongoose.Schema()
const contributionSchema = new mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    fieldname: {
      type: String,
      required: true,
    },
    mimetype: { type: String },
    filename: { type: String },
    cloudinary_url: { type: String, required: true },
    public_id: { type: String, required: true },
    size: Number,
    captions: [String],
    selected: { type: Boolean, default: false },
    visited: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
)
module.exports = mongoose.model('Contribution', contributionSchema)
