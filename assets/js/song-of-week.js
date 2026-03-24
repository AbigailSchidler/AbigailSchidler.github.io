/* ==========================================================================
   song-of-week.js — Manual "Song of the Week" card.

   To update the song, edit the SONG object below.
   No API keys, no auth, no network requests — just data.

   image: path relative to site root, or an absolute URL to the album art.
          Spotify album art URLs are public and work fine (copy from the
          share menu → "Copy Image Address"), or save the image locally
          under assets/images/.
   ========================================================================== */

(function () {

  /* ── Update this object to change the song ─────────────────────────────── */
  var SONG = {
    title:      'Tin Man',
    artist:     'America',
    image:      'https://i.scdn.co/image/ab67616d0000b273b413611fad88fc58ba8be137',                                /* path or URL to album art */
    spotifyUrl: 'https://open.spotify.com/track/4uTTd2SlalZoG0zVgI63kH?si=4788f7b53c4c4bc1',       /* link to track or album   */
    caption:    'On repeat this week'             /* short optional note      */
  };
  /* ─────────────────────────────────────────────────────────────────────────*/

  function esc(str) {
    return String(str)
      .replace(/&/g,  '&amp;')
      .replace(/</g,  '&lt;')
      .replace(/>/g,  '&gt;')
      .replace(/"/g,  '&quot;');
  }

  function render() {
    var card = document.getElementById('sotw-card');
    if (!card) return;

    card.innerHTML =
      '<div class="sotw-card__art">' +
        (SONG.image
          ? '<img src="' + esc(SONG.image) + '" alt="Album art for ' + esc(SONG.title) + '" />'
          : '') +
      '</div>' +
      '<div class="sotw-card__info">' +
        '<p class="sotw-label">Song of the Week</p>' +
        '<p class="sotw-track">'   + esc(SONG.title)   + '</p>' +
        '<p class="sotw-artist">'  + esc(SONG.artist)  + '</p>' +
        (SONG.caption
          ? '<p class="sotw-caption">' + esc(SONG.caption) + '</p>'
          : '') +
        '<a href="'  + esc(SONG.spotifyUrl) + '" class="btn btn-outline sotw-btn"' +
          ' target="_blank" rel="noopener">Listen on Spotify</a>' +
      '</div>';

    card.classList.add('sotw-loaded');
  }

  document.addEventListener('DOMContentLoaded', render);

})();
