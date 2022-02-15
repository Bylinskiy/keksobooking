'use strict';
(function () {
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

  function getRandomCoordinate() {
    var arr = [window.util.getRandomInteger(COORDINATE_X.min, COORDINATE_X.max), window.util.getRandomInteger(COORDINATE_Y.min, COORDINATE_Y.max)];
    return arr;
  }

  function generateObject() {
    var objectCoordinate = getRandomCoordinate();
    var object = {
      author: {
        avatar: 'img/avatars/user0' + window.util.getRandomInteger(1, 8) + '.png'
      },
      offer: {
        title: window.util.getRandomElementFromArr(TITLE),
        address: objectCoordinate[0] + ', ' + objectCoordinate[1],
        price: window.util.getRandomInteger(1000, 5000),
        type: window.util.getRandomElementFromArr(TYPE),
        rooms: window.util.getRandomInteger(1, 4),
        guests: window.util.getRandomInteger(1, 4),
        checkin: window.util.getRandomElementFromArr(TIME),
        checkout: window.util.getRandomElementFromArr(TIME),
        features: window.util.generateRandomArray(FEATURES),
        description: window.util.getRandomElementFromArr(DESCRIPTION),
        photos: window.util.generateRandomArray(PHOTOS)
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

  window.data = {
    objects: objects
  };
})();
