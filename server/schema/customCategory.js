const mongoose = require('mongoose');

const customCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description:String,
});

const CustomCategory = mongoose.model('customCategories', customCategorySchema);

module.exports = CustomCategory;