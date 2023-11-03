const { checkStringIsEmpty } = require("../utils");
const multer = require('multer');
const MainCourse = require('../model/maincourseModel');
const Dessert = require('../model/dessertModel');
const Salad = require('../model/saladModel');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const handleNewProduct = async (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: 'Error uploading the image' });
        }

        const { mealType, section, title, description, price } = req.body;
        const imageBuffer = req.file.buffer;

        console.log(mealType);
        console.log(section);
        console.log(title);
        console.log(description);
        console.log(price);
        console.log(imageBuffer);
        
        if (!imageBuffer) {
            return res.status(400).json({ error: 'Image is required' });
        }
        
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
                    image: imageBuffer,
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
                    image: imageBuffer,
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
                    image: imageBuffer,
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
    });
};

module.exports = { handleNewProduct };
