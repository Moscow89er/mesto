import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor ({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._popupSelector = popupSelector;
        this._handleFormSubmit = handleFormSubmit;
    };
    _getInputValues () {
        this._inputList = this._popup.querySelectorAll('.popup__input');

        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    };
    setEventListeners () {
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._handleFormSubmit(this._getInputValues());

        });
        this._buttonTypeClose.addEventListener('click', () => {
            this.close();
        });
        this._popup.addEventListener('mousedown', this._handleClosePopupByOverlay);
    };
    close () {
        document.removeEventListener('keydown', this._handleEscClose);
        this._popup.classList.remove('popup_opened');
        //this._popup.reset();
    };
};