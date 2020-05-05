<?php 
defined('_JEXEC') or die;
add_shortcode('testimonial_desi','testimonialDesignShortcode');
function testimonialDesignShortcode($atts, $content=null){
	extract(shortcode_atts(array(
		"type"=>"1",
        "template"=>'',
        "class"=>'',
        "link"=>'',
        "link_text" =>'',
        "title"=>'',
        "show_image"=>''
		//"typeintro"=>'1',
		//"interval"=>'2000',
		//"auto"=>'true',
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