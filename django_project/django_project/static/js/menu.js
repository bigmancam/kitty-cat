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
      var target = document.getElementById('content_pane');

      if (transition) {
        transition.teardown(target);
      }

      var value = core-transition-left;
      transition = getMeta().byId(value);
      transition.setup(target);
    }

function toggle() {
      var target = document.getElementById('content_pane');
      state.opened = !state.opened;
      transition.go(target, state);
    }