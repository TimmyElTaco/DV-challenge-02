const SONGS = [
    {
        src: '/music/forest-lullaby-110624.mp3',
        name: 'Forest Lullaby',
        artist: 'Lesfm',
        time: '138',
        image: '/static/images/cover-2.png'
    },
    {
        src: '/music/lost-in-city-lights-145038.mp3',
        name: 'Lost in the City Lights',
        artist: 'Cosmo Sheldrake',
        time: '72',
        image: '/static/images/cover-1.png'
    }
];

let currentSong = 0;

const range = document.querySelector('.player-range');
const nameEl = document.querySelector('.player-info-title');
const artistEl = document.querySelector('.player-info-artist');
const imageEl = document.querySelector('.player-image');

const song = document.querySelector('#song');

document.addEventListener('DOMContentLoaded', () => {
    range.addEventListener('change', () => {
        song.currentTime = range.value;
        updateRange();
    });

    updateSong();
})

song.addEventListener('timeupdate', () => {
    updateMinutes();
    range.value = parseInt(song.currentTime);
    updateRange();
});

song.addEventListener('ended', () => {
    nextSong();
    updateRange();
    stopAndPlay();
})

function updateSong() {
    const { time, name, artist, src, image } = SONGS[currentSong];

    range.setAttribute('max', time);
    range.setAttribute('value', '0');

    nameEl.textContent = name;
    artistEl.textContent = artist;
    
    imageEl.setAttribute('src', image);
    song.setAttribute('src', src);
    
    updateMinutes();
}

function updateRange() {
    const { time } = SONGS[currentSong];
    const rootStyle = document.documentElement.style;
    const value = (range.value / time) * 100;

    rootStyle.setProperty('--RANGE-VALUE', `${value}%`);
}

function updateMinutes() {
    const controlsTexts = document.querySelectorAll('.player-controls-texts small');
    const time = formatSeconds(SONGS[currentSong].time);
    const current = formatSeconds(parseInt(song.currentTime));

    controlsTexts[0].textContent = current;
    controlsTexts[1].textContent = time;
}

function nextSong() {
    if(currentSong === 1) {
        currentSong = 0;
        updateSong();
    } else {
        currentSong++;
        updateSong();
    }
}

function backSong() {
    if(currentSong === 0) {
        currentSong = 1;
        updateSong();
    } else {
        currentSong--;
        updateSong();
    }
}

function stopAndPlay() {
    if(song.paused) {
        song.play();
    } else {
        song.pause();
    }
}

function formatSeconds(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    
    const formated = `${minutes < 10 ? `0${minutes}` : minutes}:${secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}`;
    
    return formated;
}
