var express = require('express');
var router = express.Router();
var CategoryModel = require('../models/CategoryModel');
var ProductModel = require('../models/ProductModel');

/* GET home page. */
router.get('/', async (req, res) => {
    try {
      var categories = await CategoryModel.find({});
      res.render('categories/index', { layout: 'layoutadmin', categories });
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  router.get('/add', (req, res) => {
    res.render('categories/add',{layout: 'layoutadmin'});
 });
 router.post('/add', async (req, res) => {
  var category = req.body;
  await CategoryModel.create(category);
  res.redirect('/category');
})
router.get('/edit/:id', async (req, res) => {
  var id = req.params.id;
  var category = await CategoryModel.findById(id);
  res.render('categories/edit', {layout: 'layoutadmin',category });
})
router.post('/edit/:id', async (req, res) => {
  var id = req.params.id;
  var category = req.body;
  try {
     //SQL: UPDATE categorys SET A = B WHERE id = 'id'
     await CategoryModel.findByIdAndUpdate(id, category);
     console.log('update succeed !');
  } catch (err) {
     console.log('update failed. Error: ' + err);
  }
  res.redirect('/category');
})
router.get('/delete/:id', async (req, res) => {
  var id = req.params.id;
  var category = await CategoryModel.findById(id);
  await CategoryModel.deleteOne(category);
  res.redirect('/category');
})
router.get('/deleteall', async (req, res) => {
  await CategoryModel.deleteMany();
  console.log('Delete all category succeed !');
  res.redirect('/category');
})
module.exports = router;
