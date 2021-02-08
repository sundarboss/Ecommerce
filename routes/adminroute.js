const router = require('express').Router();
const multer = require('multer');
//Validation
const { categoryValidation, productValidation } = require('./validation');
//Import the required models
const Category = require('../model/category');
const Product = require('../model/product');
const Comment = require('../model/comment');
const Order = require('../model/order');
const User = require('../model/user');
//Import authverify and adminverify
const authVerify = require('./verifyauth');
const verifyAdmin = require('./verifyadmin');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/[:]/g, "") + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    //reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });


router.post('/addproduct', authVerify, verifyAdmin, upload.single('image'), (req, res) => {
    const { error } = productValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    if (!req.file) {
        return res.status(400).send('Upload a product image');
    }
    
    var newProduct = new Product({
        name: req.body.name,
        price: req.body.price,
        specs: req.body.specs || [],
        image: req.file.path,
        category: req.body.category,
        stock: req.body.stock
    });

    newProduct.save((err, product) => {
        if (err) return res.status(400).send(err);
        res.json({"productid": product._id, "productname": product.name})
    })
})

router.put('/editproduct/:productid', authVerify, verifyAdmin, upload.single('image'), (req, res) => {
    if (!req.body.name && !req.body.price && !req.body.specs && !req.body.category && !req.body.stock && !req.file) {
        return res.status(400).send('No field to update');
    }

    var productId = req.params.productid;

    Product.findById(productId, (err, product) => {
        if (err) return res.status(400).send(err);
        Product.findByIdAndUpdate(productId, { $set: {
            name: req.body.name || product.name,
            price: req.body.price || product.price,
            specs: req.body.specs || product.specs,
            image: req.file ? req.file.path : product.image,
            category: req.body.category || product.category,
            stock: req.body.stock || product.stock
        }}, { new: true }, (err, data) => {
            if (err) return res.status(400).send(err);
            res.json(data);
        })
    })
})

router.delete('/deleteproduct/:productId', authVerify, verifyAdmin, (req, res) => {
    Product.findByIdAndDelete(req.params.productId, (err, data) => {
        if (err) return res.status(400).send(err);
        Comment.deleteMany({productid: req.params.productId}, (err, final) => {
            if (err) return res.status(400).send(err);
            User.updateMany({cart: req.params.productId }, 
                { $pull : { cart: req.params.productId } }, (err, result) => {
                if (err) return res.status(400).send(err);
                res.status(200).send("Deleted Successfully");
            })
        })
    })
})

router.post('/addcategory', authVerify, verifyAdmin, (req, res) => {
    const { error } = categoryValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    Category.findOne({name: req.body.name}, (err, data) => {
        if (err) return res.status(400).send(err);
        if (data) {
            res.status(400).send('Category already exist')
        } else {
            var newCategory = new Category({
                name: req.body.name
            });

            newCategory.save((err, category) => {
                if (err) return res.status(400).send(err);
                res.json(category)
            });
        }
    })
})

router.delete('/deletecategory/:categoryid', authVerify, verifyAdmin, (req, res) => {
    Category.findByIdAndDelete(req.params.categoryid, (err, data) => {
        if (err) return res.status(400).send(err);
        Product.find({category: data.name}, '_id', (err, products) => {
            if (err) return res.status(400).send(err);
            var productIds = products.map((item) => {
                return item._id;
            });
            Comment.deleteMany({productid: { $in: productIds } }, (err, result) => {
                if (err) return res.status(400).send(err);
            })
            User.updateMany({cart: { $in : productIds } },
                { $pull: { cart: { $in: productIds } } }, (err, data1) => {
                if (err) return res.status(400).send(err);
            })
            Product.deleteMany({category: data.name}, (err, final) => {
                if (err) return res.status(400).send(err);
                res.status(200).send('Category Deleted!!');
            })  
        })
    })
})

router.get('/getproducts/', (req, res) => {
    Product.find({})
           .populate({
               path: 'comments',
               model: 'Comment',
               populate: {
                   path: 'userid',
                   model: 'User',
                   select: { '_id': 1, 'name': 1 }
               }
           })
           .select({__v: 0})
           .exec((err, data) => {
            if (err) return res.status(400).send(err);
            res.json(data);
           }) 
})

router.get('/getcategory', (req, res) => {
    Category.find({}, (err, data) => {
        if (err) return res.status(400).send(err);
        res.json(data);
    })
})

router.get('/getproduct/:productid', (req, res) => {
    Product.findById(req.params.productid)
           .populate({
               path: 'comments',
               model: 'Comment',
               populate: {
                   path: 'userid',
                   model: 'User',
                   select: { '_id': 1, 'name': 1 }
               }
           })
           .select({__v: 0})
           .exec((err, data) => {
            if (err) return res.status(400).send(err);
            res.json(data);
           }) 
})


router.get('/getproducts/:category', (req, res) => {
    Product.find({category: req.params.category}, (err, data) => {
            if (err) return res.status(400).send(err);
            res.json(data);
           }) 
})

router.get('/listorders', authVerify, verifyAdmin, (req, res) => {
    Order.find({})
         .populate({
            path: 'userid',
            model: 'User',
            select: { '_id': 1, 'name': 1, 'address': 1, 'state': 1, 'country': 1, 'phone': 1 }
         })
         .exec((err, data) => {
            if (err) return res.status(400).send(err);
            res.json(data);
         })
})

router.put('/markorder', authVerify, verifyAdmin, (req, res) => {
    Order.findByIdAndUpdate(req.body.orderId, { $set: {
        status: true,
        deliverydate: new Date()
    } }, { new: true }, (err, data) => {
        if (err) return res.status(400).send(err)
        res.status(200).send({"order_id": data._id, "deliverydate": data.deliverydate});
    })
})


module.exports = router;