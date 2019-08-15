import React, { Component } from 'react';
import { connect } from 'react-redux';

class ItemForm extends Component {
  constructor() {
    super();

    this.state = {
      image: null,
      category: '',
      description: '',
      price: '',
      inventory: '',
    };
  }
  handleAddItem = async () => {
    const formData = new FormData();

    formData.append('image', this.state.image);
    formData.append('category', this.state.category);
    formData.append('description', this.state.description);
    formData.append('price', this.state.price);
    formData.append('inventory', this.state.inventory);
    const response = await fetch('/newListing', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
    const responseBody = await response.json();

    this.props.dispatch({
      type: 'ADD_ITEM',
      item: responseBody.item,
    });

    debugger;
    this.props.history.replace('/');
  };

  handleCategoryChange = (evt) => {
    this.setState({ category: evt.target.value.toLowerCase() });
  };

  handleDescriptionChange = (evt) => {
    this.setState({ description: evt.target.value });
  };

  handlePriceChange = (evt) => {
    this.setState({ price: evt.target.value });
  };

  handleImageChange = (evt) => {
    this.setState({ image: evt.target.files[0] });
  };

  handleInventoryChange = (evt) => {
    this.setState({ inventory: evt.target.value });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();

    this.handleAddItem();
  };

  render() {
    return (
      <div className="sellForm">
        <form onSubmit={this.handleSubmit} className="inputs">
          <div>
            <label>
              <select
                className="select"
                type="select"
                onChange={this.handleCategoryChange}
                value={this.state.category}
                required
              >
                <option value="" disabled selected>
                  Select the category
                </option>
                <option value="car">Car</option>
                <option value="moto">Moto</option>
                <option value="house">House</option>
                <option value="electro">Electro</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              <input
                type="text"
                placeholder="Description"
                onChange={this.handleDescriptionChange}
                value={this.state.description}
              />
            </label>
          </div>
          <div>
            <label>
              <input
                type="text"
                placeholder="Price"
                onChange={this.handlePriceChange}
                value={this.state.price}
              />
            </label>
          </div>
          <div>
            <label>
              <div className="upload-btn-wrapper">
                <button className="myButton">Upload a file</button>
                <input
                  type="file"
                  name="myfile"
                  onChange={this.handleImageChange}
                />
              </div>
            </label>
          </div>
          <div>
            <label>
              <input
                type="text"
                placeholder="Inventory"
                onChange={this.handleInventoryChange}
                value={this.state.inventory}
              />
            </label>
          </div>
          <input className="myButton" type="submit" />
        </form>
      </div>
    );
  }
}

export default connect()(ItemForm);
