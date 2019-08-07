import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Item extends Component {
  render() {
    return (
      <div className="card center ">
        <img height="120px" width="155px" src={this.props.imageLocation} />
        <div>
          <div>{this.props.name}</div>
          <div>$: {this.props.cost}</div>
          <div className="linkstyle">
            <Link to={'/details/' + this.props.id}>Details</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Item;
