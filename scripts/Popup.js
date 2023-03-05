export default class Popup {
    constructor (popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._buttonTypeClose = this._popup.querySelector('.popup__close-button');
    };
    open () {
        this._popup.classList.add('popup_opened');
    };
    close () {
        //this._popup.removeEventListener('keydown', this._handleEscClose);
        this._popup.classList.remove('popup_opened');
    };
    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            console.log('Ты нажал на Esc');
            this.close();
        }
    };
    _handleClosePopupByOverlay = (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
          this.close();
        }
    };
    setEventListeners () {
        this._buttonTypeClose.addEventListener('click', () => {
            this.close();
        });
        this._popup.addEventListener('mousedown', this._handleClosePopupByOverlay);
        document.addEventListener('keydown', this._handleEscClose);
    };
};
/*export const handleClosePopupByEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};
*/