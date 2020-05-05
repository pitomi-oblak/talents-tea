<?php defined('_JEXEC') or die;

?>
<section class="sercice_wrap content_pb" <?php if (!empty($bg_image)) echo 'style="background-image: url('.JUri::root().$bg_image.');"'; ?>>
    <div class="container">
        <div class="row content_pb">
            <?php if(!empty($title)): ?>
            <div class="col-md-12 content_pt content_pb">
                <div class="<?php echo $hclass; ?> wow">
            	<h1><?php echo $title; ?></h1>
            </div>
            </div>
            <?php endif; ?>
    		<?php
    		if(isset($items)) :
    			foreach($items as $key=>$value):
    				$extra_fields = json_decode($value->extra_fields);
    				
    				?>
    				<div class="col-md-3 <?php echo 'btservice-'.$key; ?> mb <?php if($animate){if ($key == 0) {echo 'wow fadeInLeftBig';}elseif  ($key == (count($items)-1)){echo 'wow fadeInRightBig';}elseif ($key%2 == 0){echo 'wow fadeInRight';}else{echo 'wow fadeInLeft';}} ?>">
                        <div class="services_box text-center">
                            <div class="services_icon">
                                <div class="icon_first icon_image" <?php if (!empty($extra_fields[0]->value)) echo 'style="background-image: url('.urldecode(JUri::base().$extra_fields[0]->value).');"'; ?>></div>
                                <style type="text/css">
                                div.<?php echo 'btservice-'.$key; ?> .services_box:hover .services_icon div{
                                    background-image: url('<?php echo JUri::base().$extra_fields[1]->value; ?>') !important;
                                }
                                </style>
                            </div>
                            <div class="services_content">
                                <h1><?php echo $value->title; ?></h1>
    
                                <?php echo $value->introtext ?>
                            </div>
                        </div>
                    </div>	
    			
    			<?php endforeach ;
            endif; ?>
        </div>
    </div>
</section>
        