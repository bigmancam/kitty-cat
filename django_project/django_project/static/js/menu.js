var YTMenu = (function() {
 
    function init() {
         
        [].slice.call( document.querySelectorAll( '.dr-menu' ) ).forEach( function( el, i ) {
            var trigger = document.getElementById( 'dr-trigger' ),
                icon = document.getElementById( 'label' ),
                open = false;
 
            icon.addEventListener( 'click', function( event ) {
                if( !open ) {
                    el.className += ' dr-menu-open';
                    open = true;
                    return;
                }
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