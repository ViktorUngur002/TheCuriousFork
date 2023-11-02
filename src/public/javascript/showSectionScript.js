const mealType = document.getElementById('mealType');
const sectionInput = document.getElementById('section');

mealType.addEventListener('change', function() {
    const selectedOption = mealType.value;

    if(selectedOption === 'Main Course') {
        sectionInput.style.display = 'block';
    } else {
        sectionInput.style.display = 'none';
    }
});