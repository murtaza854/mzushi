const router = require('express').Router();
const Country = require('../schema').country;
const Province = require('../schema').province;
const City = require('../schema').city;
const Area = require('../schema').area;

router.get('/table-data', async (req, res) => {
    const countries = await Country.find({});
    if (!countries) res.json({ data: [] });
    else res.json({ data: countries });
});

router.get('/get-countries', async (req, res) => {
    const countries = await Country.find({}, { _id: 0 });
    if (!countries) res.json({ data: [] });
    else res.json({ data: countries });
});

router.post('/add', async (req, res) => {
    const data = req.body;
    const newCountry = new Country({
        name: data.name,
    });
    newCountry.save();
    res.json({ data: 'success' });
});

router.post('/update', async (req, res) => {
    const data = req.body;
    const country = await Country.findOne({ _id: data._id });
    country.name = data.name;
    country.save();
    res.json({ data: 'success' });
});

router.get('/get-by-ids', async (req, res) => {
    let id = '';
    if ('id' in req.query) id = req.query.id;
    const getIds = id.split(',');
    const countries = await Country.find({ _id: getIds }).populate({
        path: 'provinces',
        populate: {
            path: 'cities',
            populate: {
                path: 'areas',
            }
        }
    });
    if (!countries) res.json({ data: [] });
    else res.json({ data: countries });
});

router.post('/delete', async (req, res) => {
    try {
        const data = req.body.data;
        data.forEach(async country => {
            country.provinces.forEach(async province => {
                province.cities.forEach(async city => {
                    await Area.deleteMany({ city: city._id });
                })
                await City.deleteMany({ province: province._id });
            });
            await Province.deleteMany({ country: country._id });
        });
        await Country.deleteMany({ _id: req.body.ids });
        res.json({ data: 'success' });
    } catch (error) {
        console.log(error);
        res.json({ data: 'failed' });
    }
});

module.exports = router;