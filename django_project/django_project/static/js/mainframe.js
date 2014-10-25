
function get_app(name) {
    var app_url_name = name;
    var xmlhttp;
    if(window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest()
    }
    else {
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")
    }
    var url = "/static/html/" + app_url_name + ".html";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange=function() {
        if(xmlhttp.readyState=4 && xmlhttp.responseText) {
            var div = document.getElementById('console');
            var content = document.createElement('div');
            content.id = 'content';
            content.innerHTML = recv_data(name);
            while(content.firstChild) {
                div.appendChild(content.firstChild);
            }
        }
    }
}

function recv_data(name) {
    var app_url_name = name;
    var xmlhttp;
    if(window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest()
    }
    else {
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")
    }
    var url = "/static/html/" + app_url_name + ".html";
    xmlhttp.open("GET", url);
    xmlhttp.send();
    return xmlhttp.responseText;
}


function destroy_app() {
    var app_url_name = name;
    var xmlhttp;
    if(window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest()
    }
    else {
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")
    }
    var url = "/static/html" + app_url_name;
    xmlhttp.open("GET", url);
    xmlhttp.send();
    xmlhttp.onreadystatechange=function() {
        if(xmlhttp.readyState=4 && xmlhttp.responseText) {
            document.getElementById("console").innerHTML='';
        }
    }
}
//document.addEventListener('polymer-ready', function() {
//  // initial setup
//  setup();
//  setup2();
//  document.getElementById('timer').removeAttribute('hidden');
//  document.getElementById('calc').removeAttribute('hidden');
//});
//
//var seconds;
//var meta;
//var transition, transitionCalc;
//var countdownTimer;
//var state = {
//  opened: false
//}
//var stateCalc = {
//  opened: false
//}
//
//function getMeta() {
//      if (!meta) {
//        meta = document.createElement('core-meta');
//        meta.type = 'transition';
//      }
//      return meta;
//}
//
//
//function setup() {
//      var target = document.getElementById('timer')
//
//      if (transition) {
//        transition.teardown(target);
//      }
//
//
//      var value = "core-transition-center";
//      transition = getMeta().byId(value);
//      transition.setup(target);
//}
//
//function setup2() {
//      var target = document.getElementById('calc')
//
//      if (transitionCalc) {
//        transitionCalc.teardown(target);
//      }
//
//
//      var value = "core-transition-center";
//      transitionCalc = getMeta().byId(value);
//      transitionCalc.setup(target);
//}
//
//function toggle() {
//    var target = document.getElementById('timer');
//    state.opened = !state.opened;
//    transition.go(target, state);
//}
//
//function toggleCalc() {
//    var target = document.getElementById('calc');
//    stateCalc.opened = !stateCalc.opened;
//    transitionCalc.go(target, stateCalc);
//}
//
//
//function toggleCalcOff() {
//    var target = document.getElementById('calc');
//    stateCalc.opened = false;
//    transitionCalc.go(target, stateCalc);
//}
//
//function toggleOff() {
//    var target = document.getElementById('timer');
//    state.opened = false;
//    transition.go(target, state);
//}


function submit(e){
    var input = $('#fisk-input').context.activeElement.value.split(' ');
    var arg1 = input[1];
    var arg2 = input[2];
    if(e.keyCode == 13) {
        if(input[0] == 'calc') {
            get_app('calc');
            clearInput();
        }
        if(input[0] == 'timer') {
            if(!arg2) {
            arg2 = input[1].replace(/[^aA-zZ]/g, '');
            arg1 = arg1.replace(/[^0-9]/g, '');
            }
            if(arg2 == 'm' || arg2 == 'minute' || arg2 == 'minutes') {
                clearInput();
                seconds = arg1 * 60;
                get_app('timer');
                sleep(500);
                countdownTimer = setInterval('secondPassed()', 1000);
            }
            if(arg2 == 's' || arg2 == 'second' || arg2 == 'seconds') {
                clearInput();
                seconds = arg1;
                get_app('timer');
                sleep(500);
                countdownTimer = setInterval('secondPassed()', 1000);
            }
        }
        else if(input[0] =='exit') {
            if(arg1 == 'timer') {
                destroy_app();
                clearInput();
                clearInterval(countdownTimer);
            }
            if(arg1 == 'calc') {
                destroy_app();
                clearInput();
                clearInterval(countdownTimer);
            }
        }
        else {
            clearInput();
        }
    }
}

function clearInput() {
    $('#fisk-input').context.activeElement.value = '';
}

function playAudio() {
    var count = 10;
    var play = setInterval(function repeat() {
        count--;
        if(count === 0) {
            clearInterval(play);
        }
        var audio = new Audio("/static/beep-06.mp3");
        audio.play();
    },550);
    repeat();
}


function secondPassed() {
        var minutes = Math.round((seconds - 30) / 60);
        var remainingSeconds = seconds % 60;
        if (remainingSeconds < 10) {
            remainingSeconds = "0" + remainingSeconds;
        }
        document.getElementById('clock').innerHTML = minutes + ":" + remainingSeconds;
        if (seconds == 0) {
            clearInterval(countdownTimer);
            playAudio();
            document.getElementById('clock').innerHTML = "Buzz Buzz";
        } else {
            seconds--;
        }
    }

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
