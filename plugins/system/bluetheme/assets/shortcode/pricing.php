<?php
defined('_JEXEC') or die;
add_shortcode('pricing_desi', 'PricingDesignShortcode');
function PricingDesignShortcode($atts,$content=null){
    extract(shortcode_atts(array(
        "class"=>'',
        "title"=>'',
        "price"=>'',
        "unit"=>'$',
        "time"=>'',
        "description"=>'',
        "template"=>'',
        "text_button"=>'',
        "link_button"=>'',
    ), $atts));

    if(empty($template)){
        $template = 'pricing';
    }
    $req = BluethemePlugin::addTemplate($template);
    if($req["check"]){
    	require $req["src"];
    }
}
?>