const mongoose = require('mongoose')
    , Schema = mongoose.Schema;

const aboutDescriptionSchema = new mongoose.Schema({
    description: { type: String, required: true },
    aboutHeading: { type: Schema.Types.ObjectId, ref: 'aboutHeadings', required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
});

const AboutDescription = mongoose.model('aboutDescriptions', aboutDescriptionSchema);

module.exports = AboutDescription;