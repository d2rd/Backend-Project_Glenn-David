import React, { Component } from 'react';
import './ElectricUprights.css';

class ElectricUprights extends Component {
  constructor() {
    super();
    this.state = {
      electricUprights: []
    }
  }

  componentDidMount() {
    fetch('/api/electricUprights')
      .then(res => res.json())
      .then(electricUprights => this.setState({electricUprights}, () => console.log('ElectricUprights fetched...', electricUprights)
        ))
        .catch(error => {
          console.error('Error fetching electricUprights:', error);
        })
  }
  render() {
    return (
      <div>
        <h2>ElectricUprights</h2>
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