const mongoose = require('mongoose')
    , Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    startup: { type: Schema.Types.ObjectId, ref: 'startups', required: true },
    price: { type: Number, required: true },
    active: { type: Boolean, required: true },
    productBrand: { type: Schema.Types.ObjectId, ref: 'productBrands' },
    productSubCategory: { type: Schema.Types.ObjectId, ref: 'productSubCategories' },
    customCategory: { type: Schema.Types.ObjectId, ref: 'customCategories' },
});

const Product = mongoose.model('products', productSchema);

module.exports = Product;