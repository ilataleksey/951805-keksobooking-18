'use strict';

(function () {
  var MAP_MAIN_PIN_EDGE = 22;

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

  mapMainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    window.map.mapActivation();
  });

  mapMainPin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, window.map.mapActivation);
  });

  window.pin = {
    pinList: document.querySelector('.map__pins'),
    mapWidth: document.querySelector('.map__pins').offsetWidth,

    mainPinCoords: {
      xCoords: mapMainPin.offsetLeft + Math.round(mapMainPin.offsetWidth / 2),
      yCoords: mapMainPin.offsetTop + Math.round(mapMainPin.offsetHeight / 2)
    },

    getAddress: function () {
      window.pin.mainPinCoords = {
        xCoords: mapMainPin.offsetLeft + Math.round(mapMainPin.offsetWidth / 2),
        yCoords: mapMainPin.offsetTop + mapMainPin.offsetHeight + MAP_MAIN_PIN_EDGE
      };
      window.form.inputAddress.value = window.pin.mainPinCoords.xCoords + ', ' + window.pin.mainPinCoords.yCoords;
    },

    getPinList: function (arr) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < arr.length; i++) {
        fragment.appendChild(renderPin(arr[i]));
      }
      return fragment;
    }
  };

  mapMainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var MIN_Y_COORDINATE = 130;
      var MAX_Y_COORDINATE = 630;
      var MIN_X_COORDINATE = 0;
      var maxXCoordinate = window.pin.mapWidth;

      if ((mapMainPin.offsetTop - shift.y) < (MIN_Y_COORDINATE - mapMainPin.offsetHeight - MAP_MAIN_PIN_EDGE)) {
        mapMainPin.style.top = (MIN_Y_COORDINATE - mapMainPin.offsetHeight - MAP_MAIN_PIN_EDGE) + 'px';
      } else if ((mapMainPin.offsetTop - shift.y) > (MAX_Y_COORDINATE - mapMainPin.offsetHeight - MAP_MAIN_PIN_EDGE)) {
        mapMainPin.style.top = (MAX_Y_COORDINATE - mapMainPin.offsetHeight - MAP_MAIN_PIN_EDGE) + 'px';
      } else {
        mapMainPin.style.top = (mapMainPin.offsetTop - shift.y) + 'px';
      }

      if ((mapMainPin.offsetLeft - shift.x) < (MIN_X_COORDINATE - Math.round(mapMainPin.offsetWidth / 2))) {
        mapMainPin.style.left = (MIN_X_COORDINATE - Math.round(mapMainPin.offsetWidth / 2)) + 'px';
      } else if ((mapMainPin.offsetLeft - shift.x) > (maxXCoordinate - Math.round(mapMainPin.offsetWidth / 2))) {
        mapMainPin.style.left = (maxXCoordinate - Math.round(mapMainPin.offsetWidth / 2)) + 'px';
      } else {
        mapMainPin.style.left = (mapMainPin.offsetLeft - shift.x) + 'px';
      }

      window.pin.getAddress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.pin.getAddress();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
