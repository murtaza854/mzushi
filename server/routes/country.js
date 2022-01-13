const router = require('express').Router();
const Country = require('../schema').country;
const Province = require('../schema').province;
const City = require('../schema').city;
const Area = require('../schema').area;

router.get('/getAllCountries', async (req, res) => {
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
        abbreviation: data.abbreviation,
        active: data.active
    });
    newCountry.save();
    res.json({ data: 'success' });
});

router.post('/getById', async (req, res) => {
    try {
        const country = await Country.findOne({ _id: req.body.id });
        res.json({ data: country });
    } catch (error) {
        res.json({ data: null, error: error });
    }
});

router.post('/update', async (req, res) => {
    const data = req.body;
    const country = await Country.findOne({ _id: data.id });
    country.name = data.name;
    country.abbreviation = data.abbreviation;
    country.active = data.active;
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
        ;
        res.json({ data: 'failed' });
    }
});

module.exports = router;