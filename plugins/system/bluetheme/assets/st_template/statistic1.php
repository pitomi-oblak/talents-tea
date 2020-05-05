<?php 
defined('_JEXEC') or die;
?>
<!-- thumb-carousel : starts -->
<?php

$random = rand();
$items = count($ig_new_array);
?>
<section class="<?php echo $class; ?>" <?php if ($bg_image != 'undefined') echo 'style="background-image: url('.JUri::root().$bg_image.');"'; ?>>
    	<div class="container">
    		<div class="row">
                <?php if($show_title == 'true'): ?>
    			<div class="col-md-12 <?php echo $hclass; ?>">
    				<h1><?php echo $title; ?></h1>
    			</div>
                <?php endif; ?>
                <?php
    foreach($ig_new_array as $k=>$item){
        //var_dump($item);
    ?>
                <div class="col-md-3 content_pt mb wow <?php if ($k == 0) {echo 'fadeInLeftBig';}elseif  ($k == (count($ig_new_array)-1)){echo 'fadeInRightBig';}elseif ($k%2 == 0){echo 'fadeInRight';}else{echo 'fadeInLeft';} ?>">
                    <div class="fun_facts_item text-center">
                        <div class="fun_facts_img">
                            <img src="<?php echo JString::ltrim(urldecode($item['content'])); ?>" alt="icon">
                        </div>
                        <div class="fun_facts_content">
                            <h1><?php echo urldecode($item['number']); ?></h1>
                            <p><?php echo urldecode($item['title']); ?></p>
                        </div>
                    </div>
                </div>
                
    <?php } ?>
            </div>
        </div>
</section>
