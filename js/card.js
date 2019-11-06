'use strict';

(function () {
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var getOfferType = function (obj) {
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
    }
    return offerType;
  };

  var getCapacity = function (obj) {
    var getRoomsCount = function () {
      if (obj.offer.rooms === 1) {
        var textRoomsCount = ' комната для ';
      } else if (obj.offer.rooms <= 4) {
        textRoomsCount = ' комнаты для ';
      } else {
        textRoomsCount = ' комнат для ';
      }
      return obj.offer.rooms + textRoomsCount;
    };
    var getGuestsCount = function () {
      if (obj.offer.guests === 1) {
        var textGuestsCount = ' гостя';
      } else {
        textGuestsCount = ' гостей ';
      }
      return obj.offer.guests + textGuestsCount;
    };
    return getRoomsCount() + ' ' + getGuestsCount();
  };

  var getTime = function (obj) {
    return 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
  };

  var getFeatures = function (obj, cardFeatures) {
    for (var i = 0; i < cardFeatures.length; i++) {
      var count = 0;
      for (var j = 0; j < obj.offer.features.length; j++) {
        if (cardFeatures[i].classList.contains('popup__feature--' + obj.offer.features[j])) {
          count++;
        }
      }
      if (count === 0) {
        var featureClasses = cardFeatures[i].classList;
        for (j = 0; j < featureClasses.length; j++) {
          cardFeatures[i].classList.remove(featureClasses[j]);
        }
        cardFeatures[i].classList.add('hidden');
      }
    }
  };

  var getPhotos = function (obj, cardPhotoList, cardPhotos) {
    if (cardPhotos.length < obj.offer.photos.length) {
      var photoTemplate = cardPhotos[0].cloneNode(true);
      for (var i = 0; i < obj.offer.photos.length; i++) {
        cardPhotoList.appendChild(photoTemplate);
      }
    }
    for (i = 0; i < cardPhotos.length; i++) {
      cardPhotos[i].src = obj.offer.photos[i];
    }
  };

  var renderCard = function (accomodation) {
    var cardElement = cardTemplate.cloneNode(true);

    var cardAvatar = cardElement.querySelector('.popup__avatar');
    cardAvatar.src = accomodation.author.avatar;

    var cardTitle = cardElement.querySelector('.popup__title');
    cardTitle.textContent = accomodation.offer.title;

    var cardAddress = cardElement.querySelector('.popup__text--address');
    cardAddress.textContent = accomodation.offer.address;

    var cardPrice = cardElement.querySelector('.popup__text--price');
    cardPrice.textContent = accomodation.offer.price + '₽/ночь';

    var cardType = cardElement.querySelector('.popup__type');
    cardType.textContent = getOfferType(accomodation);

    var cardCapacity = cardElement.querySelector('.popup__text--capacity');
    cardCapacity.textContent = getCapacity(accomodation);

    var cardTime = cardElement.querySelector('.popup__text--time');
    cardTime.textContent = getTime(accomodation);

    var cardFeatureList = cardElement.querySelector('.popup__features');
    var cardFeatures = cardFeatureList.children;
    getFeatures(accomodation, cardFeatures);

    var cardDescription = cardElement.querySelector('.popup__description');
    cardDescription.textContent = accomodation.offer.description;


    var cardPhotoList = cardElement.querySelector('.popup__photos');
    var cardPhotos = cardPhotoList.children;
    getPhotos(accomodation, cardPhotoList, cardPhotos);

    var cardCloseButton = cardElement.querySelector('.popup__close');
    cardCloseButton.addEventListener('click', function () {
      cardElement.classList.add('hidden');
    });

    return cardElement;
  };

  window.card = {
    getCard: function (accomodation) {
      var fragment = document.createDocumentFragment();
      fragment.appendChild(renderCard(accomodation));

      return fragment;
    }
  };
})();
