<?php
/**
 * @package AkeebaBackup
 * @copyright Copyright (c)2009-2016 Nicholas K. Dionysopoulos
 * @license GNU General Public License version 3, or later
 *
 * @since 1.3
 */

defined('_JEXEC') or die();

?>
<div id="dialog" title="<?php echo JText::_('FSFILTER_ERROR_TITLE') ?>">
</div>

<div class="alert alert-info">
	<strong><?php echo JText::_('COM_AKEEBA_CPANEL_PROFILE_TITLE'); ?></strong>
	#<?php echo $this->profileid; ?> <?php echo $this->profilename; ?>
</div>

<div class="form-inline well">
	<div>
		<label><?php echo JText::_('COM_AKEEBA_FILEFILTERS_LABEL_ROOTDIR') ?></label>
		<span><?php echo $this->root_select; ?></span>
		<button class="btn btn-danger" onclick="akeeba.Fsfilters.nuke(); return false;">
			<i class="icon-fire icon-white"></i>
			<?php echo JText::_('COM_AKEEBA_FILEFILTERS_LABEL_NUKEFILTERS'); ?>
		</button>
		<a class="btn btn-small" href="index.php?option=com_akeeba&view=fsfilter&task=tabular">
			<i class="icon-list"></i>
			<?php echo JText::_('COM_AKEEBA_FILEFILTERS_LABEL_VIEWALL')?>
		</a>
	</div>
</div>

<div id="ak_crumbs_container" class="row-fluid">
	<ul id="ak_crumbs" class="breadcrumb"></ul>
</div>


<div id="ak_main_container">
	<fieldset id="ak_folder_container">
		<legend><?php echo JText::_('COM_AKEEBA_FILEFILTERS_LABEL_DIRS'); ?></legend>
		<div id="folders"></div>
	</fieldset>

	<fieldset id="ak_files_container">
		<legend><?php echo JText::_('COM_AKEEBA_FILEFILTERS_LABEL_FILES'); ?></legend>
		<div id="files"></div>
	</fieldset>
</div>

<script type="text/javascript" language="javascript">
akeeba.jQuery(document).ready(function($){
	// Set the AJAX proxy URL
    akeeba.System.params.AjaxURL = '<?php echo AkeebaHelperEscape::escapeJS('index.php?option=com_akeeba&view=fsfilter&task=ajax') ?>';
	// Set the media root
    akeeba.Fsfilters.loadingGif = '<?php echo $this->mediadir ?>../icons/loading.gif';
	// Create the dialog
	$("#dialog").dialog({
		autoOpen: false,
		closeOnEscape: false,
		height: 200,
		width: 300,
		hide: 'slide',
		modal: true,
		position: 'center',
		show: 'slide'
	});
	// Create an AJAX error trap
    akeeba.System.params.errorCallback = function( message ) {
		var dialog_element = $("#dialog");
		dialog_element.html(''); // Clear the dialog's contents
		dialog_element.dialog('option', 'title', '<?php echo AkeebaHelperEscape::escapeJS(JText::_('COM_AKEEBA_CONFIG_UI_AJAXERRORDLG_TITLE')) ?>');
		$(document.createElement('p')).html('<?php echo AkeebaHelperEscape::escapeJS(JText::_('COM_AKEEBA_CONFIG_UI_AJAXERRORDLG_TEXT')) ?>').appendTo(dialog_element);
		$(document.createElement('pre')).html( message ).appendTo(dialog_element);
		dialog_element.dialog('open');
	};
	// Push translations
    akeeba.Fsfilters.translations['UI-ROOT'] = '<?php echo AkeebaHelperEscape::escapeJS(JText::_('COM_AKEEBA_FILEFILTERS_LABEL_UIROOT')) ?>';
    akeeba.Fsfilters.translations['UI-ERROR-FILTER'] = '<?php echo AkeebaHelperEscape::escapeJS(JText::_('COM_AKEEBA_FILEFILTERS_LABEL_UIERRORFILTER')) ?>';
<?php
	$filters = array('directories', 'skipfiles', 'skipdirs', 'files', 'directories_all', 'skipfiles_all', 'skipdirs_all',
	            'files_all', 'applytoalldirs', 'applytoallfiles');

	foreach($filters as $type)
	{
		echo "\takeeba.Fsfilters.translations['UI-FILTERTYPE-".strtoupper($type)."'] = '".
			AkeebaHelperEscape::escapeJS(JText::_('COM_AKEEBA_FILEFILTERS_TYPE_'.strtoupper($type))).
			"';\n";
	}
?>
	// Bootstrap the page display
	var data = eval(<?php echo AkeebaHelperEscape::escapeJS($this->json,"'"); ?>);
    akeeba.Fsfilters.render(data);
});
</script>