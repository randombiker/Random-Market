import { connect } from 'react-redux';
import React, { Component } from 'react';

class UnconnectedSearchResults extends Component {
  render = () => {
    const hasQuery = this.props.query.length > 0;
    const resultData = hasQuery ? this.props.items : [];
    const results = resultData.filter((item) => {
      return (
        item.name.toLowerCase().includes(this.props.query.toLowerCase()) &&
        item.price >= this.props.minPrice &&
        item.price <= this.props.maxPrice
      );
    });
    return (
      <div className="wrapper">
        {results.map((r) => {
          return <div className="searchitem">{r.name}</div>;
        })}
      </div>
    );
  };
}
const mapStateToProps = (state) => {
  return {
    query: state.searchQuery,
    minPrice: state.min,
    maxPrice: state.max,
    items: state.items,
  };
};
const SearchResults = connect(mapStateToProps)(UnconnectedSearchResults);
export default SearchResults;
