var $ = jQuery.noConflict();

jQuery(document).ready(function() {
	"use strict";

    //$('#Mod105').prepend('<img id="banner-right" src="/images/banners/mama-banner.png" />');
    //$('#Mod105').prepend('<img id="banner-left" src="/images/banners/bild-banner.png" />')

    jQuery('.navbar.navbar-fixed-top a.navbar-brand > img').attr('src', 'http://podrzitalenat.me/images/podrzi-white.png');

    jQuery( window ).scroll(function() {
        jQuery('body:not("#talent-blog-page") .navbar.navbar-fixed-top a.navbar-brand > img').attr('src', 'http://podrzitalenat.me/images/podrzi-white.png');

        jQuery('body:not("#talent-blog-page") .navbar:not(.navbar-fixed-top) a.navbar-brand > img').attr('src', 'http://podrzitalenat.me/images/podrzi-logo.png');

    });
    jQuery('#talent-blog-page .navbar:not(.navbar-fixed-top) a.navbar-brand > img').attr('src', 'http://podrzitalenat.me/images/podrzi-white.png');

    if (jQuery(window).width() < 768 )  {
        jQuery('.navbar:not(.navbar-fixed-top) a.navbar-brand > img').attr('src', 'http://podrzitalenat.me/images/podrzi-white.png');
        jQuery( window ).scroll(function() {
            jQuery('.navbar:not(.navbar-fixed-top) a.navbar-brand > img').attr('src', 'http://podrzitalenat.me/images/podrzi-white.png');
        });
    }

    jQuery( window ).resize(function() {
        if (jQuery(window).width() < 768 )  {
            jQuery('.navbar:not(.navbar-fixed-top) a.navbar-brand > img').attr('src', 'http://podrzitalenat.me/images/podrzi-white.png');

            jQuery( window ).scroll(function() {
                jQuery('.navbar:not(.navbar-fixed-top) a.navbar-brand > img').attr('src', 'http://podrzitalenat.me/images/podrzi-white.png');
            });
        }
        if (jQuery(window).width() > 767 )  {
            jQuery('.navbar:not(.navbar-fixed-top) a.navbar-brand > img').attr('src', 'http://podrzitalenat.me/images/podrzi-white.png');
        }
    });

    //Preloader
	jQuery(window).load(function(){
		jQuery('.preloader').fadeOut('slow',function(){jQuery(this).remove();});
	});
	
	// Search
	jQuery('.fa-search').on('click', function() {
		jQuery('.field-toggle').slideToggle(200);
	});

	//Scroll Menu
	function menuToggle()
	{
		var windowWidth = jQuery(window).width();

		if(windowWidth > 767 ){
			jQuery(window).on('scroll', function(){
				if( jQuery(window).scrollTop()>405 ){
					jQuery('.navbar').addClass('navbar-fixed-top animated fadeIn');
					jQuery('.navbar').removeClass('main-nav');
				} else {
					jQuery('.navbar').removeClass('navbar-fixed-top');
					jQuery('.navbar').addClass('main-nav');
				}
			});
		}else{
			
			jQuery('.navbar').addClass('main-nav');
				
		};
		if(windowWidth > 767 ){
			jQuery(window).on('scroll', function(){
				if( jQuery(window).scrollTop()>405 ){
					jQuery('.top-bar').addClass('top-bar-hide');
				} else {
					jQuery('.top-bar').removeClass('top-bar-hide');
				}
			});
		}else{			
			jQuery('.top-bar').addClass(this);				
		};
		
		if(windowWidth > 767 ){
			jQuery(window).on('scroll', function(){
				if( jQuery(window).scrollTop()>405 ){
					jQuery('.navbar-brand').addClass('change-logo');
				} else {
					jQuery('.navbar-brand').removeClass('change-logo');
				}
			});
		}else{			
			jQuery('.navbar-brand').addClass(this);				
		}
				
	}

	menuToggle();

	// Navigation Scroll	
		
	jQuery(window).scroll(function(event) {
		Scroll();
	});	
	
	jQuery('.navbar-collapse ul li a').click(function() {  
		jQuery('html, body').animate({scrollTop: jQuery(this.hash).offset().top -79}, 1000);
		return false;
	});
	
	// User define function
	function Scroll() {
		var contentTop      =   [];
		var contentBottom   =   [];
		var winTop      =   jQuery(window).scrollTop();
		var rangeTop    =   200;
		var rangeBottom =   500;
		jQuery('.navbar-collapse').find('.scroll a').each(function(){
			contentTop.push( jQuery( jQuery(this).attr('href') ).offset().top);
			contentBottom.push( jQuery( jQuery(this).attr('href') ).offset().top + jQuery( jQuery(this).attr('href') ).height() );
		})
		$.each( contentTop, function(i){
			if ( winTop > contentTop[i] - rangeTop ){
				jQuery('.navbar-collapse li.scroll')
				.removeClass('active')
				.eq(i).addClass('active');			
			}
		})

	};
	jQuery(document).ready(function () {
		jQuery(".navbar-nav li a").click(function(event) {
		jQuery(".navbar-collapse").collapse('hide');
		});
	});
	
	//Parallax Scrolling
	jQuery(window).bind('load', function () {
		parallaxInit();						  
	});
	function parallaxInit() {		
		jQuery("#promo-one").parallax("50%", 0.3);
		jQuery("#promo-two").parallax("50%", 0.3);
		jQuery("#fun-fact").parallax("50%", 0.3);
		jQuery("#news-letter").parallax("50%", 0.3);
		jQuery("#twitter").parallax("50%", 0.3);	
	}	
	parallaxInit();			
		
	
	
	//Pretty Photo
	 jQuery("a[data-gallery^='prettyPhoto']").prettyPhoto({
	  social_tools: false
	 });
	
	//Isotope
	var winDow = jQuery(window);
			// Needed variables
	var $container=jQuery('.portfolio-items');
	var $filter=jQuery('.filter');

	try{
		$container.imagesLoaded( function(){
			$container.show();
			$container.isotope({
				filter:'*',
				layoutMode:'masonry',
				animationOptions:{
					duration:750,
					easing:'linear'
				}
			});
		});
	} catch(err) {
	}

	winDow.bind('resize', function(){
		var selector = $filter.find('a.active').attr('data-filter');

		try {
			$container.isotope({ 
				filter	: selector,
				animationOptions: {
					duration: 750,
					easing	: 'linear',
					queue	: false,
				}
			});
		} catch(err) {
		}
		return false;
	});
	
	// Isotope Filter 
	$filter.find('a').click(function(){
		var selector = jQuery(this).attr('data-filter');

		try {
			$container.isotope({ 
				filter	: selector,
				animationOptions: {
					duration: 750,
					easing	: 'linear',
					queue	: false,
				}
			});
		} catch(err) {

		}
		return false;
	});


	var filterItemA	= jQuery('.filter a');

	filterItemA.on('click', function(){
		var $this = jQuery(this);
		if ( !$this.hasClass('active')) {
			filterItemA.removeClass('active');
			$this.addClass('active');
		}
	});
	
	// Timer
	jQuery('#fun-fact').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
		if (visible) {
			jQuery(this).find('.timer').each(function () {
				var $this = jQuery(this);
				jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
					duration: 2000,
					easing: 'swing',
					step: function () {
						$this.text(Math.ceil(this.Counter));
					}
				});
			});
			jQuery(this).unbind('inview');
		}
	});

	//Initiat WOW JS
	new WOW().init();
	
	//smoothScroll
	smoothScroll.init();
		
		
});

