'use strict';

(function () {
  var mapFilter = document.querySelector('.map__filters');
  var mapFilterSelects = mapFilter.querySelectorAll('select');

  window.helpers.setAttribute(mapFilterSelects, 'disabled');
  window.helpers.setAttribute(window.form.adFormInputs, 'disabled');
  window.helpers.setAttribute(window.form.adFormSelects, 'disabled');
  window.helpers.setAttribute(window.form.adFormTextarea, 'disabled');
  window.helpers.setAttribute(window.form.adFormButton, 'disabled');

  window.map = {
    map: document.querySelector('.map'),
    mapWidth: window.pin.pinList.offsetWidth,
    mapFilterContainer: document.querySelector('.map__filters-container'),

    mapActivation: function () {
      window.map.map.classList.remove('map--faded');
      window.helpers.removeAttribute(mapFilterSelects, 'disabled');
      window.helpers.removeAttribute(window.form.adFormInputs, 'disabled');
      window.helpers.removeAttribute(window.form.adFormSelects, 'disabled');
      window.helpers.removeAttribute(window.form.adFormTextarea, 'disabled');
      window.helpers.removeAttribute(window.form.adFormButton, 'disabled');
      window.pin.getAddress();
      window.pin.pinList.appendChild(window.pin.getPinList(window.data.accommodations));
    }
  };
})();
