/* ==========================================================================
   song-of-week.js — Fetches and displays the first track of a Spotify
   playlist. Uses the Client Credentials flow (no user login required).

   SETUP
   ─────
   1. Go to https://developer.spotify.com/dashboard and create a free app.
      Set any redirect URI (e.g. http://localhost) — it won't be used.
   2. Copy your Client ID and Client Secret into the config block below.
   3. Set PLAYLIST_ID to the ID segment of your playlist URL:
        https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M
                                            ^^^^^^^^^^^^^^^^^^^^^^ ← this part

   SECURITY NOTE
   ─────────────
   Client credentials are visible in page source. This is acceptable for a
   personal portfolio displaying only public playlists. Create a dedicated
   Spotify app so you can revoke it independently if ever needed.
   ========================================================================== */

(function () {

  /* ── Configuration ───────────────────────────────────────────────────────── */
  var PLAYLIST_ID   = '0l50F0wBJpbdguYgtYKLMO';   /* ← change this */
  var CLIENT_ID     = 'bc1996ee96aa489c8d3614f032510988';     /* ← change this */
  var CLIENT_SECRET = '9c811fec43eb48be837637553668e2f8'; /* ← change this */
  /* ─────────────────────────────────────────────────────────────────────────── */

  var CARD_ID       = 'sotw-card';
  var TOKEN_KEY     = 'sotw_token';
  var TOKEN_EXP_KEY = 'sotw_token_exp';

  /* ── Token management ────────────────────────────────────────────────── */

  function cachedToken() {
    var token = sessionStorage.getItem(TOKEN_KEY);
    var exp   = parseInt(sessionStorage.getItem(TOKEN_EXP_KEY) || '0', 10);
    return (token && Date.now() < exp) ? token : null;
  }

  function cacheToken(token, expiresIn) {
    sessionStorage.setItem(TOKEN_KEY, token);
    /* Subtract 60 s so we refresh before the token actually expires */
    sessionStorage.setItem(TOKEN_EXP_KEY, String(Date.now() + (expiresIn - 60) * 1000));
  }

  function fetchToken(cb) {
    var cached = cachedToken();
    if (cached) return cb(null, cached);

    fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
        'Content-Type':  'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (!data.access_token) throw new Error('No access token in response');
        cacheToken(data.access_token, data.expires_in || 3600);
        cb(null, data.access_token);
      })
      .catch(function (err) { cb(err); });
  }

  /* ── Playlist fetch ──────────────────────────────────────────────────── */

  function fetchFirstTrack(token, cb) {
    var fields = 'items(track(name,artists(name),album(name,images),external_urls))';
    var url    = 'https://api.spotify.com/v1/playlists/'
               + encodeURIComponent(PLAYLIST_ID)
               + '/tracks?limit=1&fields=' + encodeURIComponent(fields);

    fetch(url, { headers: { 'Authorization': 'Bearer ' + token } })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var track = data.items && data.items[0] && data.items[0].track;
        if (!track) throw new Error('Playlist is empty or track is null');
        cb(null, track);
      })
      .catch(function (err) { cb(err); });
  }

  /* ── Rendering ───────────────────────────────────────────────────────── */

  function esc(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderCard(track) {
    var card = document.getElementById(CARD_ID);
    if (!card) return;

    /* Prefer the medium-size image (index 1); fall back to largest (0) */
    var images  = track.album.images || [];
    var artUrl  = images.length > 1 ? images[1].url : (images[0] ? images[0].url : '');
    var name    = track.name;
    var artist  = track.artists.map(function (a) { return a.name; }).join(', ');
    var href    = (track.external_urls || {}).spotify || 'https://spotify.com';

    card.innerHTML =
      '<div class="sotw-card__art">' +
        (artUrl
          ? '<img src="' + esc(artUrl) + '" alt="Album art for ' + esc(name) + '" />'
          : '') +
      '</div>' +
      '<div class="sotw-card__info">' +
        '<p class="sotw-label">Song of the Week</p>' +
        '<p class="sotw-track">'  + esc(name)   + '</p>' +
        '<p class="sotw-artist">' + esc(artist) + '</p>' +
        '<a href="' + esc(href) + '" class="btn btn-outline sotw-btn"' +
          ' target="_blank" rel="noopener">Listen on Spotify</a>' +
      '</div>';

    card.classList.add('sotw-loaded');
  }

  /* ── Init ────────────────────────────────────────────────────────────── */

  function init() {
    /* Skip silently if the config placeholders haven't been filled in yet */
    if (PLAYLIST_ID === 'YOUR_PLAYLIST_ID') return;

    fetchToken(function (err, token) {
      if (err) return;
      fetchFirstTrack(token, function (err, track) {
        if (err) return;
        renderCard(track);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', init);

})();
