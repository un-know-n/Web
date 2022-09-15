import AbstractView from './AbstractView.js';

export default class Settings extends AbstractView {
  constructor(params) {
    super();
    this.setTitle('Settings');
  }

  async getHTML() {
    return `
    <h1>Settings</h1>
    <p>Manage your privacy and configuration.</p>
`;
  }
}
