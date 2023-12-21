var express = require('express');
var router = express.Router();
var ProductModel = require('../models/ProductModel');
var CategoryModel = require('../models/CategoryModel');
router.get('/', async (req, res) => {
  try {
    var products = await ProductModel.find({}).populate('category');
    res.render('products/index', { layout: 'layoutadmin', products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Internal Server Error');
  }
});
router.get('/add',async (req,res) => {
  var categories = await CategoryModel.find({});
  res.render('products/add', { layout: 'layoutadmin', categories });
})
router.post('/add',async(req,res)=>{
 var product=req.body;
  await ProductModel.create(product);
  res.redirect("/product");
});
router.get('/edit/:id', async (req, res) => {
  var id = req.params.id;
  var categories = await CategoryModel.find({});
  var product=await ProductModel.findById(id);
  res.render('products/edit', {layout: 'layoutadmin',categories,product });
})
router.post('/edit/:id', async (req, res) => {
  var id = req.params.id;
  var product = req.body;
  try {
     await ProductModel.findByIdAndUpdate(id, product);
     console.log('update succeed !');
  } catch (err) {
     console.log('update failed. Error: ' + err);
  }
  res.redirect('/product');
})
router.get('/delete/:id',async (req,res) => {
  var id=req.params.id;
  var product=await ProductModel.findById(id);
  await ProductModel.deleteOne(product);
  res.redirect("/product");
});
router.get('/deleteall', async (req, res) => {
  await ProductModel.deleteMany();
  console.log('Delete all category succeed !');
  res.redirect('/product');
})
router.get('/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await ProductModel.findById(productId).populate('category');
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.render('customer/detail', { product });
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).send('Internal Server Error');
  }
});
module.exports = router;
