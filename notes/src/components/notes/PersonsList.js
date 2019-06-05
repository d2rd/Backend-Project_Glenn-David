import React from 'react';
import axios from 'axios';

export default class NotesList extends React.Component {
  state = {
    persons: [],
  };

  componenteDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then(res => {
      console.log(res);
      this.setState({ persons: res.data });
    });
  }

  render() {
    return <ul>{this.state.persons.map(persons =>
                <li key={_id}>{person.name}</li>)}
            </ul>
  }
}