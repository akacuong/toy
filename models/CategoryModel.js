var mongoose = require('mongoose');
var CategorySchema = mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, 'Category name is required'],
         minlength: [3, 'Category name must be at least 3 characters'],
         maxlength: 20
      },
   });
var CategoryModel = mongoose.model('categories', CategorySchema);
module.exports = CategoryModel;