/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
// Params and main variables
const searchBtn = document.querySelector('.search__button');

const options = {
  method: 'GET',
  // Need to type your own API keys
};

// Functions
const getWeather = async () => {
  const value = await document.querySelector('.search__input').value;

  console.log(value);

  if (value.trim()) {
    // Request to the yahoo-weather API
    const fetchResponse = await fetch(
      `https://yahoo-weather5.p.rapidapi.com/weather?location=${value}&format=json&u=f`,
      options,
    )
      .then((response) => {
        console.log(response);

        // Check if the response has acceptable status
        if (Math.floor(response.status / 2) === 2 || response.status === 200)
          return response.json();
      })
      .then((data) => {
        console.log(data);

        // Making the one weather item block
        const weatherItem = data.forecasts.map(
          (item) => `
           <div class="weather__item">
               <div class="day">${item.day}</div>
               <div class="temperature-range">
                 <div class="low">${item.low}</div>
                 <div class="high">${item.high}</div>
               </div>
               <div class="condition">${item.text}</div>
             </div>
           `,
        );

        // Assigning the item to the main container
        document.querySelector('.weather__wrapper').innerHTML = `
        <div class="weather__row">
          <div class="weather__first-col">
            <div class="city-name">${data.location.city}</div>
            <div class="country-name">${data.location.country}</div>
            <div class="day">${data.forecasts[0].day}</div>
          </div>
          <div class="weather__second-col">
            <div class="current-condition">${data.forecasts[0].text}</div>
            <div class="current-temperature">${data.current_observation.condition.temperature}</div>
            <div class="suntimes">
              <div class="sunrise"> rise - 6.43 am</div>
              <div class="sunset"> set - ${data.current_observation.astronomy.sunset}</div>
            </div>
          </div>
        </div>
      `;

        // Assigning all the items to the footer
        document.querySelector('.weather__footer').innerHTML = `
          ${weatherItem.join('')}
      `;
      })
      .catch((err) => console.error(err));
  }
};

// Event Listeners
searchBtn.addEventListener('click', getWeather);
