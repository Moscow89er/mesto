import { 
    popupPicture,
    popupImage,
    popupTitlePicture
  } from './constants.js';
import { popupList } from './constants.js';
import { handleClosePopupByOverlay, clickEscapeClosePopup } from './index.js';
export const openPopup = (popup) => {
    popupList.forEach (() => {
      popup.addEventListener('mousedown', handleClosePopupByOverlay);
    });
    document.addEventListener('keydown', clickEscapeClosePopup);
    popup.classList.add('popup_opened');
};
export const openImagePopup = (name, link) => {
    popupImage.src = link;
    popupImage.alt = name;
    popupTitlePicture.textContent = name;
    openPopup(popupPicture);
};