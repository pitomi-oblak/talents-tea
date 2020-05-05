/**
 * @package Shortcodes for Joomla! 3
 * @author Pham Tien Duc
 * @copyright(C) 2013- shinetheme.com
 * @license PHP files are GNU/GPL
**/

if(typeof ($ST) != 'function') {
	var $ST = jQuery.noConflict();
}


$ST(document).ready(function() {

  /* Tabs Block */
  $ST("#st_tabst a").click(function (e) {
    e.preventDefault();
    $ST(this).tab("show");
  });

  //////////////////// Accordion default //////////////////////
  $ST('.accordion .accordion-group:first-child .accordion-toggle').addClass("active");
  $ST('.accordion').on('show', function (e) {
    var sele=$ST(e.target).prev('.accordion-heading').find('.accordion-toggle');
    sele.addClass('active');
    stanimated(sele,'wiggle');
  });
  $ST('.accordion').on('hide', function (e) {
    $ST(this).find('.accordion-toggle').not($(e.target)).removeClass('active');
  });


  ///////////////////// Alert  /////////////////////////////////
  var ale = $ST("#system-message .alert");
  if(ale.hasClass("alert-warning") || ale.hasClass("alert-notice"))
    ale.append("<i class='icon-exclamation-sign alert-ico'></i>");
  else if(ale.hasClass("alert-error"))
    ale.append("<i class='icon-x-altx-alt alert-ico'></i>");
  else if(ale.hasClass("alert-success"))
    ale.append("<i class='icon-checkmark-circle alert-ico'></i>");
  else if(ale.hasClass("alert-info"))
    ale.append("<i class='icon-info-2 alert-ico'></i>");

  
  
});

// animated///
function stanimated(sele,c) {
  jQuery(sele).removeClass('animated '+c).addClass('animated '+c);
  var wait = window.setTimeout( function(){
    jQuery(sele).removeClass('animated '+c)},
    1300
  );
}

