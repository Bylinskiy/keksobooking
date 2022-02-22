'use strict';
(function () {
  var URL = {
    GET: 'https://22.javascript.pages.academy/keksobooking/data',
    POST: 'https://24.javascript.pages.academy/keksobooking'
  };

  var timeout = 10000;
  var statusCode = {
    OK: 200
  };

  var request = function (method, url, loadingMsg, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Ошибка, статус ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Ошибка, превышено время ожидания ответа (' + xhr.timeout + ' мс)');
    });

    xhr.timeout = timeout;
    xhr.open(method, url);

    if (typeof data !== 'undefined') {
      xhr.send(data);
    } else {
      xhr.send();
    }
  };

  var get = function (onSuccess, onError) {
    request('GET', URL.GET, 'Загрузка...', onSuccess, onError);
  };

  var post = function (data, onSuccess, onError) {
    request('POST', URL.POST, 'Загрузка...', onSuccess, onError);
  };

  window.backend = {
    get: get,
    post: post
  };
})();
