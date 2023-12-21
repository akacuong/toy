var express = require('express');
var router = express.Router();
var ProductModel = require('../models/ProductModel');
var CategoryModel = require('../models/CategoryModel');
var AccountModel = require('../models/AccountModel');
var jwt=require('jsonwebtoken');
/* GET home page. */
router.get('/', async (req, res) => {
  try {
    var categories = await CategoryModel.find({});
    var products = await ProductModel.find({}).populate('category');
    res.render('customer/index', { products,categories });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Internal Server Error');
  }
});
router.get("/admin", (req, res, next) => {
  try {
    const cookies = req.headers.cookie;
    if (cookies) {
      const cookieObj = cookies
        .split(";")
        .map(cookie => cookie.trim().split("="))
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
      const token = cookieObj.token;

      if (token) {
        // Verify the token
        jwt.verify(token, 'pw', (err, decoded) => {
          if (err) {
            console.error('Token verification error:', err);
            return res.json("You need to login");
          } else {
            // Token is valid, proceed to the next middleware
            next();
          }
        });
      } else {
        return res.json("You need to login");
      }
    } else {
      return res.redirect('/login');
    }
  } catch (error) {
    console.error('Error:', error);
    return res.redirect('/login');
  }
}, (req, res, next) => {
  return res.render('admin/index', { layout: 'layoutadmin'});
});
router.get('/login', function(req, res, next) {
  res.render('login/index',{ layout: false });
});
router.post('/login', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  AccountModel.findOne({ username: username, password: password })
  .then(data => {
    if (data) {
      var token = jwt.sign({ _id: data._id }, 'pw');
      res.cookie('token', token); // Set the token as a cookie with httpOnly flag
      return res.json({
        message: "Login successful",
        token: token
      });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  })
  .catch(err => {
    res.status(500).json("404 server error");
  });
});
module.exports = router;
