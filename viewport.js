(function(Beyon4D) {

    Beyon4D.ViewPort = function() {

        // Local variables
        var vrViewPort;
        
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

                vrViewPort = new VRView.Player('.ui-viewport', {
                    width: '100%',
                    height: 480,
                    video: 'congo_2048.mp4',
                    is_stereo: true
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
