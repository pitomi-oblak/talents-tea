<?php
defined('_JEXEC') or die;
add_shortcode('moduleid_desi', 'moduleidDesignShortcode');
function moduleidDesignShortcode($atts,$content=null){
    extract(shortcode_atts(array(
        "id" => '0',
        "showtitle"=>0,
        "moduleclass"=>"",
        "template"=>"module",
        "hclass"=>"",
        "state"=>"1"
    ), $atts));
    if (!$state) return true;
    if($id==0 || $id=='') return false;
    $st = new BluethemePlugin();
    $module =  $st->loadModuleId($id);
    $params = json_decode($module->params);
    $req = BluethemePlugin::addTemplate($template);
    if($req["check"]){
        require $req["src"];
    }
}
?>