const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    featured: { type: Boolean, required: true},
    image: { data: Buffer, contentType: String},
    keywords: String,
    description: String,
});

categorySchema.virtual('productBrands', {
    ref: 'productBrands',
    localField: '_id',
    foreignField: 'category',
    justOne: false,
});
categorySchema.virtual('productCategories', {
    ref: 'productCategories',
    localField: '_id',
    foreignField: 'category',
    justOne: false,
});
categorySchema.virtual('adPackages', {
    ref: 'adPackages',
    localField: '_id',
    foreignField: 'category',
    justOne: false,
});

categorySchema.set('toObject', { virtuals: true });
categorySchema.set('toJSON', { virtuals: true });

const Category = mongoose.model('categories', categorySchema);

module.exports = Category;