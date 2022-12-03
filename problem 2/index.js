var startbtn = document.getElementById("start");
// Using subscription interval which will get the difference in time every second and keep updating .
rxjs.fromEvent(startbtn, "click").subscribe(() => time());
function start(time) { // Update with +1 count down to avoid delay,
  // source https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_countdowe
  var timer = rxjs.timer(time * 1000); 
  var stoptime = new Date().getTime() + time * 1000 + 1000;
  var x = setInterval(function () { 
    var now = new Date().getTime();
    var distance = stoptime - now;
    // Calculations for hours, minutes and seconds using Math lib
    var hours = Math.floor( (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) ); 
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("display").innerHTML = hours + " : "+ minutes + " : "+ seconds;// Display the result
    if (distance < 0) { // If the count down over clear subscription interval 
      clearInterval(x);
      document.getElementById("display").innerHTML = "00 : 00";
    }},
    1000);
     timer.subscribe(function(){ //Timer stops when hit 0 and reload
     window.location.reload();
  });}
  function time() { 
    var hour = document.getElementById("hours").value;
    var min = document.getElementById("minutes").value;
    var sec = document.getElementById("seconds").value;
    time = hour * 3600 + min * 60 + sec;
    start(time);
}
