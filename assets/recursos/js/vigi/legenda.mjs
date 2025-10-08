const audio = document.querySelector('audio');
const track = document.querySelector('audio > track');
const textTrack = audio.textTracks[0];
track.addEventListener('load', function() {
    // Add event listeners to existing cues in the track
    for (let j = 0; j < textTrack.cues.length; j++) {
        const cue = textTrack.cues[j];
        addCueListeners(cue);
    }
});

function addCueListeners(cue) {
    cue.addEventListener('enter', (event) => {
        document.getElementById('subtitles').innerText = cue.text;
    });

    cue.addEventListener('exit', (event) => {
        document.getElementById('subtitles').innerText = '';
    });
}