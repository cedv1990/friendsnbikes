/// <reference path="s5-js/s5.js" />
/// <reference path="s5-js/s5.icons.js" />

const about = s5.initialize();

about.require([], () => {
    const profiles = s5.get('.profile');

    const quitarSelected = (ex) => {
        profiles.filter(prof => prof != ex).forEach(profile => profile.classList.remove('selected'));
    };

    profiles.forEach(profile => 
        profile.addEvent('click', () => {
            quitarSelected(profile);
            profile.classList.toggle('selected')
        })
    );
});