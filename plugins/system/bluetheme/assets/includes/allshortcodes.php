<?php
add_shortcode('gmap','geomapShortcode');
function geomapShortcode($atts, $content=null){
	extract(shortcode_atts(array(
		"class" => 'st-map_canvas', 
		"latitude"=>'21.038204',   // vi do
		"longitude"=>'105.851011',   // kinh do
		"location"=>'hanoi',
		"zoom"=>'14',
		"bound"=>'true',
		"maptype"=>'roadmap',
		"scroll"=>'false',
		"drag"=>'false'
	),$atts));
 	return "comming soon!";
}

add_shortcode('slider','sliderShortcode');
function sliderShortcode($atts, $content=null){
	extract(shortcode_atts(array(
		),$atts));

	global $st_config;
    $id = rand();
    global $ig_new_array;
    $ig_new_array = array();
    do_shortcode($content);
    $slider ='<div class="carousel-box">';
		$slider.= '<div class="carousel-wrapper">';
			$slider.='<ul class="about-carousel clearfix">';
			foreach ($ig_new_array as $item){
				$slider.='<li><img src="'.trim($item['content']).'" class="img-responsive" alt="" style="width:100%;"></li>';
			}
			$slider.='</ul>';
			$slider.= '<div class="clearfix carousel-buttons">';
				$slider.='<a class="prev"><i class="icon-angle-left"></i></a>';
				$slider.='<a class="next"><i class="icon-angle-right"></i></a>';
			$slider.='</div>';
			$slider.='<div class="pagination bullets"></div>';
		$slider.='</div>';
	$slider.='</div>';
	return $slider;
}

add_shortcode('fb_likebox','fbShortcode');
function fbShortcode($atts, $content=null){
 extract(shortcode_atts(array(
   "width"=>'292',
   "height"=>'auto',
   "showfaces"=>'true',
   "showheader"=>'true',
   "showstream"=>'true',
   "showborder"=>'true',
   "colorscheme"=>'light',
   "language"=>'en_Us' 
  ), $atts));
 $doc=JFactory::getDocument();
 $js="(function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/".$language."/all.js#xfbml=1';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));";
 $doc->addScriptDeclaration($js);
 $likebox = "<div id='fb-root'></div>";

 $likebox .= '<div class="fb-like-box" 
    data-href="'.trim($content).'"
    data-width="'.$width.'"
    data-height="'.$height.'"
    data-colorscheme="'.$colorscheme.'"
    data-show-faces="'.$showfaces.'"
    data-header="'.$showheader.'"
    data-stream="'.$showstream.'"
    data-show-border="'.$showborder.'"></div>';

 return $likebox;

}

add_shortcode('flickr','flickrShortcode');
function flickrShortcode($atts, $content=null){
	extract(shortcode_atts(array(
		"class" => '',
		"id"=>'100707032@N06',
		"limit"=>'10',
		"width"=>'auto',
		"height"=>'auto' 
	),$atts));
	if(trim($limit)==''){
		$limit=10;
	}
	$idrandom = rand();
	$doc = JFactory::getDocument();
	$js="jQuery(document).ready(function(){
      		jQuery('#st-flickr-{$idrandom} ul').jflickrfeed({ 
				limit: $limit,
				qstrings: {
				  id: '$id'
				},
				useTemplate:false,
				itemCallback:function(item){
					jQuery(this).append('<li><a rel=\"example_group\" class=\"stgallery\" href=\"'+item.image_b+'\"><img src=\"'+item.image_s+'\" alt=\"{{title}}\" style=\"width:{$width}px;height:{$height}px\" /></a></li>');
				}
            });
     	});";
	$doc->addScriptDeclaration($js);
	$flickr = '<div class="st-flickr '.$class.'" id="st-flickr-'.$idrandom.'"><ul></ul></div>';
 	return $flickr;
}

add_shortcode('article_box','articleBoxShortcode');
function articleBoxShortcode($atts,$content=null){
	extract(shortcode_atts(array(
        "class" => '',
        "extension"=>'com_k2',
        "article_id"=>'0',
        "type"=>'outside'
    ), $atts));
    $st = new ShinethemePlugin();
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
	$article ='<div class="st-article-box '.$class.'">';
		$article .= '<div class="image">';
		if($type=='inside'){
			$article .= '<a href="'.$st->getK2link($item->id,$item->alias,$item->catid,$item->categoryalias).'">';
				$article .= '<img src="'.$linkimage.'" style="width:100%;" alt="">';
				$article .= '<div class="stmark-1">';
					$article .= '<h2>'.$item->title.'</h2>';
					$article .= do_shortcode($item->introtext);
					$article .= '<a href="'.$linkreadmore.'" class="st-button">Read More</a>';
				$article .= '</div>';
			$article .= '</a>';
			$article .= '</div>';
		}else{
				$article .= '<a href="'.$linkimagefull.'" class="stmodal">';
					$article .= '<img src="'.$linkimage.'" alt="" style="width:100%;">';
					$article .= '<div class="stmark"></div>';
				$article .= '</a>';
			$article .= '</div>';  // div.image
			$article .= '<h3>'.$item->title.'</h3>';
			$article .= do_shortcode($item->introtext);
			$article .= '<div class="readmore">';
				$article .= '<a class="st-button" href="'.$linkreadmore.'">Read More</a>';
			$article .= '</div>';
		}
	$article .='</div>';
	return $article;
}

add_shortcode('recent_article','recentArticleShortcode');
function recentArticleShortcode($atts,$content=null){
	extract(shortcode_atts(array(
        "class" => '',
        "title" => 'Test',
        "extension"=>'com_k2',
        "category_id"=>'0',
        "visible"=>'4',
        "scroll"=>'4',
        "auto"=>'0',
        "animation"=>'600',
        "limit"=>'5',
        "type"=>'inside',
        "style"=>"style-1"
    ), $atts));
    $id = rand();
	$st = new ShinethemePlugin();
	if($extension=='com_k2'){
		$items = $st->getK2Recent($category_id,$limit);
	}else if($extension=='com_content'){
		$items = $st->getContentRecent($category_id,$limit);
	}else{
		return 'extension only support com_content or com_k2';
	}
	$recen = '<div id="recentk2'.$id.'" class="recentk2">';
		$recen .= '<div class="row-fluid">';
		if($style=='style-1'){
			$recen .= '<div class="span3">';
				$recen .= '<span class="st-title st-style1">'.$title.'</span>';
				$recen .= '<p class="content">'.do_shortcode($content).'</p>';
				$recen .= '<div class="navigation">';
					$recen .= '<i class="icon-chevron-left"></i>';
					$recen .= '<i class="icon-chevron-right"></i>';
				$recen .= '</div>';
			$recen .= '</div>';
		}
		$cl = ($style=='style-1') ? "span9" : "span12";
			$recen .= '<div class="'.$cl.'">';
				$recen .= '<div class="row-fluid" id="st-carousel'.$id.'">';
					$recen .= '<ul id="portfolio_carousel'.$id.'" class="portfolio_carousel">';
					foreach($items as $key=>$item){
					if($extension=='com_k2'){
						$isImage  = $st->isImagesK2($item->id);
						$linkfull = $st->getImageK2($item->id,"XL");
						$linklage = $st->getImageK2($item->id,"L");
						$linkreadmore = $st->getK2link($item->id,$item->alias,$item->catid,$item->categoryalias);
					}else{
						$isImage  = $st->isImagesContent($item->images);
						$linkfull = $linklage = $st->getImageContent($item->images);
						$linkreadmore = $st->getContentlink($item);
					}
						$recen .= '<li class="portfolio_item">';
							$recen .= '<div class="st-carousel-content">';
								$recen .= '<div class="row-fluid">';
									$recen .= '<div class="span12">';
									if($type=='outside'){
										if($isImage){
											$recen .= '<div class="image no-text" style="width:90%;margin:0 auto;">';
													//$recen .= '<a href="'.$linkfull.'"  class="stmodal">';
													$recen .= '<img src="'.$linklage.'" alt=""/>';
													$recen .= '<div class="stlight"><a class="icon icon-zoom-in stmodal" href="'.$linkfull.'"></a></div>';
												
											//$recen .='</a>';
											$recen .= '</div>';
											
										}
											
											$recen .= '<h3>'.$item->title.'</h3>';
											$recen .= substr($item->introtext,0,20);
											$recen .= '<div class="readmore">';
												$recen .= '<a href="'.$linkreadmore.'" class="st-button">Read More</a>';
											$recen .= '</div>';
									}else{
										$recen .= '<div class="image" style="width:90%;margin:0 auto;">';
											$recen .= '<a href="'.$linkreadmore.'">';
												$recen .= '<img src="'.$linklage.'" alt="">';
												$recen .= '<div class="stmark-1">';
													$recen .= '<h2>'.$item->title.'</h2>';
													$recen .= '<p>'.substr($item->introtext,0,100).' ...</p>';
													$recen .= '<a href="'.$linkreadmore.'" class="st-button">Read More</a>';
												$recen .= '</div>';
											$recen .= '</a>';
										$recen .= '</div>';
									}
									$recen .= '</div>';
								$recen .= '</div>';
							$recen .= '</div>';
						$recen .= '</li>';
					}
					$recen .= '</ul>';
				$recen .= '</div>';
			$recen .= '</div>';
		$recen .= '</div>';
	if($style!='style-1'){
		$recen .= '<div class="no-descript">';
			$recen .= '<div class="row-fluid">';
				$recen .= '<div class="span5"></div>';
				$recen .= '<div class="span2">';
					$recen .= '<div class="navigation">';
						$recen .= '<i class="icon-chevron-left"></i>';
						$recen .= '<i class="icon-chevron-right"></i>';
					$recen .= '</div>';
				$recen .= '</div>';
				$recen .= '<div class="span5"></div>';
			$recen .= '</div>';
		$recen .= '</div>';
	}
	$recen .= '</div>';
	$js ="jQuery(document).ready(function() {
			var stwidth = jQuery('#st-carousel{$id} .portfolio_item').outerWidth(true);
			if(jQuery(window).width() > 767)
			{
				var stcontentwidth = stwidth/{$visible};
			}else{
				var stcontentwidth=stwidth;
			}
			jQuery('#st-carousel{$id} .st-carousel-content').css('width',stcontentwidth);
			jQuery('#portfolio_carousel{$id}').jcarousel({
				scroll: (jQuery(window).width() > 767 ? {$scroll} : 1),
				easing: 'easeInOutExpo',
				animation: {$animation},
				auto:{$auto},wrap:'last',
				visible:(jQuery(window).width() > 767 ? {$visible} : 1)
			});
			jQuery('#recentk2{$id} .icon-chevron-left').click(function(){
				jQuery('#recentk2{$id} .jcarousel-prev').click();
			});
			jQuery('#recentk2{$id} .icon-chevron-right').click(function(){
				jQuery('#recentk2{$id} .jcarousel-next').click();
			});
		});
		jQuery(window).resize(function() {
			var stwidth = jQuery('#st-carousel{$id}').width();
			if(jQuery(window).width() > 767){
				var stcontentwidth = stwidth/{$visible};
			}else{
				var stcontentwidth=stwidth;
			}
			jQuery('#st-carousel{$id} .st-carousel-content').css('width',stcontentwidth);
			var el = jQuery('#portfolio_carousel{$id}'); 
			carousel = el.data('jcarousel'); 
			win_width = jQuery(window).width();
			var visibleItems = (win_width > 767 ? {$visible} : 1);
			carousel.options.visible = visibleItems;
			carousel.options.scroll = (win_width > 767 ? {$scroll} : 1);carousel.reload(); 
		});";
	$st->doc->addScriptDeclaration($js);
	return $recen;
}


// Code
add_shortcode('code','codeShortcode');
function codeShortcode($atts,$content=null){
	extract(shortcode_atts(array(
        "class" => ''
    ), $atts));
    $code = "<h3 class='sc-getcode'>Get The Code:</h3><div class='st-code $class'>".$content."</div>";
    return $code;
}

// Divider
add_shortcode("divider", "dividerShortcode");
function dividerShortcode($atts,$content=null){
	extract(shortcode_atts(array(
        "class" => '',
        "style" => '',
        "margin"=> ''
    ), $atts));
    if($margin=='')
    	$divi = "<div class='st-divider $style $class'></div>";
    else
    	$divi ="<div class='st-divider $style $class' style='margin:{$margin}px 0;'></div>";
    return $divi;
}

// popup media
add_shortcode("media_popup","mediaPopupShortcode");
function mediaPopupShortcode($atts,$content=null){
	extract(shortcode_atts(array(
        "class" => '',
        "link" => '',
    ), $atts));
    $youtube ='<a class="st-media '.$class.'" href="'.$link.'" >'.do_shortcode($content).'</a>';
    return $youtube;
}

//Galleries
$ig_new_array = array();
add_shortcode("gallery", "galleryShortcode");
function galleryShortcode($atts,$content=null){
	extract(shortcode_atts(array(
        "class" => ''
    ), $atts));
	global $st_config;
    $id = rand();
    global $ig_new_array;
    $ig_new_array = array();
    do_shortcode($content);
    $gallery ='<div class="st-gallery '.$class.'">';
    foreach($ig_new_array as $key=>$item){
    	if($key==0 || ($key+1)%4==1) $gallery.='<div class="row-fluid">';
    	$gallery.='<div class="span3 st-item-gallery"><a class="stgallery" rel="'.$id.'" href="'.trim($item['content']).'" title="'.$item['title'].'"><img alt="'.$item['title'].'" style="width:100%;" src="'.trim($item['content']).'" title="'.$item['title'].'" /><div class="stmark"></div></a></div>';
    	if((($key+1)==count($ig_new_array)) || (($key+1)%4==0 && $key>0)) $gallery.="</div>";
    }
    $gallery.='</div>';
    return $gallery;
}

// Item Gallery
add_shortcode('item_gallery', 'itemGalleryShortcode');
function itemGalleryShortcode($atts,$content=null){
	extract(shortcode_atts(array(
        "title" => '',
        "description"=>''
    ), $atts));
    global $ig_new_array;
    $ig_new_array[] = array("title" => $title ,"description"=>$description, "content" => do_shortcode($content));
}

// Alert
add_shortcode('alert','alertShortcode');
function alertShortcode($atts,$content=null){
	extract(shortcode_atts(array(
    	"type" => '',
    	"title"=>'',
    	"class" => ''
	), $atts));
	switch ($type) {
		case 'success':
			$type='alert-success';
			$ico ='icon-checkmark-circle';
			break;
		case 'error':
			$type='alert-error';
			$ico ='icon-x-altx-alt';
			break;
		case 'info':
			$type='alert-info';
			$ico ='icon-info-2';
			break;
		default:
			$type='';
			$ico ='icon-exclamation-sign';
			break;
	}
	$alert = '<div class="alert '.$type.'"><button type="button" class="close" data-dismiss="alert"><i class="icon-remove-sign"></i></button>';
	$alert .='<i class="alert-ico '.$ico.'"></i>';
	if($title!=''){
			$alert.='<h4>'.$title.'</h4>';
	}
	$alert.=$content;
	$alert .='</div>';
	return $alert;
}

//Testimonial
add_shortcode('testimonial','testimonialShortcode');
function testimonialShortcode($atts,$content=null){
	extract(shortcode_atts(array(
    	"author" => '',
    	"position" => '',
    	"class" => ''
	), $atts));
	$testimo  = '<div class="st-testimonial '.$class.'"><i class="icon-quote-left pull-left"></i>';
	$testimo .= '<div class="st-testimonial-ct">'.$content.'</div>';
	$testimo .= '<div class="st-testimonial-author"><span class="st-author-name">'.$author.',</span><span class="st-author-position">'.$position.'</span></div>';
	$testimo .= '</div>';
	return $testimo;
}


// Blockquote
add_shortcode('blockquote','blockquoteShortcode');
function blockquoteShortcode($atts,$content=null){
	extract(shortcode_atts(array(
    	"class" => '',
    	"align" => 'center',
    	"color" => '#999999'
    	), $atts));
    $blockquote = '<div class="st-blockquote-'.$align.' '.$class.'" style="color:'.$color.'">';
    $blockquote.= do_shortcode($content);
	$blockquote.= '</div>';
	return $blockquote;
}

// Module position
add_shortcode('module', 'moduleShortcode');
function moduleShortcode($atts,$content=null){
 	extract(shortcode_atts(array(
    	"number" => '0',
    	"style"  => 'none'
    	), $atts));
    $st = new ShinethemePlugin();
    return $st->loadModule($content,$number,$style);
}
// Module id
add_shortcode('moduleid', 'moduleidShortcode');
function moduleidShortcode($atts,$content=null){
 	extract(shortcode_atts(array(
    	"id" => '0'
    	), $atts));
    $st = new ShinethemePlugin();
    return $st->loadModuleId($id);
}

# Accordion Block
$acc_new_array = array();
add_shortcode('accordion', 'accordionShortcode');
function accordionShortcode($atts, $content = null)
{
	$id = rand();
	global $acc_new_array;
	extract(shortcode_atts(array(
		"class"			=> ''
	), $atts));
    $acc_new_array = array();
	$accordion = '<div class="accordion '.$class.'" id="accordion'.$id.'">';
	do_shortcode($content);
	foreach($acc_new_array as $key=> $item){
		$accordion .='<div class="panel panel-boxme">';
			$accordion.='<div class="panel-style1 '.(($key==0)?"active":"").'">';
				$accordion.='<h4>';
					$accordion.='<span class="plus-box">'.(($key==0)?"-":"&#43;").'</span>';
					$accordion.='<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion'.$id.'" href="#collapse-'.$id.'-'.$key.'">';
						$accordion.=$item['title'];
					$accordion.='</a>';
				$accordion.='</h4>';
			$accordion.='</div>';
			$accordion.='<div id="collapse-'.$id.'-'.$key.'" class="collapse collapse-boxme '.(($key==0)?"in":"").'">';
				$accordion.='<div class="padt20">';
					$accordion.=$item['content'];
				$accordion.='</div>';
			$accordion.='</div>';
		$accordion .="</div>";
	}
	$accordion .= "</div>";
	return $accordion;
}

add_shortcode('acc_item', 'accItemShortcode');
function accItemShortcode($atts, $content = null)
{
	extract(shortcode_atts(array(
        "title" => ''
    ), $atts));
    global $acc_new_array;
    $acc_new_array[] = array("title" => $title , "content" => do_shortcode($content));
}

add_shortcode('title','titleShortcode');
function titleShortcode($atts,$content=null){
	extract(shortcode_atts(array(
        "class" => 'style-1',
        "margin"=>'0'
    ), $atts));
    return "<div class='sc-title'><span class='st-title {$class}' style='margin-bottom:{$margin}px'>".$content."</span></div>";
}

// Columns
$column_new_array = array();
add_shortcode('columns', 'columnsShortcode');
function columnsShortcode($atts, $content = null){
	global $column_new_array;
    $column_new_array = array();
    extract(shortcode_atts(array(
    	"class" => ''
    	), $atts));
    do_shortcode($content);

    $columns ="<div class='row-fluid $class'>";
    foreach ($column_new_array as $key => $item) {
    	$columns.="<div class='span".$item['col']."'>".$item['content']."</div>";
    }
    $columns.="</div>";
    return $columns;
}

add_shortcode('column_item', 'columnItemShortcode');
function columnItemShortcode($atts, $content = null)
{
    extract(shortcode_atts(array(
        "col" => 'span12',
        "class"=>''
    ), $atts));
    global $column_new_array;
    $column_new_array[] = array("col" => $col , "content" => do_shortcode($content));
}

// Tabs
$tab_new_array = array();
$tab_new_array_drop = array();
add_shortcode('tabs', 'tabsShortcode');
function tabsShortcode($atts, $content = null)
{
    global $tab_new_array;
    global $tab_new_array_drop;
    $tab_new_array = array();
    $tab_new_array_drop = array();
    extract(shortcode_atts(array(
		"position"		=> 'top',
		"class"			=> ''
	), $atts));

    do_shortcode($content);
    $id = rand();
    $num = count($tab_new_array);
	if($position=='bottom'){
		$tab_title = '<div class="tabbable tabs-below '.$class.'"><div class="tab-content">';
	    for($i =0 ; $i< $num; $i++){
	        $a = ($i == 0)? "in active":"";
	        $tab_title .= '<div class="tab-pane fade '.$a.'" id="st_tabst'.$id.$i.'"><div class="tab-pane-ct">'.$tab_new_array[$i]['content'].'</div></div>';
	    }
	    $tab_title .= '</div><ul id="st_tabst" class="nav nav-tabs">';
	    for($i =0 ; $i< $num; $i++){
	    	if($i==0)
	        	$tab_title .= '<li class="active"><a href="#st_tabst'.$id.$i.'">'.$tab_new_array[$i]['title'].'</a></li>';
	        else
	        	$tab_title .= '<li><a href="#st_tabst'.$id.$i.'">'.$tab_new_array[$i]['title'].'</a></li>';
	    }
	    $tab_title .= '</ul>';
	    $tab_title    .= '</div>';
	}else{
		if($position=='left') $class='tabs-left';
		else if($position=='right') $class='tabs-right';
		else $class="tabs-top";

		$tab_title = '<div class="tabbable '.$class.'"><ul id="st_tabst" class="nav nav-tabs">';
	    for($i =0 ; $i< $num; $i++){
	    	if(is_array($tab_new_array[$i]['content'])){
	    		$tab_title.='<li class="dropdown '.(($i==0)?'active':'').'">';
	    			$tab_title.='<a href="#" class="dropdown-toggle" data-toggle="dropdown">'.$tab_new_array[$i]['title'].'<b class="caret"></b></a>';
	    			$tab_title.='<ul class="dropdown-menu">';
	    			foreach($tab_new_array[$i]['content'] as $keydrop => $tab_drop){
                    	$tab_title.='<li '.(($i==0&&$keydrop==0)?'class="active"':'').'><a href="#st_tabst_drop'.$id.$keydrop.'" data-toggle="tab">'.$tab_drop['title'].'</a></li>';
	    			}
                    $tab_title.='</ul>';
	    		$tab_title.='</li>';
	    	}else{
		        if($i==0)
		        	$tab_title .= '<li class="active"><a data-toggle="tab" href="#st_tabst'.$id.$i.'">'.$tab_new_array[$i]['title'].'</a></li>';
		        else
		        	$tab_title .= '<li><a href="#st_tabst'.$id.$i.'" data-toggle="tab">'.$tab_new_array[$i]['title'].'</a></li>';
		    }
	    }
	    $tab_title .= '</ul>';

	    $tab_title .= '<div class="tab-content">';
	    for($i =0 ; $i< $num; $i++){
	    	if(is_array($tab_new_array[$i]['content'])){
	    		foreach($tab_new_array[$i]['content'] as $keydrop => $tab_drop){
	    			$a = ($i == 0&&$keydrop==0)? "in active":"";
	    			$tab_title .= '<div class="tab-pane fade '.$a.'" id="st_tabst_drop'.$id.$keydrop.'"><div class="tab-pane-ct">'.$tab_drop['content'].'</div></div>';
	    		}
	    	}else{
		        $a = ($i == 0)? "in active":"";
		        $tab_title .= '<div class="tab-pane fade '.$a.'" id="st_tabst'.$id.$i.'"><div class="tab-pane-ct">'.$tab_new_array[$i]['content'].'</div></div>';
		    }
	    }
	    $tab_title    .= '</div></div>';
	}
    return $tab_title;
}
add_shortcode('tabst_item', 'tabstItemShortcode');
function tabstItemShortcode($atts, $content = null)
{
    extract(shortcode_atts(array(
        "title" => '',
        "class" => ''
    ), $atts));
    global $tab_new_array;
    global $tab_new_array_drop;
    $tab_new_array_drop = array();
    do_shortcode($content);
    if(count($tab_new_array_drop)>0){
    	$tab_new_array[] = array("title" => $title , "content" => $tab_new_array_drop);
	}else{
		$tab_new_array[] = array("title" => $title , "content" => do_shortcode($content));
	}
}

add_shortcode('tabst_item_drop','tabstItemDropShortcode');
function tabstItemDropShortcode($atts,$content=null){
	 extract(shortcode_atts(array(
        "title" => '@hello',
        "class" => ''
    ), $atts));
    global $tab_new_array_drop;
    $tab_new_array_drop[] = array("title"=>$title,"content"=>do_shortcode($content));
}

# Vimeo Block
add_shortcode('vimeo', 'vimeoShortcode');
function vimeoShortcode($atts, $content = null)
{
	extract(shortcode_atts(array(
		"height" => '300',
		"width"  => '400',
		"class"  => ''
	), $atts));
	preg_match('/http:\/\/vimeo.com\/(\d+)$/', $content, $id);
	
	$vimeo = '<div class="js-video">';
	$vimeo = $vimeo . '<iframe src="http://player.vimeo.com/video/' . $id[1] . '?title=0&amp;byline=0&amp;portrait=0" width="' . $width . '" height="' . $height . '" ></iframe>';
	$vimeo = $vimeo . '</div>';

	return $vimeo;
}


# Youtube
add_shortcode('youtube', 'youtubeShortcode');
function youtubeShortcode($atts, $content = null)
{
	extract(shortcode_atts(array(
		"height" => '300',
		"width"  => '400',
		"class"  => ''
	), $atts));

	preg_match('/[\\?\\&]v=([^\\?\\&]+)/', $content, $id);
	$youtube = '<div class="js-video" >';
	$youtube = $youtube . '<iframe src="http://www.youtube.com/embed/' . $id[1] . '?wmode=transparent" width="100%" height="100%"></iframe>';
	$youtube = $youtube . '</div>';
	return $youtube;
}


