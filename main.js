const list = document.querySelector('.slider .list');
const items = Array.from(document.querySelectorAll('.slider .list .item')); // Convert NodeList to array
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const meals = document.querySelector('.meals');

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

// Featured on: loop
document.addEventListener("DOMContentLoaded", () => {
    const featuredMarketing = document.querySelector(".featured-marketing");
    // Clone the images and append them to the container
    featuredMarketing.innerHTML += featuredMarketing.innerHTML;
    featuredMarketing.innerHTML += featuredMarketing.innerHTML;
    featuredMarketing.innerHTML += featuredMarketing.innerHTML;
});


// Fetching VEGAN FOOD recipes API
async function fetchVeganRecipes() {
  const apiUrl = "https://the-vegan-recipes-db.p.rapidapi.com/";
  const apiKey = "d3afb4afc6msh95d0b73034a9df9p1bcbb6jsncb4c4430bb66"; // Your API key

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": apiKey, // Your API key
        "X-RapidAPI-Host": "the-vegan-recipes-db.p.rapidapi.com", // Correct API host
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    displayRecipes(data);
    displayRecipes(data);
    displayRecipes(data);
    console.log(data); // Logs the full response object to the console
  } catch (error) {
    console.error("Error fetching data:", error.message); // Logs error if any
  }
}

fetchVeganRecipes();

function displayRecipes (data){
    const random = Math.floor(Math.random() * 385)-1;
    const recipe = data[random];

    const meal = document.createElement('div');
    meal.classList.add('meal');
    meal.innerHTML = `
        <div class="test-about-meal">
            <h2>${recipe.title}</h2>
        </div>
        <button class="new-dish-button">New Dish</button>
        <div class="meal-image">
            <img class="meal-recepie" src="${recipe.image}" alt="meal picture">
        </div>`;
    meals.appendChild(meal);
    newDishButtonAction ()
    
}

function newDishButtonAction (){
    const newDishBtn = document.querySelectorAll('.new-dish-button');
    newDishBtn.forEach(button=>{
        button.addEventListener('click', ()=>{
            console.log('its working')
            
        })
    })
}


