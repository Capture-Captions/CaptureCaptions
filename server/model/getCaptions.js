const mongoose = require('mongoose')

const getCaptionSchema = new mongoose.Schema({
  referenceID: Schema.Types.ObjectId,
  img: { type: Buffer, contentType: String, required: true },
  caption: { type: String, default: '' },
})

module.exports = mongoose.model('Caption', getCaptionSchema)
