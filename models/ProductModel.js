var mongoose = require('mongoose');
var moment = require('moment-timezone');
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
  color:{
    type:String,
  },
  date: {
    type: Date,
    default: () => moment().tz('Asia/Ho_Chi_Minh').format(), // Use arrow function to execute it at runtime
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories'
  }
});
// Use a different name for the model
var ProductModel  = mongoose.model('products', ProductSchema);
module.exports = ProductModel;
