const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 5500;
const app = express();

// REFACTOR  to remove 'Summary' field because it is created on the fly in 'Notes.js'
let notes = [
  {
    id: 0,
    title: 'Auto service',
    priority: 2,
    summary: '',  // ADD logic to copy first 146 characters to summary.  If content is > 146 characters copy to body.
    body: 'Check prices for Service G at Autobahn motors, Mercedes-Benz Marin, MB Pleasanton',
    urlAddress: ``
  },
  {
    id: 1,
    title: 'Trickfish 4x8 bass Cabinet',
    priority: 3,
    summary:'',
    body: 'The TF408 features impressive specifications making it a great stand-alone cabinet and an absolute game changer as a two-cabinet stack. Weight-saving measures were taken into account while not losing the main objective of a killer compact cabinet that would be at home on stages of all sizes.  |  Custom Eminence 4 x 8” ferrite speakers | HF compression driver on 80° conical horn  | 1200 watts peak handling, 600 watts RMS  |  Custom crossover with peak protection and HF Attenuation  |  2 x NL3 Combo connectors, 2 x ¼” phone jacks  | Baltic Birch  | Dado and Rabbet Joint Construction  | 8 ohms  | Freq. Resp. 40Hz - 16kHz  |  Metal handles, metal corners, rubber feet  | 16 gauge steel grille  | 22 oz. sharkskin vinyl  | H 22.0 x W 19.0 x D 15.0  | Weight: Net 56Lbs  | Made in the USA',
    urlAddress: `https://www.trickfishamps.com/tf408`
  },
  {
    id: 2,
    title: 'New portable upright bass?',
    priority: 1,
    summary: "Eminence Bass: Finally, the Eminence Bass is the closest relative to a true upright bass to our hands and ears. It was the first EUB that really caught Bob's attention...",
    body: "Finally, the Eminence Bass is the closest relative to a true upright bass to our hands and ears. It was the first EUB that really caught Bob's attention, that he wanted to continue to play and enjoy -- it has the vibe, both literally and figuratively-- the vibrations of a truly acoustic instrument against the body, and the feel of a true double bass neck. It is constructed like a full size double bass, with a bass bar and sound post. It has a nicely crafted removable wooden bout to put the bass in the perfect playing position. And while the acoustic sound is not loud enough, unamplified, to perform with, it can be practiced without an amp, as the acoustic sound is quite pleasing but won't be transmitted throughout the house.",
    urlAddress: `https://www.gollihurmusic.com/product/3080-ELECTRIC_UPRIGHT_BASSES_WHICH_ONE_A_BUYER_S_GUIDE.html`

  },
  {
    id: 3,
    title: 'Try out the Ned Steinberg EUB models',
    priority: 3,
    summary: 'A wonderfully smooth playing and sounding EUB (electric upright bass). Ned Steinberger is the master of ergonomics, as well as tonal flexibility. This NS CR4M model adds EMG magnetic pickups...',
    body:"A wonderfully smooth playing and sounding EUB (electric upright bass). Ned Steinberger is the master of ergonomics, as well as tonal flexibility. This NS CR4M model adds EMG magnetic pickups, for even more flexibility of tone beyond the Polar bridge pickups. A 3 position switch lets you choose the output of the two types of pickups, and you can also adjust each string's coil of the neodymium magnets for as punch as you desire, and to balance the output for your best tone. List Price: $3580 (Includes great heavy duty braced tripod stand and improved gig bag with pocket for the stand)",
    urlAddress: ``
  },
  {
    id: 4,
    title: 'New Storage Spaces',
    priority: 2,
    summary:'',
    body: 'Chapman Storage, Concord.  |  Clutter.com ',
    urlAddress: ``
  },
  {
    id: 5,
    title: 'Errors Test - bad note ',
    priority: 2,
    summary:'Test: summary with empty body',
    body: '',
    urlAddress: ``
  }
];

let id = notes.length;

app.use(bodyParser.json());

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
  const { title, priority,summary, body } = req.body;
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
