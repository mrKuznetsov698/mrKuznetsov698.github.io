let flag = false;
let time;
let date;

function setup() {
    document.onclick = () => {
        flag = !flag;
        if (flag) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };
    time = document.getElementById('time');
    date = document.getElementById('date');
    setInterval(updateTime, 1000)
}

function format(x) {
    return x < 10 ? '0' + x : x;
}

function updateTime() {
    let dt = new Date();
    let h = dt.getHours();
    let m = dt.getMinutes();
    let s = dt.getSeconds();
    time.innerText = `${format(h)}:${format(m)}:${format(s)}`
}