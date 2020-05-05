<?php 
defined('_JEXEC') or die;
add_shortcode('fb_likebox_desi','fbDesignShortcode');
function fbDesignShortcode($atts, $content=null){
 	extract(shortcode_atts(array(
	   "width"=>'292',
	   "height"=>'auto',
	   "showfaces"=>'true',
	   "showheader"=>'true',
	   "showstream"=>'true',
	   "showborder"=>'true',
	   "colorscheme"=>'light',
	   "language"=>'en_Us' 
	  ), $atts));
    $doc=JFactory::getDocument();
	$js="(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = '//connect.facebook.net/".$language."/all.js#xfbml=1';
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));";
	$doc->addScriptDeclaration($js);
	
    $req = BluethemePlugin::addTemplate('fb_likebox');
	if($req["check"]){
		require $req["src"];
	}
}
?>