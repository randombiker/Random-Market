import React, { Component } from 'react';
import { connect } from 'react-redux';

class Categories extends Component {
  handleCategory = (category) => {
    this.props.dispatch({
      type: 'SET_CATEGORY',
      category: category,
    });
  };
  render() {
    return (
      <>
        <div className="container2">
          <div className="categoriesTitle">Categories</div>
          <button
            className="category-btn"
            onClick={() => this.handleCategory('car')}
          >
            <img src="./auto.png" />
          </button>
          <div className="categories">Car</div>
          <button
            className="category-btn"
            onClick={() => this.handleCategory('moto')}
          >
            <img src="./moto.png" />
          </button>
          <div className="categories">Moto</div>
          <button
            className="category-btn"
            onClick={() => this.handleCategory('electro')}
          >
            <img src="./electro.png" />
          </button>
          <div className="categories">Electro</div>
          <button
            className="category-btn"
            onClick={() => this.handleCategory('house')}
          >
            <img src="./home.png" />
          </button>
          <div className="categories" id="categoriesSpecial">
            House
          </div>
          <button
            className="category-btn"
            onClick={() => this.handleCategory('other')}
          >
            <img src="./other.png" />
          </button>

          <div className="categories">Other</div>
        </div>
      </>
    );
  }
}

export default connect()(Categories);
