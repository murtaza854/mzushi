const mongoose = require('mongoose')
    , Schema = mongoose.Schema;

const aboutHeadingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    type: { type: String, required: true },
    startup: { type: Schema.Types.ObjectId, ref: 'startups', required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
});

const AboutHeading = mongoose.model('aboutHeadings', aboutHeadingSchema);

module.exports = AboutHeading;