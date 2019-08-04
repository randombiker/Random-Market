// import React, { Component } from 'react';
// import { connect } from 'react-redux';

// class SellerPage extends Component {
//   // handleAddItem = async (item) => {
//   //   const formData = new FormData();
//   //   formData.append('item', item);
//   //   fetch('/sell', { method: 'POST', body: formData, credentials: 'include' });
//   //   let responseBody = await response.text();

//   //   let body = JSON.parse(responseBody);

//   //   this.props.dispatch({
//   //     type: 'SET_ITEMS',
//   //     items: this.state.items,
//   //   });
//   // };
//   render() {
//     const sellerId = this.props.sid;
//     const seller = initialSellers.find((seller) => {
//       return seller.id === sellerId;
//     });
//     const sellerItems = this.props.items.filter(
//       (item) => item.sellerId === seller.id
//     );
//     return (
//       <Seller
//         seller={seller}
//         items={sellerItems}
//         handleAddItem={handleAddItem}
//       />
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   items: state.items,
// });

// export default connect(mapStateToProps)(SellerPage);
