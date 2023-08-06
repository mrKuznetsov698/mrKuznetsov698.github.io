let joystick;
let x = 0;
let y = 0;
let targetX = 0;
let targetY = 0;
let curX = 0;
let curY = 0;
const K = 0.05;
let pressed = false;
let joyRad;
let joyParentWidth;
let joyParentHeight;

let start = () => {
    joystick = document.querySelector('body > div > div.joystick.centered > div > div');
    joyRad = joystick.clientWidth / 2;
    joyParentWidth = joystick.parentElement.clientWidth;
    joyParentHeight = joystick.parentElement.clientHeight;
    if (!isTouchDevice()) {
        joystick.parentElement.onmousedown = mouseDown;
        document.onmousemove = mouseMove;
        document.onmouseup = mouseUp;
    } else {
        joystick.parentElement.ontouchstart = mouseDown;
        document.ontouchmove = touchMove;
        document.ontouchend = mouseUp;
    }
    setInterval(tick_move, 1);
}

function mouseDown(ev) {
    pressed = true;
    if (isTouchDevice()) {
        touchMove(ev);
    } else {
        mouseMove(ev);
    }
}

function mouseMove(ev) {
    if (pressed) {
        let X = ev.pageX - joystick.parentElement.offsetLeft - joyParentWidth / 2;
        let Y = ev.pageY - joystick.parentElement.offsetTop - joyParentHeight / 2;
        abstractMove(X, Y);
    }
}

function touchMove(ev) {
    if (pressed) {
        let X = ev.targetTouches[0].pageX - joystick.parentElement.offsetLeft - joyParentWidth / 2;
        let Y = ev.targetTouches[0].pageY - joystick.parentElement.offsetTop - joyParentHeight / 2;
        abstractMove(X, Y);
    }
}

function abstractMove(X, Y) {
    curX = constrain(X, -joyParentWidth / 2, joyParentWidth / 2);
        curY = constrain(Y, -joyParentHeight / 2, joyParentHeight / 2);
        targetX = constrain(curX, -joyParentWidth / 2 + joyRad, joyParentWidth / 2 - joyRad);
        targetY = constrain(curY, -joyParentHeight / 2 + joyRad, joyParentHeight / 2 - joyRad);
}

function mouseUp(ev) {
    if (pressed) {
        targetX = targetY = 0;
        pressed = false;
    }
}

function tick_move() {
    if (Math.abs(x - targetX) <= 0.01 && Math.abs(y - targetY) <= 0.01) {
        return;
    }
    x += (targetX - x) * K;
    y += (targetY - y) * K;
    joystick.style.transform = `translateX(${x}px) translateY(${y}px)`    
}

function constrain(val, min, max) {
    return Math.max(min, Math.min(val, max));
}

function isTouchDevice() {
    return (('ontouchstart' in window) ||
       (navigator.maxTouchPoints > 0) ||
       (navigator.msMaxTouchPoints > 0));
}