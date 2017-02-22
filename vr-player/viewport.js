(function(Beyon4D) {

   // Insert dependencies
    var dep = document.createElement('script');
    dep.src = 'vr-player/js/vrview.min.js';

    var tag = document.getElementsByTagName('script')[0];
    tag.parentNode.insertBefore(dep, tag);

    Beyon4D.ViewPort = function() {

        // Local variables
        var vrViewPort;

        var vrViewName = '#video';
        var vrViewObjc = document.querySelector(vrViewName);

        if (!vrViewObjc.getAttribute('source')) {
            throw new Error('Defina la ruta del video dentro del atributo source.');
        }

        var playButton = document.querySelector('#toggleplay');
        var muteButton = document.querySelector('#togglemute');

        // Private functions
        var onVRViewReady = function() {
            if (vrViewPort.isPaused) {
                playButton.classList.add('paused');
            } else {
                playButton.classList.remove('paused');
            }
        };

        var onTogglePlay = function() {
            if (vrViewPort.isPaused) {
                vrViewPort.play();
                playButton.classList.remove('paused');
            } else {
                vrViewPort.pause();
                playButton.classList.add('paused');
            }
        }

        var onToggleMute = function() {
            var isMuted = muteButton.classList.contains('muted');
            if (isMuted) {
                vrViewPort.setVolume(1);
            } else {
                vrViewPort.setVolume(0);
            }
            muteButton.classList.toggle('muted');
        }

        // Public functions (Reveale)
        return {
            init: function() {

                vrViewPort = new VRView.Player(vrViewName, {
                    width: '700px',
                    height: '480px',
                    video: vrViewObjc.getAttribute('source'),
                    is_stereo: false
                });

                vrViewPort.on('ready', onVRViewReady);

                playButton.addEventListener('click', onTogglePlay);
                muteButton.addEventListener('click', onToggleMute);

            }
        }
    };

    window.addEventListener('load', function() {
        var viewPort = new Beyon4D.ViewPort().init();
    });

})({});
