var PageTransitions = jQuery(function ($) {

	var $main = $( '.side-menu main' ),
		$pages = $main.find( 'section.sec_content' ),
		animcursor = 1,
		page_id = 0,
		current = 0,
        body        = 'body',
        menu__a     = '.vertical-menu a',
        page_current ='section.current_sec',
		isAnimating = false,
		endCurrPage = false,
		endNextPage = false,
		animEndEventNames = {
			'WebkitAnimation' : 'webkitAnimationEnd',
			'OAnimation' : 'oAnimationEnd',
			'msAnimation' : 'MSAnimationEnd',
			'animation' : 'animationend'
		},
		// animation end event name
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
		// support css animations
		support = Modernizr.cssanimations;
	
	function init() {

		$pages.each( function() {
			var $page = $( this );
			$page.data( 'originalClassList', $page.attr( 'class' ) );
		} );

	    /*--------------------------------
	    * Functions 
	    ----------------------------------*/

	    function updateSlick(){
	    	var owl_slick = '.owl';
	    	if ( $(body).data( 'owl_slick' ) == null){
			    
			    $(owl_slick).slick({
			        infinite: false,
			        slidesToShow: 2,
			        arrows: false,
			        responsive: 
			            [{
			              breakpoint: 768,
			              settings: {
			                slidesToShow: 1,
			              }
			            }]
			    });
			    $(body).data( 'owl_slick', 'active' );

			    $('.prev-testi').on("click", function () {

			        $(owl_slick).slick('slickPrev');

			    });

			    $('.next-testi').on("click", function () {

			        $(owl_slick).slick('slickNext');

			    });

			}else{
				$(owl_slick).slick('setPosition');
			}
	    }
	    updateSlick();

	    function open_sec_on_load() {

	        var wind_hash = window.location.hash;

        	if (!$(wind_hash).length){
        		$pages.eq(0).addClass("current_sec");
        		return;
        	}


        	page_id = $(wind_hash).index();
            if ( $(page_current).index() == page_id ){ return; }

            if( isAnimating ) {
                return false;
            }

            if( animcursor > 33 ) {
                animcursor = 1;
            }
            nextPage( animcursor );
            ++animcursor;
			updateSlick();
        	addActiveClass(wind_hash);

	    }
	    open_sec_on_load();

	    function addActiveClass(elem){
	    	$('.vertical-menu a[href="'+elem+'"]').addClass('active_item').parent().siblings().find('a').removeClass('active_item'); 
	    }

	    $('.vertical-menu a:not([href^="http"],[href^="www"]),.goToSec').on("click", function (event) {
	        event.preventDefault();
	        var sec = $(this).attr('href');

            page_id = $(sec).index();
            if ( $(page_current).index() == page_id ){ return; } 
            
            if( isAnimating ) {
                return false;
            }
            addActiveClass(sec);//console.log(animcursor);
            
            if( animcursor > 33 ) {
                animcursor = 1;
            }
            nextPage( animcursor );
            ++animcursor;                   
           	updateSlick();

	    });


	}


	function nextPage(options ) {
		var animation = (options.animation) ? options.animation : options;

		if( isAnimating ) {
			return false;
		}

		isAnimating = true;
		$(body).addClass('animating');

		if (!$(page_current).length) {
			$pages.eq( current ).addClass( 'current_sec' );
		}
		
		var $currPage = $(page_current);
		var $nextPage = $pages.eq( page_id ).addClass( 'current_sec' ),

			outClass = '', inClass = '';

		switch( animation ) {

			case 1:
				outClass = 'pt-page-rotateRightSideFirst';
				inClass = 'pt-page-moveFromRight pt-page-delay200 pt-page-ontop';
				break;
			case 2:
				outClass = 'pt-page-rotateLeftSideFirst';
				inClass = 'pt-page-moveFromLeft pt-page-delay200 pt-page-ontop';
				break;
			case 3:
				outClass = 'pt-page-rotateBottomSideFirst';
				inClass = 'pt-page-moveFromBottom pt-page-delay200 pt-page-ontop';
				break;
			case 4:
				outClass = 'pt-page-flipOutRight';
				inClass = 'pt-page-flipInLeft pt-page-delay500';
				break;
			case 5:
				outClass = 'pt-page-flipOutLeft';
				inClass = 'pt-page-flipInRight pt-page-delay500';
				break;
			case 6:
				outClass = 'pt-page-scaleDownCenter';
				inClass = 'pt-page-scaleUpCenter pt-page-delay400';
				break;
			case 7:
				outClass = 'pt-page-rotateFall pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 8:
				outClass = 'pt-page-rotateOutNewspaper';
				inClass = 'pt-page-rotateInNewspaper pt-page-delay500';
				break;
			case 9:
				outClass = 'pt-page-rotatePushLeft';
				inClass = 'pt-page-moveFromRight';
				break;
			case 10:
				outClass = 'pt-page-rotatePushRight';
				inClass = 'pt-page-moveFromLeft';
				break;
			case 11:
				outClass = 'pt-page-rotatePushTop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case 12:
				outClass = 'pt-page-rotateFoldLeft';
				inClass = 'pt-page-moveFromRightFade';
				break;
			case 13:
				outClass = 'pt-page-rotateFoldRight';
				inClass = 'pt-page-moveFromLeftFade';
				break;
			case 14:
				outClass = 'pt-page-rotateFoldTop';
				inClass = 'pt-page-moveFromBottomFade';
				break;
			case 15:
				outClass = 'pt-page-moveToRightFade';
				inClass = 'pt-page-rotateUnfoldLeft';
				break;
			case 16:
				outClass = 'pt-page-moveToLeftFade';
				inClass = 'pt-page-rotateUnfoldRight';
				break;
			case 17:
				outClass = 'pt-page-moveToBottomFade';
				inClass = 'pt-page-rotateUnfoldTop';
				break;
			case 18:
				outClass = 'pt-page-rotateRoomLeftOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomLeftIn';
				break;
			case 19:
				outClass = 'pt-page-rotateRoomRightOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomRightIn';
				break;
			case 20:
				outClass = 'pt-page-rotateCubeLeftOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeLeftIn';
				break;
			case 21:
				outClass = 'pt-page-rotateCubeRightOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeRightIn';
				break;
			case 22:
				outClass = 'pt-page-rotateSidesOut';
				inClass = 'pt-page-rotateSidesIn pt-page-delay200';
				break;
			case 23:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromBottom pt-page-ontop';
				break;
			case 24:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-scaleUpDown pt-page-delay300';
				break;
			case 25:
				outClass = 'pt-page-scaleDownUp';
				inClass = 'pt-page-scaleUp pt-page-delay300';
				break;
			case 26:
				outClass = 'pt-page-moveToLeft pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 27:
				outClass = 'pt-page-moveToRight pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 28:
				outClass = 'pt-page-moveToBottom pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 29:
				outClass = 'pt-page-rotateSlideOut';
				inClass = 'pt-page-rotateSlideIn';
				break;
			case 30:
				outClass = 'pt-page-moveToLeft';
				inClass = 'pt-page-moveFromRight';
				break;
			case 31:
				outClass = 'pt-page-moveToRight';
				inClass = 'pt-page-moveFromLeft';
				break;
			case 32:
				outClass = 'pt-page-moveToLeftFade';
				inClass = 'pt-page-moveFromRightFade';
				break;
			case 33:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromLeft pt-page-ontop';
				break;

		}

		$currPage.addClass( outClass ).on( animEndEventName, function() {
			$currPage.off( animEndEventName );
			endCurrPage = true;
			if( endNextPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );

		$nextPage.addClass( inClass ).on( animEndEventName, function() {
			$nextPage.off( animEndEventName );
			endNextPage = true;
			if( endCurrPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );

		if( !support ) {
			onEndAnimation( $currPage, $nextPage );
		}

	}

	function onEndAnimation( $outpage, $inpage ) {
		endCurrPage = false;
		endNextPage = false;
		resetPage( $outpage, $inpage );
		isAnimating = false;
		$(body).removeClass('animating');
	}

	function resetPage( $outpage, $inpage ) {
		window.location.hash =  $pages.eq( page_id ).attr('id');
		$outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
		$inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' current_sec' );
	}

	init();

	return { 
		init : init,
		nextPage : nextPage,
	};

});