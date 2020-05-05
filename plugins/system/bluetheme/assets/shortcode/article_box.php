<?php 
defined('_JEXEC') or die;
add_shortcode('article_box_desi','articleBoxDesignShortcode');
function articleBoxDesignShortcode($atts,$content=null){
	extract(shortcode_atts(array(
        "class" => '',
        "extension"=>'com_k2',
        "article_id"=>'0',
        "type"=>'outside'
    ), $atts));
    $st = new BluethemePlugin();
    if($extension=='com_k2'){
		$item = $st->getK2byId($article_id);
		$linkimage = $st->getImageK2($item->id,"L");
		$linkimagefull = $st->getImageK2($item->id,"XL");
		$linkreadmore = $st->getK2link($item->id,$item->alias,$item->catid,$item->categoryalias);
	}else if($extension=='com_content'){
		$item = $st->getContentbyId($article_id);
		$linkimage = $linkimagefull = $st->getImageContent($item->images);
		$linkreadmore = $st->getContentlink($item);
	}else{
		return 'extension only support com_content or com_k2';
	}

    $req = BluethemePlugin::addTemplate('article_box');
	if($req["check"]){
		require $req["src"];
	}
}
?>