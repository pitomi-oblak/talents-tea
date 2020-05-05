<?php 
defined('_JEXEC') or die;
add_shortcode('intro_desi','introDesignShortcode');
function introDesignShortcode($atts, $content=null){
	extract(shortcode_atts(array(
		"type"=>"1",
        "template"=>'',
        "class"=>'',        
        "title"=>'',       
        "sid"=>'',
        //"show_title"=>'1',
        "hclass"=>'',
        "bg_image"=>''
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