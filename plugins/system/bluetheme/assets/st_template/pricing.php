<?php
defined('_JEXEC') or die;
$description = explode('|', $description);
?>
<div class="single-table wow zoomIn <?php echo $class;?> " data-wow-duration="700ms" data-wow-delay="300ms">
    <h2><?php echo $title;?></h2>                           
	<p class="price"><span class="dollar-icon"><?php echo $unit;?></span><span><?php echo htmlspecialchars_decode($price);?></span> <?php echo $time;?></p>
    <ul>
         <?php foreach($description as $value): ?>
    	<li>
    		<p><?php echo $value;?></p>
    	</li>
    	<?php endforeach?>
    </ul>
    <a href="<?php echo $link_button;?>" class="btn-signup"><?php echo $text_button;?></a>
</div>
