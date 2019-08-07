const express = require('express');
const multer = require('multer');
const upload = multer({
  dest: __dirname + '/build/images',
});
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const reloadMagic = require('./reload-magic.js');
const passwords = {};
const sessions = {};
const data = require('./data.js');
const items = data.items;
reloadMagic(app);

app.use('/', express.static('build'));
app.use('/', express.static('public'));
app.use('/images', express.static(__dirname + '/build/images'));

class Item {
  constructor(name, sellerId, description, img, price, inventory) {
    this.id = `${Math.floor(Math.random() * 1000000)}`;
    this.name = name;
    this.sellerId = sellerId;
    this.description = description;
    this.image = img;
    this.price = price;
    this.inventory = inventory;
  }
}

app.get('/session', (req, res) => {
  const sessionId = req.cookies.sid;
  if (sessions[sessionId]) {
    const username = sessions[sessionId];
    return res.send(JSON.stringify({ success: true, username }));
  }
  res.send(JSON.stringify({ success: false }));
});

app.post('/logout', (req, res) => {
  const sessionId = req.cookies.sid;
  delete sessions[sessionId];
  res.send(JSON.stringify({ success: true }));
});
app.get('/items', (req, res) => {
  return res.send(JSON.stringify({ success: true, items: items }));
});

app.post('/login', upload.none(), (req, res) => {
  console.log("**** I'm in the login endpoint");
  console.log('this is the parsed body', req.body);
  const username = req.body.username;
  const enteredPassword = req.body.password;
  const expectedPassword = passwords[username];
  console.log('expected password', expectedPassword);
  if (enteredPassword === expectedPassword) {
    console.log('password matches');
    const sessionId = generateId();
    console.log('generated id', sessionId);
    sessions[sessionId] = username;
    res.cookie('sid', sessionId);
    res.send(JSON.stringify({ success: true }));
    return;
  }
  res.send(JSON.stringify({ success: false }));
});

const generateId = () => {
  return '' + Math.floor(Math.random() * 100000000);
};

app.post('/signup', upload.none(), (req, res) => {
  const username = req.body.username;
  const enteredPassword = req.body.password;
  if (passwords[username] || !username || !enteredPassword) {
    return res.send({
      success: false,
      message: passwords[username] ? 'Username taken' : 'Invalid input',
    });
  }
  passwords[username] = enteredPassword;

  console.log('passwords object', passwords);
  const sessionId = generateId();
  console.log('generated id', sessionId);
  sessions[sessionId] = username;
  res.cookie('sid', sessionId);
  res.send(JSON.stringify({ success: true }));
});

// i'm sending from the front end the name, sellerid, description and image of a new item to sell,
// then I push them in an empty object that I will add to the items from "data" using concat

app.post('/newListing', upload.single('image'), (req, res) => {
  console.log('body', req.body);
  const sessionId = req.cookies.sid;
  const username = sessions[sessionId];
  const description = req.body.description;
  const name = req.body.name;
  const price = Number(req.body.price);
  const inventory = Number(req.body.inventory);
  const imgPath = req.file ? `/images/${req.file.filename}` : '';
  const newItemToSell = new Item(
    name,
    username,
    description,
    imgPath,
    price,
    inventory
  );

  items.push(newItemToSell);

  res.send(JSON.stringify({ success: true, item: newItemToSell }));
});

app.all('/*', (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + '/build/index.html');
});

app.listen(4000, '0.0.0.0', () => {
  console.log('Server running on port 4000');
});
