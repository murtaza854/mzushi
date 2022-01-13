const router = require('express').Router();
const AdPackage = require('../schema').adPackage;

router.get('/table-data', async (req, res) => {
    const adPackages = await AdPackage.find({}).populate('category');
    if (!adPackages) res.json({ data: [] });
    else res.json({ data: adPackages });
});

router.get('/get-ad-packages', async (req, res) => {
    const adPackages = await AdPackage.find({}, { _id: 0 });
    if (!adPackages) res.json({ data: [] });
    else res.json({ data: adPackages });
});

router.post('/add', async (req, res) => {
    const data = req.body;
    const newAdPackage = new AdPackage({
        name: data.name,
        price: data.price,
        amountOfAds: data.amountOfAds,
        type: data.type,
        active: data.active,
        category: data.category,
    });
    newAdPackage.save();
    res.json({ data: 'success' });
});

router.post('/update', async (req, res) => {
    // const data = req.body;
    // const adPackage = await AdPackage.findOne({ _id: data._id });
    // adPackage.name = data.name;
    // adPackage.price = data.price;
    // adPackage.type = data.type;
    // adPackage.active = data.active
    // adPackage.category = data.category;
    // adPackage.save();
    res.json({ data: 'success' });
});

router.get('/get-by-ids', async (req, res) => {
    let id = '';
    if ('id' in req.query) id = req.query.id;
    const getIds = id.split(',');
    const adPackages = await AdPackage.find({ _id: getIds });
    if (!adPackages) res.json({ data: [] });
    else res.json({ data: adPackages });
});

router.post('/delete', async (req, res) => {
    try {
        await AdPackage.deleteMany({ _id: req.body.ids });
        res.json({ data: 'success' });
    } catch (error) {
        res.json({ data: 'failed' });
    }
});

module.exports = router;