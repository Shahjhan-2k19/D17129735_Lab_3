var startbtn = document.getElementById("start");
rxjs.fromEvent(startbtn, "click").subscribe(() => time());
function start() {
  var time = rxjs.timer(1000);
  var value = time.subscribe((val) => console.log(val));
}
function time() {
  var h = document.getElementById("hours").value;
  var m = document.getElementById("minutes").value;
  var s = document.getElementById("seconds").value;
  time = h * 3600 + m * 60 + s;
  console.log(time);
}
