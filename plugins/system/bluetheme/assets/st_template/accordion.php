<h2><?php echo $title;?></h2>
<div class="accordion-box <?php echo $hclass; ?>">
        <?php foreach($tab_new_array as $key=>$item): ?>
		<div class="accord-elem <?php if($key ==0) echo 'active';?>">
			<div class="accord-title">
				<h3><?php echo $item['title']; ?></h3>
				<a class="accord-link" href="#"></a>
			</div>
			<div class="accord-content">
			<?php echo do_shortcode($item['content']); ?>	
            </div>
		</div>
        <?php endforeach; ?>
</div>
