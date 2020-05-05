<?php 
defined('_JEXEC') or die;
/*


*/
?>
<div class="st-article-box <?php echo $class; ?>">
	<div class="image">
	<?php if($type=='inside'){ ?>
		<a href="<?php echo $linkreadmore; ?>">
			<img src="<?php echo $linkimage; ?>" style="width:100%;" alt="">
			<div class="stmark-1">
				<h2><?php echo $item->title; ?></h2>
				<?php echo do_shortcode($item->introtext); ?>
				<a href="<?php echo $linkreadmore ?>" class="st-button">Read More</a>
			</div>
		</a>
	</div>
	<?php }else{ ?>
		<a href="<?php echo $linkimagefull; ?>" class="stmodal">
			<img src="<?php echo $linkimage; ?>" alt="" style="width:100%;">
			<div class="stmark"></div>
		</a>
	</div><!-- div.image -->
	<h3><?php echo $item->title; ?></h3>
	<?php echo do_shortcode($item->introtext); ?>
	<div class="readmore">
		<a class="st-button" href="<?php echo $linkreadmore; ?>">Read More</a>
	</div>
	<?php } ?>
</div>
