'use strict';

(function () {
  var STAY_COUNT = 8;
  var TITLES = ['2-х этажный дом', '3-х комнатная квартира', 'шатер', 'комната', 'место на парковке', 'квартира в центре', 'койко-место', 'трюм корабля'];
  var PRICES = [10000, 8000, 10, 100, 2000, 15000, 50, 1];
  var TYPES = ['house', 'flat', 'bungalo', 'flat', 'bungalo', 'flat', 'bungalo', 'palace'];
  var ROOMS = [5, 3, 1, 1, 2, 12, 1, 4];
  var GUESTS = [10, 6, 1, 2, 2, 30, 1, 9];
  var CHECKINS = ['12:00', '13:00', '12:00', '13:00', '14:00', '14:00', '13:00', '13:00'];
  var CHECKOUTS = ['13:00', '14:00', '14:00', '14:00', '12:00', '12:00', '14:00', '13:00'];
  var FEATURES = [
    ['wifi', 'dishwasher', 'washer', 'elevator', 'conditioner'],
    ['wifi', 'dishwasher', 'elevator', 'conditioner'],
    ['elevator'],
    ['wifi', 'dishwasher', 'washer'],
    ['parking'],
    ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    ['wifi', 'dishwasher', 'washer'],
    ['washer', 'elevator']
  ];
  var DESCRIPTIONS = ['1', '2', '3', '4', '5', '6', '7', '8'];
  var PHOTOS = [
    ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg'],
    ['http://o0.github.io/assets/images/tokyo/hotel2.jpg'],
    ['http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
    ['http://o0.github.io/assets/images/tokyo/hotel4.jpg'],
    ['http://o0.github.io/assets/images/tokyo/hotel5.jpg'],
    ['http://o0.github.io/assets/images/tokyo/hotel6.jpg'],
    ['http://o0.github.io/assets/images/tokyo/hotel7.jpg'],
    ['http://o0.github.io/assets/images/tokyo/hotel8.jpg']
  ];

  var getNearStay = function () {
    var arr = [];
    for (var i = 0; i < STAY_COUNT; i++) {
      var xLocation = window.helpers.getRandomInt(0, window.pin.mapWidth) - 25;
      var yLocation = window.helpers.getRandomInt(130, 630) - 35;
      var obj = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },

        offer: {
          title: TITLES[i],
          address: xLocation + ', ' + yLocation,
          price: PRICES[i],
          type: TYPES[i],
          rooms: ROOMS[i],
          guests: GUESTS[i],
          checkin: CHECKINS[i],
          checkout: CHECKOUTS[i],
          features: FEATURES[i],
          description: DESCRIPTIONS[i],
          photos: PHOTOS[i]
        },

        location: {
          x: xLocation + 'px',
          y: yLocation + 'px'
        }
      };
      arr.push(obj);
    }
    return arr;
  };

  window.data = {
    accommodations: getNearStay()
  };
})();
