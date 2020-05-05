<?php

defined('_JEXEC') or die;

add_shortcode('bgvideo_desi', 'BgVideoDesignShortcode');
function BgVideoDesignShortcode($atts,$content=null){
	extract(shortcode_atts(array(
		"id"=>'',
		"volume"=>'',
        "title"=>'',
        "imagelink"=>''
	), $atts));

	$req = BluethemePlugin::addTemplate('bgvideo');
	if($req["check"]){
		require $req["src"];
	}
}

?>