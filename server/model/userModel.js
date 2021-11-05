const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: 'string',
      required: true,
    },
    email: { type: 'string', required: true },
    password: { type: 'string', required: true },
    rewards: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
)
module.exports = mongoose.model('users', userSchema)
