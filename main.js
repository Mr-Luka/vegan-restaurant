document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.wrapper');
    const slides = Array.from(document.querySelectorAll('.slide'));
    const leftButton = document.getElementById('left-button');
    const rightButton = document.getElementById('right-button');

    let currentIndex = slides.length; // Start from the middle of the duplicated slides

    // Duplicate slides for seamless looping
    slides.forEach((slide) => {
        const clone = slide.cloneNode(true);
        wrapper.appendChild(clone); // Clone to the end
    });
    slides.forEach((slide) => {
        const clone = slide.cloneNode(true);
        wrapper.insertBefore(clone, wrapper.firstChild); // Clone to the start
    });

    // Calculate slide width dynamically
    const slideWidth = slides[0].offsetWidth;
    const totalSlides = wrapper.children.length;

    // Set wrapper width based on total slides
    wrapper.style.width = `${slideWidth * totalSlides}px`;

    // Set initial position
    wrapper.style.transform = `translateX(${-currentIndex * slideWidth}px)`;

    const updateSlider = () => {
        wrapper.style.transition = 'transform 0.5s ease-in-out';
        wrapper.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
    };

    const handleTransitionEnd = () => {
        // Reset transition and position when at the edges
        wrapper.style.transition = 'none';

        if (currentIndex === 0) {
            currentIndex = slides.length;
            wrapper.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
        } else if (currentIndex === totalSlides - slides.length) {
            currentIndex = slides.length - 1;
            wrapper.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
        }
    };

    rightButton.addEventListener('click', () => {
        currentIndex++;
        if (currentIndex >= totalSlides) {
            currentIndex = 0;
        }
        updateSlider();
    });

    leftButton.addEventListener('click', () => {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = totalSlides - 1;
        }
        updateSlider();
    });

    wrapper.addEventListener('transitionend', handleTransitionEnd);
});