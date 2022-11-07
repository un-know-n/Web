/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import AbstractView from './AbstractView.js';

/**
 * Stands for generating the settings page
 *
 * @export
 * @class Settings
 * @extends {AbstractView}
 */
export default class Settings extends AbstractView {
  constructor() {
    super();
    this.setTitle('Settings');
  }

  /**
   * Return the DOM of the page
   *
   * @return {string}
   * @memberof Settings
   */
  async getHTML() {
    return `
    <h1>Settings</h1>
    <p>Manage your privacy and configuration.</p>
`;
  }
}
