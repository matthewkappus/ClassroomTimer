var schedule = [];

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }

function parseTime() {
    var t = document.getElementById("t");
    var name = document.getElementById("name").value;

    var hm = t.value.split(":");
    var countdownTime = new Date();
    countdownTime.setHours(hm[0],hm[1]);
    scheduleTimer( {name: name, time: countdownTime});

    t.value = "";
    name.value = "";
    
    t.focus();
}


function scheduleTimer(nextBell) {
    schedule.push(nextBell);
    schedule.sort(function(a, b) { 
        return a.time > b.time;
    });
    refreshScheduleList();

    startCountdown(schedule.pop())

}

function refreshScheduleList() {
    var s = document.getElementById("schedule")
    while (s.firstChild) {
        s.removeChild(s.firstChild);
    }
    if (schedule.length > 0) {
        schedule.forEach(function(a) {
            var li = document.createElement("li")
            li.innerHTML = a.name;
            s.append(li)
        })
    }
}

function showClock() {
    if (schedule.length > 0) {
        startCountdown(schedule.pop());
        return;
    }
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    
    m = checkTime(m);
    s = checkTime(s);
    var clock =  document.getElementById('clock');
    clock.innerHTML = h + ":" + m + ":" + s;
    clock.style.visibility = "visible";
    var t = setTimeout(showClock, 500);
};

function startCountdown(nextBell) {
    var x = setInterval(function() {

    // Get current  time
    var now = new Date().getTime();
    // Find the distance between now and the count down date
    var distance = nextBell.time.getTime() - now;
 
    // Time calculations for days, hours, minutes and seconds
    // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Output the result in an element with id="clock"
        var timer = document.getElementById("timer");
        timer.innerHTML =   hours + "h " + minutes + "m " + seconds + "s ";
        var name = document.getElementById("timeName");
        name.innerHTML = "next bell: " + nextBell.name;
    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        timer.innerHTML = "";
        name.innerHTML = "";
        ringAlarm();
        }
    }, 1000);
    showClock();
}
function ringAlarm () {
    var snd = new Audio("src/chime.wav");
    snd.loop = false;
    snd.play();
}


function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }
