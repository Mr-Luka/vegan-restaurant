const list = document.querySelector('.slider .list');
const items = document.querySelectorAll('.slider .list .item');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');

let active = 0; // Track the active slide
const lengthItems = items.length - 1; // Total number of slides

function reloadSlider() {
    // Calculate the left offset of the active item
    let checkLeft = items[active].offsetLeft;

    // Update the list's position to center the active item
    list.style.transform = `translateX(-${checkLeft}px)`;
    list.style.transition = 'transform 0.5s ease-in-out'; // Add smooth sliding
}

// Event listener for the "Next" button
next.addEventListener('click', () => {
    if (active + 1 > lengthItems) {
        active = 0; // Loop back to the first slide
    } else {
        active = active + 1; // Move to the next slide
    }
    reloadSlider();
});

// Event listener for the "Prev" button
prev.addEventListener('click', () => {
    if (active - 1 < 0) {
        active = lengthItems; // Loop back to the last slide
    } else {
        active = active - 1; // Move to the previous slide
    }
    reloadSlider();
});

// Initialize the slider position
reloadSlider();
