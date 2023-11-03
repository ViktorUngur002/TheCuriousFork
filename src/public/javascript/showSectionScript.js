const mealType = document.getElementById('mealType');
const section = document.getElementById('section');

mealType.addEventListener('change', function() {
    const selectedOption = mealType.value;

    if(selectedOption === 'Main Course') {
        section.style.display = 'block';
    } else {
        section.style.display = 'none';
    }
});