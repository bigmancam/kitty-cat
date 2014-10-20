 document.addEventListener('polymer-ready', function() {
  // initial setup
  setup();
  setup2();
  document.getElementById('dr-menu').removeAttribute('hidden');
  document.getElementById('content_pane').removeAttribute('hidden');
});

var meta;
var transition, transition2;
var state1 = {
  opened: false
}
var state2 = {
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
      var target = document.getElementById('dr-menu')

      if (transition) {
        transition.teardown(target);
      }


      var value = "core-transition-center";
      transition = getMeta().byId(value);
      transition.setup(target);
    }

function setup2() {
      var target = document.getElementById('content_pane')

      if (transition2) {
        transition2.teardown(target);
      }


      var value = "core-transition-center";
      transition2 = getMeta().byId(value);
      transition2.setup(target);
    }
function toggle1() {
    var target = document.getElementById('content_pane');
    state1.opened = !state1.opened;
    transition2.go(target, state1);
}
function toggle2() {
      var target = document.getElementById('dr-menu')
      state2.opened = !state2.opened;
      transition.go(target, state2);
      var YTMenu = (function() {

      function init() {

        [].slice.call( document.querySelectorAll( '.dr-menu' ) ).forEach( function( el, i ) {
            var trigger = document.getElementById( 'dr-trigger' ),
                icon = document.getElementById( 'label' ),
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
    }