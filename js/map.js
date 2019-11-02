'use strict';

(function () {
  var mapFilter = document.querySelector('.map__filters');
  var mapFilterSelects = mapFilter.querySelectorAll('select');

  window.helpers.setAttribute(mapFilterSelects, 'disabled');
  window.helpers.setAttribute(window.form.adFormInputs, 'disabled');
  window.helpers.setAttribute(window.form.adFormSelects, 'disabled');
  window.helpers.setAttribute(window.form.adFormTextarea, 'disabled');
  window.helpers.setAttribute(window.form.adFormButton, 'disabled');

  var successeLoadHandler = function (accommodations) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < accommodations.length; i++) {
      fragment.appendChild(window.pin.renderPin(accommodations[i]));
    }
    window.pin.pinList.appendChild(fragment);
  };

  var errorHandler = function (errorMessage) {
    var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    errorElement.querySelector('.error__message').textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorElement);

  };

  window.map = {
    map: document.querySelector('.map'),
    mapFilterContainer: document.querySelector('.map__filters-container'),

    mapActivation: function () {
      window.map.map.classList.remove('map--faded');
      window.helpers.removeAttribute(mapFilterSelects, 'disabled');
      window.helpers.removeAttribute(window.form.adFormInputs, 'disabled');
      window.helpers.removeAttribute(window.form.adFormSelects, 'disabled');
      window.helpers.removeAttribute(window.form.adFormTextarea, 'disabled');
      window.helpers.removeAttribute(window.form.adFormButton, 'disabled');
      window.pin.getAddress();
      window.backend.load(window.backend.URL, successeLoadHandler, errorHandler);
    }
  };
})();
