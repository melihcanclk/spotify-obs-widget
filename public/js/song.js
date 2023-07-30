const track_name = document.getElementById('track-name');
const artist_name = document.getElementById('artist-name');
const album_name = document.getElementById('album-name');
const album_image = document.getElementById('album-image');

const head_title = document.getElementById('head-title');

const getSong = async () => {

    const current_track_name = track_name.innerHTML;
    const current_artist_name = artist_name.innerHTML;
    const current_album_name = album_name.innerHTML;
    const current_album_image = album_image.src;

    const response = await fetch('/current-playing-song').catch(err => {
        console.log(err);
    });
    const data = await response.json();
    if (data && data.track_name && data.track_name !== current_track_name && data.artist_name !== current_artist_name && data.album_name !== current_album_name && data.album_image !== current_album_image) {
        const song_container = document.getElementsByClassName('song-container');
        // add song-container-animation class to song-container
        song_container[0].classList.add('song-container-animation');

        // remove song-container-animation class from song-container after 1s
        setTimeout(() => {
            song_container[0].classList.remove('song-container-animation');

            track_name.innerHTML = data.track_name;
            artist_name.innerHTML = data.artist_name;
            album_name.innerHTML = data.album_name;
            album_image.src = data.album_image;

            head_title.innerText = data.track_name + ' - ' + data.artist_name + ' ';
        }, 500);

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
