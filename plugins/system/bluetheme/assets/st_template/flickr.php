<?php
/**
 * ------------------------------------------------------------------------
 * ST Typo Plugin for J25 & J30
 * ------------------------------------------------------------------------
 * Copyright (C) 2013 cmsbluetheme All Rights Reserved.
 * @license - GNU/GPL, http://www.gnu.org/licenses/gpl.html
 * Author: cmsbluetheme
 * Author Email: cmsbluetheme.com
 * Websites: http://www.cmsbluetheme.com
 * ------------------------------------------------------------------------
 */
defined('_JEXEC') or die;
$col = '';
if($column){
    $col = 'col-fl-'.$column;
}
?>
<div class="row">
    <div class="col-md-12">
        <?php if (!empty($title)) : ?>
            <div class="st-flickr-title"><h2><?php echo $title; ?></h2></div>
        <?php endif; ?>
        <?php if (!empty($description)) : ?>
             <div class="st-flickr-description"><h3><?php echo $description; ?></h3></div>
        <?php endif; ?>
    </div>
    <!-- /.col-md-12 -->
</div>
<!-- /.row -->
<div class="row">
    <div class="col-md-12">
        <div class="flickr-list-wrapper">
            <div id="<?php echo $callbackfx; ?>" class="flickr-list <?php echo(($align)? 'st-flickr-'.$align : '');?>" style="<?php echo (($containerwidth) ? 'width:' . ($containerwidth) . 'px;' : '');
                echo (($containerheight) ? 'height:' . ($containerheight) . 'px;' : ''); ?> text-align: center;">
            </div>
        </div>
        <!-- /.flickr-list-wrapper -->
    </div>
    <!-- /.col-md-12 -->
</div>
<!-- /.row -->

<?php
$image_size = 'image_' . $fixedwidth;
$doc = JFactory::getDocument();
$doc->addStyleSheet(JURI::base(true) . '/plugins/system/shinetheme/assets/css/flickrfeed.style.css');
$doc->addScript(JURI::base(true) . '/plugins/system/shinetheme/assets/js/jflickrfeed.js');
switch ($callbackfx) {
    case 'cycle' :
        $doc->addScript(JURI::base(true) . '/plugins/system/shinetheme/assets/js/jquery.easing.1.3.js');
        $doc->addScript(JURI::base(true) . '/plugins/system/shinetheme/assets/js/jquery.cycle.all.min.js');
 

        break;
    case 'cbox':
        $doc->addScript(JURI::base(true) . '/plugins/system/shinetheme/assets/js/jquery.colorbox-min.js');
        break;
}
$js = " jQuery(document).ready(function($){
            $('#{$callbackfx}').jflickrfeed({ 
        limit: $limit,";
if (empty($id)) {
    $js .=  "   flickrbase: 'http://api.flickr.com/services/feeds/',
                feedapi: 'photos_public.gne',
                qstrings: {
                    lang: 'en-us',
                    format: 'json',
                    jsoncallback: '?'
                },
           ";
} else {
    $js .=  "   qstrings : {
                    id: '$id'
                },
            ";
}
if ($callbackfx == 'nocallback') {
    $js .= "    useTemplate : false,
                itemCallback: function(item){
                    //jQuery(this).append('<li class=\"".$col. " st-flickr-li-item\"><img  " . (($imagewidth) ? 'width="' . ($imagewidth) . 'px"' : '') . (($imageheight) ? ' height="' . ($imageheight) . 'px"' : '') . " src='+item." . $image_size . "+' alt=\"\"/></li>');
                    $(this).append('<div class=\"".$col. " view\"><img alt=\"'+item.title+'\"  title=\"'+item.title+'\" class=\"img-responsive\" src='+item." . $image_size . "+'></div>');
                }
            ";
} else if ($callbackfx == 'cycle') {
    $js .="     useTemplate : true,
                //itemTemplate: '<li  style=\"" . (($containerwidth) ? 'width:' . ($containerwidth) . 'px;' : '') . (($containerheight) ? ' height:' . ($containerheight) . 'px;' : ' height:auto;') . "\"><img src=\'{{{$image_size}}}\'  " . (($imagewidth) ? 'width="' . ($imagewidth) . 'px"' : '') . (($imageheight) ? ' height="' . ($imageheight) . 'px"' : '') . " alt=\"{{title}}\" /><div>{{title}}</div></li>'
                itemTemplate: '<div class=\"view\"><img alt=\"\" class=\"img-responsive\" src=\'{{{$image_size}}}\'></div>'
            },
            function(data) {
                $('#cycle > div > div').hide();
                $('#cycle').cycle({
                    timeout: 5000,
                    fx:     'shuffle', 
                    easing: 'easeOutBack', 
                    delay:  -4000 
                });
                $('#cycle div').hover(function(){
                    $(this).children('div').show();
                },function(){
                    $(this).children('div').hide();
            });     ";
} else if ($callbackfx == 'cbox') {
    $js .= "    useTemplate : true,
                //itemTemplate: '<li class=\"".$col."\"><a rel=\"colorbox\" href=\'{{image_b}}\' title=\"{{title}}\"><img src=\'{{{$image_size}}}\' " . (($imagewidth) ? 'width="' . ($imagewidth) . 'px"' : '') . (($imageheight) ? ' height="' . ($imageheight) . 'px"' : '') . " alt=\"{{title}}\" /></a></li>'
                itemTemplate: '<div class=\"".$col. " view\"><a rel=\"colorbox\" href=\'{{image_b}}\' title=\"{{title}}\"><img alt=\"\" class=\"img-responsive\" src=\'{{{$image_size}}}\'></a></div>'
            }, function(data) {
                $('#cbox a').colorbox();
            ";
}
$js .=" });
    });";

$doc->addScriptDeclaration($js);

?>