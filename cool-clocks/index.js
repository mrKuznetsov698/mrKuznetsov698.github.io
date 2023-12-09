let flag = false;
let time;
let date;
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Dec"];

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
    let dn = dt.getDay();
    let d = dt.getDate();
    let mn = dt.getMonth() - 1;
    time.innerText = `${format(h)}:${format(m)}:${format(s)}`;
    date.innerText = `${weekday[dn]}, ${d} ${monthName[mn]}`;
}
