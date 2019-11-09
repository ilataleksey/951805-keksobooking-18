'use strict';

(function () {
  var MIDDLE_MIN_HOUSING_PRICE = 10000;
  var MIDDLE_MAX_HOUSING_PRICE = 50000;

  var mapFilter = document.querySelector('.map__filters');
  var mapFilterSelects = mapFilter.querySelectorAll('select');

  var accommodations = [];
  var successLoadHandler = function (data) {
    accommodations = data;
    window.pin.renderPins(accommodations);
  };

  var filters = [];

  var filterHousingType = document.querySelector('#housing-type');
  var filterHousingPrice = document.querySelector('#housing-price');
  var filterHousingRooms = document.querySelector('#housing-rooms');
  var filterHousingGuests = document.querySelector('#housing-guests');
  var filterHousingFeatures = document.querySelectorAll('.map__checkbox');
  var featureWifi = document.querySelector('#filter-wifi');
  var featureDishwasher = document.querySelector('#filter-dishwasher');
  var featureParking = document.querySelector('#filter-parking');
  var featureWasher = document.querySelector('#filter-washer');
  var featureElevator = document.querySelector('#filter-elevator');
  var featureConditioner = document.querySelector('#filter-conditioner');

  filters.push(filterHousingType);
  filters.push(filterHousingPrice);
  filters.push(filterHousingRooms);
  filters.push(filterHousingGuests);
  // filters.push(filterHousingFeatures);
  filters.push(featureWifi);
  filters.push(featureDishwasher);
  filters.push(featureParking);
  filters.push(featureWasher);
  filters.push(featureElevator);
  filters.push(featureConditioner);

  var housingType;
  var housingPrice;
  var housingRooms;
  var housingGuests;
  var housingFeatures = [];

  filters.forEach(function (filter) {
    filter.addEventListener('change', function (evt) {
      evt.preventDefault();
      window.pin.deleteChildren(window.map.mapFilterContainer.children, 1);
      var newType = filterHousingType.value;
      var newPrice = filterHousingPrice.value;
      var newRooms = filterHousingRooms.value;
      var newGuests = filterHousingGuests.value;
      var newFeatures = [];
      filterHousingFeatures.forEach(function (element) {
        if (element.checked) {
          newFeatures.push(element.value);
        }
      });
      onFilterChange(newType, newPrice, newRooms, newGuests, newFeatures);
    });
  });

  var onFilterChange = window.debounce(function (type, price, rooms, guests, features) {
    housingType = type;
    housingPrice = price;
    housingRooms = rooms;
    housingGuests = guests;
    housingFeatures = features;
    updatePins();
  });

  var updatePins = function () {
    var newAccommodations = accommodations;
    if (housingType === 'any') {
      newAccommodations = newAccommodations;
    } else {
      newAccommodations = newAccommodations.filter(function (accommodation) {
        return accommodation.offer.type === housingType;
      });
    }
    if (housingPrice === 'any') {
      newAccommodations = newAccommodations;
    } else if (housingPrice === 'low') {
      newAccommodations = newAccommodations.filter(function (accommodation) {
        return accommodation.offer.price < MIDDLE_MIN_HOUSING_PRICE;
      });
    } else if (housingPrice === 'middle') {
      newAccommodations = newAccommodations.filter(function (accommodation) {
        return accommodation.offer.price >= MIDDLE_MIN_HOUSING_PRICE;
      });
      newAccommodations = newAccommodations.filter(function (accommodation) {
        return accommodation.offer.price <= MIDDLE_MAX_HOUSING_PRICE;
      });
    } else {
      newAccommodations = newAccommodations.filter(function (accommodation) {
        return accommodation.offer.price > MIDDLE_MAX_HOUSING_PRICE;
      });
    }
    if (housingRooms === 'any') {
      newAccommodations = newAccommodations;
    } else {
      newAccommodations = newAccommodations.filter(function (accommodation) {
        return accommodation.offer.rooms === parseInt(housingRooms, 10);
      });
    }
    if (housingGuests === 'any') {
      newAccommodations = newAccommodations;
    } else {
      newAccommodations = newAccommodations.filter(function (accommodation) {
        return accommodation.offer.guests === parseInt(housingGuests, 10);
      });
    }
    if (housingFeatures.length === 0) {
      newAccommodations = newAccommodations;
    } else {
      newAccommodations = newAccommodations.filter(function (accommodation) {
        return housingFeatures.length === accommodation.offer.features.length;
      });
      newAccommodations = newAccommodations.filter(function (accommodation) {
        return housingFeatures.join('') === accommodation.offer.features.join('');
      });
    }

    window.pin.renderPins(newAccommodations);
  };

  var onMainPinEnterPress = function (evt) {
    window.util.isEnterEvent(evt, window.map.onMainPinClick);
  };

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
      window.pin.mapMainPin.removeEventListener('click', window.map.onMainPinClick);
      window.pin.mapMainPin.removeEventListener('keydown', onMainPinEnterPress);
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
      window.pin.mapMainPin.addEventListener('click', window.map.onMainPinClick);
      window.pin.mapMainPin.addEventListener('keydown', onMainPinEnterPress);
    }
  };

  window.map.onFormSend();


})();
