const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Addcart', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a schema for the product
const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
});

// Create a model for the Product collection
const Product = mongoose.model('Product', productSchema);

// API endpoint to add a product to the cart
app.post('/addToCart', async (req, res) => {
  const { title, price } = req.body;

  try {
    // Save the product to MongoDB
    const newProduct = new Product({ title, price });
    const result = await newProduct.save();
    console.log(`Product added to the cart and saved to MongoDB with ObjectId: ${result._id}`);
    res.send('Product added to the cart and saved to MongoDB.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding product to the cart and saving to MongoDB.');
  }
});

// API endpoint to get the cart from MongoDB
app.get('/getCart', async (req, res) => {
  try {
    // Retrieve products from MongoDB
    const items = await Product.find();
    const total = items.reduce((acc, item) => acc + item.price, 0);

    res.json({ items, total });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving cart from MongoDB.');
  }
});

// // Serve static files (e.g., HTML, CSS, JS)
// app.use(express.static('public'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Connected to database');
});
