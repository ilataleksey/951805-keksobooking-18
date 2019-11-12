'use strict';

(function () {
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var getData = function (element, prop, obj, text) {
    if (obj.offer.hasOwnProperty(prop)) {
      element.textContent = obj.offer[prop] + text;
    } else {
      element.remove();
    }
  };

  var getOfferType = function (element, obj) {
    switch (obj.offer.type) {
      case 'flat':
        var offerType = 'Квартира';
        break;
      case 'bungalo':
        offerType = 'Бунгало';
        break;
      case 'house':
        offerType = 'Дом';
        break;
      case 'palace':
        offerType = 'Дворец';
        break;
      default: element.remove();
    }
    element.textContent = offerType;
  };

  var getCapacity = function (element, obj) {
    var getRoomsCount = function () {
      if (obj.offer.hasOwnProperty('rooms')) {
        if (obj.offer.rooms === 1) {
          var textRoomsCount = ' комната для ';
        } else if (obj.offer.rooms <= 4 && obj.offer.rooms !== 0) {
          textRoomsCount = ' комнаты для ';
        } else {
          textRoomsCount = ' комнат для ';
        }
        return obj.offer.rooms + textRoomsCount;
      } else {
        return '';
      }
    };
    var getGuestsCount = function () {
      if (obj.offer.hasOwnProperty('guests')) {
        if (obj.offer.guests === 1) {
          var textGuestsCount = ' гостя';
        } else {
          textGuestsCount = ' гостей ';
        }
        return obj.offer.guests + textGuestsCount;
      } else {
        return '';
      }
    };
    element.textContent = getRoomsCount() + ' ' + getGuestsCount();
    if (!element.textContent) {
      element.remove();
    }
  };

  var getTime = function (element, obj) {
    if (obj.offer.hasOwnProperty('checkin') && obj.offer.hasOwnProperty('checkout')) {
      element.textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
    }
  };

  var getFeatures = function (arr, obj) {
    for (var i = 0; i < arr.length; i++) {
      var count = 0;
      for (var j = 0; j < obj.offer.features.length; j++) {
        if (arr[i].classList.contains('popup__feature--' + obj.offer.features[j])) {
          count++;
        }
      }
      if (count === 0) {
        var featureClasses = arr[i].classList;
        for (j = 0; j < featureClasses.length; j++) {
          arr[i].classList.remove(featureClasses[j]);
        }
        arr[i].classList.add('hidden');
      }
    }
  };

  var getPhotos = function (obj, element, children) {
    if (obj.offer.photos.length !== 0) {
      if (children.length < obj.offer.photos.length) {
        var photoTemplate = children[0].cloneNode(true);
        for (var i = 0; i < obj.offer.photos.length; i++) {
          element.appendChild(photoTemplate);
        }
      }
      for (i = 0; i < children.length; i++) {
        children[i].src = obj.offer.photos[i];
      }
    } else {
      element.remove();
    }
  };

  var renderCard = function (accommodation) {
    var cardElement = cardTemplate.cloneNode(true);

    var cardAvatar = cardElement.querySelector('.popup__avatar');
    cardAvatar.src = accommodation.author.avatar;

    var cardTitle = cardElement.querySelector('.popup__title');
    getData(cardTitle, 'title', accommodation, '');

    var cardAddress = cardElement.querySelector('.popup__text--address');
    getData(cardAddress, 'address', accommodation, '');

    var cardPrice = cardElement.querySelector('.popup__text--price');
    getData(cardPrice, 'price', accommodation, '₽/ночь');

    var cardType = cardElement.querySelector('.popup__type');
    getOfferType(cardType, accommodation);

    var cardCapacity = cardElement.querySelector('.popup__text--capacity');
    getCapacity(cardCapacity, accommodation);

    var cardTime = cardElement.querySelector('.popup__text--time');
    getTime(cardTime, accommodation);

    var cardFeatureList = cardElement.querySelector('.popup__features');
    var cardFeatures = cardFeatureList.children;
    getFeatures(cardFeatures, accommodation);

    var cardDescription = cardElement.querySelector('.popup__description');
    getData(cardDescription, 'description', accommodation, '');

    var cardPhotoList = cardElement.querySelector('.popup__photos');
    var cardPhotos = cardPhotoList.children;
    getPhotos(accommodation, cardPhotoList, cardPhotos);

    var cardCloseButton = cardElement.querySelector('.popup__close');

    var onCardCloseButtonClick = function () {
      cardElement.classList.add('hidden');
      window.pin.deactivatePin();
      window.removeEventListener('keydown', onCardEscPress);
    };

    var onCardEscPress = function (evt) {
      window.util.isEscEvent(evt, onCardCloseButtonClick);
    };

    cardCloseButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      onCardCloseButtonClick();
    });

    window.addEventListener('keydown', onCardEscPress);

    return cardElement;
  };

  window.card = {
    getCard: function (accommodation) {
      var fragment = document.createDocumentFragment();
      fragment.appendChild(renderCard(accommodation));

      window.map.mapFilterContainer.appendChild(fragment);
    }
  };
})();
