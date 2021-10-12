const mongoose = require('mongoose')

const contributionSchema = new mongoose.Schema({
  referenceID: Schema.Types.ObjectID,
  img: {
    data: Buffer,
    contentType: String,
    required: true,
  },
  captions: [String],
  selected: { type: Boolean, default: false },
  visited: { type: Boolean, default: false },
})
module.exports = mongoose.model('Contribution', contributionSchema)
