'use strict';

//   "author": {
//     "avatar": 'img/avatars/user' + '0' + i + '.png'
//     строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
//   },

//   "offer": {
//     "title": строка, заголовок предложения
//     "address": строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
//     "price": число, стоимость
//     "type": строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
//     "rooms": число, количество комнат
//     "guests": число, количество гостей, которое можно разместить
//     "checkin": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
//     "checkout": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
//     "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
//     "description": строка с описанием,
//     "photos": массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
//   },

//   "location": {
//     "x": случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
//     "y": случайное число, координата y метки на карте от 130 до 630.
//   }
// }

// var stayCount = 8;
// var titles = ['2-х этажный дом', '3-х комнатная квартира', 'шатер', 'комната', 'место на парковке', 'квартира в центре', 'койко-место', 'трюм корабля'];
// var prices = [10000, 8000, 10, 100, 2000, 15000, 50, 1];
// var types = ['house', 'flat', 'bungalo', 'flat', 'bungalo', 'flat', 'bungalo', 'palace'];
// var rooms = [5, 3, 1, 1, 2, 12, 1, 4];
// var guests = [10, 6, 1, 2, 2, 30, 1, 9];
// var checkins = ['12:00', '13:00', '12:00', '13:00', '14:00', '14:00', '13:00', '13:00'];
// var checkouts = ['13:00', '14:00', '14:00', '14:00', '12:00', '12:00', '14:00', '13:00'];
// var features = [
//   ['wifi', 'dishwasher', 'washer', 'elevator', 'conditioner'],
//   ['wifi', 'dishwasher', 'elevator', 'conditioner'],
//   ['elevator'],
//   ['wifi', 'dishwasher', 'washer'],
//   ['parking'],
//   ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
//   ['wifi', 'dishwasher', 'washer'],
//   ['washer', 'elevator']
// ];
// var descriptions = ['1', '2', '3', '4', '5', '6', '7', '8'];
// var photos = [
//   ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg'],
//   ['http://o0.github.io/assets/images/tokyo/hotel2.jpg'],
//   ['http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
//   ['http://o0.github.io/assets/images/tokyo/hotel1.jpg'],
//   ['http://o0.github.io/assets/images/tokyo/hotel1.jpg'],
//   ['http://o0.github.io/assets/images/tokyo/hotel1.jpg'],
//   ['http://o0.github.io/assets/images/tokyo/hotel1.jpg'],
//   ['http://o0.github.io/assets/images/tokyo/hotel1.jpg']
// ];

var ENTER_KEYCODE = 13;

var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var adFormInputs = adForm.querySelectorAll('input');
var adFormSelects = adForm.querySelectorAll('select');
var adFormTextarea = adForm.querySelectorAll('textarea');
var adFormButton = adForm.querySelectorAll('button');
var mapFilter = document.querySelector('.map__filters');
var mapFilterSelects = mapFilter.querySelectorAll('select');

var setAttribute = function (arr, attr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].setAttribute(attr, attr);
  }
};

var removeAttribute = function (arr, attr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].removeAttribute(attr);
  }
};

setAttribute(adFormInputs, 'disabled');
setAttribute(adFormSelects, 'disabled');
setAttribute(adFormTextarea, 'disabled');
setAttribute(adFormButton, 'disabled');
setAttribute(mapFilterSelects, 'disabled');

var mapActivation = function () {
  map.classList.remove('map--faded');
  removeAttribute(adFormInputs, 'disabled');
  removeAttribute(adFormSelects, 'disabled');
  removeAttribute(adFormTextarea, 'disabled');
  removeAttribute(adFormButton, 'disabled');
  removeAttribute(mapFilterSelects, 'disabled');
  inputAddress.value = leftCoordinate + mapMainPin.offsetWidth + MAP_MAIN_PIN_EDGE + ', ' + topCoordinate;
};

var mapMainPin = document.querySelector('.map__pin--main');
var leftCoordinate = mapMainPin.offsetLeft + Math.round(mapMainPin.offsetWidth / 2);
var topCoordinate = mapMainPin.offsetTop + Math.round(mapMainPin.offsetHeight / 2);
var MAP_MAIN_PIN_EDGE = 22;
var inputAddress = adForm.querySelector('#address');
inputAddress.value = leftCoordinate + ', ' + topCoordinate;

mapMainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  mapActivation();
});

mapMainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    evt.preventDefault();
    mapActivation();
  }
});

var adRoomNumber = adForm.querySelector('#room_number');
var adCapacity = adForm.querySelector('#capacity');

var checkAdCapacityfunction = function () {
  if (adRoomNumber.value === '100' && adCapacity.value !== '0') {
    adCapacity.setCustomValidity('100 комнат не для гостей');
  } else if (adRoomNumber.value !== '100' & adCapacity.value === '0') {
    adCapacity.setCustomValidity('Не для гостей 100 комнат');
  } else if (parseInt(adRoomNumber.value, 10) < parseInt(adCapacity.value, 10)) {
    adCapacity.setCustomValidity('Слишком много гостей для заданного количества комнат');
  } else {
    adCapacity.setCustomValidity('');
  }
};

checkAdCapacityfunction();

adCapacity.addEventListener('change', function () {
  checkAdCapacityfunction();
});
adRoomNumber.addEventListener('change', function () {
  checkAdCapacityfunction();
});


var pinList = document.querySelector('.map__pins');
var mapWidth = pinList.offsetWidth;
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

var getNearStay = function () {
  var accommodations = [];
  for (var i = 0; i < stayCount; i++) {
    var xLocation = getRandomInt(0, mapWidth) - 25;
    var yLocation = getRandomInt(130, 630) - 35;
    var accommodation = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },

      offer: {
        title: titles[i],
        address: xLocation + ', ' + yLocation,
        price: prices[i],
        type: types[i],
        rooms: rooms[i],
        guests: guests[i],
        checkin: checkins[i],
        checkout: checkouts[i],
        features: features[i],
        description: descriptions[i],
        photos: photos[i]
      },

      location: {
        x: xLocation + 'px',
        y: yLocation + 'px'
      }
    };
    accommodations.push(accommodation);
  }
  return accommodations;
};

var accommodations = getNearStay();

var renderPin = function (accommodation) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = accommodation.location.x;
  pinElement.style.top = accommodation.location.y;
  pinElement.querySelector('img').src = accommodation.author.avatar;
  pinElement.querySelector('img').alt = accommodation.offer.title;

  return pinElement;
};

var getPinList = function (arr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderPin(arr[i]));
  }
  return fragment;
};

var getOfferType = function (accommodation) {
  switch (accommodation.offer.type) {
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

var getRoomsCount = function (accommodation) {
  if (accommodation.offer.rooms === 1) {
    var textRoomsCount = ' комната для ';
  } else if (accommodation.offer.rooms <= 4) {
    textRoomsCount = ' комнаты для ';
  } else {
    textRoomsCount = ' комнат для ';
  }
  return accommodation.offer.rooms + textRoomsCount;
};

var getGuestsCount = function (accommodation) {
  if (accommodation.offer.guests === 1) {
    var textGuestsCount = ' гостя';
  } else {
    textGuestsCount = ' гостей ';
  }
  return accommodation.offer.guests + textGuestsCount;
};

var getCapacity = function (accommodation) {
  return getRoomsCount(accommodation) + ' ' + getGuestsCount(accommodation);
};

var getFeatures = function (accommodation, cardFeatures) {
  for (var i = 0; i < cardFeatures.length; i++) {
    var count = 0;
    for (var j = 0; j < accommodation.offer.features.length; j++) {
      if (cardFeatures[i].classList.contains('popup__feature--' + accommodation.offer.features[j])) {
        count++;
      }
    }
    if (count === 0) {
      var featureClasses = cardFeatures[i].classList;
      for (var q = 0; q < featureClasses.length; q++) {
        cardFeatures[i].classList.remove(featureClasses[q]);
      }
      cardFeatures[i].classList.add('hidden');
    }
  }
};

var getTime = function (accommodation) {
  return 'Заезд после ' + accommodation.offer.checkin + ', выезд до ' + accommodation.offer.checkout;
};

var getPhotos = function (accommodation, cardPhotoList, cardPhotos) {
  if (cardPhotos.length < accommodation.offer.photos.length) {
    var photoTemplate = cardPhotos[0].cloneNode(true);
    for (var i = 0; i < accommodation.offer.photos.length; i++) {
      cardPhotoList.appendChild(photoTemplate);
    }
  }
  for (i = 0; i < cardPhotos.length; i++) {
    cardPhotos[i].src = accommodation.offer.photos[i];
  }
};

pinList.appendChild(getPinList(accommodations));

var mapFilterContainer = document.querySelector('.map__filters-container');
var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

var renderCard = function (accommodation) {
  var cardElement = cardTemplate.cloneNode(true);

  var cardTitle = cardElement.querySelector('.popup__title');
  cardTitle.textContent = accommodation.offer.title;

  var cardAddress = cardElement.querySelector('.popup__text--address');
  cardAddress.textContent = accommodation.offer.address;

  var cardPrice = cardElement.querySelector('.popup__text--price');
  cardPrice.textContent = accommodation.offer.price + '₽/ночь';

  var cardType = cardElement.querySelector('.popup__type');
  cardType.textContent = getOfferType(accommodation);

  var cardCapacity = cardElement.querySelector('.popup__text--capacity');
  cardCapacity.textContent = getCapacity(accommodation);

  var cardTime = cardElement.querySelector('.popup__text--time');
  cardTime.textContent = getTime(accommodation);

  var cardFeatureList = cardElement.querySelector('.popup__features');
  var cardFeatures = cardFeatureList.children;
  getFeatures(accommodation, cardFeatures);

  var cardDescription = cardElement.querySelector('.popup__description');
  cardDescription.textContent = accommodation.offer.description;


  var cardPhotoList = cardElement.querySelector('.popup__photos');
  var cardPhotos = cardPhotoList.children;
  getPhotos(accommodation, cardPhotoList, cardPhotos);

  return cardElement;
};

var getCard = function (offer) {
  var fragment = document.createDocumentFragment();

  fragment.appendChild(renderCard(offer));

  return fragment;
};

mapFilterContainer.before(getCard(accommodations[0]));

