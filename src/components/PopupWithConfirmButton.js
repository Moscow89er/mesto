import Popup from "./Popup.js";
export default class PopupWithConfirmButton extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
    };
    setEventListeners () {
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        super.setEventListeners();
    };
};