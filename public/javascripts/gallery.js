album.define('gallery', () => {

    let indexAlbum;
    let data;
    let index;

    const description = () => 'Elemento {0} de {1}'.format(index + 1, data[indexAlbum].imgs.length + data[indexAlbum].videos.length);

    const _setData = d => data = d;
    let photoView;
    let container;
    let foot;

    const createLayout = title => {
        const keyupEvent = (e) => {
            if (e.keyCode == 27) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                destroy();
            }
            else if (e.keyCode == 39) {
                if (index + 1 < data[indexAlbum].imgs.length + data[indexAlbum].videos.length) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    rightEvent();
                }
            }
            else if (e.keyCode == 37) {
                if (index > 0) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    leftEvent();
                }
            }
        };

        const destroy = () => {
            container.delete();
            container.removeEvent.call(window, 'keyup', keyupEvent);
        }

        container = s5.createElem('aside', { 'class': 'gallery-container' });

        container.addEvent.call(window, 'keyup', keyupEvent);

        const left = s5.createElem('aside', { 'class': 'gallery-prev hidden' }).insert(s5.iconos.Triangulo(20, '#FFFFFF'));
        const right = s5.createElem('aside', { 'class': 'gallery-next' }).insert(s5.iconos.Triangulo(20, '#FFFFFF'));
        const titleCont = s5.createElem('div', { 'class': 'gallery-title' }).insert([
            document.createTextNode(title),
            s5.createElem('aside', { 'class': 'gallery-close' }).insert(s5.iconos.Plus(50, '#FFFFFF')).addEvent('click', destroy)
        ]);
        foot = s5.createElem('div', { 'class': 'gallery-desc' });

        const rightEvent = () => {
            index++;
            next();
            left.classList.remove('hidden');
            if (index + 1 == data[indexAlbum].imgs.length + data[indexAlbum].videos.length)
                right.classList.add('hidden');
        };

        const leftEvent = () => {
            index--;
            next();
            right.classList.remove('hidden');
            if (index == 0)
                left.classList.add('hidden');
        };

        right.addEvent('click', rightEvent);

        left.addEvent('click', leftEvent);

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

        if (index < album.imgs.length) {

            const url = '{0}/{1}'.format(album.folder, album.imgs[index]);

            photoView.insert(s5.createElem('img', { 'src': url }));
            if (s5.get('__style')) s5.get('__style').delete();
            const style = s5.createElem('style', { 'id': '__style' });
            style.innerHTML = '.gallery-container .gallery-photo::before { background-image: url("{0}") }'.format(url);
            document.head.appendChild(style);

        }
        else{

            photoView.insert(s5.createElem('iframe', { 'src': album.videos[index - album.imgs.length] }));
            if (s5.get('__style')) s5.get('__style').delete();

        }

        foot.insert(document.createTextNode(description()));
    };

    const _init = i => {
        index = 0;
        indexAlbum = i;
        createLayout(data[indexAlbum].name + ' - ' + data[indexAlbum].date);
        next();
    }

    return {
        init: _init,
        setData: _setData
    };
});