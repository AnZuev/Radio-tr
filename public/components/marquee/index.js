function Marquee(){
    let internal = {
        title: ""
    };

    this.getElem = function () {
        //<marquee>Бегущая строка, все такое</marquee>
        let marquee = document.createElement("marquee");
        //marquee.innerHTML =
        getSongTitle();
    };

    function getSongTitle() {
        fetch('http://radiofornikita.cloudapp.net:8000/currentsong?sid=1')
            .then(function(response) {
                let regex = /<pre>(.*)<\/pre>/;
                console.log(response);
            })
    }
}