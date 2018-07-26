const mongoose = require('mongoose')

const SpeakerCabinets = mongoose.Schema({
  title: {type: String, required: true},
  priority: {type: Number, required: true},
  body: {type: String, required: true},
  urlAddress: String,
  reviewURL: String
}, {
  collection: 'SpeakerCabinets'
})

module.export = mongoose.model('SpeakerCabinets', SpeakerCabinets)