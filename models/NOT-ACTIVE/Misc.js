const mongoose = require('mongoose')

const Misc = mongoose.Schema({
  title: {type: String, required: true},
  priority: {type: Number, required: true},
  body: {type: String, required: true},
  itemURL: String,
  reviewURL: String
}, {
  collection: 'Misc'
})

module.exports = mongoose.model('Misc', Misc)
