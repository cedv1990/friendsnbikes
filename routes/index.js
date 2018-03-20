var express = require('express');
var router = express.Router();

var anio = new Date().getFullYear();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '@FriendsNbikes - FnB', inicio: true, about: false, events: false, anio: anio });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Nosotros - @FriendsNbikes', inicio: false, about: true, events: false, anio: anio });
});

router.get('/events', function(req, res, next) {
  res.render('events', { title: 'Eventos - @FriendsNbikes', inicio: false, about: false, events: true, anio: anio });
});

module.exports = router;
