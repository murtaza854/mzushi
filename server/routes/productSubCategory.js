const router = require('express').Router();
const ProductSubCategory = require('../schema').productSubCategory;
const Product = require('../schema').product;
const slugify = require('slugify');

router.get('/table-data', async (req, res) => {
    const productSubCategories = await ProductSubCategory.find({}).populate({
        path: 'productCategory',
        populate: {
            path: 'category',
        }
    });
    if (!productSubCategories) res.json({ data: [] });
    else res.json({ data: productSubCategories });
});

router.get('/get-product-SubCategories', async (req, res) => {
    const productSubCategories = await ProductSubCategory.find({}, { _id: 0 });
    if (!productSubCategories) res.json({ data: [] });
    else res.json({ data: productSubCategories });
});

router.post('/add', async (req, res) => {
    const data = req.body;
    const newProductSubCategory = new ProductSubCategory({
        name: data.name,
        slug: slugify(data.name, { lower: true }),
        keywords: data.keywords,
        description: data.description,
        productCategory: data.productCategory
    });
    newProductSubCategory.save();
    res.json({ data: 'success' });
});

router.post('/update', async (req, res) => {
    const data = req.body;
    const productSubCategory = await ProductSubCategory.findOne({ _id: data._id });
    productSubCategory.name = data.name;
    productSubCategory.slug = slugify(data.name, { lower: true });
    productSubCategory.keywords = data.keywords;
    productSubCategory.description = data.description;
    productSubCategory.productCategory = data.productCategory;
    productSubCategory.save();
    res.json({ data: 'success' });
});

router.get('/get-by-ids', async (req, res) => {
    let id = '';
    if ('id' in req.query) id = req.query.id;
    const getIds = id.split(',');
    const productSubCategories = await ProductSubCategory.find({ _id: getIds }).populate({
        path: 'products'
    });
    if (!productSubCategories) res.json({ data: [] });
    else res.json({ data: productSubCategories });
});

router.post('/delete', async (req, res) => {
    try {
        const data = req.body.data;
        data.forEach(async productSubCategory => {
            await Product.deleteMany({ productSubCategory: productSubCategory._id });
        });
        await ProductSubCategory.deleteMany({ _id: req.body.ids });
        res.json({ data: 'success' });
    } catch (error) {
        ;
        res.json({ data: 'failed' });
    }
});

module.exports = router;