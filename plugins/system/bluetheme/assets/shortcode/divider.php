<?php 
defined('_JEXEC') or die;

add_shortcode("divider_desi", "dividerDesignShortcode");
function dividerDesignShortcode($atts,$content=null){
	extract(shortcode_atts(array(
        "class" => '',
        "style" => '',
        "dclass"=> '',
        "margin"=> ''
    ), $atts));
    $req = BluethemePlugin::addTemplate('divider');
	if($req["check"]){
		require $req["src"];
	}
    
}