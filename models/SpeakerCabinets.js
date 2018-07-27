const mongoose = require('mongoose')

const SpeakerCabinets = mongoose.Schema({
  title: {type: String, required: true},
  priority: {type: Number, required: true},
  price: Number,
  body: {type: String, required: true},
  itemURL: String,
  reviewURL: String
}, {
  collection: 'SpeakerCabinets'
})

module.export = mongoose.model('SpeakerCabinets', SpeakerCabinets)