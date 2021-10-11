const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
    name: { type: String, required: true },
});

const Feature = mongoose.model('features', featureSchema);

module.exports = Feature;