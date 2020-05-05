<?php 
defined('_JEXEC') or die;
?>
<!-- thumb-carousel : starts -->
<?php

$random = rand();
$items = count($ig_new_array);
$d = 3;
?>
<div id="carousel-wrapper">
		<div id="home-carousel" class="carousel slide carousel-fade" data-ride="carousel">
			<div class="container">
				<div class="carousel-arrows">
					<a class="home-carousel-left" href="#home-carousel" data-slide="prev"><i class="fa fa-angle-left"></i></a>
					<a class="home-carousel-right" href="#home-carousel" data-slide="next"><i class="fa fa-angle-right"></i></a>
				</div>
			</div>
			<div class="carousel-inner">
				<?php $i = 0; foreach($ig_new_array as $key=>$item):
                    $i++;
                    $btactive = "";
                    if ($key == 0) $btactive = 'active'; 
                    
                ?>
                <div class="item <?php echo $btactive;?>" style="background-image: url(<?php echo trim($item['content']); ?>)">
					<div class="carousel-caption container">
						<h1 class="animated fadeInUpBig"><?php echo $item['title'];?></h1>
						<h2 class="animated zoomIn"><?php echo $item['stitle'];?></h2>
						<p class="animated fadeInDownBig"><?php echo urldecode($item['desc']);?></p>
					</div>					
				</div>
				<?php endforeach; ?>			
			</div>			
        </div>
</div>
