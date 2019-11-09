'use strict';

(function () {
  var mapFilter = document.querySelector('.map__filters');
  var mapFilterSelects = mapFilter.querySelectorAll('select');

  var accommodations = [];
  var successLoadHandler = function (data) {
    accommodations = data;
    window.pin.renderPins(accommodations);
  };

  var newAccommodations = [];
  var housingType;

  var filterHousingType = document.querySelector('#housing-type');
  filterHousingType.addEventListener('change', function (evt) {
    evt.preventDefault();
    window.pin.deleteChildren(window.map.mapFilterContainer.children, 1);
    var newType = filterHousingType.value;
    onFilterHousingTypeChange(newType);
  });

  var updatePins = function () {
    if (housingType === 'any') {
      newAccommodations = accommodations;
    } else {
      newAccommodations = accommodations.filter(function (accommodation) {
        return accommodation.offer.type === housingType;
      });
    }
    window.pin.renderPins(newAccommodations);
  };

  var onFilterHousingTypeChange = window.debounce(function (type) {
    housingType = type;
    updatePins();
  });

  window.map = {
    map: document.querySelector('.map'),
    mapFilterContainer: document.querySelector('.map__filters-container'),

    onMainPinClick: function () {
      window.map.map.classList.remove('map--faded');
      window.helpers.removeAttribute(mapFilterSelects, 'disabled');
      window.helpers.removeAttribute(window.form.adFormInputs, 'disabled');
      window.helpers.removeAttribute(window.form.adFormSelects, 'disabled');
      window.helpers.removeAttribute(window.form.adFormTextareas, 'disabled');
      window.helpers.removeAttribute(window.form.adFormButtons, 'disabled');
      window.pin.getAddress();
      window.backend.load(window.backend.URL, successLoadHandler, window.backend.errorHandler);
    },

    onFormSend: function () {
      window.map.map.classList.add('map--faded');
      window.helpers.setAttribute(mapFilterSelects, 'disabled');
      window.helpers.setAttribute(window.form.adFormInputs, 'disabled');
      window.helpers.setAttribute(window.form.adFormSelects, 'disabled');
      window.helpers.setAttribute(window.form.adFormTextareas, 'disabled');
      window.helpers.setAttribute(window.form.adFormButtons, 'disabled');
      window.pin.deleteChildren(window.pin.pinList.children, 2);
      window.pin.deleteChildren(window.map.mapFilterContainer.children, 1);
      window.form.getDefaultAddress();
    }
  };

  window.map.onFormSend();

})();
