document.addEventListener("DOMContentLoaded", function() {
    let slideIndex = 0;
    showSlides();

    function showSlides() {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        slideIndex++;  // Increment the index first.

        if (slideIndex > slides.length) {
            slideIndex = 1; // Reset to the first slide if we've reached the end.
        }

        slides[slideIndex - 1].style.display = "block"; // Adjusted index here.

        setTimeout(showSlides, 5000); // Change image every 2 seconds
    }
});


