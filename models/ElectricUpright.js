const mongoose = require('mongoose')
// const ObjectId = mongoose.Schema.Types.ObjectId

const ElectricUpright = mongoose.Schema({
  title: {type: String, required: true},
  priority: {type: Number, required: true},
  body: {type: String, required: true},
  urlAddress: String,
  reviewURL: String
  // collectionName: {
  //   type: ObjectId,
  //   ref: 'BassGear'}
}, {
  collection: 'ElectricUpright'
})

module.exports = mongoose.model('ElectricUpright', ElectricUpright)