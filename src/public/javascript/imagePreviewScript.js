document.getElementById('image').addEventListener('change', function() {
    let imagePreview = document.getElementById('imagePreview');
    if(this.files && this.files[0]) {
        let reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(this.files[0]);
    } else {
        imagePreview.style.display = 'none';
    }
});