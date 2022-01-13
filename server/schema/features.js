const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    active: { type: Boolean, required: true },
});

const Feature = mongoose.model('features', featureSchema);

module.exports = Feature;