import React, { Component } from 'react';
import ItemForm from './ItemForm.jsx';

class Seller extends Component {
  render() {
    return (
      <div className="card center">
        <h1>Add item</h1>
        <ItemForm handleAddItem={this.handleAddItem} />
      </div>
    );
  }
}

export default Seller;
