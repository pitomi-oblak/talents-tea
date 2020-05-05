<?php 
defined('_JEXEC') or die;
/*
	$content :    
	$class :
	$title :...
	$ico :
*/
?>
<div class="alert <?php echo $type; ?> alert-dismissable">
  <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
  <?php echo do_shortcode($content); ?>
</div>