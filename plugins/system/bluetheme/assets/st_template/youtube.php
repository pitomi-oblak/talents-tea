<?php 
defined('_JEXEC') or die;
?>
<div class="st-youtube <?php echo $class; ?>" style="max-width:<?php echo $width; ?>px;height:<?php echo $height; ?>px;" >
	<iframe class="videoembed" src="http://www.youtube.com/embed/<?php echo $id[1]; ?>?wmode=transparent<?php echo (($autoplay)? '&amp;autoplay=1' :'');?><?php echo (($loop)? '&amp;loop=1' :'');?><?php echo ((isset($hidecontrols))? '&amp;controls='.$hidecontrols :'');?>" width="<?php echo $width; ?>" height="<?php echo $height; ?>" ></iframe>
</div>
