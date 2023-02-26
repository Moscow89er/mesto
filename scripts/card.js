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
      this._card = this._getTemplate();
      this._cardtImage = this._card.querySelector('.card__image');
      this._cardTitle = this._card.querySelector('.card__title');
      this._buttonDelete = this._card.querySelector('.card__delete-button');
      this._buttonLike = this._card.querySelector('.card__like-button');
      this._setEventListeners();
      this._cardTitle.textContent = this._name;
      this._cardtImage.alt = this._name;
      this._cardtImage.src = this._link;
      return this._card;
    };
    _setEventListeners() {
      this._buttonLike.addEventListener('click', () => {
        this._likeCard();
      });
      this._buttonDelete.addEventListener('click', () => {
        this._deleteCard();
      });
      this._cardtImage.addEventListener('click', () => {
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
      this._buttonLike.classList.toggle('card__like-button_active');
    };
    _deleteCard() {
      this._buttonDelete.closest('.card__container').remove();
    };
};
initialCards.forEach (newCard => {
    const card = new Card(newCard, '.card_type_default');
    const cardElement = card.generateCard();
    document.querySelector('.cards').append(cardElement);
});