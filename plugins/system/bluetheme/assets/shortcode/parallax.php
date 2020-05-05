<?php
defined('_JEXEC') or die;
add_shortcode('parallax_desi', 'ParallaxDesignShortcode');
function ParallaxDesignShortcode($atts,$content=null){
    extract(shortcode_atts(array(
        "title"=>'',
        "description"=>'',
        "category"=>'',
        "itemcount"=>'',
        "template"=>''
    ), $atts));
    if(!$template){
        $template = 'parallax';
    }

    $st = new BluethemePlugin();
    $items = $st->getk2Category($category,$itemcount,'created');

    $req = BluethemePlugin::addTemplate($template);
    if($req["check"]){
        require $req["src"];
    }
}
?>