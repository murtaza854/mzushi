const mongoose = require('mongoose')
    , Schema = mongoose.Schema;

const productBrandSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    keywords:String,
    description:String,
    category: { type: Schema.Types.ObjectId, ref: 'categories', required: true },
});

const ProductBrand = mongoose.model('productBrands', productBrandSchema);

module.exports = ProductBrand;