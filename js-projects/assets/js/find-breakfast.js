// Main variables and params
const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const mealsEl = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const singleMeal = document.getElementById('single-meal');

/**
 * Request to search the meal by name
 *
 * @param {event} event The event from eventHadler
 */
function searchMeal(event) {
  event.preventDefault();

  // Clear single meal
  singleMeal.innerHTML = '';

  // Get search term
  const term = search.value;

  // Check if the term is empty
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;
        // If the meal is found
        if (data.meals === null) {
          resultHeading.innerHTML = `<h2>Please try again, there is nothing found for '${term}':</h2>`;
        } else {
          // Generate DOM structure for each meal
          mealsEl.innerHTML = data.meals
            .map(
              (meal) =>
                `<div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
              <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>`,
            )
            .join('');
        }
      });

    // Clear search text
    search.value = '';
  } else {
    alert('Please enter a search term');
  }
}

/**
 * Take meal by ID from the server
 *
 * @param {*} id
 */
function getMealById(id) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((info) => info.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

/**
 * Take random meal from the server
 *
 */
function randomMeal() {
  // Clear meals and heading
  mealsEl.innerHTML = '';
  resultHeading.innerHTML = '';
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then((info) => info.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

/**
 * Generate full DOM structure for one meal item
 *
 * @param {Array} meal The data from the API
 */
function addMealToDOM(meal) {
  const ingredients = [];
  // Write ingredients from API in array to draw them in more comfortable way
  for (let i = 1; i < 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`,
      );
    } else {
      break;
    }
  }

  // Generate the DOM structure for the current meal
  singleMeal.innerHTML = `<div class="single-meal">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
    <div class="single-meal-info">
      ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
      ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
    </div>
    <div class="main-info">
      <p>${meal.strInstructions}</p>
      <h2>Ingredients:</h2>
      <ul>
        ${ingredients.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    </div>
  </div>`;
}

// Event Listeners

// Search for specific meal
submit.addEventListener('submit', searchMeal);

// Search for random meal
random.addEventListener('click', randomMeal);

// See info about about specific meal
mealsEl.addEventListener('click', (event) => {
  // Find the item on which click happened
  const mealInfo = event.path.find((item) => {
    // console.log(item);
    if (item.classList) {
      return item.classList.contains('meal-info');
    }
    return false;
  });

  // If info exists
  if (mealInfo) {
    // Take the id of current meal
    const mealID = mealInfo.getAttribute('data-mealid');
    // Make request to find by id
    getMealById(mealID);
  }
});
