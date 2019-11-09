'use strict';

(function () {
  var PIN_NUMBER = 5;

  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var mapMainPin = document.querySelector('.map__pin--main');

  window.pin = {
    MAP_MAIN_PIN_EDGE: 22,

    mapMainPin: mapMainPin,
    pinList: document.querySelector('.map__pins'),

    mainPinCoords: {
      xCoords: mapMainPin.offsetLeft + Math.round(mapMainPin.offsetWidth / 2),
      yCoords: mapMainPin.offsetTop + Math.round(mapMainPin.offsetHeight / 2)
    },

    renderPins: function (accommodations) {
      var fragment = document.createDocumentFragment();
      var takeNumber = accommodations.length < PIN_NUMBER ? accommodations.length : PIN_NUMBER;
      window.pin.deleteChildren(window.pin.pinList.children, 2);
      for (var i = 0; i < takeNumber; i++) {
        fragment.appendChild(window.pin.renderPin(accommodations[i]));
      }

      window.pin.pinList.appendChild(fragment);
    },

    renderPin: function (accommodation) {
      var pinElement = pinTemplate.cloneNode(true);

      pinElement.style.left = accommodation.location.x + 'px';
      pinElement.style.top = accommodation.location.y + 'px';
      pinElement.querySelector('img').src = accommodation.author.avatar;
      pinElement.querySelector('img').alt = accommodation.offer.title;

      pinElement.addEventListener('click', function (evt) {
        evt.preventDefault();
        window.pin.deleteChildren(window.map.mapFilterContainer.children, 1);
        window.card.getCard(accommodation);
      });

      return pinElement;
    },

    getAddress: function () {
      window.pin.mainPinCoords = {
        xCoords: mapMainPin.offsetLeft + Math.round(mapMainPin.offsetWidth / 2),
        yCoords: mapMainPin.offsetTop + mapMainPin.offsetHeight + window.pin.MAP_MAIN_PIN_EDGE
      };
      window.form.inputAddress.value = window.pin.mainPinCoords.xCoords + ', ' + window.pin.mainPinCoords.yCoords;
    },

    deleteChildren: function (children, firstDeletedChildren) {
      if (children.length - 1 >= firstDeletedChildren) {
        for (var i = children.length - 1; i >= firstDeletedChildren; i--) {
          children[i].parentElement.removeChild(children[i]);
        }
      }
    }
  };

})();
