const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const port = 5500;
const app = express();

// connect to database

mongoose.connect(' mongodb://d2rd:d2rd-PW@ds141611.mlab.com:41611/d2rd-notes') // if 'databaseName' does not exist mongoDB will create it.  However it will not show up until the first record is created.

// create schema
// ☞ 8cf866c9-a061-48df-a275-ebdbf2196f60

const ObjectId = mongoose.Schema.Types.ObjectId

// REFACTORED TO MOVE NOTES TO MONGODB
// mongoDB connnection string:      `mongodb://d2rd:d2rd-PW@ds141611.mlab.com:41611/d2rd-notes`


let id = notes.length;

app.use(bodyParser.json()); // REFACTOR to use express

app.use(cors());

const memCache ={};  //add logic for app.get

app.get('/api/notes/get', (req, res) => {
  res.send(notes);
});

app.post('/api/notes/create', (req, res) => {
  ++id;
  const { title, summary, body, priority } = req.body;
  const myNote = { id, title, summary, body, priority };
  notes.push(myNote);
  res.send(notes);
});

app.put('/api/notes/update/:id', (req, res) => {
  const { title, priority, summary, body } = req.body;
  const updatedNote = { title, priority, summary, body };
  const newNotes = notes.map(note => {
    return (note.id == req.params.id ? updatedNote :note);
  });
  notes = newNotes;
  res.send(notes);
});

app.delete('/api/notes/delete', (req, res) => {
  const id = req.body.id;
  const newNotes = notes.filter(note => {
    return id !== note.id;
  });
  notes = newNotes;
  res.send(notes);
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
