'use strict';
(function () {
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (element, index) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style = 'left:' + (element.location.x - 40) + 'px;' + 'top:' + (element.location.y - 44 / 2) + 'px';
    pinElement.querySelector('img').src = element.author.avatar;
    pinElement.querySelector('img').alt = element.offer.title;
    pinElement.setAttribute('data-pin-index', index);
    return pinElement;
  };

  var pinFragment = document.createDocumentFragment();
  for (var i = 0; i < window.data.objects.length; i++) {
    pinFragment.appendChild(renderPin(window.data.objects[i], i));
  }

  var getCoordsMainPin = function () {
    var pinBox = mainPin.getBoundingClientRect();
    var mapBox = map.getBoundingClientRect();

    var mainPinCoords = {
      x: pinBox.x - mapBox.x,
      y: pinBox.y - mapBox.y
    };
    return mainPinCoords;
  };

  var findIndexPinHandler = function (evt) {
    var targetPin = evt.target.closest('.map__pin');
    return targetPin.dataset.pinIndex;
  };

  window.pin = {
    getCoordsMainPin: getCoordsMainPin,
    findIndexPinHandler: findIndexPinHandler,
    mainPin: mainPin,
    pinFragment: pinFragment,
  };
})();
