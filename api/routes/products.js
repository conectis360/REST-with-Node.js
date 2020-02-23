const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');

//get pega todos gets, apartir daquela URL (1° argumento)
//2e arg é um handler
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET request to /products'
    })
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(200).json({
        message: 'Handling POST request to /products',
        createdProduct: product
    })
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json({
            doc
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: "Updated data!"
    })
});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: "Deleted! data!"
    })
});

//exporta a 'module' para ser usadas em outras files.
module.exports = router;