var express = require('express');
var router = express.Router();

var anio = new Date().getFullYear();

/* GET home page. */
router.get('/', function(req, res, next) {
  const albums = [];
  const dir = __dirname.replace(/routes/, '') + 'public/images/albums';
  const _url = req.protocol + '://' + req.headers.host;

  const leer = (d, ar) => {
    const fs = require('fs');
    fs.readdirSync(d).forEach(file => {
      if ( fs.statSync(d + '/' + file).isDirectory() ) {
        var album = {
          name: file,
          show: file.replace(/_/g, '/'),
          imgs: leer(d + '/' + file, [])
        };
        albums.push(album);
      }
      else{
        ar.push(file);
      }
    });
    return ar;
  }

  leer(dir, null);

  console.log(albums);

  res.render('index', { title: '@FriendsNbikes - FnB', inicio: true, about: false, events: false, anio: anio, albums: albums, albumsString: JSON.stringify(albums), domain: _url });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Nosotros - @FriendsNbikes', inicio: false, about: true, events: false, anio: anio });
});

router.get('/events', function(req, res, next) {
  res.render('events', { title: 'Eventos - @FriendsNbikes', inicio: false, about: false, events: true, anio: anio });
});

module.exports = router;
