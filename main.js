const list = document.querySelector('.slider .list');
const items = Array.from(document.querySelectorAll('.slider .list .item')); // Convert NodeList to array
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const meals = document.querySelector('.meals');
const xBtn = document.querySelector('.x-modal');
const signupWindow = document.querySelector('.signup');
const modalDiscount = document.querySelector('.modal-wrapper')
const modal = document.querySelector('.modal-whole');
const signUpBtn = document.querySelector('.sign-up');
const submitRegister = document.querySelector('#submit-register');
 

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

// function that will delay between requests
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchVeganRecipesWithRetry(retries = 3, delayTime = 5000) {
  for (let i = 0; i < retries; i++) {
    try {
      await fetchVeganRecipes();
      break; // Exit loop if the fetch is successful
    } catch (error) {
      console.error(`Attempt ${i + 1} failed: ${error.message}`);
      if (i < retries - 1) {
        console.log(`Retrying in ${delayTime / 1000} seconds...`);
        await delay(delayTime);
      } else {
        console.error("All retries failed.");
      }
    }
  }
}

fetchVeganRecipesWithRetry();

// Fetching VEGAN FOOD recipes API
async function fetchVeganRecipes() {
  const apiUrl = "https://the-vegan-recipes-db.p.rapidapi.com/";
  const apiKey = "d3afb4afc6msh95d0b73034a9df9p1bcbb6jsncb4c4430bb66"; // Your API key

  const cachedData = localStorage.getItem("veganRecipes");
  if (cachedData) {
    displayCachedRecipes(JSON.parse(cachedData))
    return;
  }

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
    localStorage.setItem("veganRecipes", JSON.stringify(data)); // Cache data
    displayCachedRecipes(data);
    

    console.log(data); // Logs the full response object to the console
  } catch (error) {
    console.error("Error fetching data:", error.message); // Logs error if any
  }
}
fetchVeganRecipes();

function displayCachedRecipes(data){
  // Display 3 initial recipes
    for (let i = 0; i < 3; i++) {
      displayRecipe(data);
    }
}

function displayRecipe(data) {
  // Ensure the random index is within the array bounds
  const randomIndex = Math.floor(Math.random() * data.length);
  const recipe = data[randomIndex];

  const mealsContainer = document.querySelector(".meals");

  const meal = document.createElement("div");
  meal.classList.add("meal");
  meal.innerHTML = `
    <div class="test-about-meal">
        <h2>${recipe.title}</h2>
    </div>
    <button class="new-dish-button">New Dish</button>
    <div class="meal-image">
        <img class="meal-recepie" src="${recipe.image}" alt="meal picture">
    </div>`;

  // Append the new meal to the container
  mealsContainer.appendChild(meal);

  // Add event listener to the button inside this meal
  const newDishBtn = meal.querySelector(".new-dish-button");
  newDishBtn.addEventListener("click", () => {
    regenerateRecipe(meal, data);
  });
}

// function that will generate new title and image of the meal
function regenerateRecipe(meal, data) {
  const randomIndex = Math.floor(Math.random() * data.length);
  const newRecipe = data[randomIndex];

  const recipeTitle = meal.querySelector('.test-about-meal h2');
  const recipeImg = meal.querySelector('.meal-recepie');

  recipeTitle.innerHTML = `${newRecipe.title}`;
  recipeImg.src = `${newRecipe.image}`;
}




window.addEventListener('scroll', ()=> {
 
  if(window.scrollY > 500) {
    modal.classList.remove('hidden');
  } 

  if(!modal.classList.contains('hidden')){
      xBtn.addEventListener('click', ()=>{
      modal.classList.add('hidden');
      signupWindow.classList.add('hidden');
      modalDiscount.classList.remove('hidden');
    })
  }
})

if(signUpBtn){
  signUpBtn.addEventListener('click', ()=>{
      modalDiscount.classList.add('hidden');
      signupWindow.classList.remove('hidden');
    })
}

if(submitRegister) {
  submitRegister.addEventListener('click', handleRegister)
}