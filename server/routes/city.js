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

    const cities = await City.find({ featured: true });
    res.json({ data: cities });
});

router.get('/getAllCities', async (req, res) => {
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

router.get('/get-cities-with-ref', async (req, res) => {
    const cities = await City.find({});
    if (!cities) res.json({ data: [] });
    else res.json({ data: cities });
});

router.post('/getById', async (req, res) => {
    try {
        const city = await City.findOne({ _id: req.body.id }).populate({
            path: 'province',
            populate: {
                path: 'country',
            }
        });
        res.json({ data: city });
    } catch (error) {
        res.json({ data: null, error: error });
    }
});

router.post('/add', async (req, res) => {
    const data = req.body;
    const newCity = new City({
        name: data.name,
        province: data.state,
        featured: data.featured,
        active: data.active
    });
    newCity.save();
    res.json({ data: 'success' });
});

router.post('/update', async (req, res) => {
    const data = req.body;
    const city = await City.findOne({ _id: data.id });
    city.name = data.name;
    city.province = data.state;
    city.featured = data.featured;
    city.active = data.active;
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

router.post('/getDeleteData', async (req, res) => {
    try {
        const {
            selected
        } = req.body;
        console.log(selected);
        const cities = await City.find({ id: selected }).populate({
            path: 'addresses',
            populate: {
                path: 'startups'
            }
        })
        res.json({ data: cities });
    } catch (error) {
        res.json({ data: null, error: error });
    }
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
        ;
        res.json({ data: 'failed' });
    }
});

module.exports = router;