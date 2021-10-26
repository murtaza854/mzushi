const router = require('express').Router();
const City = require('../schema').city;
const Area = require('../schema').area;

router.get('/get-cities-search', async (req, res) => {
    const { cityText, provinces } = req.query;
    const provincesList = JSON.parse(provinces);
    const cities = await City.find({ name: { "$regex": cityText, "$options": "i" }, province: { $in: provincesList } });
    res.json({ data: cities });
});

router.get('/get-featured', async (req, res) => {
    
    const cities = await City.find({featured: true});
    res.json({ data: cities });
});

router.get('/table-data', async (req, res) => {
    const cities = await City.find({}).populate({
        path: 'province',
        populate: {
            path: 'country',
        }
    });
    if (!cities) res.json({ data: [] });
    else res.json({ data: cities });
});

router.get('/get-cities', async (req, res) => {
    const cities = await City.find({}, { _id: 0 });
    if (!cities) res.json({ data: [] });
    else res.json({ data: cities });
});

router.post('/add', async (req, res) => {
    const data = req.body;
    const newCity = new City({
        name: data.name,
        province: data.province,
        featured: data.featured
    });
    newCity.save();
    res.json({ data: 'success' });
});

router.post('/update', async (req, res) => {
    const data = req.body;
    const city = await City.findOne({ _id: data._id });
    city.name = data.name;
    city.province = data.province;
    city.featured = data.featured;
    city.save();
    res.json({ data: 'success' });
});

router.get('/get-by-ids', async (req, res) => {
    let id = '';
    if ('id' in req.query) id = req.query.id;
    const getIds = id.split(',');
    const cities = await City.find({ _id: getIds }).populate({
        path: 'areas',
    });
    if (!cities) res.json({ data: [] });
    else res.json({ data: cities });
});

router.post('/delete', async (req, res) => {
    try {
        const data = req.body.data;
        data.forEach(async city => {
            await Area.deleteMany({ city: city._id });
        });
        await City.deleteMany({ _id: req.body.ids });
        res.json({ data: 'success' });
    } catch (error) {
        console.log(error);
        res.json({ data: 'failed' });
    }
});

module.exports = router;