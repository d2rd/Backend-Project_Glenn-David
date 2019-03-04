import React, { Component } from 'react';
import './Notes.css';
const url = 'http://localhost:5501/notes'
// const notes = 'http://localhost:5501/notes'

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
            <li key={note.id}>{ note.title }
            <p>Priority: {note.priority}</p> 
            { note.body }
            <p></p> 
            <a href={ note.urlAddress }>View product</a>  |    
              <a href={ note.reviewURL }>Read review</a>
            
            </li>  
          )}
        </ul>
      </div>
    );
  }
}

export default Notes;