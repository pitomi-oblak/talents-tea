<?php 
defined('_JEXEC') or die;
//https://vimeo.com/45830194
?>
<div class="st-vimeo <?php echo $class; ?>" style="width:<?php echo $width; ?>px;height:<?php echo $height; ?>px;" >
	<iframe class="videoembed" src="<?php echo trim($content); ?>?title=<?php echo $title;?>&amp;byline=<?php echo $byline;?>&amp;portrait=<?php echo $portrait;?>&amp;autoplay=<?php echo $autoplay;?>&amp;loop=<?php echo $loop;?>&amp;badge=<?php echo $badge;?>&amp;color=<?php echo $color;?>" width="<?php echo $width; ?>" height="<?php echo $height; ?>" ></iframe>
</div>
