class Popup {
   constructor(popup) {
     this._popup = popup;
   }

 open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', evt => this._handleEscClose(evt))
    }


 close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', evt => this._handleEscClose(evt))
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup')
         || evt.target.classList.contains('popup__btn-close')
         || evt.target.classList.contains('popup-photo__container')
         || evt.target.classList.contains('popup__container'))
          {
            this.close();
          }
      })
  }

}

export { Popup as Popup };
