'use strict';
(function () {

  var main = document.querySelector('main');

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorElement = errorTemplate.cloneNode(true);
  var errorFragment = document.createDocumentFragment();
  errorFragment.appendChild(errorElement);
  var errorCloseButton = errorFragment.querySelector('.error__button');

  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var successElement = successTemplate.cloneNode(true);
  var successFragment = document.createDocumentFragment();
  successFragment.appendChild(successElement);

  var successHandler = function () {
    main.appendChild(successElement);
  };

  var errorHandler = function (errorMessage) {
    errorElement.querySelector('.error__message').textContent = errorMessage;
    main.appendChild(errorElement);
  };

  window.msg = {
    errorHandler: errorHandler,
    successHandler: successHandler,
    errorCloseButton: errorCloseButton,
  };

})();


