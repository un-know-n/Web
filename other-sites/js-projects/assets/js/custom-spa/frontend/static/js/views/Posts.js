/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import AbstractView from './AbstractView.js';

/**
 * Stands for generating the posts page
 *
 * @export
 * @class Posts
 * @extends {AbstractView}
 */
export default class Posts extends AbstractView {
  constructor() {
    super();
    this.setTitle('Posts');
  }

  /**
   * Return the DOM of the page
   *
   * @return {string}
   * @memberof Posts
   */
  async getHTML() {
    return `
            <h1>Posts</h1>
            <p>You are viewing the posts!</p>
        `;
  }
}
