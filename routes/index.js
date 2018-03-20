var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '@FriendsNbikes - FnB', inicio: true, about: false, events: false });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Nosotros - @FriendsNbikes', inicio: false, about: true, events: false });
});

router.get('/events', function(req, res, next) {
  res.render('events', { title: 'Eventos - @FriendsNbikes', inicio: false, about: false, events: true });
});

module.exports = router;
