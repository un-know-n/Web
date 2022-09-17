/* eslint-disable class-methods-use-this */
/**
 * Parent View class
 *
 * @export
 * @class AbstractView
 */
export default class AbstractView {
  /**
   * Sets the title of the page
   *
   * @param {*} title
   * @memberof AbstractView
   */
  setTitle(title) {
    document.title = title;
  }

  async getHTML() {
    return '';
  }
}
