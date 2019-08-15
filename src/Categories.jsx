import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Categories extends Component {
  render() {
    return (
      <>
        <div className="container2">
          <div className="categoriesTitle">Categories</div>
          <Link className="category-btn" to="/categories/car">
            <img src="/auto.png" />
          </Link>
          <div className="categories">Car</div>
          <Link className="category-btn" to="/categories/moto">
            <img src="/moto.png" />
          </Link>
          <div className="categories">Moto</div>
          <Link className="category-btn" to="/categories/electro">
            <img src="/electro.png" />
          </Link>
          <div className="categories">Electro</div>
          <Link className="category-btn" to="/categories/house">
            <img src="/home.png" />
          </Link>
          <div className="categories" id="categoriesSpecial">
            House
          </div>
          <Link className="category-btn" to="/categories/other">
            <img src="/other.png" />
          </Link>

          <div className="categories">Other</div>
        </div>
      </>
    );
  }
}

export default Categories;
