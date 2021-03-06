const router = require('express').Router();
const Category = require('../schema').category;
const ProductBrand = require('../schema').productBrand;
const ProductCategory = require('../schema').productCategory;
const ProductSubCategory = require('../schema').productSubCategory;
const Product = require('../schema').product;
const AdPackage = require('../schema').adPackage;
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const slugify = require('slugify');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve('../client/public/categoryUploads'))
        // cb(null, path.resolve('./build/categoryUploads'));
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + ext);
    }
});

const upload = multer({ storage: storage });

router.get('/getAllCategories', async (req, res) => {
    const categories = await Category.find({});
    if (!categories) res.json({ data: [] });
    else res.json({ data: categories });
});

router.get('/get-all-by-featured', async (req, res) => {
    const categories = await Category.find({}).sort([['featured', 'descending']]);
    if (!categories) res.json({ data: [] });
    else res.json({ data: categories });
});

router.get('/get-categories', async (req, res) => {
    const categories = await Category.find({}, { _id: 0 });
    if (!categories) res.json({ data: [] });
    else res.json({ data: categories });
});

router.post('/getById', async (req, res) => {
    try {
        const category = await Category.findOne({ _id: req.body.id });
        res.json({ data: category });
    } catch (error) {
        res.json({ data: null, error: error });
    }
});

router.post('/add', upload.single('image'), async (req, res) => {
    const data = JSON.parse(req.body.data);
    const image = {
        fileName: req.file.filename,
        filePath: '/categoryUploads/' + req.file.filename
    };
    const newCategory = new Category({
        name: data.name,
        slug: slugify(data.name, { lower: true }),
        image: image,
        featured: data.featured,
        active: data.active
    });
    newCategory.save();
    res.json({ data: true });
});

router.post('/updateWithImage', upload.single('image'), async (req, res) => {
    try {
        const data = JSON.parse(req.body.data);
        fs.unlinkSync(path.resolve('../client/public/categoryUploads/' + data.oldFileName));
        // fs.unlinkSync(path.resolve('./build/categoryUploads/' + data.oldFileName));
        const image = {
            fileName: req.file.filename,
            filePath: '/categoryUploads/' + req.file.filename
        };
        const category = await Category.findOne({ _id: data.id });
        category.name = data.name;
        category.slug = slugify(data.name, { lower: true });
        category.image = image;
        category.featured = data.featured;
        category.active = data.active;
        category.save();
        res.json({ data: true });
    } catch (error) {
        res.json({ data: null, error: error });
    }
});

router.post('/updateWithoutImage', async (req, res) => {
    const data = req.body;
    const category = await Category.findOne({ _id: data.id });
    category.name = data.name;
    category.slug = slugify(data.name, { lower: true });
    category.featured = data.featured;
    category.active = data.active;
    category.save();
    res.json({ data: true });
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
        ;
        res.json({ data: 'failed' });
    }
});

module.exports = router;