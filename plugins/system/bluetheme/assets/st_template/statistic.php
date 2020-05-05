<?php 
defined('_JEXEC') or die;
?>
<!-- thumb-carousel : starts -->
<?php
$random = rand();
$items = count($ig_new_array);
$columns = 3;
if ($items == 3) {$columns = 4;}
elseif ($items == 4) {$columns = 3;}
elseif ( $items == 2){$columns =6;}
elseif($items == 6) { $columns =2;}
else{$columns = $items;}
?>

<div id="<?php echo $sid; ?>" class="text-center parallax-section <?php echo $class; ?>" <?php if (!empty($bg_image) && $bg_image !='undefined') echo 'style="background-image: url('.JUri::root().$bg_image.');"'; ?>>
    <div class="parallax-content">
    <div class="container">
    <div class="row">
    
        <?php if(!empty($title)): ?>
        <div class="text-center wow zoomIn " data-wow-duration="700ms" data-wow-delay="300ms">
        	<h1><?php echo $title; ?></h1>
        	<p><?php echo htmlspecialchars_decode($hclass); ?></p>
        </div>
        
        <?php endif; ?>
        </div>
        <div class="row funs">	
            <?php
            foreach($ig_new_array as $k=>$item){
                //var_dump($item);
            ?>
            <div class="col-xs-<?php echo $columns;?> wow zoomIn" data-wow-duration="700ms" data-wow-delay="500ms">
				<?php if($item['show_image'] == 'true'): ?>
            		<img alt="<?php echo urldecode($item['title']); ?>" title="<?php echo urldecode($item['title']); ?>" src="<?php echo JUri::root().urldecode(trim($item['content'])); ?>" width="120" height="120"/>
                    <?php endif; ?>
                <i class="fa <?php echo urldecode($item['iconname']); ?>"></i>	
				<h2><?php echo urldecode($item['title']); ?></h2>
				<h3 class="timer"><?php echo urldecode($item['number']); ?></h3>						
			</div>
            
            <?php } ?>
        
        </div>
    </div>
    </div>
</div>
