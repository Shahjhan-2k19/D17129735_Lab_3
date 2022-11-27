var startbtn = document.getElementById("start");
rxjs.fromEvent(startbtn, "click").subscribe(() => time());
function start(time) {
  var timer = rxjs.timer(time * 1000);
  var stoptime = new Date().getTime() + time * 1000;//To Countdown every second
  var x = setInterval(function () {
    var now = new Date().getTime();
    var distance = stoptime - now;
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("display").innerHTML = "Refresh";
    }
  }, 1000);
}
function time() {
  var h = document.getElementById("hours").value;
  var m = document.getElementById("minutes").value;
  var s = document.getElementById("seconds").value;
  time = h * 3600 + m * 60 + s;
  start(time);
}
