import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';

class TakeMoney extends React.Component {
  onToken = (token) => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then((response) => {
      response.json().then((data) => {
        alert(`We are in business, ${data.email}`);
      });
    });
  };

  // ...

  render() {
    return (
      // ...
      <StripeCheckout
        name="Random Market" // the pop-in header title
        description="Thanks for shopping with us!" // the pop-in header subtitle
        // image="none" // the pop-in header image (default none)
        ComponentClass="div"
        label="Buy the Thing" // text inside the Stripe button
        panelLabel="Pay now" // prepended to the amount in the bottom pay button
        // amount={} // cents
        currency="USD"
        stripeKey="..."
        // locale="zh"
        // email="info@vidhub.co"
        // Note: Enabling either address option will give the user the ability to
        // fill out both. Addresses are sent as a second parameter in the token callback.
        shippingAddress={true}
        billingAddress={true}
        // Note: enabling both zipCode checks and billing or shipping address will
        // cause zipCheck to be pulled from billing address (set to shipping if none provided).
        zipCode={false}
        alipay={false}
        bitcoin={true}
        allowRememberMe // "Remember Me" option (default true)
        token={this.onToken} // submit callback
        opened={this.onOpened} // called when the checkout popin is opened (no IE6/7)
        closed={this.onClosed} // called when the checkout popin is closed (no IE6/7)
        // Note: `reconfigureOnUpdate` should be set to true IFF, for some reason
        // you are using multiple stripe keys
        reconfigureOnUpdate={false}
        // Note: you can change the event to `onTouchTap`, `onClick`, `onTouchStart`
        // useful if you're using React-Tap-Event-Plugin
        // triggerEvent="onTouchTap"
        token={this.onToken}
        stripeKey="pk_test_1i11Q1M0pvfAqP12iNAZab4r00PAIVKCjJ"
      >
        <button className="myPayButton">Buy now</button>
      </StripeCheckout>
    );
  }
}

class Item extends Component {
  render() {
    return (
      <div className="card center ">
        <img height="130px" width="130px" src={this.props.imageLocation} />
        <div>
          <div>{this.props.name}</div>
          <div>$: {this.props.cost}</div>
          {/* <div className="linkstyle">
            <Link to={'/seller/' + this.props.sellerId}>Link to seller</Link>
          </div> */}
          <div className="linkstyle">
            <Link to={'/details/' + this.props.id}>Details</Link>
            <TakeMoney />
          </div>
        </div>
      </div>
    );
  }
}

export { Item, TakeMoney };
