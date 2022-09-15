import Dashboard from './views/Dashboard.js';
import Posts from './views/Posts.js';
import Settings from './views/Settings.js';

const navigateTo = (url) => {
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

  //Test each route for potential match
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
    };
  });

  let match = potentialMatches.find((item) => item.isMatch === true);

  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    };
  }

  // console.log(match.route.path);
  // console.log(match.route.view());

  const view = new match.route.view();

  document.querySelector('#app').innerHTML = await view.getHTML();
};

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (event) => {
    if (event.target.matches('[data-link]')) {
      event.preventDefault();
      navigateTo(event.target.href);
    }
  });
  router();
});
