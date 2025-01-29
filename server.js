const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/productdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

app.get('/products', async (req, res) => {
    try {
      const products = await Product.find({
        category: 'Electronics',
        price: { $gt: 500 }  
      }).sort({ price: -1 });

      res.json(products); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});