/// <reference path="s5-js/s5.js" />
/// <reference path="s5-js/s5.icons.js" />

const FNB = s5.initialize();

FNB.require([], () => {
    const index = () => window.location.href = '/';

    s5.get('logo').addEvent('click', index);
    s5.get('.namegroup').shift().addEvent('click', index);

    const FB = s5.get('.facebook').shift().insert(s5.iconos.Facebook(25, '#FFFFFF'));
    const IG = s5.get('.instagram').shift().insert(s5.iconos.Instagram(25, '#FFFFFF'));
    const menu = s5.get('.icono').shift().insert(s5.iconos.MenuMobile(38, '#FFFFFF'));
    const nav = s5.get('.menu > nav').shift();
    const itemsMenu = s5.get('.menuitem');

    FB.addEvent('click', () => window.open('https://fb.me/friendsnbikes'));
    IG.addEvent('click', () => window.open('https://www.instagram.com/friendsnbikes'));
    menu.addEvent('click', () => nav.classList.toggle('visible'));

    itemsMenu.forEach(item => item.addEvent('click', () => window.location.href = item.attribute('url')));

    let pos = 0;
    const back = ['superduke', 'radical'];
    setInterval(()=>{
        document.body.style.backgroundImage = 'url("/images/backgrounds/{0}.png")'.format(back[pos]);
        pos++;
        if (pos > 1) pos = 0;
    }, 10000);
});