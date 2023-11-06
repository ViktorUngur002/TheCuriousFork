const { checkStringIsEmpty } = require("../utils");
const multer = require('multer');
const MainCourse = require('../model/maincourseModel');
const Dessert = require('../model/dessertModel');
const Salad = require('../model/saladModel');

const handleNewProduct = async (req, res) => {
    const { mealType, section, title, description, price } = req.body;

    const file = req.file;
    if(!file) {
        return res.status(400).json({ error: 'All fields are mandatory' });
    }
    
    const fileName = req.file.filename;

    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
    
    
    if (checkStringIsEmpty(mealType) || checkStringIsEmpty(title) || checkStringIsEmpty(description) || checkStringIsEmpty(price)) {
        return res.status(400).json({ error: 'All fields are mandatory' });
    }

    if (mealType === 'Main Course' && checkStringIsEmpty(section)) {
        return res.status(400).json({ error: 'All fields are mandatory' });
    }

    if (mealType === 'Main Course') {
        const duplicate = await MainCourse.findOne({ title });
        if (duplicate) return res.status(400).json({ error: 'Meal already exists' });

        try {
            const newMeal = await MainCourse.create({
                title,
                description,
                price,
                image: `${basePath}${fileName}`,
                section
            });

            if (newMeal) {
                res.status(200).json({
                    _id: newMeal.id,
                    title: newMeal.title,
                    success: 'New Meal Added'
                });
            } else {
                res.status(400).json({ error: 'Invalid meal data' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }

    } else if (mealType === 'Dessert') {
        const duplicate = await Dessert.findOne({ title });
        if (duplicate) return res.status(400).json({ error: 'Meal already exists' });

        try {
            const newMeal = await Dessert.create({
                title,
                description,
                price,
                image: `${basePath}${fileName}`,
            });

            if (newMeal) {
                res.status(200).json({
                    _id: newMeal.id,
                    title: newMeal.title,
                    success: 'New Dessert Added'
                });
            } else {
                res.status(400).json({ error: 'Invalid dessert data' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }

    } else if (mealType === 'Salad') {
        const duplicate = await Salad.findOne({ title });
        if (duplicate) return res.status(400).json({ error: 'Meal already exists' });

        try {
            const newMeal = await Salad.create({
                title,
                description,
                price,
                image: `${basePath}${fileName}`,
            });

            if (newMeal) {
                res.status(200).json({
                    _id: newMeal.id,
                    title: newMeal.title,
                    success: 'New Salad Added'
                });
            } else {
                res.status(400).json({ error: 'Invalid salad data' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    
};

module.exports = { handleNewProduct };
