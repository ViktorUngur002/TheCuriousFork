const MainCourse = require('../model/maincourseModel');
const Dessert = require('../model/dessertModel');
const Salad = require('../model/saladModel');

const deleteMeal = async (req, res) => {
    const mealType = req.params.mealType;

    try {
        if(mealType === 'Main Course') {
            const meal = await MainCourse.findById(req.params.id);

            if(!meal) {
                res.status(400).json({ error: "Meal not found!" });
            }

            await meal.deleteOne();

            res.status(200).json({ message: "Meal deleted!" });
           
        } else if(mealType === 'Dessert') {
           
            const meal = await Dessert.findById(req.params.id);

            if(!meal) {
                res.status(400).json({ error: "Meal not found!" });
            }

            await meal.deleteOne();

            res.status(200).json({ message: "Meal deleted!" });

        } else if(mealType === 'Salad') {
            const meal = await Salad.findById(req.params.id);

            if(!meal) {
                res.status(400).json({ error: "Meal not found!" });
            }

            await meal.deleteOne();

            res.status(200).json({ message: "Meal deleted!" });
        }

    } catch (err) {
        res.status(500).json({ error:err.message });
    }
}

module.exports = { deleteMeal }