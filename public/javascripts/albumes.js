/// <reference path="s5-js/s5.js" />
/// <reference path="s5-js/s5.icons.js" />

const album = s5.initialize();

album.require(['gallery'], gallery => {
    let a = s5.get('__data');
    gallery.setData( JSON.parse( a.value ) );
    a.delete();
    delete a;

    const albums = s5.get('.album');
    albums.forEach(album => {
        album.addEvent('click', () => gallery.init(parseInt( album.attribute('num') )));
    });
});