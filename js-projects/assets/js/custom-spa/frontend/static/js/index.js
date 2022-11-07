/* eslint-disable arrow-body-style */
/* eslint-disable object-shorthand */
/* eslint-disable import/extensions */
// Modules import
import Dashboard from './views/Dashboard.js';
import Posts from './views/Posts.js';
import Settings from './views/Settings.js';

/**
 * Redirecting by the link, without reloading
 *
 * @param {string} url Current page url
 */
const navigateTo = (url) => {
  // Change history state
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
    {
      path: '/',
      view: Dashboard,
    },
    {
      path: '/posts',
      view: Posts,
    },
    {
      path: '/settings',
      view: Settings,
    },
  ];

  // Test each route for potential match
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
    };
  });

  // Select the potential match
  let match = potentialMatches.find((item) => item.isMatch === true);

  // If there's no matches, then use the first element
  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    };
  }

  // console.log(match.route.path);
  // console.log(match.route.view());

  // Creation a View instance
  const view = new match.route.view();

  // Take the html from the view
  document.querySelector('#app').innerHTML = await view.getHTML();
};

// Event Listeners

// To fix the history bug
window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
  // To see if there is click on the link
  document.body.addEventListener('click', (event) => {
    if (event.target.matches('[data-link]')) {
      event.preventDefault();
      // Go to the link
      navigateTo(event.target.href);
    }
  });
  // Call the DOM changing
  router();
});
