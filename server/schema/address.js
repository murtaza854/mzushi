const mongoose = require('mongoose')
    , Schema = mongoose.Schema;

const addressSchema = new mongoose.Schema({
    addressLine1: { type: String, required: true },
    addressLine2: { type: String, required: true },
    landmark: { type: String, required: true },
    area: { type: Schema.Types.ObjectId, ref: 'areas', required: true },
});

const Address = mongoose.model('addresses', addressSchema);

module.exports = Address;