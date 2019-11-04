'use strict';

(function () {
  window.backend = {
    URL: 'https://js.dump.academy/keksobooking',
    load: function (url, onLoad, onError) {
      url = url + '/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000; // 10s

      xhr.open('GET', url);
      xhr.send();
    },

    send: function (url, data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000; // 10s

      xhr.open('POST', url);
      xhr.send(data);
    },

    successLoadHandler: function (accommodations) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < accommodations.length; i++) {
        fragment.appendChild(window.pin.renderPin(accommodations[i]));
      }
      window.pin.pinList.appendChild(fragment);
    },

    errorHandler: function (errorMessage) {
      var errorTemplate = document.querySelector('#error')
        .content
        .querySelector('.error');
      var errorElement = errorTemplate.cloneNode(true);
      errorElement.querySelector('.error__message').textContent = errorMessage;
      document.querySelector('main').insertAdjacentElement('afterbegin', errorElement);

      var errorButton = errorElement.querySelector('.error__button');

      errorButton.addEventListener('click', function () {
        errorElement.remove();
      });

      window.addEventListener('keydown', function (evt) {
        window.util.isEscEvent(evt, errorElement.remove());
      });
    },

    successSendHandler: function () {
      var successTemplate = document.querySelector('#success')
        .content
        .querySelector('.success');
      var successElement = successTemplate.cloneNode(true);
      document.querySelector('main').insertAdjacentElement('afterbegin', successElement);

      window.addEventListener('click', function () {
        successElement.remove();
      });

      window.addEventListener('keydown', function (evt) {
        window.util.isEscEvent(evt, successElement.remove());
      });
    }
  };
})();
