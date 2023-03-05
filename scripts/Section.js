import { Card } from './Card.js';

export default class Section {
    constructor ({ data /*, renderer*/ }, containerSelector) {
        this._renderedItems = data;
        this._container = document.querySelector(containerSelector);
        };
        addItem (element) {
            this._container.prepend(element);
        };
        renderItems () {
            this._renderedItems.forEach((item) => {
                const card = new Card (item, '.card_type_default');
                const sectionElement = card.generateCard();
                this.addItem(sectionElement);
            });
        };
    };