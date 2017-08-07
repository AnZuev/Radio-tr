/**
 * @author AnZuev(t.me/anzuev)
 * @date 05.08.2017
 */

$(function () {
    let audioStream = document.getElementById('mainPage__audioStream');

    // init slider for volume control
    let slider = new Slider({
        audioStream: audioStream
    });
    document.getElementsByClassName("mainPage-volumeControl")[0].appendChild(slider.getElem());
    slider.configure();


    // init marquee
    let marquee = new Marquee({});
    document.getElementsByClassName('mainPage-marquee')[0].appendChild(marquee.getElem());


    // init playControls(play and pause buttons)
    let playControls = new PlayControls({
        audioStream: audioStream,
        marquee: marquee
    });
    document.getElementsByClassName("mainPage-playControls")[0].appendChild(playControls.getPlayButton());
    document.getElementsByClassName("mainPage-playControls")[0].appendChild(playControls.getPauseButton());





});