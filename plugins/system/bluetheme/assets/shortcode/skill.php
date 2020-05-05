<?php
defined('_JEXEC') or die;
add_shortcode('skill_desi', 'SkillDesignShortcode');
function SkillDesignShortcode($atts,$content=null){
    extract(shortcode_atts(array(
        "class"=>'progress-bar-danger',
        "title"=>'',
        "sdesc"=>'',
        "percent"=>'',
        "bg_image"=>'#92bc39',
        "color"=>'#b3b3b3',
        "template"=>''
    ), $atts));

    if(empty($template)){
        $template = 'skill';
    }
    $req = BluethemePlugin::addTemplate($template);
    if($req["check"]){
    	require $req["src"];
    }
}
?>