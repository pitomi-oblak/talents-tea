<?php
defined('_JEXEC') or die;
add_shortcode('vimeo_desi', 'vimeoDesignShortcode');
function vimeoDesignShortcode($atts, $content = null)
{
	extract(shortcode_atts(array(
		"height" => '300',
		"width"  => '400',
		"autoplay"  => '1',
		"loop"  => '1',
		"badge"  => '1',
		"byline"  => '1',
		"portrait"  => '1',
		"title"  => '1',
		"color"  => '00adef',
		"alignment"  => 'center',
	), $atts));

	$class = '';
	//echo $content;die;
	switch ($alignment) {
		case 'left':
			$class = 'alignment-left';
			break;
		case 'center':
			$class = 'alignment-center';
			break;
		case 'right':
			$class = 'alignment-right';
			break;
	}
	//preg_match('/vimeo.com\/(\d+)$/', $content, $id);
	$req = BluethemePlugin::addTemplate('vimeo');
	if($req["check"]){
		require $req["src"];
	}
}

