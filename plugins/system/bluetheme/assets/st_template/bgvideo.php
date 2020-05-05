<?php 

defined('_JEXEC') or die;
JHtml::_('script', 'plugins/system/bluetheme/assets/js/device.min.js');
JHtml::_('script', 'plugins/system/bluetheme/assets/js/okvideo.js');
$js = '	jQuery(function ($) {
    if( !device.tablet() && !device.mobile() ) {

			/* plays the BG Vimeo or Youtube video if non-mobile device is detected*/ 
			$.okvideo({ source: \''.$id.'\', 
		                    autoplay:true,
		                    loop: true,
		                    highdef:true,
		                    hd:true, 
		                    adproof: true,
		                    volume:'.$volume.' 
		                 });
						
		} else {
			
			/* displays a poster image if mobile device is detected*/ 
			$(\'.intro-video-bg\').addClass(\'poster-img\');
			
		}
   		
        
   
});';
JFactory::getDocument()->addScriptDeclaration($js);
?>

<!-- page-section : starts -->
<section id="intro" class="intro">
	<!-- inner-section : starts -->
	<section class="inner-section">

		<!-- container : starts -->
		<section class="container">
			<div class="row">
				<article class="col-md-12 text-left">
					<div class="intro-07-headletters full-height pad-common text-center">
						<div class="valign">
                        <?php if(!empty($imagelink)) : ?>
						<img alt="" title="" src="<?php echo JURI::base(true).$imagelink;?>"/>
                        <?php endif;?>
						<h3 class="intro-07-sub-heading white-text"><span><?php echo (!empty($title)? $title : '' ) ;?></span></h3>
						</div>
					</div>
				</article>
			</div>
		</section>
		<!-- container : ends -->

        	</section>
	<!-- inner-section : ends -->
</section>
<!-- page-section : ends -->
