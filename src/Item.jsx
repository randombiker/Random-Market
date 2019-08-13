import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Item extends Component {
  render() {
    let details = <Link to={'/details/' + this.props.id}>Details &rArr;</Link>;
    return (
      <div className="card center ">
        <img height="120px" width="155px" src={this.props.imageLocation} />
        <div>
          <div>{this.props.category}</div>
          <div>$: {this.props.price}</div>
          {this.props.showDetailsLink && (
            <div className="linkstyle">{details}</div>
          )}
        </div>
      </div>
    );
  }
}

export default Item;
