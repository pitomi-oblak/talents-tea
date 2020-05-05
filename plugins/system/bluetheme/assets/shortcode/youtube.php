<?php 
defined('_JEXEC') or die;
add_shortcode('youtube_desi', 'youtubeDesignShortcode');
function youtubeDesignShortcode($atts, $content = null)
{
	extract(shortcode_atts(array(
		"height" => '300',
		"width"  => '400',
		"class"  => '',
        "autoplay" =>'0',
        "hidecontrols"=>'0',
        "showcaption"=>'0',
        "loop"=>'0'
	), $atts));
        
	preg_match('/[\\?\\&]v=([^\\?\\&]+)/', $content, $id);
    //support embed link pasted at link
    if(empty($id) || !is_array($id)){
        preg_match('/embed[\/]([^\\?\\&]+)[\\?]/', $content, $id);
    }
	$req = BluethemePlugin::addTemplate('youtube');
	if($req["check"]){
		require $req["src"];
	}
}

