album.define('gallery', () => {

    let indexAlbum;
    let data;
    let index;

    const description = () => 'Foto {0} de {1}'.format(index + 1, data[indexAlbum].imgs.length);

    const _setData = d => data = d;
    let photoView;
    let container;
    let foot;

    const destroy = () => {
        container.delete();
    }

    const createLayout = title => {
        container = s5.createElem('aside', { 'class': 'gallery-container' });
        const left = s5.createElem('aside', { 'class': 'gallery-prev hidden' }).insert(s5.iconos.Triangulo(20, '#FFFFFF'));
        const right = s5.createElem('aside', { 'class': 'gallery-next' }).insert(s5.iconos.Triangulo(20, '#FFFFFF'));
        const titleCont = s5.createElem('div', { 'class': 'gallery-title' }).insert([
            document.createTextNode(title),
            s5.createElem('aside', { 'class': 'gallery-close' }).insert(s5.iconos.Plus(50, '#FFFFFF')).addEvent('click', destroy)
        ]);
        foot = s5.createElem('div', { 'class': 'gallery-desc' });

        right.addEvent('click', () => { 
            index++;
            next();
            left.classList.remove('hidden');
            if (index + 1 == data[indexAlbum].imgs.length)
                right.classList.add('hidden');
        });

        left.addEvent('click', () => { 
            index--;
            next();
            right.classList.remove('hidden');
            if (index == 0)
                left.classList.add('hidden');
        });

        photoView = s5.createElem('section', { 'class': 'gallery-photo' });

        container.insert([
            titleCont,
            left,
            photoView,
            right,
            foot
        ]);
        document.body.appendChild(container);
    };

    const next = () => {
        const album = data[indexAlbum];
        photoView.innerHTML = '';
        foot.innerHTML = '';

        const url = '/images/albums/{0}/{1}'.format(album.name, album.imgs[index]);

        photoView.insert(s5.createElem('img', { 'src': url }));
        if (s5.get('__style')) s5.get('__style').delete();
        const style = s5.createElem('style', { 'id': '__style' });
        style.innerHTML = '.gallery-container .gallery-photo::before { background-image: url("{0}") }'.format(url);
        document.head.appendChild(style);
        foot.insert(document.createTextNode(description()));
    };

    const _init = i => {
        index = 0;
        indexAlbum = i;
        createLayout(data[indexAlbum].show);
        next();
    }

    return {
        init: _init,
        setData: _setData
    };
});