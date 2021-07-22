const mongoose = require('mongoose')
    , Schema = mongoose.Schema;

const adPackageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    amountOfAds: { type: Number, required: true },
    type: { type: String, required: true },
    active: { type: Boolean, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'categories', required: true },
});

const AdPackage = mongoose.model('adPackages', adPackageSchema);

module.exports = AdPackage;