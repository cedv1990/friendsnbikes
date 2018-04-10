var express = require('express');
var router = express.Router();

const anio = new Date().getFullYear();

const description = '@FriendsNbikes - Amigos, risas, motos y adrenalina.';

const _url = (req) => req.protocol + (req.secure ? 's' : '') + '://' + req.headers.host;

/* GET home page. */
router.get('/', function(req, res, next) {
  const albums = [];
  const dir = __dirname.replace(/routes/, '') + 'public/images/albums';

  const extensions = ['BMP', 'GIF', 'JPG', 'JPEG', 'TIF', 'PNG'];

  const leer = (d, ar) => {
    const fs = require('fs');

    fs.readdirSync(d).forEach(file => {
      if ( fs.statSync(d + '/' + file).isDirectory() ) {
        const configuration = JSON.parse(fs.readFileSync(d + '/' + file + '/config.json', 'utf8'));

        var album = {
          name: configuration.name,
          date: configuration.date,
          description: configuration.description,
          coverImgs: configuration.cover,
          folder: '/images/albums/' + file,
          imgs: leer(d + '/' + file, []),
          videos: configuration.videos || []
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

  res.render('index', { title: '@FriendsNbikes - FnB', inicio: true, about: false, events: false, anio: anio, albums: albums, albumsString: JSON.stringify(albums.reverse()), domain: _url(req), description: description });
});

router.get('/about', function(req, res, next) {
  const fs = require('fs');
  const dir = __dirname.replace(/routes/, '') + 'profiles.json';

  const profiles = JSON.parse(fs.readFileSync(dir, 'utf8')).sort((a, b) => a.order - b.order);

  res.render('about', { title: 'Nosotros - @FriendsNbikes', inicio: false, about: true, events: false, anio: anio, domain: _url(req), description: description, profiles: profiles });
});

router.get('/events', function(req, res, next) {
  res.render('events', { title: 'Eventos - @FriendsNbikes', inicio: false, about: false, events: true, anio: anio, domain: _url(req), description: description });
});

module.exports = router;
