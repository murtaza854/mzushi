const router = require('express').Router();
const Province = require('../schema').province;
const Country = require('../schema').country;

router.get('/table-data', async (req, res) => {
    const provinces = await Province.find({});
    if (!provinces) res.json({data: []});
    else res.json({data: provinces});
});

router.get('/get-provinces', async (req, res) => {
    const provinces = await Province.find({}, {_id: 0});
    if (!provinces) res.json({data: []});
    else res.json({data: provinces});
});

router.post('/add', async (req, res) => {
    const data = req.body;
    const country = await Country.findOne({_id: data.countryID});
    const newProvince = new Province({
        name: data.name,
        country:country,
    });
    newProvince.save();
    res.json({data: 'success'});
});

router.post('/update', async (req, res) => {
    const data = req.body;
    const country = await Country.findOne({_id: data.countryID});
    const province = await Province.findOne({_id: data._id});
    province.name = data.name;
    province.country = country;
    province.save();
    res.json({data: 'success'});
});

router.get('/get-by-ids', async (req, res) => {
    let id = '';
    if ('id' in req.query) id = req.query.id;
    const getIds = id.split(',');
    const provinces = await Province.find({_id: getIds});
    if (!provinces) res.json({data: []});
    else res.json({data: provinces});
});

router.post('/delete', async (req, res) => {
    await Province.deleteMany({_id: req.body.ids});
    res.json({data: 'success'});
});

module.exports = router;