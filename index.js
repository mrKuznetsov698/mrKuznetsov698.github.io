const D = 500;
const DOT_D = 15;
let time;

function setup() {
    createCanvas(D + 300, D + 300);

    updateTime();
    setInterval(updateTime, 1);
    // frameRate(500);
}

function draw() {
    background(90);
    draw_base();
    draw_center();
    draw_values();
}

function draw_base() {
    fill(150);
    stroke(0);
    strokeWeight(1);
    circle(width/2, height/2, D);    
}

function draw_center() {
    fill(0);
    noStroke();
    circle(width/2, height/2, DOT_D);
    draw_arrows();
    draw_values();
}

function draw_arrows() {
    let base = draw_seconds_arrow();
    base = draw_minute_arrow(base / 60);
    draw_hour_arrow(base / 12)
}

function draw_values() {
    for (let i = 0; i < 360; i += 6) {
        strokeWeight(1);
        stroke(0);
        if (i % 15 == 0) {
            strokeWeight(1.5);
            stroke(255);
        }
        let x_cos = cos(radians(i - 90)) * D / 2;
        let y_sin = sin(radians(i - 90)) * D / 2;
        line(x_cos + width/2, y_sin + height/2, x_cos * 1.05 + width/2, y_sin * 1.05 + height/2);
    }
}

function draw_seconds_arrow() {
    let angle = time.getSeconds() * 6 + time.getMilliseconds() / 1000 * 6;
    let x = cos(radians(angle - 90)) * D / 2 + width/2;
    let y = sin(radians(angle - 90)) * D / 2 + height/2;
    stroke(0);
    strokeWeight(1);
    line(width/2, height/2, x, y);
    return angle;
}

function draw_minute_arrow(shift) {
    let angle = time.getMinutes() * 6;
    let x = cos(radians(angle - 90 + shift)) * D / 2/* / 1.2*/ + width/2;
    let y = sin(radians(angle - 90 + shift)) * D / 2/* / 1.2*/ + height/2;
    stroke(0);
    strokeWeight(2);
    line(width/2, height/2, x, y);
    return angle + shift;
}

function draw_hour_arrow(shift) {
    let angle = time.getHours() * 360 / 12;
    let x = cos(radians(angle - 90 + shift)) * D / 2 /*/ 2*/ + width/2;
    let y = sin(radians(angle - 90 + shift)) * D / 2 /*/ 2*/ + height/2;
    stroke(0);
    strokeWeight(2.5);
    line(width/2, height/2, x, y);
}

function updateTime() {
    time = new Date(Date.now());
}