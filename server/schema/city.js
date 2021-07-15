const mongoose = require('mongoose')
    , Schema = mongoose.Schema;

const citySchema = new mongoose.Schema({
    name: { type: String, required: true },
    province: { type: Schema.Types.ObjectId, ref: 'provinces', required: true },
});

const City = mongoose.model('cities', citySchema);

module.exports = City;