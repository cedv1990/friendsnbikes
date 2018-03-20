(() => {
    let verMas = s5.get('.see');
    let a = s5.get('__data');
    const __data = JSON.parse( a.value );
    a.delete();
    delete a;

    verMas.forEach((v) => {
        v.addEvent('click', () => {
            const albumIndex = parseInt( v.attribute('albumIndex') );
            const index = parseInt( v.attribute('index') ) + 1;
            const container = s5.get('.imgs-' + albumIndex).shift();
            __data[albumIndex].pages[index].imgs.forEach((img) => {
                container.insert(s5.createElem('div').insert(
                    s5.createElem('img', { 'src': '/images/albums/{0}/{1}'.format(__data[albumIndex].name, img) })
                ));
            });
            if (__data[albumIndex].pages.length > index + 1)
                v.attribute('index', index);
            else
                v.delete();
        });
    });
})();