const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const port = 5000;
const server = express();
const ElectricUpright = require('./models/ElectricUpright')
// const SpeakerCabinets = require('./models/SpeakerCabinets')
// const misc = require('./models/misc')

// connect to database
const options = {
  user:"d2rd",
  pass:"d2rd-PW",
  useNewUrlParser: true // use the urlParser instead of the old one
}
// ☞ bd397750-457f-4308-b616-f0424ddc5d04

mongoose.connect('mongodb://ds141611.mlab.com:41611/d2rd-notes', options)
.then(() => console.log('Success connecting the MongoDB/d2rd-notes on mlab'))
.catch((err) => console.log(err.message)) // TEST: changing PW should throw 'authentication failed error

// create schema
// ☞ 8cf866c9-a061-48df-a275-ebdbf2196f60
// REFACTORED TO MOVE NOTES TO MONGODB

server.use(express.json()) // bodyParser function for json payloads

server.use(helmet())
server.use(cors()); // ie between netlify, heroku and mlab

// const memCache ={}; 

//add CRUD routes
server.get('/', (req, res) => {
  res.send('Hello from the express server'); // sanity check
});

server.get('/ElectricUpright', (req, res) => {
  ElectricUpright.find()
    .then((data) => {
      res.json(data)
    })
    .catch(err => console.log(err.message))
})

server.post('/ElectricUprights/create', (req, res) => {
  const { title, priority, body, price, itemURL, reviewURL } = req.body;
  const myNote = { title, priority, body, itemURL, reviewURL };
  const newNote = new ElectricUpright(myNote)
  newNote.save()
    .then(note => {
      res.status(201).json(note)
    })
    .catch(err => console.log(err))
});

// server.put('/d2rdNotes/update/:id', (req, res) => {
//   const { title, priority, summary, body } = req.body;
//   const updatedNote = { title, priority, summary, body };
//   const newNotes = d2rdNotes.map(note => {
//     return (note.id == req.params.id ? updatedNote :note);
//   });
//   d2rdNotes = newNotes;
//   res.send(d2rdNotes);
// });

// server.delete('/d2rdNotes/delete', (req, res) => {
//   const id = req.body.id;
//   const newNotes = d2rdNotes.filter(note => {
//     return id !== note.id;
//   });
//   d2rdNotes = newNotes;
//   res.send(d2rdNotes);
// });

// **** OTHER COLLECTIONS ***
// server.get('/SpeakerCabinets', (req, res) => {
//   SpeakerCabinets.find()
//     .then((data) => {
//       res.json(data)
//     })
//     .catch(err => console.log(err.message))
// })

// server.get('/misc', (req, res) => {
//   misc.find()
//     .then((data) => {
//       res.json(data)
//     })
//     .catch(err => console.log(err.message))
// })


server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
