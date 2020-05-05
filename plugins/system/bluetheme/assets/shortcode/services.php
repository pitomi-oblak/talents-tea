<?php
defined('_JEXEC') or die;
add_shortcode('services_desi', 'ServicesDesignShortcode');
function ServicesDesignShortcode($atts,$content=null){
    extract(shortcode_atts(array(
        "title"=>'',
        "description"=>'',
        "category"=>'',
        "itemcount"=>'',
        "hclass"=>'',
        "menuid"=>'0',
        "sid"=>'',
        "sclass"=>'',
        "bg"=>'',
        "template"=>'',
        "full"=>'1',
        "animate"=>'1',
        "order"=>'created',
        "direction"=>'DESC'
    ), $atts));

    if(empty($template)){
        $template = 'services';
    }
    if($sid == '') $sid = rand(0,99999);
    $st = new BluethemePlugin();
    $items = $st->getk2Category($category,$itemcount,$order,$direction);
    $req = BluethemePlugin::addTemplate($template);
    if($req["check"]){
        require $req["src"];
    }
}
?>