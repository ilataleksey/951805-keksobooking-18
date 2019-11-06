'use strict';

(function () {
  var MAP_MAIN_PIN_EDGE = 22;

  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var mapMainPin = document.querySelector('.map__pin--main');

  mapMainPin.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.map.onMainPinClick();
  });

  mapMainPin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, window.map.onMainPinClick);
  });

  window.pin = {
    pinList: document.querySelector('.map__pins'),
    mapWidth: document.querySelector('.map__pins').offsetWidth,

    mainPinCoords: {
      xCoords: mapMainPin.offsetLeft + Math.round(mapMainPin.offsetWidth / 2),
      yCoords: mapMainPin.offsetTop + Math.round(mapMainPin.offsetHeight / 2)
    },

    renderPin: function (accommodation) {
      var pinElement = pinTemplate.cloneNode(true);

      pinElement.style.left = accommodation.location.x + 'px';
      pinElement.style.top = accommodation.location.y + 'px';
      pinElement.querySelector('img').src = accommodation.author.avatar;
      pinElement.querySelector('img').alt = accommodation.offer.title;

      pinElement.addEventListener('click', function (evt) {
        evt.preventDefault();
        window.pin.deleteChildren(window.map.mapFilterContainer.children, 0);
        window.map.mapFilterContainer.appendChild(window.card.getCard(accommodation));
      });

      return pinElement;
    },

    getAddress: function () {
      window.pin.mainPinCoords = {
        xCoords: mapMainPin.offsetLeft + Math.round(mapMainPin.offsetWidth / 2),
        yCoords: mapMainPin.offsetTop + mapMainPin.offsetHeight + MAP_MAIN_PIN_EDGE
      };
      window.form.inputAddress.value = window.pin.mainPinCoords.xCoords + ', ' + window.pin.mainPinCoords.yCoords;
    },

    deleteChildren: function (children, firstDeletedChildren) {
      for (var i = children.length - 1; i >= firstDeletedChildren; i--) {
        children[i].parentElement.removeChild(children[i]);
      }
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
