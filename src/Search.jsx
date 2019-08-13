import { connect } from 'react-redux';
import React, { Component } from 'react';

class UnconnectedSearch extends Component {
  componentDidMount() {}

  handleQuery = (evt) => {
    this.props.dispatch({ type: 'QUERY', q: evt.target.value });
  };
  handleMinimumPrice = (evt) => {
    const price = evt.target.value;
    this.props.dispatch({ type: 'MINIMUM-PRICE', price: price });
  };
  handleMaximumPrice = (evt) => {
    const price = evt.target.value;
    this.props.dispatch({ type: 'MAXIMUM-PRICE', price: price });
  };

  handleClear = () => {
    this.props.dispatch({ type: 'CLEAR' });
  };
  handleAdvancedSearch = () => {
    this.props.dispatch({ type: 'ADVANCED-SEARCH' });
  };
  render() {
    return (
      <>
        <div>
          <label>
            <input
              className="textarea"
              type="text"
              onChange={this.handleQuery}
              value={this.props.query}
            />
          </label>
        </div>
        <div className="searchArea">
          <button className="myButton" onClick={this.handleAdvancedSearch}>
            Advanced search
          </button>

          {this.props.advancedSearch && (
            <>
              <label className="myButton">
                Minimum price
                <input
                  type="text"
                  onChange={this.handleMinimumPrice}
                  value={this.props.minPrice}
                />
              </label>

              <label className="myButton">
                Maximum price
                <input
                  type="text"
                  onChange={this.handleMaximumPrice}
                  value={this.props.maxPrice}
                />
              </label>
            </>
          )}

          <button className="myButton" onClick={this.handleClear}>
            Clear
          </button>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    query: state.searchQuery,
    minPrice: state.minPrice,
    maxPrice: state.maxPrice,
    advancedSearch: state.advancedSearch,
  };
};
let Search = connect(mapStateToProps)(UnconnectedSearch);
export default Search;
