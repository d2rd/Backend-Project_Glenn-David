// using mLab/d2rd/notes db.collection(notes)
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const cors = require('cors');
const port = 5501;
const server = express();

// Define available models
const Note = require('./models/Note')

//Define available databases
const mLabNotes = 'mongodb://ds149742.mlab.com:49742/notes';

// Set active database
const activeDB = mLabNotes; // avoids hardcoding db into mongoose.connect line 27


// connect to database
const options = {
  user:"d2rd",
  pass:"d2rd-PW",
  useNewUrlParser: true // use the urlParser instead of the old one
}
// ☞ bd397750-457f-4308-b616-f0424ddc5d04

mongoose.connect(activeDB, options)
.then(() => console.log('Success connecting the MongoDB/notes on mlab'))
.catch((err) => console.log(err.message)) // TEST: changing PW should throw 'authentication failed error
// NOTE: EACH DB HAS A UNIQUE CONNECTION STRING
// create schema
// ☞ 8cf866c9-a061-48df-a275-ebdbf2196f60
// REFACTORED TO MOVE NOTES TO MONGODB


server.use(express.json()) // bodyParser function for json payloads

server.use(helmet())

// Allow Cross-origin Resource Sharing i.e. between netlify, heroku and mlab
// server.use(cors());
server.use((req, res, next) =>{
  res.header("Access-Control-Allow-Origin", "*");  //`*` allows all sites to make requests.  change to specific domains to restrict access.
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH,DELETE, GET')
    return res.status(200).json({})
  }
  next();  // allows other routes to take over.
})

//add CRUD routes
server.get('/', (req, res) => {
  res.send('Hello from the d2rd Notes back-end express server using MongoDB on mLab'); // sanity check
});

server.get('/Notes', (req, res) => {
  Note.find()
    .then((data) => {
      res.json(data)
    })
    .catch(err => console.log(err.message))
})

server.post('/Notes/create', (req, res) => {
  const { title, body } = req.body;
  const myNote = { title, body };
  const newNote = new Note(myNote)
  newNote.save()
    .then(note => {
      res.status(201).json(note)
    })
    .catch(err => console.log(err))
});

server.put('/Notes/update/:id', (req, res) => {
  console.log(req.params.id)
  Note
    .findByIdAndUpdate(req.params.id, {title: req.body.title, body: req.body.body})
    .then(note => {
      res.status(201).json(note)
    })
    .catch(err => console.log(err))
})

server.delete('/Notes/delete/:id', deleteFunc)

function deleteFunc (req, res) {
  console.log(req.params.id);
  Note
    .findByIdAndRemove(req.params.id)
    .then(note => {
      res.send('The note was deleted')
    })
    .catch(err => console.log(err));
};

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
