import React, { Component } from 'react';
// import { Button } from 'reactstrap';
// import { Container, LGroup, ListGroupItem } from 'reactstrap';
import axios from 'axios';
import './Notes.css';
// import logo from '../src/assets/D2rdroid2.png';  //move to ./assets folder
const url = 'http://localhost:5501/notes'
// const notes = 'http://localhost:5501/notes'

class Notes extends Component {
  constructor(props) {  //constructor initializes the default state.
    super(props);
    this.state = {
      notes: []
    }
   this.callAPI = this.callAPI.bind(this); // #4 suggested by CK
  }
// ☞ e240912c-8d2f-4025-bcd8-dc8f2f72a0c4

//  componentDidMount() {
//     fetch(url) // Call the fetch function passing the url of the API as a parameter
//       .then(res => res.json())
//       .then(notes => this.setState({notes}, () => console.log('Notes fetched...', notes)
//         ))
//         .catch(error => {
//           console.error('Error fetching notes from mLab:', error); 
//         })
//   }

callAPI () {
  fetch(url) // Call the fetch function passing the url of the API as a parameter
    .then(res => res.json())
    .then(notes => this.setState({notes}, () => console.log('Notes fetched...', notes)
      ))
      .catch(error => {
        console.error('Error fetching notes from mLab:', error); 
      })
}

componentDidMount() {
  this.callAPI();
}


//  deleteFunc (req, res) {
//     console.log(req.params.id);
//     Notes
//       .findByIdAndRemove(req.params.id)
//       .then(note => {
//         res.send('The note was deleted')
//       })
//       .catch(err => console.log(err));
//   };
  
  removeNote(_id) {
    this.setState({notes: this.state.notes.filter(note => note._id !== _id)})
  }  //adapted from video https://youtu.be/KItsR6pM5lY

// Delete user
deleteNoteHandler1 = (noteIndex) => {
  // console.log('deleteNoteHandler was clicked!');
  const notes = this.state.notes;
  notes.splice(noteIndex, 1);
  this.setState({notes: notes})
}
deleteNoteHandler2 = (_id) => {
  // console.log('deleteNoteHandler was clicked!');
  console.log(_id)
  fetch(url._id, { 
    method: 'DELETE' 
  }); 
}

deleteNoteHandler2 = (_id) => {
  // console.log('deleteNoteHandler was clicked!');
  console.log(_id)
  fetch(url._id, { 
    method: 'DELETE' 
  }); 
}

deleteNoteHandler3(note){
  // alert('deleteNoteHandler was clicked!');
  console.log(note._id, note.title);
  fetch(url,note._id, { 
    method: 'DELETE' 
  }); 
  console.log(note._id, note.title);
}

// deleteNoteHandler4(note){
//   // alert('deleteNoteHandler4 was clicked!');
//   console.log(note._id, note.title);
//   this.setState({notes: this.state.notes.filter(note => note._id)})
//   console.log(note._id, note.title);  
// }

// deleteNoteHandler5(note){
//   // alert('deleteNoteHandler was clicked!');
//   console.log(note._id, note.title);
// Notes
//       .findByIdAndRemove(note._id)
//       .then(note => {
//         res.send('The note was deleted')
//       })
//       .catch(err => console.log(err));
// console.log(note._id, note.title);
// }
deleteNoteHandler6 = (note)=> {
  // alert('deleteNoteHandler4 was clicked!');
  console.log(note)
  axios.delete(url)
  .then(res => {
    // this.setState({notes: notes.filter(note => note._id !== note._id)})
    this.setState({notes: this.state.notes.filter(n => n._id !== note._id)})
  })
  .then(() => {console.log('The note was deleted')})
  .catch(err => console.log(err));
}

deleteNoteHandler7 = _id => {
  axios
    .delete(`http://localhost:5501/notes/${_id}`)
    .then(res => this.setState({ notes: res.data }))
    .catch(err => {
      console.log(err);
    })
}

  render() {
    return (
      <div>
        <div className="View-header">
        <h1>Notes found about Electric Uprights</h1>
         {/* <h1>Notes found about {activeDB}</h1> // ck suggestion #5 dynamic collection name */}
        </div>
        <div className="PanelContainer">
          <div className="Nav-panel">
            <div>
              <button className="btn-NavButton" onClick={() => this.props.getNotes}>View All Notes</button>
              {/* <button className="btn-NavButton" onClick={() => { alert("hey david this button works!")}}>View Your Notes</button> */}
            </div>
            <div>
              <button className="btn-NavButton" onClick={() => this.props.showSelectedNote}>View Selected Note</button>
              {/* <button className="btn-NavButton" onClick={() => { alert("hey david")}}>View Your Notes</button> */}
            </div>
            <div>
              <button className="btn-NavButton" onClick={() => this.props.searchNotes}>Search Notes</button>
            </div>
            <div>
              <button className="btn-NavButton" onClick={() => this.props.createNote}>Create New Note</button>
            </div>
            
          
          </div>
          <div className="Notes-panel">
            <ul>
              {this.state.notes.map((note, _id) => {
                <li key={_id}>
                <div className="Note-title-row"><h3 className="Title">{note.title}</h3><h3 className="Price">Price: ${note.price}</h3><h3 className="Priority">Priority: {note.priority}</h3>
                </div>
                  {note.body}
                  <p></p>
                  <a href={note.urlAddress}>View product</a>  |
                  <a href={note.reviewURL}> Read reviews</a>  |
                  <a href={note.audioFileURL}>  Play audio</a>  |
                  <a href={note.gallery}>  Gallery</a>
                  <p></p>
                  <button className="btn-itemDelete" onClick={()=>this.deleteNoteHandler7(note)}>Delete Me</button>
                  {/* <Button className="btn-itemDelete" onClick={()=> this.props.removeNote(note._id)}>Delete-A</Button> */}
                  <h5>{note._id}</h5>
                </li>
                }
// ☞ 04a1312d-1275-4a50-8c41-bf1867af6999
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Notes;
