const router = require('express').Router();
const ProductCategory = require('../schema').productCategory;
const ProductSubCategory = require('../schema').productSubCategory;
const Product = require('../schema').product;
const slugify = require('slugify');

router.get('/table-data', async (req, res) => {
    const productCategories = await ProductCategory.find({}).populate('category');
    if (!productCategories) res.json({ data: [] });
    else res.json({ data: productCategories });
});

router.get('/get-product-categories', async (req, res) => {
    const productCategories = await ProductCategory.find({}, { _id: 0 });
    if (!productCategories) res.json({ data: [] });
    else res.json({ data: productCategories });
});

router.post('/add', async (req, res) => {
    const data = req.body;
    const newProductCategory = new ProductCategory({
        name: data.name,
        slug: slugify(data.name, { lower: true }),
        keywords: data.keywords,
        description: data.description,
        category: data.category,
    });
    newProductCategory.save();
    res.json({ data: 'success' });
});

router.post('/update', async (req, res) => {
    const data = req.body;
    const productCategory = await ProductCategory.findOne({ _id: data._id });
    productCategory.name = data.name;
    productCategory.slug = slugify(data.name, { lower: true });
    productCategory.keywords = data.keywords;
    productCategory.description = data.description;
    productCategory.category = data.category;
    productCategory.save();
    res.json({ data: 'success' });
});

router.get('/get-by-ids', async (req, res) => {
    let id = '';
    if ('id' in req.query) id = req.query.id;
    const getIds = id.split(',');
    const productCategories = await ProductCategory.find({ _id: getIds }).populate({
        path: 'productSubCategories',
        populate: {
            path: 'products',
        }
    });
    if (!productCategories) res.json({ data: [] });
    else res.json({ data: productCategories });
});

router.post('/delete', async (req, res) => {
    try {
        const data = req.body.data;
        data.forEach(async productCategory => {
            productCategory.productSubCategories.forEach(async productSubCategory => {
                await Product.deleteMany({ productSubCategory: productSubCategory._id });
            });
            await ProductSubCategory.deleteMany({ productCategory: productCategory._id });
        });
        await ProductCategory.deleteMany({ _id: req.body.ids });
        res.json({ data: 'success' });
    } catch (error) {
        console.log(error);
        res.json({ data: 'failed' });
    }
});

module.exports = router;