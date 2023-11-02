const MainCourse = require('../model/maincourseModel');
const Dessert = require('../model/dessertModel');
const Salad = require('../model/saladModel');
const { checkStringIsEmpty } = require("../utils");

const handleGetOneProduct = async (req, res) => {
    const {mealType, titleFromSearch} = req.query;

    if(checkStringIsEmpty(mealType) || checkStringIsEmpty(titleFromSearch)) {
        return res.status(400).json({ error: 'Empty search!' });
    }

    if(mealType === 'Main Course') {
        const {_id, title, description, price, image} = await MainCourse.findOne({ title:titleFromSearch });

        if(_id && title && description && price && image) {
            res.status(200).json({
                id: _id,
                title,
                description,
                price,
                image
            });
        } else {
            res.status(400).json({ error:"Meal not found!" });
        }

    } else if(mealType === 'Dessert') {
        const {_id, title, description, price, image} = await Dessert.find({ title:title });

        if(_id && title && description && price && image) {
            res.status(200).json({
                id: _id,
                title,
                description,
                price,
                image
            });
        } else {
            res.status(400).json({ error:"Meal not found!" });
        }

    } else if(mealType === 'Salad') {
        const {_id, title, description, price, image} = await Salad.find({ title:title });

        if(_id && title && description && price && image) {
            res.status(200).json({
                id: _id,
                title,
                description,
                price,
                image
            });
        } else {
            res.status(400).json({ error:"Meal not found!" });
        }
    }
}

module.exports = { handleGetOneProduct }