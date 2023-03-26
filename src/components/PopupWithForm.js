import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._handleFormSubmit = handleFormSubmit;
        this._buttonSubmit = this._popup.querySelector('.popup__save-button');
        this._buttonSubmitDefaultText = this._buttonSubmit.textContent;
    };
    _getInputValues() {
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    };
    setEventListeners() {
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
        super.setEventListeners();
    };
    close() {
        this._form.reset();
        super.close();
    };
    renderLoading(isLoading) {
        if (isLoading) {
            this._buttonSubmit.textContent = 'Сохранение...';
        } else {
            this._buttonSubmit.textContent = this._buttonSubmitDefaultText;
        }
    };
};