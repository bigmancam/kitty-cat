 document.addEventListener('polymer-ready', function() {
  // initial setup
  setup();
  document.getElementById('side').removeAttribute('hidden');
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
      var target = document.getElementById('side')

      if (transition) {
        transition.teardown(target);
      }


      var value = "core-transition-center";
      transition = getMeta().byId(value);
      transition.setup(target);
    }

function toggle2() {
      var target = document.getElementById('side')
      state.opened = !state.opened;
      transition.go(target, state);
      var YTMenu = (function() {

        function init() {

        [].slice.call( document.querySelectorAll( '.dr-menu' ) ).forEach( function( el, i ) {
            var trigger = document.getElementById( 'dr-trigger' ),
                icon = document.getElementById( 'label' ),
                open = false;


                if( !open ) {
                    el.className += ' dr-menu-open';
                    if( open ) {
                    event.stopPropagation();
                    open = false;
                    el.className = el.className.replace(/\bdr-menu-open\b/,'');
                    return false;
                }
                    open = true;
                    return;
                }
            }, false );



    }

    init();

})();
    }