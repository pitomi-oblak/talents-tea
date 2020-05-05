<?php
defined('_JEXEC') or die;
?>
<div class="skills-progress">
	<p><?php echo $title;?> <span><?php echo $percent;?>%</span></p>
	<div class="meter nostrips wp">
		<span style="width: <?php echo $percent;?>%"></span>
	</div>
 </div>