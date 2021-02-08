const router = require('express').Router();
const bcrypt = require('bcryptjs');
const async = require('async');
//Jsonwebtoken
const jwt = require('jsonwebtoken');
//Validation
const { registerValidation, commentValidation } = require('./validation');
//Import Required Models
const User = require('../model/user');
const Comment = require('../model/comment');
const Product = require('../model/product');
const Order = require('../model/order');
//Import authverify
const authVerify = require('./verifyauth');
const { update } = require('../model/order');


router.post('/login', (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) return res.status(400).send(err);
        if(!user) {
            res.status(400).send('Invalid username or password!')
        } else {
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                res.status(400).send('Invalid username or password!')
            } else {
                const token = jwt.sign({_id:user._id, admin:user.admin}, process.env.TOKEN_SECRET);
                res.header('auth-token', token).json({
                    "userid": user._id, 
                    "name": user.name, 
                    "isAdmin": user.admin, 
                    "address": user.address,
                    "country": user.country,
                    "state": user.state,
                    "phone": user.phone,
                    "cart": user.cart,
                    "token": token
                });
            }
        }
    })
});

router.post('/register', (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    var hashPassword = bcrypt.hashSync(req.body.password, 12);

    User.findOne({email: req.body.email}, (err, data) => {
        if (err) return res.status(400).send(err);
        if (data) {
            res.status(400).send('User already Exist!')
        } else {
            var newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashPassword,
                admin: req.body.admin,
                address: req.body.address,
                state: req.body.state,
                country: req.body.country,
                phone: req.body.phone
            });

            newUser.save((err, user) => {
                if (err) return res.status(400).send(err);
                const token = jwt.sign({_id:user._id, admin:user.admin}, process.env.TOKEN_SECRET);
                res.header('auth-token', token).json({
                    "userid": user._id, 
                    "name": user.name, 
                    "isAdmin": user.admin, 
                    "address": user.address,
                    "country": user.country,
                    "state": user.state,
                    "phone": user.phone,
                    "cart": user.cart,
                    "token": token
                });
            });
        }
    })
});

router.post('/product/comment/:productid', authVerify, (req, res) => {
    const { error } = commentValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    var productId = req.params.productid;
    var userId = req.user;

    var newComment = new Comment({
        productid: productId,
        userid: userId,
        comment: req.body.comment,
        created: new Date()
    });

    newComment.save((err, comment) => {
        if (err) return res.status(400).send(err)
        Product.findOneAndUpdate({_id: productId},
            { $push: { comments: comment }}, (err, final) => {
                if (err) return res.status(400).send(err)
                Comment.findById(comment._id)
                    .populate({
                        path: 'userid',
                        model: 'User',
                        select: { '_id': 1, 'name': 1 }
                    })
                    .exec((err, data) => {
                        if (err) return res.status(400).send(err);
                        res.json(data);
                    })
            })
    })
})

router.put('/product/comment/:commentid', authVerify, (req, res) => {
    const { error } = commentValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    Comment.findById(req.params.commentid, (err, comment) => {
        if (err) return res.status(400).send(err);
        if (!comment) {
            return res.status(400).send('Comment does not exist')
        }

        if (comment.userid.toString() !== req.user) {
            return res.status(400).send('Wrong user')
        } else {
            Comment.findOneAndUpdate({_id: comment._id},
                { $set: { comment: req.body.comment } }, { new: true }, (err, final) => {
                    if (err) return res.status(400).send(err);
                    res.json(final);
                })
        }
    })
})

router.delete('/product/comment/:commentid', authVerify, (req, res) => {
    Comment.findById(req.params.commentid, (err, comment) => {
        if (err) return res.status(400).send(err);
        if (!comment) {
            return res.status(400).send('Comment does not exist')
        }
        
        if (comment.userid.toString() !== req.user) {
            return res.status(400).send('Wrong user')
        } else {
            Comment.findByIdAndDelete(comment._id, (err, data) => {
                if (err) return res.status(400).send(err);
                Product.findOneAndUpdate({_id: comment.productid}, 
                    { $pull: { comments: comment._id } }, (err, final) => {
                        if (err) return res.status(400).send(err);
                        res.status(200).send('Comment Deleted');
                    })
            })
        }
    })
})

router.put('/addtocart', authVerify, (req, res) => {
    Product.findById(req.body.productId, (err, product) => {
        if (err) return res.status(400).send(err);
        if (!product) return res.status(401).send('Product Not Found');
        User.findOneAndUpdate({_id: req.user}, 
            { $push: { cart: product } }, (err, final) => {
                if (err) return res.status(400).send(err);
                res.status(200).send('Product added to the user cart!')
            });
    });
})

router.put('/removefromcart', authVerify, (req, res) => {
    User.findOneAndUpdate({_id: req.user},
        { $pull : { cart: req.body.productId } }, (err, final) => {
            if (err) return res.status(400).send(err);
            res.status(200).send('Product removed from Cart!')
        });
})

router.get('/cartdetails', authVerify, (req, res) => {
    User.findById(req.user)
        .populate({
            path: 'cart',
            model: 'Product',
            select: { '_id': 1, 'name': 1, 'price': 1, 'image': 1, 'stock': 1 }
        })
        .select({ password: 0 })
        .exec((err, data) => {
            if (err) return res.status(400).send(err);
            res.json({"cart": data.cart});
        })
})

router.post('/createorder', authVerify, (req, res) => {
    if (req.body.cartpage) {
        User.findOneAndUpdate({_id: req.user}, { $set: { cart: [] } }, (err) => {
            if (err) return res.status(400).send(err);
        });
    }  
    
    function updateStock(item, callback) {
        Product.findById(item._id, (err, product) => {
            if (err) return callback(err);
            Product.findOneAndUpdate({_id: product._id}, { $set: { stock: product.stock - item.qty } }, (err) => {
                if (err) return callback(err);
                callback;
            })
        })
    }

    async.each(req.body.products, function(item, callback) {
        updateStock(item, callback);
    }, function(err, callback) {
        if (err) console.log(err);
        callback;
    })

    var newOrder = new Order({
        date: new Date(),
        userid: req.user,
        details: req.body.products,
        status: false,
        value: req.body.value,
        paymentmode: req.body.paymentmode
    });

    newOrder.save((err, order) => {
        if (err) return res.status(400).send(err);
        res.json(order);
    });
})

router.get('/getorder', authVerify, (req, res) => {
    Order.find({userid: req.user})
         .populate("details.product")
         .exec((err, data) => {
            if (err) return res.status(400).send(err);
            res.json(data);
         })
})

router.get('/getorderdetail/:orderid', authVerify, (req, res) => {
    Order.findById(req.params.orderid)
         .populate({
            path: 'details.product',
            model: 'Product',
            select: { '_id': 1, 'name': 1, 'price': 1, 'image': 1 }
         })
         .exec((err, data) => {
            if (err) return res.status(400).send(err);
            res.json(data);
         })
})


module.exports = router;