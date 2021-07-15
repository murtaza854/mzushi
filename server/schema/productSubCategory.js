const mongoose = require('mongoose')
    , Schema = mongoose.Schema;

const productSubCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    keywords:String,
    description:String,
    productCategory: { type: Schema.Types.ObjectId, ref: 'productCategories', required: true },
});

const ProductSubCategory = mongoose.model('productSubCategories', productSubCategorySchema);

module.exports = ProductSubCategory;