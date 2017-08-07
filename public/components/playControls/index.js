/**
 * @author AnZuev(t.me/anzuev)
 * @date 05.08.2017
 */

function PlayControls(options) {
    let internal = {
        playButton: null,
        pauseButton: null,
        isPlaying: false,
        audioStream: options.audioStream,
        marquee: options.marquee
    };

    this.getPlayButton = function () {
        if(internal.playButton !== null){
            return internal.playButton;
        }
        let container = document.createElement("div");
        container.classList = "mainPage-playControls-play";
        container.style.marginRight = "47px";

        let img = document.createElement("img");
        img.setAttribute("src", "/imgs/play.png");

        container.appendChild(img);
        internal.playButton = container;
        addEventListenersForPlay();

        return internal.playButton;
    };

    this.getPauseButton = function () {
        if(internal.pauseButton !== null){
            return internal.pauseButton;
        }
        let container = document.createElement("div");
        container.classList = "mainPage-playControls-pause";

        let img = document.createElement("img");
        img.setAttribute("src", "/imgs/pause.png");

        container.appendChild(img);
        internal.pauseButton = container;
        addEventListenersForPause();

        return internal.pauseButton;
    };

    function addEventListenersForPlay() {
        let el = $(internal.playButton);

        el.click(function () {
            if(!internal.isPlaying){
                internal.playButton.classList = "mainPage-playControls-play__clicked";
                internal.isPlaying = true;
                internal.audioStream.play();
                internal.marquee.startUpdates();
            }
        });

        el.mousedown(function () {
            internal.playButton.childNodes[0].src = "/imgs/play__mouseDown.png";
        });
        el.mouseup(function () {
            internal.playButton.childNodes[0].src = "/imgs/play.png";
        })
    }

    function addEventListenersForPause() {
        let el = $(internal.pauseButton);

        el.click(function () {
            if(internal.isPlaying){
                internal.playButton.classList = "mainPage-playControls-play";
                internal.isPlaying = false;
                internal.audioStream.pause();
                internal.marquee.stopUpdates();
            }
        });

        el.mousedown(function () {
            internal.pauseButton.childNodes[0].src = "/imgs/pause__mouseDown.png";
        });
        el.mouseup(function () {
            internal.pauseButton.childNodes[0].src = "/imgs/pause.png";
        })
    }


}

