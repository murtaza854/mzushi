const router = require('express').Router();
const ProductBrand = require('../schema').productBrand;
const slugify = require('slugify');

router.get('/table-data', async (req, res) => {
    const productBrands = await ProductBrand.find({});
    if (!productBrands) res.json({data: []});
    else res.json({data: productBrands});
});

router.get('/get-product-brands', async (req, res) => {
    const productBrands = await ProductBrand.find({}, {_id: 0});
    if (!productBrands) res.json({data: []});
    else res.json({data: productBrands});
});

router.post('/add', async (req, res) => {
    const data = req.body;
    const newProductBrand = new ProductBrand({
        name: data.name,
        slug: slugify(data.name, { lower: true }),
        keywords: data.keywords,
        description: data.description
    });
    newProductBrand.save();
    res.json({data: 'success'});
});

router.post('/update', async (req, res) => {
    const data = req.body;
    const productBrand = await ProductBrand.findOne({_id: data._id});
    productBrand.name = data.name;
    productBrand.slug = slugify(data.name, { lower: true });
    productBrand.keywords = data.keywords;
    productBrand.description = data.description;
    productBrand.save();
    res.json({data: 'success'});
});

router.get('/get-by-ids', async (req, res) => {
    let id = '';
    if ('id' in req.query) id = req.query.id;
    const getIds = id.split(',');
    const productBrands = await ProductBrand.find({_id: getIds});
    if (!productBrands) res.json({data: []});
    else res.json({data: productBrands});
});

router.post('/delete', async (req, res) => {
    await ProductBrand.deleteMany({_id: req.body.ids});
    res.json({data: 'success'});
});

module.exports = router;