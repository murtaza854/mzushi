const mongoose = require('mongoose')
    , Schema = mongoose.Schema;

const productCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    keywords:String,
    description:String,
    category: { type: Schema.Types.ObjectId, ref: 'categories', required: true },
});

const ProductCategory = mongoose.model('productCategories', productCategorySchema);

module.exports = ProductCategory;