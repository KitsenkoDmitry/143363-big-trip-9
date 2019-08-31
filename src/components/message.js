import AbstractComponent from "./abstractComponent";

class Message extends AbstractComponent {
  constructor(text) {
    super();
    this._text = text;
  }

  getTemplate() {
    return `
      <p class="trip-events__msg">${this._text}</p>
    `;
  }
}

export default Message;
