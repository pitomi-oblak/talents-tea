<!-- portfolio section
	================================================== -->
<div class="portfolio-box fullscreen-masonry">
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
        <div class="project-post">
    		<img src="<?php echo $image_normal; ?>" alt="">
    		<div class="hover-box">
    			<a class="page" href="<?php echo $link ;?>"><i class="fa fa-file-o"></i></a>
    			<a class="zoom" href="<?php echo $image_full; ?>"><i class="fa fa-search"></i></a>
    		</div>	
    	</div>
    <?php endforeach;endif; ?>  
</div>
