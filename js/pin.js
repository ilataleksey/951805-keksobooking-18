'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var renderPin = function (obj) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = obj.location.x;
    pinElement.style.top = obj.location.y;
    pinElement.querySelector('img').src = obj.author.avatar;
    pinElement.querySelector('img').alt = obj.offer.title;

    pinElement.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      window.map.mapFilterContainer.appendChild(window.card.getCard(obj));
    });

    return pinElement;
  };

  var mapMainPin = document.querySelector('.map__pin--main');
  var mapMainPinWidth = mapMainPin.offsetWidth;
  var mapMainPinHeight = mapMainPin.offsetHeight;

  mapMainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    window.map.mapActivation();
  });

  mapMainPin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, window.map.mapActivation);
  });

  window.pin = {
    // рассмотреть возможность определения автоматом
    MAP_MAIN_PIN_EDGE: 22,

    pinList: document.querySelector('.map__pins'),

    leftCoordinate: mapMainPin.offsetLeft + Math.round(mapMainPinWidth / 2),
    topCoordinate: mapMainPin.offsetTop + Math.round(mapMainPinHeight / 2),

    getAddress: function () {
      window.form.inputAddress.value = window.pin.leftCoordinate + ', ' + (window.pin.topCoordinate + Math.round(mapMainPinHeight / 2) + window.pin.MAP_MAIN_PIN_EDGE);
    },

    getPinList: function (arr) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < arr.length; i++) {
        fragment.appendChild(renderPin(arr[i]));
      }
      return fragment;
    }
  };
})();
