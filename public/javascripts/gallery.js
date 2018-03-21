album.define('gallery', () => {

    let data;
    let index = 0;

    const _setData = d => data = d;
    let photoView;
    let container;

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

        photoView = s5.createElem('section', { 'class': 'gallery-photo' });

        container.insert([
            titleCont,
            left,
            photoView,
            right
        ]);
        document.body.appendChild(container);
    };

    const next = album => {
        photoView.insert(s5.createElem('img', { 'src': '/images/albums/{0}/{1}'.format(album.name, album.imgs[index]) }));
    };

    const _init = i => {
        createLayout(data[i].show);
        next(data[i]);
    }

    return {
        init: _init,
        setData: _setData
    };
});