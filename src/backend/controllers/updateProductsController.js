const { checkStringIsEmpty } = require("../utils");
const MainCourse = require('../model/maincourseModel');
const Dessert = require('../model/dessertModel');
const Salad = require('../model/saladModel');

const updateMeal = async (req, res) => {
    const mealType = req.params.mealType;

    console.log("im in controller");
    console.log(mealType);

    try {
        if(mealType === 'Main Course') {
            
            const meal = await MainCourse.findById(req.params.id);

            if(!meal) {
                res.status(400).json({ error: "User not found!" });
            }

            const {titleField, description, price, image} = req.body;


            if(checkStringIsEmpty(titleField) || checkStringIsEmpty(description) || checkStringIsEmpty(price) || !image) {
                return res.status(400).json({ error:'All fields are mandatory' });
            }

            const updatedMeal = await MainCourse.findByIdAndUpdate(req.params.id, req.body);
            if(updatedMeal) {
                res.status(200).json({ message: "Meal updated" });
            } else {
                res.status(400).json({ message: "Meal data incorect!" });
            }
        } else if(mealType === 'Dessert') {
            const meal = await Dessert.findById(req.params.id);

            if(!meal) {
                res.status(400).json({ error: "User not found!" });
            }

            const {title, description, price, image} = req.body;
            let inputArray = req.body;

            if(checkStringIsEmpty(title) || checkStringIsEmpty(description) || checkStringIsEmpty(price) || !image) {
                return res.status(400).json({ error:'All fields are mandatory' });
            }

            const updatedMeal = await Dessert.findByIdAndUpdate(req.params.id, inputArray);
            if(updatedMeal) {
                res.status(200).json({ message: "Meal updated" });
            } else {
                res.status(400).json({ message: "Meal data incorect!" });
            }

        } else if(mealType === 'Salad') {
            const meal = await Salad.findById(req.params.id);

            if(!meal) {
                res.status(400).json({ error: "User not found!" });
            }

            const {title, description, price, image} = req.body;
            let inputArray = req.body;

            if(checkStringIsEmpty(title) || checkStringIsEmpty(description) || checkStringIsEmpty(price) || !image) {
                return res.status(400).json({ error:'All fields are mandatory' });
            }

            const updatedMeal = await Salad.findByIdAndUpdate(req.params.id, inputArray);
            if(updatedMeal) {
                res.status(200).json({ message: "Meal updated" });
            } else {
                res.status(400).json({ message: "Meal data incorect!" });
            }
        }
    } catch (err) { 
        res.status(500).json({ error:err.message });
    }
}

module.exports = { updateMeal }