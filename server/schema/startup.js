const mongoose = require('mongoose')
    , Schema = mongoose.Schema;

const startupSchema = new mongoose.Schema({
    startupName: { type: String },
    slug: { type: String },
    ownerFirstName: { type: String, required: true },
    ownerLastName: { type: String },
    email: { type: String, required: true },
    contactNumber: { type: String },
    // logo: { data: Buffer, contentType: String },
    logo: {
        fileName: { type: String },
        filePath: { type: String }
    },
    images: [
        {
            fileName: { type: String },
            filePath: { type: String }
        }
    ],
    productsServices: [
        {
            image: {
                fileName: { type: String },
                filePath: { type: String }
            },
            name: { type: String, required: true },
            price: { type: Number, required: true }
        }
    ],
    description: [{ type: String }],
    minPrice: { type: Number },
    maxPrice: { type: Number },
    active: { type: Boolean, required: true },
    premium: { type: Boolean, required: true, default: false },
    paymentHistory: [{ amount: { type: Number, required: true }, paymentDate: { type: Date, required: true }, amountPaid: { type: Boolean, required: true, default: false } }],
    totalRating: { type: Number, required: true, default: 0 },
    numberOfRatingsDone: { type: Number, required: true, default: 0 },
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
    serviceAreas: { type: String },
    serviceCities: [{ type: Schema.Types.ObjectId, ref: 'cities', required: true }],
    serviceProvinces: [{ type: Schema.Types.ObjectId, ref: 'provinces', required: true }],
    availableAds: { type: Number, required: true, default: 0 },
    uid: { type: String, required: true },
    accountSetup: { type: Boolean, required: true, default: false },
    mzushiChoice: { type: Boolean, default: false },
    features: [{ type: Schema.Types.ObjectId, ref: 'features', required: true }],
    provider : { type: String, required: true },
    facebookURL: { type: String },
    twitterURL: { type: String },
    instagramURL: { type: String },
    youtubeURL: { type: String },
    admin: { type: Boolean, required: true, default: false },
});

const Startup = mongoose.model('startups', startupSchema);

module.exports = Startup;