const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "I getting your order."
    })
})

router.post('/', (req, res, next) => {
    const order = {
        name: req.body.name,
        quantity: req.body.quantity
    }
    
    res.status(200).json({
        message: 'Handling POST request to /order',
        createdQuantity: order
    })
});


module.exports = router;