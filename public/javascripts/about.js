/// <reference path="s5-js/s5.js" />
/// <reference path="s5-js/s5.icons.js" />

const about = s5.initialize();

about.require([], () => {
    const profiles = s5.get('.profile');

    const quitarSelected = (ex) => {
        profiles.filter(prof => prof != ex).forEach(profile => profile.classList.remove('selected'));
    };

    profiles.forEach(profile => {
        profile.get('.picture').shift().addEvent('click', () => {
            quitarSelected(profile);
            profile.classList.toggle('selected')
        });
        const insta = profile.get('.instagram').shift().insert(s5.iconos.Instagram(20, '#ffcd81'), 0);
        insta.addEvent('click', () => window.open('https://www.instagram.com/' + insta.attribute('url').replace(/@/, '')));
        if (isMobile)
            profile.classList.add('mobile');
    });
});