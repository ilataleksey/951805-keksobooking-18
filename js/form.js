'use strict';

(function () {
  var NUMBER_OF_ROOMS = {
    1: ['1'],
    2: ['2', '1'],
    3: ['3', '2', '1'],
    100: ['0']
  };
  var FIELD_VALUES = {
    ROOMS: ['1', '2', '3', '100'],
    GUESTS: ['1', '2', '3', '0'],
    PRICES: ['0', '1000', '5000', '10000'],
    TYPE: ['bungalo', 'flat', 'house', 'palace']
  };

  var FLAT_MIN_PRICE = 1000;
  var HOUSE_MIN_PRICE = 5000;
  var PALACE_MIN_PRICE = 10000;

  var adForm = document.querySelector('.ad-form');

  window.form = {
    adForm: adForm,
    adFormInputs: adForm.querySelectorAll('input'),
    adFormSelects: adForm.querySelectorAll('select'),
    adFormTextareas: adForm.querySelectorAll('textarea'),
    adFormButtons: adForm.querySelectorAll('button'),
    inputAddress: adForm.querySelector('#address'),

    getDefaultAddress: function () {
      window.form.inputAddress.value = window.pin.mainPinCoords.xCoords + ', ' + window.pin.mainPinCoords.yCoords;
      window.pin.mapMainPin.style.left = window.pin.mainPinCoords.xCoords - Math.round(window.pin.mapMainPin.offsetWidth / 2) + 'px';
      window.pin.mapMainPin.style.top = window.pin.mainPinCoords.yCoords - Math.round(window.pin.mapMainPin.offsetHeight / 2) + 'px';
    }
  };

  var adTitleInput = adForm.querySelector('#title');

  var checkAdTytle = function () {
    adTitleInput.addEventListener('invalid', function () {
      if (adTitleInput.validity.tooShort) {
        adTitleInput.setCustomValidity('Заголовок объявления не может быть меньше 30 символов');
      } else if (adTitleInput.validity.tooLong) {
        adTitleInput.setCustomValidity('Заголовок объявления не может быть больше 100 символов');
      } else {
        adTitleInput.setCustomValidity('');
      }
    });
  };

  adTitleInput.addEventListener('change', function () {
    checkAdTytle();
  });

  var adPriceInput = adForm.querySelector('#price');
  var minPrice = adPriceInput.getAttribute('min');
  var maxPrice = adPriceInput.getAttribute('max');

  var checkAdPrice = function () {
    adPriceInput.addEventListener('invalid', function () {
      if (adPriceInput.validity.rangeUnderflow) {
        adPriceInput.setCustomValidity('Цена за ночь не может быть меньше ' + minPrice);
      } else if (adPriceInput.validity.rangeOverflow) {
        adPriceInput.setCustomValidity('Цена за ночь не может быть больше ' + maxPrice);
      } else {
        adPriceInput.setCustomValidity('');
      }
    });
  };

  var adTypeInput = adForm.querySelector('#type');

  var checkAdTypePrice = function () {
    if (adTypeInput.value === 'bungalo' && adPriceInput.value < minPrice) {
      adTypeInput.setCustomValidity('Цена за одну ночь данного типа жилья не может быть меньше ' + minPrice);
      adPriceInput.placeholder = minPrice;
    } else if (adTypeInput.value === 'flat' && adPriceInput.value < FLAT_MIN_PRICE) {
      adTypeInput.setCustomValidity('Цена за одну ночь данного типа жилья не может быть меньше ' + FLAT_MIN_PRICE);
      adPriceInput.placeholder = FLAT_MIN_PRICE;
    } else if (adTypeInput.value === 'house' && adPriceInput.value < HOUSE_MIN_PRICE) {
      adTypeInput.setCustomValidity('Цена за одну ночь данного типа жилья не может быть меньше ' + HOUSE_MIN_PRICE);
      adPriceInput.placeholder = HOUSE_MIN_PRICE;
    } else if (adTypeInput.value === 'palace' && adPriceInput.value < PALACE_MIN_PRICE) {
      adTypeInput.setCustomValidity('Цена за одну ночь данного типа жилья не может быть меньше ' + PALACE_MIN_PRICE);
      adPriceInput.placeholder = PALACE_MIN_PRICE;
    } else {
      adTypeInput.setCustomValidity('');
    }
  };

  adPriceInput.placeholder = FIELD_VALUES.PRICES[FIELD_VALUES.TYPE.indexOf(adTypeInput.value)];

  adTypeInput.addEventListener('change', function () {
    checkAdTypePrice();
    checkAdPrice();
  });

  adPriceInput.addEventListener('change', function () {
    checkAdTypePrice();
    checkAdPrice();
  });

  var adTimeIn = adForm.querySelector('#timein');
  var adTimeOut = adForm.querySelector('#timeout');

  var checkAdTimeOut = function () {
    if (adTimeIn.value !== adTimeOut.value) {
      adTimeIn.value = adTimeOut.value;
    }
  };

  var checkAdTimeIn = function () {
    if (adTimeOut.value !== adTimeIn.value) {
      adTimeOut.value = adTimeIn.value;
    }
  };

  adTimeIn.addEventListener('change', function () {
    checkAdTimeIn();
  });

  adTimeOut.addEventListener('change', function () {
    checkAdTimeOut();
  });

  var adRoomNumber = adForm.querySelector('#room_number');
  var adCapacity = adForm.querySelector('#capacity');

  var checkAdCapacity = function () {
    var index = FIELD_VALUES.ROOMS.indexOf(adRoomNumber.value);
    adCapacity.value = FIELD_VALUES.GUESTS[index];
    for (var i = 0; i < adCapacity.options.length; i++) {
      adCapacity.options[i].disabled = NUMBER_OF_ROOMS[adRoomNumber.value].indexOf(adCapacity.options[i].value) < 0;
    }
  };

  checkAdCapacity();

  adRoomNumber.addEventListener('change', function () {
    checkAdCapacity();
  });

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.send(window.backend.URL, new FormData(adForm), window.backend.successSendHandler, window.backend.errorHandler);
    adForm.reset();
    window.map.onFormSend();
  });
})();
