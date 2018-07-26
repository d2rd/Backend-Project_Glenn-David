const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const User = mongoose.Schema({
  Fname: {type: String, required: true},
  Lname: {type: String, required: true},
  userName: {type: String, required: true},
  password: {type: String, required: true},
  notes: [{type: ObjectId, ref: 'NoteItem'}]
}, {
  collection: 'Admin'
})

module.export = mongoose.model('User', User)
