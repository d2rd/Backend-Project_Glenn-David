import React, { Component } from 'react';
import './Notes.css';

class Notes extends Component {
  constructor() {
    super();
    this.state = {
      notes: []
    }
  }

  componentDidMount() {
    fetch('/api/notes')
      .then(res => res.json())
      .then(notes => this.setState({notes}, () => console.log('Notes fetched...', notes)
        ));
  }
  render() {
    return (
      <div>
        <h2>Notes</h2>
        <ul>
          {this.state.notes.map(note =>
            <li key={note.id}>{ note.firstName } { note.lastName }</li>  
          )}
        </ul>
      </div>
    );
  }
}

export default Notes;