import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupTitlePicture = this._popup.querySelector('.popup__title-picture');
    };
    open  = (name, link) => {
        this._popupImage.src = link;
        this._popupImage.alt = name;
        this._popupTitlePicture.textContent = name;
        super.open();
    };
};