const mongoose = require('mongoose')
    , Schema = mongoose.Schema;

const startupSchema = new mongoose.Schema({
    startupName: { type: String },
    ownerFirstName: { type: String, required: true },
    ownerLastName: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true },
    logo: { data: Buffer, contentType: String },
    description: { type: String },
    minPrice: { type: Number },
    maxPrice: { type: Number },
    active: { type: Boolean, required: true },
    premium: { type: Boolean, required: true },
    rating: { type: Number, required: true },
    website: { type: String },
    moneyClass: { type: String },
    activeDays: [
        { name: { type: String, required: true }, workingHourStart: { type: Date, required: true }, workingHourEnd: { type: Date, required: true } }
    ],
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    lastLogin: { type: Date, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'categories' },
    address: { type: Schema.Types.ObjectId, ref: 'addresses' },
    delivery: { type: Boolean },
    service: { type: Boolean },
    serviceAreas: [{ type: Schema.Types.ObjectId, ref: 'areas', required: true }],
    serviceCities: [{ type: Schema.Types.ObjectId, ref: 'cities', required: true }],
    serviceProvinces: [{ type: Schema.Types.ObjectId, ref: 'provinces', required: true }],
    availableAds: { type: Number, required: true, default: 0 },
    uid: { type: String, required: true },
    accountSetup: { type: Boolean, required: true, default: false },
    mzushiChoice: { type: Boolean, default: false },
    features: [{ type: Schema.Types.ObjectId, ref: 'features', required: true }],
});

const Startup = mongoose.model('startups', startupSchema);

module.exports = Startup;