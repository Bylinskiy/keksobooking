'use strict';
(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  function getRandomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  function getRandomElementFromArr(arr) {
    return arr[getRandomInteger(0, arr.length - 1)];
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

  window.util = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE,
    getRandomInteger: getRandomInteger,
    getRandomElementFromArr: getRandomElementFromArr,
    generateRandomArray: generateRandomArray,
  };
})();
