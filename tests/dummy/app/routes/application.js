import Ember from 'ember';

function randomString() {
  var result = '', length = 5 + Math.round(Math.random() * 20), chars = '    abcdefghijklmnopqrstuvwxyz';
  for (var i = length; i > 0; --i) {
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  }
  return result.trim();
}

function randomInt() {
  return Math.round(Math.random() * 1000) - 500;
}

var MIN_DATE = Date.now() - 1000 * 60 * 60 * 24 * 365.25;
var MAX_DATE = Date.now() + 1000 * 60 * 60 * 24 * 365.25;

function randomDate() {
  return new Date(Math.round(MIN_DATE + Math.random() * (MAX_DATE - MIN_DATE)));
}

export default Ember.Route.extend({
  model: function () {
    var res = [];
    for (var i = 0; i < 1000; i++) {
      res.push({
        date: randomDate(),
        text: randomString(),
        int:  randomInt()
      });
    }
    return res;
  }
});
