import React, { Component } from 'react';
import './Notes.css';
const url = 'http://localhost:5501/notes'
// const notesCollection2 = 'http://localhost:5501/notesCollection2'

class Notes extends Component {
  constructor() {
    super();
    this.state = {
      notes: []
    }
  }

  componentDidMount() {
    fetch(url) // Call the fetch function passing the url of the API as a parameter
      .then(res => res.json())
      .then(notes => this.setState({notes}, () => console.log('Notes fetched...', notes)
        ))
        .catch(error => {
          console.error('Error fetching notes from mLab:', error);
        })
  }
  render() {
    return (
      <div>
        <h2>Notes</h2>
        <ul>
        {this.state.notes.map(note =>
            <li key={note.id}>{ note.title } { note.body }</li>  
          )}
        </ul>
      </div>
    );
  }
}

export default Notes;