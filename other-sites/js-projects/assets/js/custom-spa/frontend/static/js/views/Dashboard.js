/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import AbstractView from './AbstractView.js';

/**
 * Stands for generating the dashboard page
 *
 * @export
 * @class Dashboard
 * @extends {AbstractView}
 */
export default class Dashboard extends AbstractView {
  constructor() {
    super();
    this.setTitle('Dashboard');
  }

  /**
   * Return the DOM of the page
   *
   * @return {string}
   * @memberof Dashboard
   */
  async getHTML() {
    return `
            <h1>Welcome back</h1>
            <p>
                Fugiat voluptate et nisi Lorem cillum anim sit do eiusmod occaecat irure do. Reprehenderit anim fugiat sint exercitation consequat. Sit anim laborum sit amet Lorem adipisicing ullamco duis. Anim in do magna ea pariatur et.
            </p>
            <p>
                <a href="/posts" data-link>View recent posts</a>.
            </p>
        `;
  }
}
