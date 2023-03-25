export default class Card {
    constructor({ data, handleCardClick, handleLikeClick, handleDeleteIconClick, handleOpenPopupWithConfirmButton, handleClosePopupWithConfirmButton }, api, userId, templateSelector) {
      this._name = data.name;
      this._link = data.link;
      this._likes = data.likes;
      this._cardId = data._id;
      this._ownerId = data.owner._id;
      this._handleCardClick = handleCardClick;
      this._handleLikeClick = handleLikeClick;
      this._handleDeleteIconClick = handleDeleteIconClick;
      this._handleOpenPopupWithConfirmButton = handleOpenPopupWithConfirmButton;
      this._handleClosePopupWithConfirmButton = handleClosePopupWithConfirmButton;
      this._api = api;
      this._userId = userId;
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
      this._likesNumber = this._card.querySelector('.card__likes-number');
      this._setEventListeners();
      this._cardTitle.textContent = this._name;
      this._cardImage.alt = this._name;
      this._cardImage.src = this._link;
      this._likesNumber.textContent = this._likes.length;

      if ((this._userId === this._ownerId)) {
        this._buttonDelete.addEventListener('click', () => {
          this._handleOpenPopupWithConfirmButton();
          this._confirmButtonListener();
        })
      } else {
        this._buttonDelete.remove();
      };

      return this._card;
    };
    _setEventListeners() {
      this._buttonLike.addEventListener('click', () => {
        this._likeCard();
      });
      /*this._buttonDelete.addEventListener('click', () => {
        this._handleOpenPopupWithConfirmButton();
        this._confirmButtonListener();
      });*/
      this._cardImage.addEventListener('click', () => {
        this._handleCardClick(this._name, this._link);
      });
    };
    _likeCard() {
      this._buttonLike.classList.toggle('card__like-button_active');
    };
    _deleteCard() {
      this._cardContainer.remove();
      this._card = null;
    };
    _confirmButtonListener() {
      document.querySelector('.popup__confirm-button').addEventListener('click', () => {
        this._deleteCard();
        this._handleClosePopupWithConfirmButton();
      });
    };
};