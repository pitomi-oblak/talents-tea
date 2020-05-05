<?php
defined('_JEXEC') or die;
$id = str_replace(' ','_',$title).rand(1,100);
?>
<div class="skill-bg">
<div class="skill-circle skill" id="<?php echo $id;?>" data-percent="<?php echo $percent;?>"><span class="skill-data"><?php echo $percent;?></span></div>
<h2><?php echo $title;?></h2>
<script type="text/javascript">

        jQuery(document).ready(function(){
            jQuery('#<?php echo $id;?>').easyPieChart( {
			barColor: '<?php echo $bg_image;?>',
			trackColor: '#f8a055',
			rotate: '0',
			lineCap: 'butt',
			scaleLength: '0',
			lineWidth: 32,
			size: 185
		});
        })
</script>
</div>