const mongoose = require('mongoose')
    , Schema = mongoose.Schema;

const adPackageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    lifetime: { type: Boolean, required: true },
    type: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'categories', required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
});

const AdPackage = mongoose.model('adPackages', adPackageSchema);

module.exports = AdPackage;