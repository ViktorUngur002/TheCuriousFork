const express = require('express');
const router = express.Router();
const Salad = require('../model/saladModel');

router.get('/products/salad', async (req, res) => {
    try {
        const products = await Salad.find();
        if(products) {
            res.status(200).json(products);
        } else {
            res.status(400).json({ message: 'No data found!' });
        }
    } catch(error) {
        res.status(500).json({ error:error });
    }
})


module.exports = router;