Glenn-David Daniel   [8 days ago]
Found them.  I appreciate the guidance.  Thanks.
 
Christina Kopecky   [8 days ago]
Yay! Great! If you need anything else, I'm happy to help when i can
 
Glenn-David Daniel   [8 days ago]
As a stretch goal I want to access different collections within a db and further select the active db from a list of db’s on mLab.  It would be helpful if you could provide guidance on an approach.
My ‘activeDB’ variable takes care of some of it.  Below is my code for the switching file.
```// allows user to select database on mLab.com
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const cors = require('cors');
const port = 5501;
const server = express();
 
// Define available models (1 model for each collection)
const Note = require('./models/Note')
const ElectricUprights = require('./models/ElectricUprights')
const mernShopping = require('./models/traversy_media-mern_shopping')
const SpeakerCabinets = require('./models/SpeakerCabinets')
const Misc = require('./models/Misc')
const NoteItem = require('./models/NoteItem')
 
//Define available databases
const mLabNotes = 'mongodb://ds149742.mlab.com:49742/notes';
const mLabD2rdNotes = 'mongodb://ds141611.mlab.com:41611/d2rd-notes';
const mLabShopping = 'mongodb://ds217125.mlab.com:17125/traversy_media-mern_shopping';
 
// Set active database
const activeDB = '';
// Set active database
setActiveDB(() => {
  // choose 1 dbName from lines 16-18
  //REPLACE THIS STATEMENT WITH CASES TO SELECT A DATABASE
  // ADD CODE TO verify that check if `activeDB` is set. Throw error if null.
 
});
 
// connect to database
const options = {
  user:"d2rd",
  pass:"d2rd-PW",
  useNewUrlParser: true // use the urlParser instead of the old one
}
//mongoDB note ☞ bd397750-457f-4308-b616-f0424ddc5d04  
 
mongoose.connect(activeDB, options)
.then(() => console.log(`Success connecting to MongoDB/'${activeDB}` && ` on mLab.com`))
.catch((err) => console.log(err.message))
 
// INSERT CODE FROM server.js_Line_35-95
 
server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});```
 
 
Christina Kopecky   [8 days ago]
I’m thinking about this….
 
This is probably what I would try first:
 
You can use something like this in your main file:
```mongoose.connect('mongodb://localhost/default');
 
const db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected');
});```
which is just how it is described in the docs. And then in your model files, do something like the following:
```import mongoose, { Schema } from 'mongoose';
 
const userInfoSchema = new Schema({
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
  // ...other fields
});
 
const myDB = mongoose.connection.useDb('myDB');
 
const UserInfo = myDB.model('userInfo', userInfoSchema);
 
export default UserInfo;```
Where myDB is your database name.
