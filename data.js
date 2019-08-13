let randomId = () => {
  return Math.floor(Math.random() * 100000000);
};

const items = [
  {
    description: 'A beautifull car. Brings you from point A to point B',
    price: 110000,
    image: '/car.png',
    id: randomId(),
    inventory: 2,
    sellerId: 'ewio',
    category: 'car',
  },
  {
    id: randomId(),
    description: 'Another car. If you need more than one',
    price: 5760,
    image: '/car1.png',
    inventory: 1,
    sellerId: 'xceevb',
    category: 'car',
  },
  {
    id: randomId(),
    description:
      'Shiny new car. Will feed the competition anxiety of your neighbours',
    price: 13099,
    image: '/car2.png',
    inventory: 1,
    sellerId: 'xcvb',
    category: 'car',
  },
  {
    id: randomId(),
    description:
      'We will never get enough of cars. Get yours at an absolutely unreasonable price',
    price: 230299,
    image: '/car3.png',
    inventory: 1,
    sellerId: 'xcveb',
    category: 'car',
  },
  {
    id: randomId(),
    description:
      'A perfectly functional, noisy motorcycle. Drivers will hate you',
    price: 10144,
    image: '/motorcycle.png',
    inventory: 2,
    sellerId: 'xcvdb',
    category: 'moto',
  },
  {
    id: randomId(),
    description:
      'A brand new motorcycle with outstanding technical specifications, I suppose',
    price: 5700,
    image: '/motorcycle1.png',
    inventory: 1,
    sellerId: 'zzzzz',
    category: 'moto',
  },
  {
    id: randomId(),
    description:
      'A never used 10 year old motorcycle. I guess I do not need it anymore',
    price: 8700,
    image: '/motorcycle2.png',
    inventory: 1,
    sellerId: 'zzzzz',
    category: 'moto',
  },
  {
    id: randomId(),
    description:
      'A very expensive house. You probably will not afford it, but hey, browsing is free',
    price: 811700,
    image: '/house.png',
    inventory: 1,
    sellerId: 'zzzzz',
    category: 'house',
  },
  {
    id: randomId(),
    description: 'Your dream house. ',
    price: 456300,
    image: '/house1.png',
    inventory: 1,
    sellerId: 'zzzzz',
    category: 'house',
  },
  {
    id: randomId(),
    description: 'House for sale. Reason: runing from winter',
    price: 344321,
    image: '/house2.png',
    inventory: 1,
    sellerId: 'zzzzz',
    category: 'house',
  },
  {
    id: randomId(),
    description: 'Another house for sale',
    price: 873567,
    image: '/house3.png',
    inventory: 1,
    sellerId: 'zzzzz',
    category: 'house',
  },
  {
    id: randomId(),
    description: 'A big, expensive and useless TV set',
    price: 999,
    image: '/tv.png',
    inventory: 1,
    sellerId: 'zzzzz',
    category: 'electro',
  },
  {
    id: randomId(),
    description: "TV set, if it's not obvious from the photo",
    price: 677,
    image: '/tv1.png',
    inventory: 1,
    sellerId: 'zzzzz',
    category: 'electro',
  },
];

module.exports = { items };
