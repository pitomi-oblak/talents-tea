<?php 
defined('_JEXEC') or die;
JHtml::_('script', 'http://maps.google.com/maps/api/js?sensor=true');
JHtml::_('script', 'plugins/system/bluetheme/assets/js/jquery.ui.map.min.js');
?>
<div class="box-section map-section triggerAnimation animated" data-animate="flipInX">
<h2><?php echo $title;?></h2>
<div id="map_canvas" class="map rounded <?php echo $class; ?>" style="width:100%;height:<?php echo $height; ?>px;"></div>
</div>
<?php  
	$js = 	"jQuery(document).ready(function($) {
				var stmapdefault = '{$latitude},{$longitude}';
				var marker = {position:stmapdefault}
				$('#map_canvas').gmap({
					'zoom': $zoom ,
					'center': stmapdefault,
					'mapTypeId':google.maps.MapTypeId.{$maptype}  ,
					'callback': function() {
						var self = this;
						self.addMarker(marker).click(function(){
							self.openInfoWindow({'content': '{$location}'}, this);
						});
					},
					panControl: $pancontrol,
					zoomControl: $zoomcontrol,
					mapTypeControl: $maptypecontrol,
					streetViewControl: $streetcontrol,
					scrollwheel:$scrollwheel
				});	

				$(window).resize(function(){
					var stct = new google.maps.LatLng('{$latitude}','{$longitude}');
					$('#map_canvas').gmap('option', 'center', stct);
				});	
			});
			
		";
	$st->doc->addScriptDeclaration($js);
?>

