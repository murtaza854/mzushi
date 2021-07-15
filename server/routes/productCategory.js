const router = require('express').Router();
const ProductCategory = require('../schema').productCategory;
const Category = require('../schema').category;

router.get('/table-data', async (req, res) => {
    const productCategories = await ProductCategory.find({});
    if (!productCategories) res.json({data: []});
    else res.json({data: productCategories});
});

router.get('/get-product-categories', async (req, res) => {
    const productCategories = await ProductCategory.find({}, {_id: 0});
    if (!productCategories) res.json({data: []});
    else res.json({data: productCategories});
});

router.post('/add', async (req, res) => {
    const data = req.body;
    const category = await Category.findOne({_id: data.categoryID});
    const newProductCategory = new ProductCategory({
        name: data.name,
        slug: slugify(data.name, { lower: true }),
        keywords: data.keywords,
        description: data.description,
        category:category,
    });
    newProductCategory.save();
    res.json({data: 'success'});
});

router.post('/update', async (req, res) => {
    const data = req.body;
    const category = await Category.findOne({_id: data.categoryID});
    const productCategory = await ProductCategory.findOne({_id: data._id});
    productCategory.name = data.name;
    productCategory.slug = slugify(data.name, { lower: true });
    productCategory.keywords = data.keywords;
    productCategory.description = data.description;
    productCategory.category = category;
    productCategory.save();
    res.json({data: 'success'});
});

router.get('/get-by-ids', async (req, res) => {
    let id = '';
    if ('id' in req.query) id = req.query.id;
    const getIds = id.split(',');
    const productCategories = await ProductCategory.find({_id: getIds});
    if (!productCategories) res.json({data: []});
    else res.json({data: productCategories});
});

router.post('/delete', async (req, res) => {
    await ProductCategory.deleteMany({_id: req.body.ids});
    res.json({data: 'success'});
});

module.exports = router;