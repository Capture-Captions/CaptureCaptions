const mongoose = require('mongoose')

const searchSchema = new mongoose.Schema(
  {
    fieldname: {
      type: 'string',
      required: true,
    },
    mimetype: {
      type: 'string',
      required: true,
    },
    filename: {
      type: 'string',
      required: true,
    },
    size: Number,
    cloudinary_url: { type: String, required: true },
    public_id: { type: String, required: true },
    output: {
      type: 'string',
      default: '',
    },
  },
  {
    timestamps: true,
  }
)

const getCaptionSchema = new mongoose.Schema({
  searches: [searchSchema],
})

module.exports = mongoose.model('Caption', getCaptionSchema)
