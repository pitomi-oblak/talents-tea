<?php 
defined('_JEXEC') or die;
add_shortcode('recent_article_desi','recentArticleDesignShortcode');
function recentArticleDesignShortcode($atts,$content=null){
 	extract(shortcode_atts(array(
        "class" => '',
        "id_ar"=>'',
        "title" => 'Test',
        "category_id"=>'0',
        "visible"=>'4',
        "scroll"=>'4',
        "auto"=>'0',
        "animation"=>'600',
        "limit"=>'10',
        "type"=>'2',
        "style"=>"style-1"
    ), $atts));
    $id = rand();
	$st = new BluethemePlugin();
	$items = $st->getk2Recent($category_id,$limit);

    $req = BluethemePlugin::addTemplate('recent_article');
	if($req["check"]){
		require $req["src"];
	}
}
?>