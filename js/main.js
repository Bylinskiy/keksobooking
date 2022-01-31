'use strict';
var NUMBER_OF_OBJECTS = 8;

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

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPin = document.querySelector('.map--pin');
