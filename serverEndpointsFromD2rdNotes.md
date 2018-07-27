const dbURL = process.env.MONGO_DB_URL

// connect to mongoDB using mongoose
mongoose.connect(dbURL, function (err){
  if(err){
    console.log('Error connecting to: '+ dbURL)
  }
  else{
    console.log('Connected to: '+ dbURL)
  }
})

// set 'db' variable to reference MongoDB connection
const db = mongoose.connection
app.use(cors());
app.options('*', cors());    

// assign db name to connection string value in .env using dbURL
let d2rdNotes = dbURL
// END NEW CODE

let id = d2rdNotes.length;

app.use(bodyParser.json());

app.use(cors());

// create schema

// helpers
// count documents in a collection
// dbURL.count({}, (err, data) => {
//   console.log(data); // prints correct number
// });

// routes
app.get('./d2rdNotes/get', (req, res) => {
  res.send(d2rdNotes);
});

app.post('/d2rdNotes/create', (req, res) => {
  ++id;
  const { title, summary, body, priority } = req.body;
  const myNote = { id, title, summary, body, priority };
  d2rdNotes.push(myNote);
  res.send(d2rdNotes);
});

app.put('/d2rdNotes/update/:id', (req, res) => {
  const { title, priority, summary, body } = req.body;
  const updatedNote = { title, priority, summary, body };
  const newNotes = d2rdNotes.map(note => {
    return (note.id === req.params.id ? updatedNote :note);
  });
  d2rdNotes = newNotes;
  res.send(d2rdNotes);
});

app.delete('/d2rdNotes/delete', (req, res) => {
  const id = req.body.id;
  const newNotes = d2rdNotes.filter(note => {
    return id !== note.id;
  });
  d2rdNotes = newNotes;
  res.send(d2rdNotes);
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
