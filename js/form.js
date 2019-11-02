'use strict';

(function () {
  var FLAT_MIN_PRICE = 1000;
  var HOUSE_MIN_PRICE = 5000;
  var PALACE_MIN_PRICE = 10000;

  var adForm = document.querySelector('.ad-form');

  window.form = {
    adFormInputs: adForm.querySelectorAll('input'),
    adFormSelects: adForm.querySelectorAll('select'),
    adFormTextarea: adForm.querySelectorAll('textarea'),
    adFormButton: adForm.querySelectorAll('button'),
    adRoomNumber: adForm.querySelector('#room_number'),
    adCapacity: adForm.querySelector('#capacity'),
    inputAddress: adForm.querySelector('#address'),
  };

  var checkAdCapacity = function () {
    if (window.form.adRoomNumber.value === '100' && window.form.adCapacity.value !== '0') {
      window.form.adCapacity.setCustomValidity('100 комнат не для гостей');
    } else if (window.form.adRoomNumber.value !== '100' & window.form.adCapacity.value === '0') {
      window.form.adCapacity.setCustomValidity('Не для гостей 100 комнат');
    } else if (parseInt(window.form.adRoomNumber.value, 10) < parseInt(window.form.adCapacity.value, 10)) {
      window.form.adCapacity.setCustomValidity('Слишком много гостей для заданного количества комнат');
    } else {
      window.form.adCapacity.setCustomValidity('');
    }
  };

  window.form.inputAddress.value = window.pin.mainPinCoords.xCoords + ', ' + window.pin.mainPinCoords.yCoords;

  checkAdCapacity();

  window.form.adCapacity.addEventListener('change', function () {
    checkAdCapacity();
  });
  window.form.adRoomNumber.addEventListener('change', function () {
    checkAdCapacity();
  });

  var adTitleInput = adForm.querySelector('#title');
  var adPriceInput = adForm.querySelector('#price');
  var minPrice = adPriceInput.getAttribute('min');
  var maxPrice = adPriceInput.getAttribute('max');

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
    } else if (adTypeInput.value === 'flat' && adPriceInput.value < FLAT_MIN_PRICE) {
      adTypeInput.setCustomValidity('Цена за одну ночь данного типа жилья не может быть меньше ' + FLAT_MIN_PRICE);
    } else if (adTypeInput.value === 'house' && adPriceInput.value < HOUSE_MIN_PRICE) {
      adTypeInput.setCustomValidity('Цена за одну ночь данного типа жилья не может быть меньше ' + HOUSE_MIN_PRICE);
    } else if (adTypeInput.value === 'palace' && adPriceInput.value < PALACE_MIN_PRICE) {
      adTypeInput.setCustomValidity('Цена за одну ночь данного типа жилья не может быть меньше ' + PALACE_MIN_PRICE);
    } else {
      adTypeInput.setCustomValidity('');
    }
  };

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

  checkAdTytle();
  checkAdPrice();
  checkAdTypePrice();
  checkAdTimeOut();
  checkAdTimeIn();

  adTitleInput.addEventListener('change', function () {
    checkAdTytle();
  });

  adTypeInput.addEventListener('change', function () {
    checkAdTypePrice();
    checkAdPrice();
  });

  adPriceInput.addEventListener('change', function () {
    checkAdTypePrice();
    checkAdPrice();
  });

  adTimeIn.addEventListener('change', function () {
    checkAdTimeIn();
  });

  adTimeOut.addEventListener('change', function () {
    checkAdTimeOut();
  });
})();
