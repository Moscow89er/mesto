import Popup from './Popup.js';
import {popupImage, popupTitlePicture} from './constants.js';
export default class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
    };
    open  = (name, link) => {
        document.addEventListener('keydown', this._handleEscClose);
        popupImage.src = link;
        popupImage.alt = name;
        popupTitlePicture.textContent = name;
        this._popup.classList.add('popup_opened');
    };
};