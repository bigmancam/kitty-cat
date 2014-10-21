document.addEventListener('polymer-ready', function() {
  // initial setup
  setup();
  document.getElementById('timer').removeAttribute('hidden');
});

var meta;
var transition;
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
    var arg = input[1];
    if(e.keyCode == 13) {
        if(input[0] == 'timer') {
            toggle();
            clock(arg);
            clearConsole();
        }
        if(input[0] + arg =='exit timer') {
            toggleOff();
            clearConsole();
        }
    }
}

function clearConsole() {
    $('#fisk-input').context.activeElement.value = '';
}

function clock(s) {
    var time_in_seconds = s * 60;
    var seconds = time_in_seconds;

    var minutes = Math.round((seconds - 30) / 60);
    var remainingSeconds = seconds % 60;
    if (remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;
    }
    document.getElementById('clock').innerHTML = minutes + ":" + remainingSeconds;
    if (seconds == 0) {
        clearInterval(countdownTimer);
        document.getElementById('clock').innerHTML = "Buzz Buzz";
    } else {
        seconds--;
    }
    var countdownTimer = setInterval('secondPassed()', 1000);
}