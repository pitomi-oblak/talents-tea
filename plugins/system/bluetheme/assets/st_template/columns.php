<?php 
defined('_JEXEC') or die;
?>
<?php if($class!="" || $id!=""){ ?>
	<div <?php if ($id != '') echo 'id="'.(($id!="")?$id:"").'"'; ?> data-animate="<?php echo $animate; ?>" class=" <?php echo $class; ?>" <?php if (!empty($bg)) echo 'style="background-image: url('.JUri::root().$bg.')"'; ?>>
<?php } ?>
<?php if(!$fullwidth && !$st->checkSidebar()){ ?>

	<div class="container  <?php echo $cclass; ?>" <?php if ($cid != '') echo 'id="'.(($cid!="")?$cid:"").'"'; ?>>
<?php } ?>
<?php if(!empty($title) ){ ?>
    <div class="row text-center section-title">
        <div class="col-sm-6 col-sm-offset-3 ">
            <?php if ($htag == 'h1'){ ?>
                <h1 class="wow fadeInDown <?php echo $heading; ?>" data-wow-duration="700ms" data-wow-delay="300ms"><?php echo $title; ?></h1>
                <hr class="title-border">
            <?php }elseif($htag == 'h2'){ ?>
                <h2 class="wow fadeInDown <?php echo $heading; ?>" data-wow-duration="700ms" data-wow-delay="300ms"><?php echo $title; ?></h2>
                <hr class="title-border">
            <?php }elseif($htag == 'h3'){?>
                <h3 class="wow fadeInDown <?php echo $heading; ?>" data-wow-duration="700ms" data-wow-delay="300ms"><?php echo $title; ?></h3>
                <hr class="title-border">
            <?php }else{ ?>
                <h1 class="wow fadeInDown <?php echo $heading; ?>" data-wow-duration="700ms" data-wow-delay="300ms"><?php echo $title; ?></h1>
                <hr class="title-border">
            <?php } ?>
            <?php if($sdesc != ''): ?>
                <p class="wow fadeInUp" data-wow-duration="700ms" data-wow-delay="300ms"><?php echo $sdesc; ?></p>
            <?php endif;?>
        </div>
    </div>
<?php } ?>
<div class='row skill-flex' style="padding: <?php echo $cpadding; ?>;">
	<?php foreach($column_new_array as $key => $item){  ?>
		<div data-wow-duration="700ms" data-wow-delay="600ms" class='<?php echo $item['col']; ?> <?php echo $item['class']; ?>'>
        <?php echo do_shortcode($item['content']); ?>
        </div>
	<?php } ?>
</div>
<?php if(!$fullwidth && !$st->checkSidebar()){ ?>
</div>
<?php } ?>
<?php if($class!="" || $id!=""){ ?>
</div>
<?php } ?>