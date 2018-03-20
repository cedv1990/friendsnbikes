/// <reference path="s5-js/s5.js" />
/// <reference path="s5-js/s5.icons.js" />

const FNB = s5.initialize();

FNB.require([], () => {
    const FB = s5.get('.facebook').shift();
    const IG = s5.get('.instagram').shift();

    FB.addEvent('click', () => window.open('https://fb.me/friendsnbikes'));
    IG.addEvent('click', () => window.open('https://www.instagram.com/friendsnbikes'));
});