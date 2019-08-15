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
  constructor(category, sellerId, description, img, price, inventory, id) {
    this.category = category;
    this.sellerId = sellerId;
    this.description = description;
    this.image = img;
    this.price = price;
    this.inventory = inventory;
    this.id = id;
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

app.post('/checkout', upload.none(), (req, res) => {
  const item = JSON.parse(req.body.item);
  const itemBought = items.find((currentItem) => currentItem.id === item.id);
  if (itemBought) {
    itemBought.inventory -= 1;
  }

  res.send(JSON.stringify({ success: true, item: itemBought }));
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
  const username = req.body.username;
  const enteredPassword = req.body.password;
  const expectedPassword = passwords[username];
  if (enteredPassword === expectedPassword) {
    const sessionId = generateId();
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
  const sessionId = generateId();
  sessions[sessionId] = username;
  res.cookie('sid', sessionId);
  res.send(JSON.stringify({ success: true }));
});

app.post('/newListing', upload.single('image'), (req, res) => {
  const id = generateId();
  const sessionId = req.cookies.sid;
  const username = sessions[sessionId];
  const description = req.body.description;
  const category = req.body.category;
  const price = Number(req.body.price);
  const inventory = Number(req.body.inventory);
  const imgPath = req.file ? `/images/${req.file.filename}` : '';
  const newItemToSell = new Item(
    category,
    username,
    description,
    imgPath,
    price,
    inventory,
    id
  );

  items.push(newItemToSell);

  res.send(JSON.stringify({ success: true, item: newItemToSell }));
});

app.all('/*', (req, res, next) => {
  res.sendFile(__dirname + '/build/index.html');
});

app.listen(4000, '0.0.0.0', () => {
  console.log('Server running on port 4000');
});
