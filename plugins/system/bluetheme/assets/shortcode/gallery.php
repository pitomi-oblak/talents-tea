<?php 
defined('_JEXEC') or die;
$ig_new_array = array();
add_shortcode("gallery_desi", "galleryDesignShortcode");
function galleryDesignShortcode($atts,$content=null){
	extract(shortcode_atts(array(
        "class" => '',
        "style"=>'img-polaroid',
        "width"=>'80',
        "height"=>'80',
        "state"=>'1',
        "columns"=>'1',
        "title"=>'1',
        "show_title"=>'1',
        "hclass"=>'wow fadeInDown item_heading',
        "bg"=>'',
        "template"=>'gallery'
    ), $atts));
    if(!$state) return true;
	global $st_config;
    $id = rand();
    $col = array();
    $col['item']= $columns;
	switch ($columns) {
		case '2':
			$col['class']="col-lg-6 col-xs-12 col-sm-6";
			break;
		case '3':
			$col['class']="col-lg-4 col-md-4 col-xs-6 col-sm-4";
			break;
		case '4':
			$col['class']="col-lg-3 col-md-4 col-xs-6 col-sm-4";
			break;
		case '6':
			$col['item']='m';
			$col['class']="col-lg-3 col-xs-12 col-sm-6";
			break;
	}
    global $ig_new_array;
    $ig_new_array = array();
    do_shortcode($content);
    $req = BluethemePlugin::addTemplate($template);
	if($req["check"]){
		require $req["src"];
	}
    
}

// Item Gallery
add_shortcode('item_gallery_desi', 'itemGalleryDesignShortcode');
function itemGalleryDesignShortcode($atts,$content=null){
	extract(shortcode_atts(array(
        "title" => '',
        "stitle" => '',
        "position"=>'',
        "name"=>'',
        "number"=>'',
        "show_image"=>'',
        "iconname"=>'',
        "desc" =>''
    ), $atts));
    global $ig_new_array;
    $ig_new_array[] = array("title" => $title ,"stitle" => $stitle , "name" => $name,"show_image" => $show_image,"number" => $number,"iconname" => $iconname, "position" => $position, "content" => $content,"desc"=>$desc);
}