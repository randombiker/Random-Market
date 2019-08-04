import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ItemForm from './ItemForm.jsx';

class Seller extends Component {
  render() {
    return (
      <div className="card center">
        {/* <div>{this.props.username}</div>
        <ul>
          {this.props.items.map((item) => (
            <li>
              <Link to={`/details/${item.id}`}>{item.description}</Link>
            </li>
          ))}
        </ul> */}
        <h1>Add item</h1>
        <ItemForm
          // sellerId={this.props.sellerId}
          handleAddItem={this.handleAddItem}
        />
      </div>
    );
  }
}

export default Seller;
