const mongoose = require('mongoose');
const Schema = mongoose.Schema; // for REFACTOR rename to variable `Schema` to noteSchema`

// currently duplicates model `ElectricUpright` for production refactor to pull import this ElectricUpright.  
// REPLACE LINES 6-17 with `ElectricUpright`?
  const NoteSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
      type: String,
      required: true
    },
    priority: {type: Number, required: true},
    price: Number,
    body: {type: String,required: true},
    itemURL: String,
    reviewURL: String,
    audioFileURL: String,
    imageURL: String,
    // articles: [{type: ObjectId, ref: 'Article'}]
  },
    {
      collection: ''
    }
  );

  module.exports = Note = mongoose.model('note', NoteSchema);