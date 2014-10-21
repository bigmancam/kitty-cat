document.addEventListener('polymer-ready', function() {
  // initial setup
  setup();
  setup2();
  document.getElementById('clock').removeAttribute('hidden');
});

var meta;
var transition;
var state = {
  opened: false
}

function submit(e){
    if(e.keyCode == 13) {
        if($('#fisk-input').value=='Clock') {
            toggle();
        }
        if($('#fisk-input').value=='exit Clock') {
            toggleOff();
        }
    }
}


function getMeta() {
      if (!meta) {
        meta = document.createElement('core-meta');
        meta.type = 'transition';
      }
      return meta;
    }

function setup() {
      var target = document.getElementById('clock')

      if (transition) {
        transition.teardown(target);
      }


      var value = "core-transition-center";
      transition = getMeta().byId(value);
      transition.setup(target);
    }

function toggle() {
    var target = document.getElementById('clock');
    state.opened = !state.opened;
    transition.go(target, state);
}

function toggleOff() {
    var target = document.getElementById('clock');
    state.opened = false;
    transition.go(target, state);
}

