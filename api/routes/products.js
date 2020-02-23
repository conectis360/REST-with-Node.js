const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');

//get pega todos gets, apartir daquela URL (1° argumento)
//2e arg é um handler

router.get('/', (req, res, next) => {
    Product.find()
        .exec()
        .then(docs => {
            console.log(docs);
            if(docs.length >= 0){
                res.status(200).json(docs);
            }else {
                res.status(404).json({
                    message: "No Products found."
                });
            }
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
    const id = req.params.productId;
    const updateOperation = {};
    for (const ops of req.body) {
        updateOperation[ops.propName] = ops.value;
    }
    Product.update({_id: id}, {$set: updateOperation})
    .exec()
    .then(res => {
        console.log(result);
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({
        _id: id
    }).exec()
      .then(result => {
          res.status(200).json(result);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({
              error: err
          })
      })

    });

//exporta a 'module' para ser usadas em outras files.
module.exports = router;