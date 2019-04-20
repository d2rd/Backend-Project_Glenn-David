import React, { Component } from 'react';
import './ElectricUprights.css';
const url = 'http://localhost:5501/d2rd-notes'
class ElectricUprights extends Component {
  constructor() {
    super();
    this.state = {
      electricUprights: []
    }
  }

  componentDidMount() {
    fetch(url) // Call the fetch function passing the url of the API as a parameter
      .then(res => res.json())
      .then(electricUprights => this.setState({electricUprights,data}, () => console.log('ElectricUprights fetched...', electricUprights)
        )) // ck suggestion #3
        .catch(error => {
          console.error('Error fetching electricUprights:', error);
        })
  }
  render() {
    return (
      <div>
        <h2>Electric Upright Basses</h2>
        <ul>
          {this.state.electricUprights.map(electricUpright =>
            <li key={electricUpright.id}>{ electricUpright.title } { electricUpright.priority } { electricUpright.price } { electricUpright.body } { electricUpright.itemURL } { electricUpright.reviewURL } { electricUpright.articles }</li>  
          )}
        </ul>
      </div>
    );
  }
}

export default ElectricUprights;