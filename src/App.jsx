import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Navbar from './Navbar.jsx';
import Item from './Item.jsx';
import { ItemDetails } from './ItemDetails.jsx';
import ItemForm from './ItemForm.jsx';
import Footer from './Footer.jsx';

const renderHome = (items, query) => {
  const filteredItems = items.filter((item) => {
    return item.name.toLowerCase().includes(query.toLowerCase());
  });
  return (
    <div className="container1">
      {filteredItems.map((item) => (
        <Item
          name={item.name}
          cost={item.price}
          sellerId={item.sellerId}
          imageLocation={item.image}
          description={item.description}
          id={item.id}
          inventory={item.inventory}
        />
      ))}
    </div>
  );
};

const renderItemDetails = (routerData, items) => {
  const itemId = routerData.match.params.itemId;
  const item = items.find((item) => item.id === itemId);
  return (
    <div className="sellForm">
      <ItemDetails item={item} />
    </div>
  );
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
  renderSellPage = (routerData) => {
    return <ItemForm history={routerData.history} />;
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
  return { lgin: state.loggedIn, query: state.searchQuery, items: state.items };
};
export default connect(mapStateToProps)(App);
