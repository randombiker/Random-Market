import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Navbar from './Navbar.jsx';
import Item from './Item.jsx';
import ItemDetails from './ItemDetails.jsx';
import ItemForm from './ItemForm.jsx';
import Footer from './Footer.jsx';
import Categories from './Categories.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  async componentDidMount() {
    const sessionResponse = await fetch('/session');
    const body = await sessionResponse.json();

    if (body.success) {
      this.props.dispatch({ type: 'LOGIN_SUCCESS', username: body.username });
    }

    const itemsResponse = await fetch('/items');
    const itemsBody = await itemsResponse.json();
    this.setState({ isLoading: false });
    if (itemsBody.success) {
      this.props.dispatch({ type: 'SET_ITEMS', items: itemsBody.items });
    }
  }

  renderHome = (routerData) => {
    const category = routerData.match.params.category;
    const filteredItems = this.props.items.filter((item) => {
      return (
        item.description
          .toLowerCase()
          .includes(this.props.query.toLowerCase()) &&
        item.price >= Number(this.props.minPrice) &&
        (this.props.maxPrice === '' ||
          item.price <= Number(this.props.maxPrice)) &&
        (!category || item.category === category)
      );
    });
    return (
      <div className="parentContainer">
        <Categories />
        <div className="container1">
          {filteredItems.map((item) => (
            <Item
              category={item.category}
              price={item.price}
              sellerId={item.sellerId}
              imageLocation={item.image}
              description={item.description}
              id={item.id}
              inventory={item.inventory}
              showDetailsLink={true}
            />
          ))}
        </div>
      </div>
    );
  };

  renderSellPage = (routerData) => {
    return <ItemForm history={routerData.history} />;
  };

  renderItemDetails = (routerData) => {
    const itemId = routerData.match.params.itemId;
    const item = this.props.items.find((item) => item.id === itemId);
    return (
      <div className="sellForm">
        <ItemDetails item={item} />
      </div>
    );
  };

  render() {
    if (this.state.isLoading) {
      return 'loading...';
    }

    return (
      <BrowserRouter>
        <Navbar />
        <div>
          {this.props.lgin ? (
            <>
              <Route exact={true} path="/" render={this.renderHome} />
              <Route
                exact={true}
                path="/newListing"
                render={this.renderSellPage}
              />
              <Route
                exact={true}
                path="/details/:itemId"
                render={this.renderItemDetails}
              />
              <Route
                exact={true}
                path="/categories/:category"
                render={this.renderHome}
              />
            </>
          ) : (
            <>
              <Signup />
              <Login />
            </>
          )}
        </div>
        <Footer />
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lgin: state.loggedIn,
    query: state.searchQuery,
    items: state.items,
    minPrice: state.minPrice,
    maxPrice: state.maxPrice,
  };
};
export default connect(mapStateToProps)(App);
