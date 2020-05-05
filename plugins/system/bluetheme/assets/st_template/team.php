<?php
defined('_JEXEC') or die;
$d = 4;
?>
<div class="container">
<div <?php echo $sid; ?> class="our-team padding-bottom wow zoomIn <?php echo $sclass; ?>" data-wow-duration="500ms" data-wow-delay="300ms" <?php if (!empty($bg)) echo 'style="background-image: url('.JUri::root().$bg.');"'; ?>>
	<h2 class="text-center heading"><?php echo $title; ?></h2>
    <?php echo htmlspecialchars_decode($description); ?>
	<div id="team-carousel" class="carousel slide" data-ride="carousel">
		<a class="team-carousel-left" href="#team-carousel" data-slide="prev"><i class="fa fa- fa-chevron-left"></i></a>
		<a class="team-carousel-right" href="#team-carousel" data-slide="next"><i class="fa fa- fa-chevron-right"></i></a>
		<div class="carousel-inner">
			
                    <?php $i = 0; if (is_array($items)): foreach($items as $key=>$item): ?>
                    <?php 
                    //image
                    $image_normal = 'media' . '/' . 'k2' . '/'  . 'items' . '/'  . 'cache' . '/'  . md5("Image" . $item->id) . '_M.jpg';
                    $image_full = 'media' . '/' . 'k2' . '/'  . 'items' . '/'  . 'cache' . '/'  . md5("Image" . $item->id) . '_L.jpg';
                    $link = 'index.php?option=com_k2&amp;view=item&amp;id='.$item->id.':'.$item->alias.'&Itemid='.$menuid ;
                    $i++;
                    $btactive = "";
                    if ($key == 0) $btactive = 'active'; 
                    if ($i == 1){
                        
                       echo '<div class="item '.$btactive.'">
    							<div class="row">';
                    }
                    ?>
					<div class="col-sm-3">
						<div class="team-member">
							<div class="member-image">
								<img class="img-responsive" src="<?php echo $image_normal;?>" alt="<?php echo $item->title;?>">
							</div>
							<div class="overlay">
								<h4><?php echo $item->title;?></h4>
								<?php echo $item->introtext;?>
							</div>
						</div>							
					</div>
                    <?php 
                    if ($key == (count($items)-1)){
                        echo '</div></div>';break;
                    }
                    if ($i == $d){echo '</div></div>';$i =0;} ?>
					<?php endforeach;endif; ?>
									
		</div>
	</div>				
</div><!--/our-team--> 

</div>
