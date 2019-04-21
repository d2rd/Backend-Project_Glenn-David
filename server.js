// using mLab/d2rd/notes db.collection(notes)
const express = require('express');
const helmet = require('helmet');
// import mongoose and the Schema
const mongoose = require('mongoose');
const NoteSchema = require('./models/Note');

// const Axios = require("axios"); ck #6 axios not needed in the backend delete this

const cors = require('cors');
// const bodyParser = require('body-parser'); express.json() built-in


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
// const db=mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error'));
// db.once('open', () => {
//   console.log('connected');
// });

//TEST DATA  CK#7: use faker.js to bring in some fake data so this becomes unnecessary it will scale too.
const newTestNote = {
  "title": "Yamaha SLB-200LTD Silent Bass",
  "priority": 3,
  "body": "The most popular Electric Upright Bass in the line-up."
};

// Routes from Sprint-Challenge RDBMS-cspt2 
// ☞ 997aad78-3c3a-4e0b-bf4c-37b8879abf64


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

// ☞ aef6a483-59f9-4055-ba52-4a47c55f734d


//add CRUD routes
// ☞ b40e7ff7-8839-4559-b551-e7ac95465cba

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

// post handler for new notes
// REFACTORED POST HANDLER
server.post('/Notes/create', (req, res) => {
  const title = req.body.title;
  const priority = req.body.priority;
  const price = req.body.price;
  const body = req.body.body;
  const urlAddress = req.body.urlAddress;
  const reviewURL = req.body.reviewURL;
  const videoURL = req.body.videoURL;
  const audioFileURL = req.body.audioFileURL;
  const timeStamp = new Date();
  const newNote = new NoteSchema({
    title: title,
    priority: priority,
    price: price,
    body: body,
    urlAddress: urlAddress,
    reviewURL: reviewURL,
    videoURL: videoURL,
    audioFileURL: audioFileURL,
    createdOn: timeStamp,
  });
  newNote.save()
  .then(response => res.send(`This note was added: ${response}`))
  .catch(err => {
    console.log(`There was an error: ${err}`);
    res.send(`There was an error!`)
  })
})
// ☞ 43ae1050-8247-4911-97b8-9d10f644a290

// CS-MODEL (from Pair Programming exercise)
// ☞ cbd15263-0c6d-4131-a8ce-a917b40c8495


server.put('/Notes/update/:id', (req, res) => {
  console.log(req.params.id)
  Note
    .findByIdAndUpdate(req.params.id, {
      title: req.body.title, 
      priority: req.body.priority,
      price: req.body.price,
      body: req.body.body,
      urlAddress: req.body.urlAddress,
      reviewURL: req.body.reviewURL,
      videoURL: req.body.videoURL,
      audioFileURL: req.body.audioFileURL
    
    
    
    })
    .then(note => {
      res.status(201).json(note)
    })
    .catch(err => console.log(err))
})

// server.patch('/Notes/update/:id', (req, res) => {
//   console.log(req.params.id)
//   Note
//     .findByIdAndUpdate(req.params.id, {price: req.body.price })
//     .then(note => {
//       res.status(201).json(note)
//     })
//     .catch(err => console.log(err))
// })

server.delete('/Notes/delete/:id', deleteFunc) // request DELETE http://localhost:5501/Notes/delete/5c761df560483331e5272758

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

