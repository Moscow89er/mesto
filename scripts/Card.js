/*import { popupWithImageFormSelector } from './constants.js';
import PopupWithImage from './PopupWithImage.js';
const popupWithImage = new PopupWithImage (popupWithImageFormSelector);*/
export default class Card {
    constructor({ name, link, handleCardClick }, templateSelector) {
      this._name = name;
      this._link = link;
      this._handleCardClick = handleCardClick;
      this._templateSelector = templateSelector;
    };
    _getTemplate() {
      const cardElement = document.querySelector(this._templateSelector).content.cloneNode(true);
      return cardElement;
    };
    generateCard() {
      this._card = this._getTemplate();
      this._cardContainer = this._card.querySelector('.card__container');
      this._cardImage = this._card.querySelector('.card__image');
      this._cardTitle = this._card.querySelector('.card__title');
      this._buttonDelete = this._card.querySelector('.card__delete-button');
      this._buttonLike = this._card.querySelector('.card__like-button');
      this._setEventListeners();
      this._cardTitle.textContent = this._name;
      this._cardImage.alt = this._name;
      this._cardImage.src = this._link;
      return this._card;
    };
    _setEventListeners() {
      this._buttonLike.addEventListener('click', () => {
        this._likeCard();
      });
      this._buttonDelete.addEventListener('click', () => {
        this._deleteCard();
      });
      /*this._cardImage.addEventListener('click', () => {
        popupWithImage.open(this._name, this._link);
      });*/
    };
    _likeCard() {
      this._buttonLike.classList.toggle('card__like-button_active');
    };
    _deleteCard() {
      this._cardContainer.remove();
      this._card = null;
    };
};