class Section {
  constructor({ data, renderer }, containerSelector, howManyCards) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = containerSelector;
    this._howManyCards = howManyCards;
  }

  addItem(element) {
    if (this._howManyCards === 'manyCards') {
    this._container.append(element);
    }
    else {
    this._container.prepend(element);
    }
  }

  renderItems() {

    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
}

export { Section as Section };
