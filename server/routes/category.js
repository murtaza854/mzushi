const router = require('express').Router();
const Category = require('../schema').category;
const ProductBrand = require('../schema').productBrand;
const ProductCategory = require('../schema').productCategory;
const ProductSubCategory = require('../schema').productSubCategory;
const Product = require('../schema').product;
const AdPackage = require('../schema').adPackage;
const slugify = require('slugify');

router.get('/table-data', async (req, res) => {
    const categories = await Category.find({});
    if (!categories) res.json({ data: [] });
    else res.json({ data: categories });
});

router.get('/get-categories', async (req, res) => {
    const categories = await Category.find({}, { _id: 0 });
    if (!categories) res.json({ data: [] });
    else res.json({ data: categories });
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
    res.json({ data: 'success' });
});

router.post('/update', async (req, res) => {
    const data = req.body;
    const category = await Category.findOne({ _id: data._id });
    category.name = data.name;
    category.slug = slugify(data.name, { lower: true });
    category.keywords = data.keywords;
    category.description = data.description;
    category.save();
    res.json({ data: 'success' });
});

router.get('/get-by-ids', async (req, res) => {
    let id = '';
    if ('id' in req.query) id = req.query.id;
    const getIds = id.split(',');
    const categories = await Category.find({ _id: getIds }).populate({
        path: 'productBrands',
        populate: {
            path: 'products',
        }
    }).populate({
        path: 'productCategories',
        populate: {
            path: 'productSubCategories',
            populate: {
                path: 'products',
            }
        }
    }).populate({ path: 'adPackages' });
    if (!categories) res.json({ data: [] });
    else res.json({ data: categories });
});

router.post('/delete', async (req, res) => {
    try {
        const data = req.body.data;
        data.forEach(async category => {
            await AdPackage.deleteMany({ category: category._id });
            category.productCategories.forEach(async productCategory => {
                productCategory.productSubCategories.forEach(async productSubCategory => {
                    await Product.deleteMany({ productSubCategory: productSubCategory._id });
                })
                await ProductSubCategory.deleteMany({ productCategory: productCategory._id });
            });
            await ProductCategory.deleteMany({ category: category._id });
            category.productBrands.forEach(async productBrand => {
                await Product.deleteMany({ productBrand: productBrand._id });
            });
            await ProductBrand.deleteMany({ category: category._id });
        });
        await Category.deleteMany({ _id: req.body.ids });
        res.json({ data: 'success' });
    } catch (error) {
        console.log(error);
        res.json({ data: 'failed' });
    }
});

module.exports = router;