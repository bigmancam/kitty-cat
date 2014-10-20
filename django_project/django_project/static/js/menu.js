var YTMenu = (function() {
 
    function init() {
         
        [].slice.call( document.querySelectorAll( '.dr-menu' ) ).forEach( function( el, i ) {
 
            var trigger = el.querySelector( 'div.dr-trigger' ),
                icon = trigger.querySelector( 'span.dr-icon-menu' ),
                open = false;
 
            trigger.addEventListener( 'click', function( event ) {
                if( !open ) {
                    el.className += ' dr-menu-open';
                    open = true;
                }
            }, false );
 
            icon.addEventListener( 'click', function( event ) {
                if( open ) {
                    event.stopPropagation();
                    open = false;
                    el.className = el.className.replace(/\bdr-menu-open\b/,'');
                    return false;
                }
            }, false );
 
        } );
 
    }
 
    init();
 
})();

    document.addEventListener('polymer-ready', function() {
  // initial setup
  setup();
  document.getElementById('content_pane').removeAttribute('hidden');
  document.querySelector('div paper-shadow-top-z-1').removeAttribute('hidden');
});

var meta;
var meta2;
var transition;
var transition2;
var state = {
  opened: false
}
var state2 ={
  opened: false
}

function getMeta() {
      if (!meta) {
        meta = document.createElement('core-meta');
        meta.type = 'transition';
      }
      return meta;
    }

function getMeta2() {
      if (!meta2) {
        meta2 = document.createElement('core-meta');
        meta2.type = 'transition';
      }
      return meta2;
    }

function setup() {
      var target = document.getElementById('content_pane');
      var target2 = document.querySelector('nav div.paper-shadow-top-z-1')

      if (transition) {
        transition.teardown(target);
      }

      if (transition2) {
        transition2.teardown(target);
      }

      var value = "core-transition-center";
      transition = getMeta().byId(value);
      transition.setup(target);
      transition2 = getMeta2().byId(value);
      transition2.setup(target2);
      var target2 = document.querySelector('nav div.paper-shadow-top-z-1')
      state2.opened = !state.opened;
      transition.go(target2, state2);
    }

function toggle() {
      var target = document.getElementById('content_pane');
      state.opened = !state.opened;
      transition.go(target, state);
    }
function toggle2() {
      var target2 = document.querySelector('nav div.paper-shadow-top-z-1')
      state2.opened = !state.opened;
      transition.go(target2, state2);
    }
function toggleOff() {
    var target = document.getElementById('content_pane');
    state.opened = false;
    transition.go(target, state);
    }