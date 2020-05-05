<?php 
defined('_JEXEC') or die;
add_shortcode('slider_desi','sliderDesignShortcode');
function sliderDesignShortcode($atts, $content=null){
	extract(shortcode_atts(array(
		"type"=>"1",
        "template"=>'',
		"title"=>'',
		"sid"=>'',
		"sclass"=>'',
		"sdesc"=>'',
		"desc"=>'',
		"class"=>'',
		"bg"=>'',
		"singleitem"=>'true',
		"navigation"=>'true',
		"caption"=>'1',
		"pagination"=>'true'

		),$atts));
        
    global $st_config;
    $id = rand();
    global $ig_new_array;
    
    $ig_new_array = array();
    do_shortcode($content);
    $req = BluethemePlugin::addTemplate($template);
	if($req["check"]){
		require $req["src"];
	}
}
?>