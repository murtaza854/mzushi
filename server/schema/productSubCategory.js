const mongoose = require('mongoose')
    , Schema = mongoose.Schema;

const productSubCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    keywords:String,
    description:String,
    productCategory: { type: Schema.Types.ObjectId, ref: 'productCategories', required: true },
});

productSubCategorySchema.virtual('products', {
    ref: 'products',
    localField: '_id',
    foreignField: 'productSubCategory',
    justOne: false,
});

productSubCategorySchema.set('toObject', { virtuals: true });
productSubCategorySchema.set('toJSON', { virtuals: true });

const ProductSubCategory = mongoose.model('productSubCategories', productSubCategorySchema);

module.exports = ProductSubCategory;