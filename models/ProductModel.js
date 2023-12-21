var mongoose = require('mongoose');
var ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories'
  }
});
// Use a different name for the model
var ProductModel  = mongoose.model('products', ProductSchema);
module.exports = ProductModel;
