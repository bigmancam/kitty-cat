var YTMenu = (function() {
 
    function init() {
         
        [].slice.call( document.querySelectorAll( '.dr-menu' ) ).forEach( function( el, i ) {
            var trigger = document.getElementById( 'dr-trigger' ),
                icon = document.getElementById( 'label' ),
                open = false;
 
            trigger.addEventListener( 'click', function( event ) {
                 if((el.id=="dr-trigger" || el.id=="label") && open) {
                    trigger.className += ' dr-menu-open';
                    icon.className += ' dr-menu-open';
                }
                if( !open ) {
                    if(el.id=="dr-trigger" || el.id=="label") {
                        open = true;
                        return;
                    }
                    el.className += ' dr-menu-open';
                    open = true;
                }

                if((el.id=="dr-trigger" || el.id=="label") && open) {
                    trigger.className = trigger.className.replace(/\bdr-menu-open\b/,'');
                    icon.className = icon.className.replace(/\bdr-menu-open\b/,'');
                }
                if( open ) {
                    event.stopPropagation();
                    if(el.id=="dr-trigger" || el.id=="label") {
                        open = false;
                        return false;
                    }
                    open = false;
                    el.className = el.className.replace(/\bdr-menu-open\b/,'');
                    return false;
                }
            }, false );

 
        } );
 
    }
 
    init();
 
})();