'use strict';

(function () {
  var MIN_Y_COORDINATE = 130;
  var MAX_Y_COORDINATE = 630;
  var MIN_X_COORDINATE = 0;
  var mapWidth = window.pin.pinList.offsetWidth;
  var maxXCoordinate = mapWidth;

  window.pin.mapMainPin.addEventListener('mousedown', function (evt) {
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

      if ((window.pin.mapMainPin.offsetTop - shift.y) < (MIN_Y_COORDINATE - window.pin.mapMainPin.offsetHeight - window.pin.MAP_MAIN_PIN_EDGE)) {
        window.pin.mapMainPin.style.top = (MIN_Y_COORDINATE - window.pin.mapMainPin.offsetHeight - window.pin.MAP_MAIN_PIN_EDGE) + 'px';
      } else if ((window.pin.mapMainPin.offsetTop - shift.y) > (MAX_Y_COORDINATE - window.pin.mapMainPin.offsetHeight - window.pin.MAP_MAIN_PIN_EDGE)) {
        window.pin.mapMainPin.style.top = (MAX_Y_COORDINATE - window.pin.mapMainPin.offsetHeight - window.pin.MAP_MAIN_PIN_EDGE) + 'px';
      } else {
        window.pin.mapMainPin.style.top = (window.pin.mapMainPin.offsetTop - shift.y) + 'px';
      }

      if ((window.pin.mapMainPin.offsetLeft - shift.x) < (MIN_X_COORDINATE - Math.round(window.pin.mapMainPin.offsetWidth / 2))) {
        window.pin.mapMainPin.style.left = (MIN_X_COORDINATE - Math.round(window.pin.mapMainPin.offsetWidth / 2)) + 'px';
      } else if ((window.pin.mapMainPin.offsetLeft - shift.x) > (maxXCoordinate - Math.round(window.pin.mapMainPin.offsetWidth / 2))) {
        window.pin.mapMainPin.style.left = (maxXCoordinate - Math.round(window.pin.mapMainPin.offsetWidth / 2)) + 'px';
      } else {
        window.pin.mapMainPin.style.left = (window.pin.mapMainPin.offsetLeft - shift.x) + 'px';
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
