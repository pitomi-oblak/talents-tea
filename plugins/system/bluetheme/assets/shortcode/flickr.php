<?php

defined('_JEXEC') or die;
add_shortcode('flickr_desi', 'flickrDesignShortcode');
function flickrDesignShortcode($atts, $content = null) {
    extract(shortcode_atts(array(
        "class" => '',
        "id" => '37304598@N02',
        "limit" => '20',
        "containerwidth" => '',
        "containerheight" => '',
        "imagewidth" => '',
        "imageheight" => '',
        "description"=>'',
        "title"=>'',
        "callbackfx"=>'',
        "fixedwidth"=>'m',
        "align"=>'center',
        "column"=>'',
        "fluid"=>''
    ), $atts));
    if (trim($limit) == '') {
        $limit = 10;
    }
    $idrandom = rand();

    $req = BluethemePlugin::addTemplate('flickr');
    if ($req["check"]) {
        require $req["src"];
    }
}

?>