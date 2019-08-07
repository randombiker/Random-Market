import React from 'react';
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

  render() {
    return (
      <StripeCheckout
        name="Random Market"
        description="Thanks for shopping with us!"
        image="/images/background1.jpg"
        ComponentClass="div"
        panelLabel="Pay now"
        // amount={item.cost}
        currency="USD"
        stripeKey="..."
        shippingAddress={true}
        billingAddress={true}
        zipCode={false}
        alipay={false}
        bitcoin={true}
        allowRememberMe
        token={this.onToken}
        opened={this.onOpened}
        closed={this.onClosed}
        reconfigureOnUpdate={false}
        token={this.onToken}
        stripeKey="pk_test_1i11Q1M0pvfAqP12iNAZab4r00PAIVKCjJ"
      >
        <button className="myPayButton">Buy now</button>
      </StripeCheckout>
    );
  }
}

function ItemDetails(props) {
  const { item } = props;

  return item ? (
    <>
      <div className="card center">
        <img src={item.imageLocation} />{' '}
      </div>
      <div className="inventory">Inventory: {item.inventory} </div>
      <div>Description: {item.description}</div>
      <div>
        {' '}
        <TakeMoney />
      </div>
    </>
  ) : (
    <div>No item found</div>
  );
}

export { ItemDetails, TakeMoney };
