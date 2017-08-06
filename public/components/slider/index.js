/**
 * @author AnZuev(t.me/anzuev)
 * @date 05.08.2017
 */

function Slider(options) {
    let internal = {
        elem: null,
        rollerPosition: options.rollerPosition || 0,
        minValue: 0,
        maxValue: 100,
        roller: null,
        elemStyle: null,
        rollerStyle: null,
        sliderScale: null,
        audioStream: options.audioStream
    };

    this.getElem = function() {
        if(internal.elem !== null) return internal.elem;

        let container = document.createElement("div");
        container.classList = "slider";

        let minValueSpan = document.createElement("span");
        minValueSpan.classList = "slider__minValue";
        minValueSpan.innerHTML = internal.minValue;

        let maxValueSpan = document.createElement("span");
        maxValueSpan.classList = "slider__minValue";
        maxValueSpan.innerHTML = internal.maxValue;

        let sliderScale = document.createElement("div");
        sliderScale.classList = "slider__scale";
        internal.sliderScale = sliderScale;

        let sliderRoller = document.createElement("div");
        sliderRoller.classList = "slider__roller";

        internal.roller = sliderRoller;

        sliderScale.appendChild(sliderRoller);

        container.appendChild(minValueSpan);
        container.appendChild(sliderScale);
        container.appendChild(maxValueSpan);
        internal.elem = container;
        return internal.elem;
    };

    let isMove = 0;
    let leftBorder, rightBorder;

    this.configure = function() {
        internal.elemStyle = getComputedStyle(internal.elem, "");
        internal.rollerStyle = getComputedStyle(internal.roller, "");
        internal.elem.onmousedown = internal.elem.onselectstart = function() {
            return false;
        };

        addEvent(internal.elem, 'mousedown', function(e) {
            e = e || event;

            if (e.which === 1) {
                isMove = 1;
                internal.roller.style.left = calculatePosition(e.pageX) + 'px';
                internal.audioStream.volume = getRollerPosition();
            }
        });

        document.onmousemove = function(e) {
            e = e || event;
            if (isMove) {
                internal.roller.style.cursor = 'move';
                internal.roller.style.left = calculatePosition(e.pageX) + "px";
                internal.audioStream.volume = getRollerPosition();
            }
        };

        document.onmouseup = function() {
            isMove = 0;
        };

        let sliderScale = $(internal.sliderScale);
        leftBorder = sliderScale.position().left;
        rightBorder = leftBorder + sliderScale.width();

        // set roller to default position
        internal.audioStream.volume = 0.75;
        internal.rollerPosition = leftBorder + (rightBorder - leftBorder)*0.75;
        internal.roller.style.left = internal.rollerPosition + "px";
    };

    function calculatePosition(leftCord) {
        let rollerPosition = leftCord - internal.roller.getBoundingClientRect().width/2;

        if (rollerPosition < leftBorder) {
            rollerPosition = leftBorder;
        }
        if (rollerPosition + internal.roller.getBoundingClientRect().width >= rightBorder){
            rollerPosition = rightBorder - internal.roller.getBoundingClientRect().width;
        }
        internal.rollerPosition = rollerPosition;
        return rollerPosition;
    }

    function getRollerPosition(){
        return (internal.rollerPosition - leftBorder)/(rightBorder-leftBorder);
    }
}

let addEvent, removeEvent;
if (document.addEventListener) {
    addEvent = function(elem, type, handler) {
        elem.addEventListener(type, handler, false);
    };
    removeEvent = function(elem, type, handler) {
        elem.removeEventListener(type, handler, false);
    };
} else {
    addEvent = function(elem, type, handler) {
        elem.attachEvent('on' + type, handler);
    };
    removeEvent = function(elem, type, handler) {
        elem.detachEvent('on' + type, handler);
    }
}





