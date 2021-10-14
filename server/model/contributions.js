const mongoose = require('mongoose')

const contributionSchema = new mongoose.Schema({
  referenceID: mongoose.Schema.Types.ObjectID,
  date: { type: Date, default: Date.now() },
  img: {
    data: Buffer,
    contentType: String,
  },
  captions: [String],
  selected: { type: Boolean, default: false },
  visited: { type: Boolean, default: false },
})
module.exports = mongoose.model('Contribution', contributionSchema)
