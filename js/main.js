'use strict';
var NUMBER_OF_OBJECTS = 8;
var ENTER_KEY = 'Enter';

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
// var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var filterSelect = filters.querySelectorAll('select');
var filterCheckbox = filters.querySelectorAll('.map__checkbox');
var mainPin = document.querySelector('.map__pin--main');

var disableFilters = function () {
  for (var i = 0; i < filterSelect.length; i++) {
    filterSelect[i].disabled = true;
  }

  for (var j = 0; j < filterCheckbox.length; j++) {
    filterCheckbox[i].disabled = true;
  }
};

var enableFilters = function () {
  for (var i = 0; i < filterSelect.length; i++) {
    filterSelect[i].disabled = false;
  }

  for (var j = 0; j < filterCheckbox.length; j++) {
    filterCheckbox[i].disabled = false;
  }
};

disableFilters();

var renderPin = function (element) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = 'left:' + (element.location.x - 40) + 'px;' + 'top:' + (element.location.y - 44 / 2) + 'px';
  pinElement.querySelector('img').src = element.author.avatar;
  pinElement.querySelector('img').alt = element.offer.title;
  return pinElement;
};

// var renderCard = function (element) {
//   var cardElement = cardTemplate.cloneNode(true);
//   cardElement.querySelector('.popup__title').textContent = element.offer.title;
//   cardElement.querySelector('.popup__text--address').textContent = element.offer.address;
//   cardElement.querySelector('.popup__text--price').textContent = element.offer.price + '₽/ночь';
//   switch (element.offer.type) {
//     case 'palace':
//       cardElement.querySelector('.popup__type').textContent = 'Дворец';
//       break;
//     case 'flat':
//       cardElement.querySelector('.popup__type').textContent = 'Квартира';
//       break;
//     case 'house':
//       cardElement.querySelector('.popup__type').textContent = 'Дом';
//       break;
//     case 'bungalo':
//       cardElement.querySelector('.popup__type').textContent = 'Бунгало';
//       break;
//   }
//   cardElement.querySelector('.popup__text--capacity').textContent = element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей';
//   cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + element.offer.checkin + ' , выезд до ' + element.offer.checkout;
//   var featuresString = '';
//   for (var i = 0; i < element.offer.features.length; i++) {
//     if (i < (element.offer.features.length - 1)) {
//       featuresString += element.offer.features[i] + ', ';
//     } else {
//       featuresString += element.offer.features[i] + '.';
//     }
//   }
//   cardElement.querySelector('.popup__features').textContent = featuresString;
//   cardElement.querySelector('.popup__description').textContent = element.offer.description;
//   var photoFragment = document.createDocumentFragment();
//   for (var j = 0; j < element.offer.photos.length; j++) {
//     if (j !== 0) {
//       var photoElement = cardElement.querySelector('.popup__photo').cloneNode(true);
//       photoElement.src = element.offer.photos[j];
//       photoFragment.appendChild(photoElement);
//     } else {
//       cardElement.querySelector('.popup__photo').src = element.offer.photos[j];
//     }
//   }
//   cardElement.querySelector('.popup__photos').appendChild(photoFragment);
//   cardElement.querySelector('.popup__avatar').src = element.author.avatar;
//   return cardElement;
// };

var pinFragment = document.createDocumentFragment();
// var cardFragment = document.createDocumentFragment();
for (var i = 0; i < objects.length; i++) {
  pinFragment.appendChild(renderPin(objects[i]));
  // cardFragment.appendChild(renderCard(objects[i]));
}
mapPins.appendChild(pinFragment);
// map.insertBefore(cardFragment, document.querySelector('.map__filters-container'));

var activateModeOn = function () {
  enableFilters();
  map.classList.remove('map--faded');
};

mainPin.addEventListener('mousedown', function (evt) {
  if (evt.which === 1) {
    activateModeOn();
  }
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    activateModeOn();
  }
});
