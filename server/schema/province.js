const mongoose = require('mongoose')
    , Schema = mongoose.Schema;

const provinceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    country: { type: Schema.Types.ObjectId, ref: 'countries', required: true },
});

const Province = mongoose.model('provinces', provinceSchema);

module.exports = Province;