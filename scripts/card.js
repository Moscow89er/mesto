import { initialCards } from './constants.js';
import { openPopup } from './index.js';
export class Card {
    constructor(data, templateSelector) {
      this._name = data.name;
      this._link = data.link;
      this._templateSelector = templateSelector;
    };
    _getTemplate() {
      const cardElement = document.querySelector(this._templateSelector).content.cloneNode(true);
      return cardElement;
    };
    generateCard() {
      this._element = this._getTemplate();
      this._elementImage = this._element.querySelector('.card__image');
      this._elementTitle = this._element.querySelector('.card__title');
      this._deleteButton = this._element.querySelector('.card__delete-button');
      this._likeButton = this._element.querySelector('.card__like-button');
      this._setEventListeners();
      this._elementTitle.textContent = this._name;
      this._elementImage.alt = this._name;
      this._elementImage.src = this._link;
      return this._element;
    };
    _setEventListeners() {
      this._likeButton.addEventListener('click', () => {
        this._likeCard();
      });
      this._deleteButton.addEventListener('click', () => {
        this._deleteCard();
      });
      this._elementImage.addEventListener('click', () => {
        const popupPicture = document.querySelector('.popup_picture');
        const popupImage = document.querySelector('.popup__image');
        const popupTitlePicture = document.querySelector('.popup__title-picture');
        openPopup(popupPicture);
        popupImage.src = this._link;
        popupImage.alt = this._name;
        popupTitlePicture.textContent = this._name;
      });
    };
    _likeCard() {
      this._likeButton.classList.toggle('card__like-button_active');
    };
    _deleteCard() {
      this._deleteButton.closest('.card__container').remove();
    };
};
initialCards.forEach (newCard => {
    const card = new Card(newCard, '.card_type_default');
    const cardElement = card.generateCard();
    document.querySelector('.cards').append(cardElement);
});