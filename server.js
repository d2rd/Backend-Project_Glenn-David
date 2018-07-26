const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const port = 5000;
const server = express();
const ElectricUpright = require('./models/ElectricUpright')

// connect to database
const options = {
  user:"d2rd",
  pass:"d2rd-PW",
  useNewUrlParser: true // use the urlParser instead of the old one
}
mongoose.connect('mongodb://ds141611.mlab.com:41611/d2rd-notes', options)
.then(() => console.log('Success connecting the mlab'))
.catch((err) => console.log(err.message)) // changing PW would throw 'authentication failed error

// create schema
// ☞ 8cf866c9-a061-48df-a275-ebdbf2196f60

// const ObjectId = mongoose.Schema.Types.ObjectId

// REFACTORED TO MOVE NOTES TO MONGODB
// mongoDB connnection string:      `mongodb://d2rd:d2rd-PW@ds141611.mlab.com:41611/d2rd-d2rdNotes`

server.use(express.json()) // bodyParser function for json payloads

server.use(helmet())
server.use(cors()); // ie between netlify, heroku and mlab

// const memCache ={};  
//add logic for server.get

server.get('/', (req, res) => {
  res.send('Hello from the express server'); // sanity check
});

server.get('/ElectricUprights', (req, res) => {
  ElectricUpright.find()
    .then((data) => {
      res.json(data)
    })
    .catch(err => console.log(err.message))
})
// server.post('/api/d2rdNotes/create', (req, res) => {
//   ++id;
//   const { title, summary, body, priority } = req.body;
//   const myNote = { id, title, summary, body, priority };
//   d2rdNotes.push(myNote);
//   res.send(d2rdNotes);
// });

// server.put('/api/d2rdNotes/update/:id', (req, res) => {
//   const { title, priority, summary, body } = req.body;
//   const updatedNote = { title, priority, summary, body };
//   const newNotes = d2rdNotes.map(note => {
//     return (note.id == req.params.id ? updatedNote :note);
//   });
//   d2rdNotes = newNotes;
//   res.send(d2rdNotes);
// });

// server.delete('/api/d2rdNotes/delete', (req, res) => {
//   const id = req.body.id;
//   const newNotes = d2rdNotes.filter(note => {
//     return id !== note.id;
//   });
//   d2rdNotes = newNotes;
//   res.send(d2rdNotes);
// });

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
