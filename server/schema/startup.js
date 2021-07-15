const mongoose = require('mongoose')
    , Schema = mongoose.Schema;

const startupSchema = new mongoose.Schema({
    startupName: { type: String, required: true },
    ownerFirstName: { type: String, required: true },
    ownerLastName: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true },
    logo: { type: String, required: true },
    description: { type: String, required: true },
    minPrice: { type: Number, required: true },
    maxPrice: { type: Number, required: true },
    active: { type: Boolean, required: true },
    premium: { type: Boolean, required: true },
    rating: { type: Number, required: true },
    website: { type: String, required: true },
    activeDays: [
        { name: { type: String, required: true }, workingHourStart: { type: Date, required: true }, workingHourEnd: { type: Date, required: true } }
    ],
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    lastLogin: { type: Date, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'categories', required: true },
    addresses: [{ type: Schema.Types.ObjectId, ref: 'addresses', required: true }],
    serviceAreas: [{ type: Schema.Types.ObjectId, ref: 'areas', required: true }],
    serviceCities: [{ type: Schema.Types.ObjectId, ref: 'cities', required: true }],
    serviceProvinces: [{ type: Schema.Types.ObjectId, ref: 'provinces', required: true }],
    adPackages: [{ type: Schema.Types.ObjectId, ref: 'adPackages', required: true }],
});

const Startup = mongoose.model('startups', startupSchema);

module.exports = Startup;