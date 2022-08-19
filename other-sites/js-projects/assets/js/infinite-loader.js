const postsContainer = document.getElementById('post-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

//Fetch posts from API
async function getPosts() {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  ).then((info) => info.json());
  return response;
}

//Show posts in DOM
async function showPosts() {
  const posts = await getPosts();
  posts.forEach((post) => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
    <div class="number">${post.id}</div>
    <div class="post-info">
      <h2 class="post-title">${post.title}</h2>
      <p class="post-body">
        ${post.body}
      </p>
    </div>
    `;
    postsContainer.append(postEl);
  });
}

//Show more posts
function showLoading() {
  loading.classList.add('show-loader');

  setTimeout(() => {
    loading.classList.remove('show-loader');

    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
}

//Filter posts
function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach((post) => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();

    if (title.includes(term)) {
      post.style.display = 'flex';
    } else post.style.display = 'none';
  });
}

showPosts();

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight == scrollHeight) {
    showLoading();
  }
});

filter.addEventListener('input', filterPosts);
