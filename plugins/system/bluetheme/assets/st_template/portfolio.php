<?php 
//$app = JFactory::getApplication();
//$doc = JFactory::getDocument();
//$menu = $app->getMenu();
//$item = $menu->getItem( $menuid );
//$menu_link = JRoute::_($item->link.'&Itemid='.$menuid);
$c_columns = '24.97%';
if ($columns == 2){ 
    $c_columns = '49.97%';}
elseif ($columns == 3){ 
    $c_columns = '33.37%';
    
}elseif($columns == 6){
    $c_columns = '19.97%';
}else{
    $c_columns = '24.97%';
}
?>
<div id="recent-works" class="padding-top padding-bottom off-white">
	<div class="container">
		<div class="row text-center section-title">
			<div class="col-sm-6 col-sm-offset-3">
				<h3 class="wow fadeInDown" data-wow-duration="700ms" data-wow-delay="300ms"><?php echo $title; ?></h3>
				<hr class="title-border">
				<p class="wow fadeInUp" data-wow-duration="700ms" data-wow-delay="300ms">
                <?php echo htmlspecialchars_decode($description); ?>
                </p>
			</div>				
		</div>
	</div>
	<div class="portfolio-wrapper wow fadeInUp" data-wow-duration="700ms" data-wow-delay="300ms">
		<ul class="filter text-center">  			
			<li><a class="active" href="#" data-filter="*">All</a></li>	
      
            <?php if(isset($tags) && count($tags)): foreach($tags as $key=> $tag): ?>
            <li><a href="#" data-filter=".<?php echo strtolower(str_replace(" ","_",$tag)); ?>"><?php echo $tag;?></a></li>
    	   <?php endforeach; endif; ?>
    	  
		</ul><!--/#portfolio-filter-->
		
		<ul class="portfolio-items">
			<?php
    		if(isset($catItems) && count($catItems)) :
                foreach($catItems as $key=> $item):						
                    $tag_name = array();
                	$itemTags = $K2ModelItem->getItemTags($item->id);
                	if(isset($itemTags) && count($itemTags)) {
                		foreach ($itemTags as $itm=>$tag_item) {
                            $tName = str_replace(" ", "_", $tag_item->name);
                            $tag_name[] = strtolower($tName);
                        }
                	}
                    // extra fields
                	$extraFields = json_decode($item->extra_fields);
                    // filter
                    $filter = implode(" ", $tag_name);
                    //image
                    $image_normal = 'media' . '/' . 'k2' . '/'  . 'items' . '/'  . 'cache' . '/'  . md5("Image" . $item->id) . '_M.jpg';
                    $image_full = 'media' . '/' . 'k2' . '/'  . 'items' . '/'  . 'cache' . '/'  . md5("Image" . $item->id) . '_L.jpg';
                    $link = 'index.php?option=com_k2&amp;view=item&amp;id='.$item->id.':'.$item->alias ;
            ?>
            <li class="<?php echo $filter; ?>" style="<?php echo $c_columns;?>">
				<div class="portfolio-content">
					<img class="img-responsive" src="<?php echo $image_normal; ?>" alt="">
					<div class="overlay">								
						<a class="folio-detail" href="<?php echo $image_full; ?>" data-gallery="prettyPhoto"><i class="fa fa-camera"></i></a>
						<h2><?php echo $item->title; ?></h2>
						<?php echo $item->introtext;?>
						<a class="folio-link" href="<?php echo $link;?>"><i class="fa fa-long-arrow-right"></i></a>
					</div>
				</div>	
			</li>
            <?php endforeach; endif; ?>
        </ul>
    </div>
</div>
