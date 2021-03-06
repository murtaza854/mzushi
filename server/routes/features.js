const router = require('express').Router();
const slugify = require('slugify');
const Feature = require('../schema').feature;

router.get('/getAllFeatures', async (req, res) => {
    const features = await Feature.find({});
    if (!features) res.json({ data: [] });
    else res.json({ data: features });
});

router.get('/get-features', async (req, res) => {
    const features = await Feature.find({}, { _id: 0 });
    if (!features) res.json({ data: [] });
    else res.json({ data: features });
});

router.post('/getById', async (req, res) => {
    try {
        const feature = await Feature.findOne({ _id: req.body.id });
        res.json({ data: feature });
    } catch (error) {
        res.json({ data: null, error: error });
    }
});

router.post('/add', async (req, res) => {
    const data = req.body;
    const newFeature = new Feature({
        name: data.name,
        slug: slugify(data.name, { lower: true }),
        active: data.active
    });
    newFeature.save();
    res.json({ data: 'success' });
});

router.post('/update', async (req, res) => {
    const data = req.body;
    const feature = await Feature.findOne({ _id: data.id });
    feature.name = data.name;
    feature.slug = slugify(data.name, { lower: true });
    feature.active = data.active;
    feature.save();
    res.json({ data: 'success' });
});

router.get('/get-by-ids', async (req, res) => {
    let id = '';
    if ('id' in req.query) id = req.query.id;
    const getIds = id.split(',');
    const features = await Feature.find({ _id: getIds });
    if (!features) res.json({ data: [] });
    else res.json({ data: features });
});

router.post('/delete', async (req, res) => {
    try {
        await Feature.deleteMany({ _id: req.body.ids });
        res.json({ data: 'success' });
    } catch (error) {
        ;
        res.json({ data: 'failed' });
    }
});

module.exports = router;