const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const ElectricUpright = mongoose.Schema({
  title: {type: String, required: true},
  priority: {type: Number, required: true},
  price: Number,
  body: {type: String, required: true},
  itemURL: String,
  reviewURL: String,
  articles: [{type: ObjectId, ref: 'Article'}]
},
{
  collection: 'ElectricUprights'
})

module.exports = mongoose.model('ElectricUpright', ElectricUpright)
