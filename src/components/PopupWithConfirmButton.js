import Popup from "./Popup.js";
export default class PopupWithConfirmButton extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
        this._buttonSubmit = this._popup.querySelector('.popup__confirm-button');
        this._buttonSubmitDefaultText = this._buttonSubmit.textContent;
    };
    setEventListeners() {
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitCallback();
        });
        super.setEventListeners();
    };
    setSubmitAction(action) {
        this._submitCallback = action;
    };
    renderLoading(isLoading) {
        if (isLoading) {
            this._buttonSubmit.textContent = 'Удаление...';
        } else {
            this._buttonSubmit.textContent = this._buttonSubmitDefaultText;
        }
    };
};