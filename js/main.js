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

var stayCount = 8;
var titles = ['2-х этажный дом', '3-х комнатная квартира', 'шатер', 'комната', 'место на парковке', 'квартира в центре', 'койко-место', 'трюм корабля'];
var prices = [10000, 8000, 10, 100, 2000, 15000, 50, 1];
var types = ['house', 'flat', 'bungalo', 'flat', 'bungalo', 'flat', 'bungalo', 'palace'];
var rooms = [5, 3, 1, 1, 2, 12, 1, 4];
var guests = [10, 6, 1, 2, 2, 30, 1, 9];
var checkins = ['12:00', '13:00', '12:00', '13:00', '14:00', '14:00', '13:00', '13:00'];
var checkouts = ['13:00', '14:00', '14:00', '14:00', '12:00', '12:00', '14:00', '13:00'];
var features = [
  ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  ['wifi', 'dishwasher', 'elevator', 'conditioner'],
  ['elevator'],
  ['wifi', 'dishwasher', 'washer'],
  ['parking'],
  ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  ['wifi', 'dishwasher', 'washer'],
  ['washer', 'elevator'],
];
var descriptions = ['1', '2', '3', '4', '5', '6', '7', '8'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg', 'http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel1.jpg'];

var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

var getNearStay = function () {
  var accommodations = [];
  for (var i = 0; i < stayCount; i++) {
    var xLocation = getRandomInt(0, 1100) - 25;
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
var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pinList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var renderPin = function (accommodation) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = accommodation.location.x;
  pinElement.style.top = accommodation.location.y;
  pinElement.querySelector('img').src = accommodation.author.avatar;
  pinElement.querySelector('img').alt = accommodation.offer.title;

  return pinElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < accommodations.length; i++) {
  fragment.appendChild(renderPin(accommodations[i]));
}

pinList.appendChild(fragment);
