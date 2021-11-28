const mongoose = require('mongoose')

const InsideSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: 'string',
      required: true,
    },
    captions: [String],
    selected: { type: Boolean, default: false },
    visited: { type: Boolean, default: false },
  },
  { timestamps: true }
)

const taskSubmitSchema = new mongoose.Schema(
  {
    posts: [InsideSchema],
  },
  { timestamps: true }
)
module.exports = mongoose.model('TaskSubmission', taskSubmitSchema)
