<?php
defined('_JEXEC') or die;
$description = explode('|', $description);
?>
<div class="pricing_table2">
    <div class="pricing_table2_head text-center">
        <h1><?php echo $title;?></h1>

        <span class="montg"><?php echo $time;?></span>
        <span class="rate"><?php echo $price;?></span>
    <div class="clear"></div>
    </div>

    <div class="pricing_table2_content">
        <ul>
            <?php foreach($description as $value): ?>
			<li><?php echo $value;?></li>
		<?php endforeach?>
        </ul>
    </div>

    <div class="pricing_table2_button text-center">
        <a href="<?php echo $link_button;?>" class="button"><?php echo $text_button;?></a>
    </div>
</div>