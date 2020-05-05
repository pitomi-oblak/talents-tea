<?php 
defined('_JEXEC') or die;
?>

<?php if($position=="style2"){ ?>
<div class="box-section vertical-tab-section triggerAnimation animated" data-animate="lightSpeedIn">
<?php if(!empty($title)): ?>
    <h2><?php echo $title; ?></h2>
    
    <?php endif; ?>
    <div class="vertical-tabs-box">
    	<ul class="nav nav-tabs" id="myTab">
    	<?php foreach($tab_new_array as $key=>$item){ ?>
    		<li class="<?php if($key ==0) echo 'active'; ?>">
    			<a href="#vtabs2-<?php echo $id.$key; ?>" data-toggle="tab"><?php echo $item['title']; ?></a>
    		</li>
    	<?php } ?>
    	</ul>
    	<div class="tab-content">
    	<?php foreach($tab_new_array as $key => $item){ ?>
    		<div class="tab-pane <?php if($key ==0) echo 'active'; ?>" id="vtabs2-<?php echo $id.$key; ?>">
    			<?php echo do_shortcode($item['content']); ?>
    		</div>
    	<?php } ?>
    	</div>
    </div>
</div>
<?php }else if($position=="style1"){ ?>
<!-- horizontal tab section 
				================================================== -->
<div class="box-section horizontal-tab-section triggerAnimation animated" data-animate="flipInX">
	<?php if(!empty($title)): ?>
    <h2><?php echo $title; ?></h2>
    <?php endif; ?>
	<div class="horizontal-tabs-box triggerAnimation animated" data-animate="bounceIn">
		<!-- Nav tabs -->
		<ul class="nav nav-tabs" id="myTab2">
            <?php foreach($tab_new_array as $key=>$item){ ?>
			<li class="<?php if($key ==0) echo 'active';?>"><a href="#resp-layout<?php echo str_replace(' ','_',$title).$key;?>" data-toggle="tab"><span><?php echo do_shortcode($item['title']); ?></span></a></li>
			<?php } ?>
        </ul>
        
		<div class="tab-content">
            <?php foreach($tab_new_array as $key=>$item){ ?>
			<div class="tab-pane <?php if($key ==0) echo 'active';?>" id="#resp-layout<?php echo str_replace(' ','_',$title).$key;?>">
				<?php echo do_shortcode($item['content']); ?>
            </div>
			<?php } ?>
		</div>
	</div>
</div>
<!-- End horizontal tab section -->

<?php }else if($position=="portfolio"){ ?>
<?php if(!empty($title)): ?>
<div class="<?php echo $hclass; ?>">
	<h1><?php echo $title; ?></h1>
</div>
<?php endif; ?>
            <div class="txtabs-wrap 0 services_filter text-center">
            	<ul class="txtabs-nav top clearfix wow fadeInLeftBig">
            		<?php foreach($tab_new_array as $key=>$item){ ?>
                        <li class="<?php if($key == 0) {echo 'first';}else{echo 'last';} ?> <?php if($key == 0) echo 'active'; ?>">
                            <a data-toggle="tab" class="filter<?php echo ($key+1); ?> <?php if($key == 0) echo 'active'; ?>" title="<?php echo $item['title']; ?>" data-target="#txmod_271-<?php echo $id.$key; ?>"></a>
                        </li>
            		<?php } ?>
            	</ul>
                <div class="txtabs-content fadeInUp wow">
            	<?php foreach($tab_new_array as $key => $item){ ?>
            		
                        <div id="txmod_271-<?php echo $id.$key; ?>" class="txtabs-pane <?php if($key == 0)echo'active in'; ?> fade-slide">
            			<?php echo do_shortcode($item['content']); ?>
                        </div>
            	<?php } ?>
            		</div>
              </div>
<?php } ?>