const router = require('express').Router();
const Province = require('../schema').province;
const City = require('../schema').city;
const Area = require('../schema').area;

router.get('/get-provinces-search', async (req, res) => {
    const { provinceText } = req.query;
    const provinces = await Province.find({ name: { "$regex": provinceText, "$options": "i" } });
    res.json({ data: provinces });
});

router.get('/table-data', async (req, res) => {
    const provinces = await Province.find({}).populate('country');
    if (!provinces) res.json({ data: [] });
    else res.json({ data: provinces });
});

router.get('/get-provinces', async (req, res) => {
    const provinces = await Province.find({}, { _id: 0 });
    if (!provinces) res.json({ data: [] });
    else res.json({ data: provinces });
});

router.post('/add', async (req, res) => {
    const data = req.body;
    const newProvince = new Province({
        name: data.name,
        country: data.country,
    });
    newProvince.save();
    res.json({ data: 'success' });
});

router.post('/update', async (req, res) => {
    const data = req.body;
    const province = await Province.findOne({ _id: data._id });
    province.name = data.name;
    province.country = data.country;
    province.save();
    res.json({ data: 'success' });
});

router.get('/get-by-ids', async (req, res) => {
    let id = '';
    if ('id' in req.query) id = req.query.id;
    const getIds = id.split(',');
    const provinces = await Province.find({ _id: getIds }).populate({
        path: 'cities',
        populate: {
            path: 'areas'
        }
    });
    if (!provinces) res.json({ data: [] });
    else res.json({ data: provinces });
});

router.post('/delete', async (req, res) => {
    try {
        const data = req.body.data;
        data.forEach(async province => {
            province.cities.forEach(async city => {
                await Area.deleteMany({ city: city._id });
            });
            await City.deleteMany({ province: province._id });
        });
        await Province.deleteMany({ _id: req.body.ids });
        res.json({ data: 'success' });
    } catch (error) {
        console.log(error);
        res.json({ data: 'failed' });
    }
});

module.exports = router;