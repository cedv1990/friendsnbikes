var express = require('express');
var router = express.Router();

var anio = new Date().getFullYear();

/* GET home page. */
router.get('/', function(req, res, next) {
  const albums = [];
  const dir = __dirname.replace(/routes/, '') + 'public\\images\\albums';

  const leer = (d, ar) => {
    const fs = require('fs');
    fs.readdirSync(d).forEach(file => {
      if ( fs.statSync(d + '\\' + file).isDirectory() ) {
        var album = {
          name: file,
          show: file.replace(/_/g, '/'),
          pages: []
        };
        var imgs = leer(d + '\\' + file, []);


        let actual = '';
        let n = 0;
        for(let i = 1; i <= imgs.length; i++) {
          if (i == 1){
            actual = i + '-15';
            n++;
            album.pages.push({interval: actual, imgs: []});
          }
          else if (i % 15 == 0){
            actual = (i + 1) + '-' + (i + (imgs.length - i < 15 ? imgs.length - i : 15));
            n++;
            album.pages.push({interval: actual, imgs: []});
          }
          album.pages[n - 1].imgs.push(imgs[i - 1]);
        }
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

  res.render('index', { title: '@FriendsNbikes - FnB', inicio: true, about: false, events: false, anio: anio, albums: albums, albumsString: JSON.stringify(albums) });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Nosotros - @FriendsNbikes', inicio: false, about: true, events: false, anio: anio });
});

router.get('/events', function(req, res, next) {
  res.render('events', { title: 'Eventos - @FriendsNbikes', inicio: false, about: false, events: true, anio: anio });
});

module.exports = router;
