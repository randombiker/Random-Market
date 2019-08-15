import React from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import Item from './Item.jsx';

class TakeMoney extends React.Component {
  onToken = async (token) => {
    const formData = new FormData();
    formData.append('item', JSON.stringify(this.props.item));
    const response = await fetch('/checkout', {
      method: 'POST',
      body: formData,
    });
    const body = await response.json();
    if (body.success) {
      this.props.handleCheckout(body.item);
    }
  };

  render() {
    return (
      <StripeCheckout
        name="Random Market"
        description="Thanks for shopping with us!"
        image="/images/mylogo.png"
        ComponentClass="div"
        panelLabel="Pay now"
        amount={this.props.item.price * 100}
        currency="USD"
        shippingAddress={false}
        billingAddress={false}
        zipCode={false}
        alipay={false}
        bitcoin={true}
        allowRememberMe
        token={this.onToken}
        opened={this.onOpened}
        closed={this.onClosed}
        reconfigureOnUpdate={false}
        stripeKey="pk_test_1i11Q1M0pvfAqP12iNAZab4r00PAIVKCjJ"
      >
        <button className="myPayButton">Buy now</button>
      </StripeCheckout>
    );
  }
}

function ItemDetails(props) {
  const { item, handleCheckout } = props;

  return item ? (
    <>
      <div>
        <Item
          id={item.id}
          category={item.category}
          price={item.price}
          imageLocation={item.image}
          showDetailsLink={false}
        />
      </div>
      <div
        className={`inventory ${item.inventory <= 0 ? 'inventory-sold' : ''}`}
      >
        Inventory: {item.inventory}{' '}
      </div>
      <div> {item.description}</div>
      <div>
        {' '}
        <TakeMoney item={item} handleCheckout={handleCheckout} />
      </div>
    </>
  ) : (
    <div>No item found</div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  handleCheckout: (item) => dispatch({ type: 'UPDATE_ITEM', item: item }),
});

export default connect(
  null,
  mapDispatchToProps
)(ItemDetails);
