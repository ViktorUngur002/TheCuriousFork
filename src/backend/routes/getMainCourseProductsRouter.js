const express = require('express');
const router = express.Router();
const MainCourse = require('../model/maincourseModel');

router.get('/products/mainCourse', async (req, res) => {
    try {
        const products = await MainCourse.find();
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