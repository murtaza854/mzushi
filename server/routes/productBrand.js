const router = require('express').Router();
const ProductBrand = require('../schema').productBrand;
const Product = require('../schema').product;
const slugify = require('slugify');

router.get('/table-data', async (req, res) => {
    const productBrands = await ProductBrand.find({}).populate('category');
    if (!productBrands) res.json({ data: [] });
    else res.json({ data: productBrands });
});

router.get('/get-product-brands', async (req, res) => {
    const productBrands = await ProductBrand.find({}, { _id: 0 });
    if (!productBrands) res.json({ data: [] });
    else res.json({ data: productBrands });
});

router.post('/add', async (req, res) => {
    const data = req.body;
    const newProductBrand = new ProductBrand({
        name: data.name,
        slug: slugify(data.name, { lower: true }),
        keywords: data.keywords,
        description: data.description,
        category: data.category
    });
    newProductBrand.save();
    res.json({ data: 'success' });
});

router.post('/update', async (req, res) => {
    const data = req.body;
    const productBrand = await ProductBrand.findOne({ _id: data._id });
    productBrand.name = data.name;
    productBrand.slug = slugify(data.name, { lower: true });
    productBrand.keywords = data.keywords;
    productBrand.description = data.description;
    productBrand.category = data.category;
    productBrand.save();
    res.json({ data: 'success' });
});

router.get('/get-by-ids', async (req, res) => {
    let id = '';
    if ('id' in req.query) id = req.query.id;
    const getIds = id.split(',');
    const productBrands = await ProductBrand.find({ _id: getIds }).populate({
        path: 'products'
    });
    if (!productBrands) res.json({ data: [] });
    else res.json({ data: productBrands });
});

router.post('/delete', async (req, res) => {
    try {
        const data = req.body.data;
        data.forEach(async productBrand => {
            await Product.deleteMany({ productBrand: productBrand._id });
        });
        await ProductBrand.deleteMany({ _id: req.body.ids });
        res.json({ data: 'success' });
    } catch (error) {
        ;
        res.json({ data: 'failed' });
    }
});

module.exports = router;