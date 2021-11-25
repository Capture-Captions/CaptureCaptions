const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: 'string',
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('TaskUrl', taskSchema)
