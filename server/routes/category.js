const router = require('express').Router();
const Category = require('../schema').category;

router.get('/table-data', async (req, res) => {
    const categories = await Category.find({});
    if (!categories) res.json({data: []});
    else res.json({data: categories});
});

router.get('/get-categories', async (req, res) => {
    const categories = await Category.find({}, {_id: 0});
    if (!categories) res.json({data: []});
    else res.json({data: categories});
});

router.post('/add', async (req, res) => {
    const data = req.body;
    const newCategory = new Category({
        name: data.name,
        slug: slugify(data.name, { lower: true }),
        keywords: data.keywords,
        description: data.description,
    });
    newCategory.save();
    res.json({data: 'success'});
});

router.post('/update', async (req, res) => {
    const data = req.body;
    const category = await Category.findOne({_id: data._id});
    category.name = data.name;
    category.slug =slugify(data.name, { lower: true });
    category.keywords = data.keywords;
    category.description = data.description;
    category.save();
    res.json({data: 'success'});
});

router.get('/get-by-ids', async (req, res) => {
    let id = '';
    if ('id' in req.query) id = req.query.id;
    const getIds = id.split(',');
    const categories = await Category.find({_id: getIds});
    if (!categories) res.json({data: []});
    else res.json({data: categories});
});

router.post('/delete', async (req, res) => {
    await Category.deleteMany({_id: req.body.ids});
    res.json({data: 'success'});
});

module.exports = router;