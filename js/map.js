'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');

  var activateModeOn = function () {
    window.form.enableFilters();
    map.classList.remove('map--faded');
    addPinsOnMap();
  };

  window.pin.mainPin.addEventListener('mousedown', function (evt) {
    if (evt.which === 1) {
      activateModeOn();
      window.form.fillAddress();
    }
  });

  window.pin.mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      activateModeOn();
      window.form.fillAddress();
    }
  });

  var openPopup = function (evt) {
    openAnotherCard(evt);
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    window.card.popup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  map.addEventListener('click', function (evt) {
    var targetPin = evt.target.closest('.map__pin');
    if (!targetPin) {
      return;
    }
    openPopup(evt);
  });

  map.addEventListener('keydown', function (evt) {
    var targetPin = evt.target.closest('.map__pin');
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      if (!targetPin) {
        return;
      }
      openPopup(evt);
    }
  });

  window.card.popupCloseButton.addEventListener('click', function () {
    closePopup();
  });

  map.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closePopup();
    }
  });

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closePopup();
    }
  };

  var addPinsOnMap = function () {
    mapPins.appendChild(window.pin.pinFragment);
  };

  var openAnotherCard = function (evt) {
    if (!isNaN(window.pin.findIndexPinHandler(evt))) {
      window.card.cardFragment.appendChild(window.card.renderCard(window.data.objects[window.pin.findIndexPinHandler(evt)]));
      map.insertBefore(window.card.cardFragment, document.querySelector('.map__filters-container'));
      window.card.popup.classList.remove('hidden');
    }
  };
  map.insertBefore(window.card.cardFragment, document.querySelector('.map__filters-container'));
})();
