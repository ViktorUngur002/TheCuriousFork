const { checkStringIsEmpty } = require("../utils");
const MainCourse = require('../model/maincourseModel');
const Dessert = require('../model/dessertModel');
const Salad = require('../model/saladModel');

const updateMeal = async (req, res) => {
    const mealType = req.params.mealType;

    const { titleField, description, price } = req.body;

    // Check if a file is provided in the request
    const file = req.file;
    let newImage = null;

    if (file) {
        const fileName = req.file.filename;
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
        newImage = `${basePath}${fileName}`;
    }

    if (checkStringIsEmpty(titleField) || checkStringIsEmpty(description) || checkStringIsEmpty(price)) {
        return res.status(400).json({ error: 'All fields are mandatory' });
    }

    try {
        let updateFields = {
            title: titleField,
            description: description,
            price: price,
        };

        if (newImage) {
            updateFields.image = newImage;
        }

        let updatedMeal;

        if (mealType === 'Main Course') {
            updatedMeal = await MainCourse.findByIdAndUpdate(req.params.id, updateFields);
        } else if (mealType === 'Dessert') {
            updatedMeal = await Dessert.findByIdAndUpdate(req.params.id, updateFields);
        } else if (mealType === 'Salad') {
            updatedMeal = await Salad.findByIdAndUpdate(req.params.id, updateFields);
        }

        if (!updatedMeal) {
            return res.status(400).json({ message: "Meal data incorrect!" });
        }

        res.status(200).json({ message: "Meal updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { updateMeal };
