<?php
defined('_JEXEC') or die;
?>
<form action="index.php?option=com_blue_pagebuilder&task=page.demo" method="post" name="adminForm" id="newpage" class="form-validate form-horizontal">
	<div class="control-group">
		<div class="control-label"><label>Name :</span></label></div>
		<div class="controls"><input type="text" name="pagename" id="pagename" required="required" /></div>
	</div>
</form>

<script type="text/javascript">
	jQuery(document).ready(function(){
		jQuery('#toolbar-save').hide();
		jQuery('#toolbar-cancel').click(function(){
			window.location="index.php?option=com_blue_pagebuilder";
		});
		jQuery('#toolbar-apply').click(function(){
			if(jQuery('#pagename').val()==""){
				alert('Name is not empty!');
				jQuery('#pagename').addClass("invalid").focus();
			}else{
				jQuery('#newpage').submit();
			}
		});
	})
</script>