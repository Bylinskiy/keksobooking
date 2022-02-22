'use strict';
(function () {

  var filters = document.querySelector('.map__filters');
  var filterSelect = filters.querySelectorAll('select');
  var filterCheckbox = filters.querySelector('.map__features');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldSets = document.querySelectorAll('fieldset');
  var address = document.querySelector('#address');

  var enableFilters = function () {
    for (var i = 0; i < filterSelect.length; i++) {
      filterSelect[i].disabled = false;
    }
    filterCheckbox.disabled = false;
    adForm.classList.remove('ad-form--disabled');
    for (var j = 0; j < adFormFieldSets.length; j++) {
      adFormFieldSets[j].disabled = false;
    }
  };

  var fillAddress = function () {
    var pinCoords = window.pin.getCoordsMainPin();
    address.value = pinCoords.x + ', ' + pinCoords.y;
  };

  fillAddress();

  var roomNumberSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');
  var typeSelect = document.querySelector('#type');
  var checkinSelect = document.querySelector('#timein');
  var checkoutSelect = document.querySelector('#timeout');
  var title = document.querySelector('#title');
  var price = document.querySelector('#price');
  var uploadButton = document.querySelector('.ad-form__submit');

  uploadButton.addEventListener('click', function () {
    var roomNum = Number(roomNumberSelect.value);
    var guestsNum = Number(capacitySelect.value);
    var type = typeSelect.value;
    switch (roomNum) {
      case 1:
        if (guestsNum !== roomNum) {
          roomNumberSelect.setCustomValidity('К сожалению, размещение возможно только для одного гостя.');
        } else {
          roomNumberSelect.setCustomValidity('');
        }
        break;
      case 2:
      case 3:
        if (guestsNum > roomNum || guestsNum === 0) {
          roomNumberSelect.setCustomValidity('К сожалению, в ' + roomNum + ' комнатах можно разместить от 1 до ' + roomNum + ' гостей');
        } else {
          roomNumberSelect.setCustomValidity('');
        }
        break;
      case 100:
        if (guestsNum !== 0) {
          roomNumberSelect.setCustomValidity('К сожалению, эти комнаты не предназначены для гостей.');
        } else {
          roomNumberSelect.setCustomValidity('');
        }
        break;
      default:
        roomNumberSelect.setCustomValidity('');
    }

    if (title.value.length < 30) {
      title.setCustomValidity('Минимальная длина заголовка — 30 символов');
    } else if (title.value.length > 100) {
      title.setCustomValidity('Максимальная длина заголовка — 100 символов');
    } else {
      title.setCustomValidity('');
    }

    if (isNaN(Number(price.value))) {
      price.setCustomValidity('К сожалению, это числовое поле');
    } else if (Number(price.value) > 1000000) {
      price.setCustomValidity('К сожалению, максимальная стоимость 1 000 000');
    } else {
      price.setCustomValidity('');
    }

    if (type === 'bungalo' && Number(price.value) < 0) {
      typeSelect.setCustomValidity('К сожалению, минимальная стоимость за этот тип жилья 0');
    } else if (type === 'flat' && Number(price.value) < 1000) {
      typeSelect.setCustomValidity('К сожалению, минимальная стоимость за этот тип жилья 1 000');
    } else if (type === 'house' && Number(price.value) < 5000) {
      typeSelect.setCustomValidity('К сожалению, минимальная стоимость за этот тип жилья 5 000');
    } else if (type === 'palace' && Number(price.value) < 10000) {
      typeSelect.setCustomValidity('К сожалению, минимальная стоимость за этот тип жилья 10 000');
    } else {
      typeSelect.setCustomValidity('');
    }
  });

  typeSelect.addEventListener('change', function () {
    if (typeSelect.value === 'bungalo') {
      price.placeholder = '0';
    } else if (typeSelect.value === 'flat') {
      price.placeholder = '1000';
    } else if (typeSelect.value === 'house') {
      price.placeholder = '5000';
    } else if (typeSelect.value === 'palace') {
      price.placeholder = '10000';
    }
  });

  checkinSelect.addEventListener('change', function () {
    switch (checkinSelect.value) {
      case '12:00':
        checkoutSelect.options[0].selected = true;
        break;
      case '13:00':
        checkoutSelect.options[1].selected = true;
        break;
      case '14:00':
        checkoutSelect.options[2].selected = true;
        break;
    }
  });

  checkoutSelect.addEventListener('change', function () {
    switch (checkoutSelect.value) {
      case '12:00':
        checkinSelect.options[0].selected = true;
        break;
      case '13:00':
        checkinSelect.options[1].selected = true;
        break;
      case '14:00':
        checkinSelect.options[2].selected = true;
        break;
    }
  });

  var onErrBtnEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeErrMsg();
      closeScsMsg();
    }
  };

  adForm.addEventListener('submit', function (evt) {
    window.backend.post(new FormData(adForm), window.msg.successHandler, window.msg.errorHandler);
    evt.preventDefault();
    adForm.reset();
    document.addEventListener('keydown', onErrBtnEscPress);
  });

  var closeErrMsg = function () {
    document.removeEventListener('keydown', onErrBtnEscPress);
    document.querySelector('.error').remove();
  };

  var closeScsMsg = function () {
    document.removeEventListener('keydown', onErrBtnEscPress);
    document.querySelector('.success').remove();
  };

  adForm.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      closeErrMsg();
    }
  });

  window.msg.errorCloseButton.addEventListener('click', function () {
    closeErrMsg();
  });

  adForm.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      closeScsMsg();
    }
  });

  adForm.addEventListener('mousedown', function (evt) {
    if (evt.which === 1) {
      closeScsMsg();
    }
  });


  window.form = {
    enableFilters: enableFilters,
    fillAddress: fillAddress
  };
})();
