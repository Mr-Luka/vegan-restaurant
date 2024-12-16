const list = document.querySelector('.slider .list');
const items = Array.from(document.querySelectorAll('.slider .list .item')); // Convert NodeList to array
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');

let active = 1; // Start at 1 (first original slide)
let totalItems = items.length; // Total slides (including clones)

// Function to reload the slider and center the active slide
function reloadSlider() {
    const offset = items[active].offsetLeft; // Get the active item's left offset
    list.style.transform = `translateX(-${offset}px)`; // Center the active slide
    list.style.transition = 'transform 0.5s ease-in-out'; // Smooth transition
}

// Function to handle resetting when reaching clones
function resetSlider() {
    list.style.transition = 'none'; // Disable transition for snap-back

    if (active >= totalItems - 1) {
        active = 1; // Reset to the first original slide
    } else if (active <= 0) {
        active = totalItems - 2; // Reset to the last original slide
    }

    reloadSlider(); // Snap back to the correct slide
}

// Event listener for the "Next" button
next.addEventListener('click', () => {
    active++; // Move to the next slide
    reloadSlider();

    // If moving to a clone, reset after the transition
    if (active >= totalItems - 1) {
        setTimeout(resetSlider, 500); // Allow transition to finish before resetting
    }
});

// Event listener for the "Prev" button
prev.addEventListener('click', () => {
    active--; // Move to the previous slide
    reloadSlider();

    // If moving to a clone, reset after the transition
    if (active <= 0) {
        setTimeout(resetSlider, 500); // Allow transition to finish before resetting
    }
});

// Initialize the slider
function initializeSlider() {
    // Clone the last and first items for seamless looping
    const firstClone = items[0].cloneNode(true);
    const lastClone = items[items.length - 1].cloneNode(true);

    // Append and prepend clones
    list.appendChild(firstClone);
    list.insertBefore(lastClone, items[0]);

    // Update the items array to include clones
    const updatedItems = document.querySelectorAll('.slider .list .item');
    items.splice(0, items.length, ...Array.from(updatedItems)); // Replace items array

    // Update the total items count (including clones)
    totalItems = items.length;

    // Set the initial position to the first original item
    active = 1;
    reloadSlider();
}

// Run the initialization
initializeSlider();


// MODAL
