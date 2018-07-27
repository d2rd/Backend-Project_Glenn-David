const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const NoteItem = mongoose.Schema({
  title: {type: String, required: true},
  priority: {type: Number, required: true},
  body: {type: String, required: true},
  itemURL: String,
  reviewURL: String,
  author: {
    type: ObjectId,
    ref: 'User'}
}, {
  collection: ''
})

module.exports = mongoose.model('NoteItem', NoteItem)
