var express = require('express');
var router = express.Router();

var anio = new Date().getFullYear();

/* GET home page. */
router.get('/', function(req, res, next) {
  const albums = [];
  const dir = __dirname.replace(/routes/, '') + 'public/images/albums';
  const description = '@FriendsNbikes - Amigos, risas, motos y adrenalina.';

  const _url = req.protocol + (req.secure ? 's' : '') + '://' + req.headers.host;

  const extensions = ['BMP', 'GIF', 'JPG', 'JPEG', 'TIF', 'PNG'];

  const leer = (d, ar) => {
    const fs = require('fs');

    fs.readdirSync(d).forEach(file => {
      if ( fs.statSync(d + '/' + file).isDirectory() ) {
        const configuration = JSON.parse(fs.readFileSync(d + '/' + file + '/config.json', 'utf8'));

        var album = {
          name: configuration.name,
          description: configuration.description,
          coverImgs: configuration.cover,
          folder: '/images/albums/' + file,
          imgs: leer(d + '/' + file, [])
        };
        albums.push(album);
      }
      else{
        if (extensions.indexOf( file.toUpperCase().split('.').pop() ) >= 0
          &&
          !file.toLowerCase().startsWith('min-')
        )
          ar.push(file);
      }
    });
    return ar;
  }

  leer(dir, null);

  res.render('index', { title: '@FriendsNbikes - FnB', inicio: true, about: false, events: false, anio: anio, albums: albums, albumsString: JSON.stringify(albums), domain: _url, description: description });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Nosotros - @FriendsNbikes', inicio: false, about: true, events: false, anio: anio, domain: _url, description: description });
});

router.get('/events', function(req, res, next) {
  res.render('events', { title: 'Eventos - @FriendsNbikes', inicio: false, about: false, events: true, anio: anio, domain: _url, description: description });
});

module.exports = router;
