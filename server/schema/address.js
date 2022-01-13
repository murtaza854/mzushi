const mongoose = require('mongoose')
    , Schema = mongoose.Schema;

const addressSchema = new mongoose.Schema({
    area: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    landmark: { type: String },
    city: { type: Schema.Types.ObjectId, ref: 'cities', required: true },
});

addressSchema.virtual('startups', {
    ref: 'startups',
    localField: '_id',
    foreignField: 'address',
    justOne: false,
});

addressSchema.set('toObject', { virtuals: true });
addressSchema.set('toJSON', { virtuals: true });

const Address = mongoose.model('addresses', addressSchema);

module.exports = Address;