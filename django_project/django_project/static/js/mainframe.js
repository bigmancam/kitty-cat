document.addEventListener('polymer-ready', function() {
  // initial setup
  setup();
  document.getElementById('timer').removeAttribute('hidden');
});

var seconds;
var meta;
var transition;
var countdownTimer;
var state = {
  opened: false
}

function getMeta() {
      if (!meta) {
        meta = document.createElement('core-meta');
        meta.type = 'transition';
      }
      return meta;
    }

function setup() {
      var target = document.getElementById('timer')

      if (transition) {
        transition.teardown(target);
      }


      var value = "core-transition-center";
      transition = getMeta().byId(value);
      transition.setup(target);
    }

function toggle() {
    var target = document.getElementById('timer');
    state.opened = !state.opened;
    transition.go(target, state);
}

function toggleOff() {
    var target = document.getElementById('timer');
    state.opened = false;
    transition.go(target, state);
}


function submit(e){
    var input = $('#fisk-input').context.activeElement.value.split(' ');
    var arg1 = input[1];
    var arg2 = input[2];
    if(!arg2 || arg2 == '') {
        if(arg1) {
            arg1 = arg1.replace(/[^0-9]/g, '');
            arg2 = arg1.replace(/[^aA-zZ]/g, '');
        }
    }
    if(e.keyCode == 13) {
        if(input[0] == 'timer') {
            toggle();
            console.log(arg2);
            if(arg2 == 'm' || arg2 == 'minute' || arg2 == 'minutes') {
                seconds = arg1 * 60;
                countdownTimer = setInterval('secondPassed()', 1000);
                clearConsole();
            }
            if(arg2 == 's' || arg2 == 'second' || arg2 == 'seconds') {
                seconds = arg1;
                countdownTimer = setInterval('secondPassed()', 1000);
                clearConsole();
            }
        }
        if(input[0] =='exit' && arg1 == 'timer') {
            toggleOff();
            clearConsole();
            clearInterval(countdownTimer);
        }
    }
}

function clearConsole() {
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
