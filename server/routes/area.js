const router = require('express').Router();
const Area = require('../schema').area;

router.get('/table-data', async (req, res) => {
    const areas = await Area.find({}).populate({
        path: 'city',
        populate: {
            path: 'province',
            populate: {
                path: 'country'
            }
        }
    });
    if (!areas) res.json({ data: [] });
    else res.json({ data: areas });
});

router.get('/get-areas', async (req, res) => {
    const areas = await Area.find({}, { _id: 0 });
    if (!areas) res.json({ data: [] });
    else res.json({ data: areas });
});

router.post('/add', async (req, res) => {
    const data = req.body;
    const newArea = new Area({
        name: data.name,
        city: data.city,
    });
    newArea.save();
    res.json({ data: 'success' });
});

router.post('/update', async (req, res) => {
    const data = req.body;
    const area = await Area.findOne({ _id: data._id });
    area.name = data.name;
    area.city = data.city;
    area.save();
    res.json({ data: 'success' });
});

router.get('/get-by-ids', async (req, res) => {
    let id = '';
    if ('id' in req.query) id = req.query.id;
    const getIds = id.split(',');
    const areas = await Area.find({ _id: getIds });
    if (!areas) res.json({ data: [] });
    else res.json({ data: areas });
});

router.post('/delete', async (req, res) => {
    try {
        await Area.deleteMany({ _id: req.body.ids });
        res.json({ data: 'success' });
    } catch (error) {
        console.log(error);
        res.json({ data: 'failed' });
    }
});

module.exports = router;