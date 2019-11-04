'use strict';

(function () {
  var mapFilter = document.querySelector('.map__filters');
  var mapFilterSelects = mapFilter.querySelectorAll('select');

  window.map = {
    map: document.querySelector('.map'),
    mapFilterContainer: document.querySelector('.map__filters-container'),

    mapActivation: function () {
      window.map.map.classList.remove('map--faded');
      window.helpers.removeAttribute(mapFilterSelects, 'disabled');
      window.helpers.removeAttribute(window.form.adFormInputs, 'disabled');
      window.helpers.removeAttribute(window.form.adFormSelects, 'disabled');
      window.helpers.removeAttribute(window.form.adFormTextareas, 'disabled');
      window.helpers.removeAttribute(window.form.adFormButtons, 'disabled');
      window.pin.getAddress();
      window.backend.load(window.backend.URL, window.backend.successLoadHandler, window.backend.errorHandler);
    },

    mapDeactivation: function () {
      window.map.map.classList.add('map--faded');
      window.helpers.setAttribute(mapFilterSelects, 'disabled');
      window.helpers.setAttribute(window.form.adFormInputs, 'disabled');
      window.helpers.setAttribute(window.form.adFormSelects, 'disabled');
      window.helpers.setAttribute(window.form.adFormTextareas, 'disabled');
      window.helpers.setAttribute(window.form.adFormButtons, 'disabled');
      window.form.getDefaultAddress();
    }
  };

  window.map.mapDeactivation();

})();
