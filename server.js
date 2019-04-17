// using mLab/d2rd/notes db.collection(notes)
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const Axios = require("axios");
const cors = require('cors');
const port = 5501;
const server = express();

// Define available models
const Note = require('./models/Note')

//Define available databases and their connection strings
const mLabNotes = 'mongodb://ds149742.mlab.com:49742/notes';

// Set active database
const activeDB = mLabNotes; // avoids hardcoding db into mongoose.connect line 27


// connect to database  ** MOVE TO ENV VARIABLE
const options = {
  user:"d2rd",
  pass:"d2rd-PW",
  useNewUrlParser: true // use the urlParser instead of the old one
}
// ☞ bd397750-457f-4308-b616-f0424ddc5d04

mongoose.connect(activeDB, options)
.then(() => console.log('Success connecting the MongoDB/notes on mlab'))
.catch((err) => console.log(err.message)) 
// ☞ b71f0ee3-4e8e-4cda-ad79-5b7038d878e0

// Suggested by CK as standard syntax
const db=mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('connected');
});

//TEST DATA
const newTestNote = {
  "title": "Yamaha SLB-200LTD Silent Bass",
  "priority": 3,
  "body": "The most popular Electric Upright Bass in the line-up."
};

// Routes from Sprint-Challenge RDBMS-cspt2 
// ☞ 997aad78-3c3a-4e0b-bf4c-37b8879abf64
//USING AXIOS REQUESTS 3-21-19
Axios.get(mLabNotes)
// .then( (response ) => { console.log(response)})
.then( (response ) => { console.log(response.status)})
.catch( (err) => { console.log(err)})

Axios.post(mLabNotes, {newTestNote}) 
Axios.post('https://www.gggggggle.com/search?q=trees', {
  "title": "Yamaha SLB-200LTD Silent Bass",
  "priority": 3,
  "body": "The most popular Electric Upright Bass in the line-up."
})
.then((response) =>{}) 

// Axios.put('https://www.gggggggle.com/search?q=trees', {
//   name:'David',
//   city: 'SFO'
// })
// .then((response) =>{})

// Axios.delete('https://www.gggggggle.com/search?q=trees', {
//   name:'David'})
//   .then((response) =>{})

  //NOTES FROM LECTURE
  // Should always must return something.  Not required but if no return what's the point?
    // asyncFunction()
    // .then(anotherAsyncFunction) (firstThing) => {return someting}
    // .then(OneMoreAsyncFunc) (something) => {return somethingElse}
    // .catch(errorHandlingFunction)

  // callback hell is a real thing.  Promises solves this.
//===========================

//ORIGINAL SERVER REQUESTS before 3-21-19
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
