'use strict';
var NUMBER_OF_OBJECTS = 8;
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

var TITLE = [
  'Топовая хата',
  'Нормас жилье',
  'Хибара',
  'Конура',
  'Будка',
  'Хата, как хата'
];

var TYPE = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var TIME = [
  '12:00',
  '13:00',
  '14:00'
];

var DESCRIPTION = [
  'Идеальное жилье, недалеко от метро Пыщ пыщ',
  'Lorem ipsum абырвалг абырвалг',
  'Подходящая конура для такого пса как ты',
  'Омай гад это лучшее жилье что я видел на своем веку, приезжай и убедись в этом сам',
  'Классическая собачья будка, оснащенная по последнему слову техники. Вас просто разорвет от диссонанса',
  'Хотите испытать фрустрацию? Тогда это жилье определенно подойдет вам!'
];

var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var COORDINATE_X = {
  min: 300,
  max: 900
};

var COORDINATE_Y = {
  min: 130,
  max: 630
};

function getRandomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function getRandomElementFromArr(arr) {
  return arr[getRandomInteger(0, arr.length - 1)];
}

function getRandomCoordinate() {
  var arr = [getRandomInteger(COORDINATE_X.min, COORDINATE_X.max), getRandomInteger(COORDINATE_Y.min, COORDINATE_Y.max)];
  return arr;
}

function isArrayContain(arr, elem) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === elem) {
      return true;
    }
  }
  return false;
}

function generateRandomArray(arr) {
  var randomArr = [];
  for (var i = 0; i <= getRandomInteger(0, arr.length - 1); i++) {
    var randomElement = getRandomElementFromArr(arr);
    if (isArrayContain(randomArr, randomElement)) {
      i--;
    } else {
      randomArr.push(randomElement);
    }
  }
  return randomArr;
}

function generateObject() {
  var objectCoordinate = getRandomCoordinate();
  var object = {
    author: {
      avatar: 'img/avatars/user0' + getRandomInteger(1, 8) + '.png'
    },
    offer: {
      title: getRandomElementFromArr(TITLE),
      address: objectCoordinate[0] + ', ' + objectCoordinate[1],
      price: getRandomInteger(1000, 5000),
      type: getRandomElementFromArr(TYPE),
      rooms: getRandomInteger(1, 4),
      guests: getRandomInteger(1, 4),
      checkin: getRandomElementFromArr(TIME),
      checkout: getRandomElementFromArr(TIME),
      features: generateRandomArray(FEATURES),
      description: getRandomElementFromArr(DESCRIPTION),
      photos: generateRandomArray(PHOTOS)
    },
    location: {
      x: objectCoordinate[0],
      y: objectCoordinate[1]
    }
  };
  return object;
}

function generateArrayOfObjects() {
  var arr = [];
  for (var i = 0; i < NUMBER_OF_OBJECTS; i++) {
    arr[i] = generateObject();
  }
  return arr;
}

var objects = generateArrayOfObjects();

var map = document.querySelector('.map');
var filters = document.querySelector('.map__filters');

var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var filterSelect = filters.querySelectorAll('select');
var filterCheckbox = filters.querySelector('.map__features');
var mainPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormFieldSets = document.querySelectorAll('fieldset');

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

var renderPin = function (element, index) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = 'left:' + (element.location.x - 40) + 'px;' + 'top:' + (element.location.y - 44 / 2) + 'px';
  pinElement.querySelector('img').src = element.author.avatar;
  pinElement.querySelector('img').alt = element.offer.title;
  pinElement.setAttribute('data-pin-index', index);
  return pinElement;
};

var cardElement = cardTemplate.cloneNode(true);
var cardFragment = document.createDocumentFragment();
cardFragment.appendChild(cardElement);
var popup = cardFragment.querySelector('.popup');

var popupCloseButton = cardFragment.querySelector('.popup__close');
popup.classList.add('hidden');
var renderCard = function (element) {
  cardElement.querySelector('.popup__title').textContent = element.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = element.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = element.offer.price + '₽/ночь';
  switch (element.offer.type) {
    case 'palace':
      cardElement.querySelector('.popup__type').textContent = 'Дворец';
      break;
    case 'flat':
      cardElement.querySelector('.popup__type').textContent = 'Квартира';
      break;
    case 'house':
      cardElement.querySelector('.popup__type').textContent = 'Дом';
      break;
    case 'bungalo':
      cardElement.querySelector('.popup__type').textContent = 'Бунгало';
      break;
  }
  cardElement.querySelector('.popup__text--capacity').textContent = element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + element.offer.checkin + ' , выезд до ' + element.offer.checkout;
  var featureListFragment = document.createDocumentFragment();
  var featureList = cardElement.querySelector('.popup__features').cloneNode();
  for (var i = 0; i < element.offer.features.length; i++) {
    var featureListElement = cardElement.querySelector('.popup__feature').cloneNode(true);
    featureListElement.className = 'popup__feature';
    featureListElement.classList.add('popup__feature--' + element.offer.features[i]);
    featureList.appendChild(featureListElement);
  }
  featureListFragment.appendChild(featureList);
  cardElement.querySelector('.popup__features').replaceWith(featureListFragment);
  cardElement.querySelector('.popup__description').textContent = element.offer.description;

  var photoFragment = document.createDocumentFragment();
  var photoContainer = cardElement.querySelector('.popup__photos').cloneNode(true);
  while (photoContainer.firstChild) {
    photoContainer.removeChild(photoContainer.firstChild);
  }
  for (var j = 0; j < element.offer.photos.length; j++) {
    var photoElement = cardElement.querySelector('.popup__photo').cloneNode(true);

    photoContainer.appendChild(photoElement);
    photoContainer.children[j].src = element.offer.photos[j];
  }
  photoFragment.appendChild(photoContainer);
  cardElement.querySelector('.popup__photos').replaceWith(photoFragment);
  cardElement.querySelector('.popup__avatar').src = element.author.avatar;
  cardElement.classList.add('hidden');
  return cardElement;
};

var openAnotherCard = function (evt) {
  if (!isNaN(findIndexPinHandler(evt))) {
    cardFragment.appendChild(renderCard(objects[findIndexPinHandler(evt)]));
    map.insertBefore(cardFragment, document.querySelector('.map__filters-container'));
    popup.classList.remove('hidden');
  }
};
map.insertBefore(cardFragment, document.querySelector('.map__filters-container'));

var pinFragment = document.createDocumentFragment();
for (var i = 0; i < objects.length; i++) {
  pinFragment.appendChild(renderPin(objects[i], i));
}
var addPinsOnMap = function () {
  mapPins.appendChild(pinFragment);
};

var activateModeOn = function () {
  enableFilters();
  map.classList.remove('map--faded');
  addPinsOnMap();
};

mainPin.addEventListener('mousedown', function (evt) {
  if (evt.which === 1) {
    activateModeOn();
    fillAddress();
  }
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activateModeOn();
    fillAddress();
  }
});

var getCoordsMainPin = function () {
  var pinBox = mainPin.getBoundingClientRect();
  var mapBox = map.getBoundingClientRect();

  var mainPinCoords = {
    x: pinBox.x - mapBox.x,
    y: pinBox.y - mapBox.y
  };
  return mainPinCoords;
};

var noticeAddress = document.querySelector('.notice').querySelector('#address');

var fillAddress = function () {
  var pinCoords = getCoordsMainPin();
  noticeAddress.value = pinCoords.x + ', ' + pinCoords.y;
};

fillAddress();

var roomNumberSelect = document.querySelector('#room_number');
var capacitySelect = document.querySelector('#capacity');
var uploadButton = document.querySelector('.ad-form__submit');

uploadButton.addEventListener('click', function () {
  var roomNum = Number(roomNumberSelect.value);
  var guestsNum = Number(capacitySelect.value);
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
});

var findIndexPinHandler = function (evt) {
  var targetPin = evt.target.closest('.map__pin');
  return targetPin.dataset.pinIndex;
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function (evt) {
  openAnotherCard(evt);
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  popup.classList.add('hidden');
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
  if (evt.keyCode === ENTER_KEYCODE) {
    if (!targetPin) {
      return;
    }
    openPopup(evt);
  }
});

popupCloseButton.addEventListener('click', function () {
  closePopup();
});

map.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
});
