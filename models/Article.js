const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const Article = mongoose.Schema({
  title: {type: String, required: true},
  body: {type: String, required: true},
  sourceURL: String,
  linkedNote: {
    type: ObjectId,
    ref: ''}
}, {
  collection: 'ElectricUpright'
})

module.exports = mongoose.model('Article', Article)
