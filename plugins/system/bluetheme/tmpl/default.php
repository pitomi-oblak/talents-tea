<?php
/**
 * ------------------------------------------------------------------------
 * ST Typo Plugin for J25 & J30
 * ------------------------------------------------------------------------
 * Copyright (C) 2013 cmsbluetheme All Rights Reserved.
 * @license - GNU/GPL, http://www.gnu.org/licenses/gpl.html
 * Author: cmsbluetheme
 * Author Email: contact.bluetheme@gmail.com
 * Websites: http://www.cmsbluetheme.com
 * ------------------------------------------------------------------------
 */
defined('_JEXEC') or die('Restricted access');

	$base_url = JURI::base();
	
	$app = JFactory::getApplication();	
	if($app->isAdmin()) {
		$base_url = dirname ($base_url);
	}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" href="<?php echo $base_url;?>/plugins/system/bluetheme/assets/style.css" type="text/css" />
<script type="text/javascript" src="<?php echo $base_url;?>/media/system/js/mootools-core.js"></script>

<title>CMSBluetheme Typography style</title>
</head>
<body>
<?php
	$file = dirname(dirname (__FILE__)).DS.'tmpl'.DS.'default.html';
	$html = file_get_contents ($file);
	if (preg_match ('/<body[^>]*>(.*)<\/body>/s', $html, $matches)) $html = $matches[1];
	//add typo css
	
	
?>

<div id="st-typo-wrap">
<?php echo $html?>
</div>	
<script type="text/javascript">
window.addEvent ('load', function () {
	var STTypo = new Class ({
		initialize: function(options) {
			this.wrapper = $('st-typo-wrap');
			if (!this.wrapper) return;
			this.typos = this.wrapper.getElements ('.typo');
			this.typos.addEvents ({
				'click': function (){
					var sample = this.getElement ('.sample');
					var html = sample.innerHTML;
					window.parent.insertTypoHTML(html.trim());
					console.log(this);
					window.parent.SqueezeBox.close();		
				}
			});		
		}
	});
	new STTypo();
});
window.parent.LoadJSEditor();
</script>
</body>
</html>
