// allows user to select database on mLab.com
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
});
