<?php 
defined('_JEXEC') or die;
add_shortcode('portfolio_desi', 'PortfolioDesignShortcode');
function PortfolioDesignShortcode($atts,$content=null){
 	extract(shortcode_atts(array(
 		"id"=>"0",
 		"title"=>"",
        "columns"=>"",
        "description"=>"",
 		"menuid"=>"0",
 		"stid"=>"",
 		"class"=>"",
        "direction"=>"",
        "state"=>"",
        "count"=>"All",
        "order"=>"created",
        "template"=>'portfolio'
	), $atts));
    if(!$state) return true;
	require_once JPATH_BASE.'/components/com_k2/models/item.php';

 	$st = new BluethemePlugin();

 	if(!is_numeric((int)$count)){
 		$count = 'All';
 	}

 	if(empty($template)) {
 		$template = 'portfolio';
 	}
	$catItems = $st->getK2Recent($id,$count,$order,$direction);
	$K2ModelItem = new K2ModelItem;

	$catTags = array();

	$allTags = array();

	if(!empty($catItems)){
		foreach ($catItems as $catItem) {
			$catTags[] = $K2ModelItem->getItemTags($catItem->id);
		}
	}
	if(!empty($catTags)){
		foreach ($catTags as $catTag) {
			if (!empty($catTag)) {
				foreach ($catTag as $tag) {
					$allTags[] = $tag->name;
				}
			}
		}
	}

	$tags = array_unique($allTags);
	$col = array();
	$col['item']= $columns;
	switch ($columns) {
		case '2':
			$col['class']="col-lg-6 col-xs-12 col-sm-6";
			break;
		case '3':
			$col['class']="col-lg-4 col-md-6 col-xs-6 col-sm-4";
			break;
		case '4':
			$col['class']="col-lg-3 col-md-6 col-xs-6 col-sm-4";
			break;
		case '5':
			$col['item']='m';
			$col['class']="col-lg-3 col-xs-12 col-sm-6";
			break;
	}

	if($st->checkSidebar()){
		$col['sidebar']='s';
	}else{
		$col['sidebar']='';
	}

    $req = BluethemePlugin::addTemplate($template);
	if($req["check"]){
		require $req["src"];
	}
}
?>