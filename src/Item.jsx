import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Item extends Component {
  render() {
    return (
      <div className="card center ">
        <img height="130px" width="130px" src={this.props.imageLocation} />
        <div>
          <div>{this.props.description}</div>
          <div>$: {this.props.cost}</div>
          {/* <div className="linkstyle">
            <Link to={'/seller/' + this.props.sellerId}>Link to seller</Link>
          </div> */}
          <div className="linkstyle">
            <Link to={'/details/' + this.props.id}>Add to cart</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Item;
