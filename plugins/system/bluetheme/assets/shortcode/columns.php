<?php 
defined('_JEXEC') or die;
// Columns
$column_new_array = array();
add_shortcode('columns_desi', 'columnsDesignShortcode');
function columnsDesignShortcode($atts, $content = null){
    extract(shortcode_atts(array(
        "title" => '',
        "sdesc" => '',
        "id" => '',
        "class"=>'',
        "cid" => '',
        "cclass"=>'',
        "heading"=>'',
        "htag"=>'',
        "animate"=>'',
        "bg"=>'',
        "cpadding"=>'',
        "fullwidth"=>'1',
        "state"=>'1'
    ), $atts));
    if (!$state) return true;
    $st = new BluethemePlugin();
	global $column_new_array;
    $column_new_array = array();
    extract(shortcode_atts(array(
    	"class" => ''
    	), $atts));
    do_shortcode($content);

   $req = BluethemePlugin::addTemplate('columns');
	if($req["check"]){
		require $req["src"];
	}
}

add_shortcode('column_item_desi', 'columnItemDesignShortcode');
function columnItemDesignShortcode($atts, $content = null)
{
    extract(shortcode_atts(array(
        "col" => '12',
        "col_md"=>'0',
        "col_sm"=>'0',
        "col_xs"=>'0',
        "col_box"=>'0',
        "class"=>'',
        "padding"=>''
    ), $atts));
    global $column_new_array;
    $col_class = "col-lg-".$col;
    if($col_md!="0"){
        $col_class.=" col-md-".$col_md;
    }
     if($col_sm!="0"){
        $col_class.=" col-sm-".$col_sm;
    }
     if($col_xs!="0"){
        $col_class.=" col-xs-".$col_xs;
    }
    $column_new_array[] = array("col" => $col_class ,"show_box"=>$col_box,"content" => $content,'class'=>$class,"padding"=>$padding);
}

