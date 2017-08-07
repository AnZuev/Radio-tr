/**
 * @author AnZuev(t.me/anzuev)
 * @date 06.08.2017
 */

function Marquee({}){
    let internal = {
        title: "",
        elem: null,
        placeholder: "<b>РАДИО ТРАМВАЙ&nbsp&nbsp&nbsp&nbsp</b>"
    };

    this.getElem = function () {
        if(internal.elem) return internal.elem;

        //<marquee>Бегущая строка, все такое</marquee>
        let marquee = document.createElement("marquee");
        marquee.innerHTML = internal.placeholder;
        internal.elem = marquee;
        return internal.elem;
    };

    function updateSongTitle() {
        fetch('/audiostream/currentsong?sid=1')
            .then(function(response) {
                return response.text();
            })
            .then((text) => {
                let regex = /<pre>(.*)<\/pre>/;
                let title = text.match(regex);
                console.log(title);
                internal.title = title;
            })
            .catch(function () {
                console.error("Some error happened while getting title of the current song");
            })
    }
    
    this.startUpdates = function () {
        let updateFunction = function () {
            let currentTitle = internal.title;
            updateSongTitle();
            if(internal.title !== currentTitle){
                internal.marquee.innerHTML = internal.placeholder + internal.title;
            }
        };

        internal.interval = setInterval(updateFunction, 10000)
        updateFunction();
    };

    this.stopUpdates = function () {
        clearInterval(internal.interval)
    }
}