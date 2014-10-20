var YTMenu = (function() {
 
    function init() {
         
        [].slice.call( document.querySelectorAll( '.dr-menu' ) ).forEach( function( el, i ) {
            var trigger = document.getElementById( 'dr-trigger' ),
                icon = document.getElementById( 'label' ),
                open = false;
 
            trigger.addEventListener( 'click', function( event ) {
                if(el.id=="dr-trigger" || el.id=="label") {
                    return;
                }
                if( !open ) {
                    el.className += ' dr-menu-open';
                    open = true;
                }
            }, false );
 
            icon.addEventListener( 'click', function( event ) {
                if(el.id=="dr-trigger" || el.id=="label") {
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