<div class="<?php echo $hclass; ?>">
<?php if (!empty($title)): ?>
<h1><?php echo $title; ?></h1>
<?php endif; ?>
</div>
<div class="why_choose_us1 accordion2">
<div class="accordion">
    <?php foreach($tab_new_array as $key=>$item): ?>
    <h3><?php echo $item['title']; ?></h3>
    <div class="accordion_content">
       <?php echo do_shortcode($item['content']); ?>
    </div>
    <?php endforeach; ?>

</div>  
<div class="clear"></div>                    
</div>