const items = [
  {
    description: 'a beautifull Boat capable of floating. on the water, yes',
    price: 10000,
    image: '/boat.png',
    id: 'asewq',
    inventory: 10,
    sellerId: 'ewio',
    name: 'boat',
  },
  {
    id: 'wqwasq',
    description: 'Lawn chairs',
    price: 50,
    image: '/lawnchair.jpg',
    inventory: 5,
    sellerId: 'xcvb',
    name: 'chair',
  },
  {
    id: 'sdfghj',
    description: 'Shoe',
    price: 30,
    image: '/shoe.jpeg',
    inventory: 3,
    sellerId: 'xcvb',
    name: 'shoe',
  },
  {
    id: 'cvbn',
    description: 'Hat',
    price: 10,
    image: '/hat.jpeg',
    inventory: 90,
    sellerId: 'xcvb',
    name: 'hat',
  },
  {
    id: 'poikm',
    description: 'Coat',
    price: 700,
    image: '/coat.jpeg',
    inventory: 0,
    sellerId: 'zzzzz',
    name: 'coat',
  },
];

const sellers = [
  {
    id: 'ewio',
    name: 'ABC',
    rating: '5 stars',
  },
  {
    id: 'xcvb',
    name: 'DEF',
    rating: '2 stars',
  },
  {
    id: 'zzzzz',
    name: 'GHI',
    rating: '4 stars',
  },
];

module.exports = { items, sellers };
