const track_name = document.getElementsByClassName('track-name')[0];
const artist_name = document.getElementsByClassName('artist-name')[0];
const album_name = document.getElementsByClassName('album-name')[0];
const album_image = document.getElementsByClassName('album-image')[0];
const song_border = document.getElementsByClassName('song-border')[0];

const head_title = document.getElementById('head-title');

const animation = [
    { transform: 'translateY(100%)' },
    { transform: 'translateY(0)' }
]
const animation_setting = {
    duration: 1000,
    easing: 'ease-in-out',
    fill: 'forwards'
}

const animateComponent = (track_name, artist_name, album_name, album_image, isReverse) => {
    if (isReverse) {
        animation_setting.direction = 'reverse';
    } else {
        animation_setting.direction = 'normal';
    }

    track_name.animate(animation, animation_setting);
    artist_name.animate(animation, animation_setting);
    album_name.animate(animation, animation_setting);
    album_image.animate(animation, animation_setting);
}

const checkIfSongChanged = (current_track_name, current_artist_name, current_album_name, current_album_image, data) => {
    if (data.track_name !== current_track_name || data.artist_name !== current_artist_name || data.album_name !== current_album_name || data.album_image !== current_album_image) {
        return true;
    }
    return false;
}

let isSongPlaying = false;

const getSong = async () => {
    const current_track_name = track_name.innerHTML;
    const current_artist_name = artist_name.innerHTML;
    const current_album_name = album_name.innerHTML;
    const current_album_image = album_image.src;

    const response = await fetch('/current-playing-song');
    const data = await response.json();
    if (data.is_playing) {

        if (checkIfSongChanged(current_track_name, current_artist_name, current_album_name, current_album_image, data)) {
            track_name.innerHTML = data.track_name;
            artist_name.innerHTML = data.artist_name;
            album_name.innerHTML = data.album_name;
            album_image.src = data.album_image;

            head_title.innerText = data.track_name + ' - ' + data.artist_name + ' ';
            animateComponent(track_name, artist_name, album_name, album_image, false);

            if (!isSongPlaying) {
                isSongPlaying = true;
                // remove div beside artist name
                const divElement = document.getElementsByClassName('no-song-playing')[0];
                if (divElement) {
                    divElement.remove();
                }
            }

        }
    } else {
        const noSongPlaying = document.getElementsByClassName('no-song-playing')[0];
        if (noSongPlaying) {
            return;
        }
        const divElement = document.createElement('h1');
        divElement.classList.add('no-song-playing');
        divElement.innerHTML = 'No song is playing';
        const parent = artist_name.parentNode;
        parent.insertBefore(divElement, artist_name.nextSibling)
        if (isSongPlaying) {
            track_name.innerHTML = '';
            artist_name.innerHTML = '';
            album_name.innerHTML = '';
            album_image.src = '';
            head_title.innerText = 'No song is playing';
            animateComponent(track_name, artist_name, album_name, album_image, true);
            isSongPlaying = false;
        }

    }
}

getSong();

const swipeTitle = () => {
    head_title.innerText = head_title.innerText.slice(1) + head_title.innerText[0];
}

setInterval(() => {
    swipeTitle();
}, 500);

setInterval(() => {
    getSong();
}, 1000);
