import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Navbar from './Navbar.jsx';

import Item from './Item.jsx';
import ItemDetails from './ItemDetails.jsx';
import ItemForm from './ItemForm.jsx';

const renderHome = (items, query) => {
  const filteredItems = items.filter((item) => {
    return item.name.toLowerCase().includes(query.toLowerCase());
  });
  return (
    <div className="container1">
      {filteredItems.map((item) => (
        <Item
          cost={item.price}
          sellerId={item.sellerId}
          imageLocation={item.image}
          description={item.description}
          id={item.id}
        />
      ))}
    </div>
  );
};

const renderItemDetails = (routerData, items) => {
  const itemId = routerData.match.params.itemId;
  const item = items.find((item) => item.id === itemId);
  return <ItemDetails item={item} />;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  renderHome = () => {
    return renderHome(this.props.items, this.props.query);
  };
  renderSellPage = () => {
    return <ItemForm />;
  };
  renderItemDetails = (routerData) => {
    return renderItemDetails(routerData, this.props.items);
  };

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

  render() {
    if (this.state.isLoading) {
      return 'loading...';
    }

    if (this.props.lgin) {
      return (
        <BrowserRouter>
          <Navbar />

          {/* <SearchResults /> */}

          <div>
            <Route exact={true} path="/" render={this.renderHome} />
            <Route exact={true} path="/sell" component={this.renderSellPage} />
            <Route
              exact={true}
              path="/details/:itemId"
              render={this.renderItemDetails}
            />
          </div>
          {/* 
            <Route
              exact={true}
              path="/reviewer/:reviewerId"
              render={renderReviewer}
            /> */}
        </BrowserRouter>
      );
    }
    return (
      <div>
        <Navbar />
        <h2 className="signupLogin ">
          <div className="Login" />
        </h2>
        <Signup />
        <h2 className="signupLogin">
          <div className="Login" />
        </h2>
        <Login />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { lgin: state.loggedIn, query: state.searchQuery, items: state.items };
};
export default connect(mapStateToProps)(App);
