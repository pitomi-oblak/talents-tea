<?php defined('_JEXEC') or die;
$d = 4;
?>
<?php if($full){ ?>
<section id="service" class="sercice_wrap content_pt content_pb" <?php if (!empty($bg_image)) echo 'style="background-image: url('.JUri::root().$bg_image.');"'; ?>>
    <div class="container">
        <div class="row content_pt content_pb">
            <?php if(!empty($title)): ?>
            <div class="col-md-12 content_pt content_pb">
                <div class="<?php echo $hclass; ?> wow">
                	<h2><?php echo $title; ?></h2>
                    <h3><?php echo $description; ?></h3>
                </div>
            </div>
            <div class="clear"></div>
            <?php endif; ?>
<?php } ?>
            <div id="services_slider" class="carousel slide" data-ride="carousel"> 
            <div class="carousel-inner">
    		<?php
    		if(isset($items)) :
    			$i = 0;
                foreach($items as $key=>$value):
    				$extra_fields = json_decode($value->extra_fields);
                    $active = '';
                    if($key ==0) $active = 'active';
    				$i++;
                    if ($i == 1){
                        
                       echo '<div class="item '.$active.'">';
                    }
    				?>
                    
    				<div class="col-md-3 <?php echo 'btservice-'.$key; ?> mb <?php if($animate){if ($key == 0) {echo 'fadeInLeft';}elseif  ($key == (count($items)-1)){echo 'fadeInRight';}elseif ($key%2 == 0){echo 'fadeInRight';}else{echo 'fadeIn';}} ?>">
                        <div class="services_box text-center">
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
                    </div>	
    			    <?php 
                    if ($key == (count($items)-1)){
                        echo '</div>';break;
                    }
                    if ($i == $d){echo '</div>';;$i =0;} ?>
    			<?php endforeach ;
            endif; ?>
            </div>
            </div>
            <div class="col-md-12 text-center services_slider_arrow content_pt mb">
                <a class="left" href="#services_slider" data-slide="prev"></a>
                <a class="right" href="#services_slider" data-slide="next"></a>
            </div>
            <?php if($full){ ?>
        </div>
    </div>
</section>
<?php } ?>
        