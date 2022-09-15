import AbstractView from './AbstractView.js';

export default class Posts extends AbstractView {
  constructor(params) {
    super();
    this.setTitle('Posts');
  }

  async getHTML() {
    return `
            <h1>Posts</h1>
            <p>You are viewing the posts!</p>
        `;
  }
}
