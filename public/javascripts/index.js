/// <reference path="s5-js/s5.js" />
/// <reference path="s5-js/s5.icons.js" />

const FNB = s5.initialize();

FNB.require([], () => {
    const FB = s5.get('.facebook').shift();
    const IG = s5.get('.instagram').shift();
    const menu = s5.get('.icono').shift();
    const nav = s5.get('.menu > nav').shift();

    FB.addEvent('click', () => window.open('https://fb.me/friendsnbikes'));
    IG.addEvent('click', () => window.open('https://www.instagram.com/friendsnbikes'));
    menu.addEvent('click', () => nav.classList.toggle('visible'));
});