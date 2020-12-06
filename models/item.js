const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  textContent: {
    type: String,
    minlength: 1,
    required: true,
  },
  priority: {
    type: Number,
    max: 3,
    min: 0,
    required: true,
  }
})

itemSchema.set('toJSON', {
  transform: (document, retObj) => {
    retObj.id = retObj._id.toString()
    delete retObj._id
    delete retObj.__v
  },
})

module.exports = mongoose.model('Item', itemSchema)