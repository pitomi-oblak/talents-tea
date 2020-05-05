<?php

defined('_JEXEC') or die;
JHtml::_('behavior.tooltip');
JHtml::_('behavior.formvalidation');
if(STVersion!=2){
	JHtml::_('formbehavior.chosen','select');
}
?>
<div id="st-debug"></div>
<div class="st-design row-fluid">
	<div class="span2 st-items">
		<div class="st-title-layout"><strong><?php echo JText::_('COM_BLUE_PAGEBUILDER_TOOLBAR'); ?></strong></div>
		<ul id="draggable" class="sortable-list">
			<?php foreach($this->item as $item){ ?>
			<li  class="ui-state-highlight <?php echo $item->class; ?>" data-type="<?php echo $item->type; ?>" data="<?php echo rawurlencode($item->defaultcode); ?>">
				<div class="st-header-title">
					<span class="st-name"><?php echo $item->name; ?></span>
					<span href="#" class="st-close" title="Close"><i class="icon-cancel-circle "></i></span>
					<span href="#st-navigation" title="Edit" data-type="<?php echo $item->type; ?>" class="st-edit stmodal"><i class="icon-cog-2"></i></span>
					<?php if($item->type=='columns_desi' || $item->type=='tabs_desi'){  ?>
					<span class="st-hide"><i class="icon-new-window"></i></span>
					<?php }else{ ?>
					
					<?php } ?>
					<span href="#" class="st-duplicate" title="Duplicate"><i class="icon-copy"></i></span>
				</div>
			</li>
			<?php } ?>
		</ul>
	</div>
	<div class="span10 st-desi">
		<div class="st-title-layout">
			<span class="st-design-title">Drag and Drop Here!</span>
			<span class="config stmodal" href="#pageconfig" data-type="page-config"><i class="icon-cog-2"></i></span>
		</div>
		<ul id="st-page" class="sortable-list sortable">
			<?php foreach($this->design as $item){ ?>
			<li class="btn ui-state-highlight ui-draggable  <?php echo $item->class; ?>" data-type="<?php echo $item->type; ?>" data="<?php echo rawurlencode($item->json); ?>" style="display:block;">
				<div class="st-header-title">
					<span class="st-name"><?php echo $item->name; ?></span>
					<span href="#" class="st-close" title="Close"><i class="icon-cancel-circle "></i></span>
					<span href="#st-navigation" title="Edit" data-type="<?php echo $item->type; ?>" class="st-edit stmodal"><i class="icon-cog-2"></i></span>
					<?php
						if($item->type=='columns_desi' || $item->type=='tabs_desi'){
					?>
					<span class="st-hide"><i class="icon-new-window"></i></span>
					<?php }else{ ?>
					
					<?php } ?>
					<span href="#" class="st-duplicate" title="Duplicate"><i class="icon-copy"></i></span>
				</div>
			</li>
			<?php } ?>
		</ul>
	</div>
	<div id="st-save-eff">
		<div class="over-message">
			<i class="icon-spinner icon-spinning"></i>
			<div class="message">
				<i class="icon-checkmark-4"></i> Success
			</div>
		</div>
		<div class="over"></div>
	</div>
</div>
<div id="st-navigation" class="st-navigation"></div>
<?php 
$arrName ='{';
foreach($this->item as $key=>$item){
	if($key!=0)
		$arrName.=',';
	$arrName.='"'.$item->type.'":{"name":"'.$item->name.'","class":"'.$item->class.'","type":"'.$item->type.'"}';
}
$arrName.='}';
?>
<div id="st-arrName" data='<?php echo $arrName; ?>'></div>
<div class="namepage none">
	<div class="st-namepage form-horizontal">
		<div class="control-group">
		    <label class="control-label" for="inputNamepage"><?php echo JText::_('COM_BLUE_PAGEBUILDER_INPUTNAME'); ?>:</label>
		    <div class="controls">
				<input type="text" id="inputNamepage" placeholder="<?php echo JText::_('COM_BLUE_PAGEBUILDER_INPUTNAME'); ?>"
				value="<?php echo $this->name; ?>" >
		    </div>
	  	</div>
  	</div>
</div>
<div id="st-element" class="none">
	<div id="st-element-k2category">
	<?php echo $this->form->getInput('k2category'); ?>
	</div>
	
	<div id="st-element-modules">
	<?php echo $this->form->getInput('modules'); ?>
	</div>
	<div id="st-element-contents">
	<?php echo $this->form->getInput('contents'); ?>
	</div>
	<div id="st-element-k2contents">
	<?php echo $this->form->getInput('k2contents'); ?>
	</div>
	<div id="st-element-category">
	<?php echo $this->form->getInput('category'); ?>
	</div>
	<div id="st-element-map">
		<div class="map_canvas"></div>
		<input id="geocomplete" type="text" class="st-location" placeholder="Type in an address" size="90" />
		<input id="find1" type="button" class="btn" value="find" />
		<input id="reset" type="reset" class="btn" value="reset"/>
		<div class="row-fluid">
			<div class="span6">
				<label>Latitude</label>
				<input name="lat" class="st-latgmap" type="text" value="">
			</div>
			<div class="span6">
				<label>Longitude</label>
				<input name="lng" class="st-lnggmap" type="text" value="">
			</div>
		</div>
	</div>
	<div id="st-element-folders">
	<?php echo $this->folderList; ?>
	</div>
</div>
<div id="pageconfig" style="display:none;">
	<div class="st-nav-title">
		<i class="icon-cogs-2"></i> 
		Page Configs
	</div>
	<div class="st-nav-option st-column">
		<label>Author (SEO):</label>
		<div class="row-fluid">
			<input type="text" class="span12" id="page-author-config" value="<?php echo (!empty($this->configpage->author)? $this->configpage->author : 'ShineTheme'); ?>">
		</div>
		<label>ID:</label>
		<div class="row-fluid">
			<input type="text" class="span12" id="page-id-config" value="<?php echo (($this->configpage->id)? $this->configpage->id: ''); ?>">
		</div>
		<label>Class:</label>
		<div class="row-fluid">
			<input type="text" id="page-class-config" class="span12" value="<?php echo (($this->configpage->class)? $this->configpage->class : ''); ?>">
		</div>
		<label>Full Width:</label>
		<div class="row-fluid">
			<div id="page-fullwidth" class="st-radio">
				<label class="radio inline">
					<input type="radio"  class="span6"name="page-fullwidth" value="1" <?php echo ($this->configpage->fullwidth=='1')?'checked="checked"':"" ; ?>>Yes
				</label>
				<label class="radio inline">
					<input type="radio"  class="span6" name="page-fullwidth" value="0" <?php echo ($this->configpage->fullwidth=='0')?'checked="checked"':"" ; ?>>No
				</label>
			</div>
		</div>
		<div class="st-button-group">
			<button id="pageconfig-submit" class="btn btn-primary">Save</button>
		</div>
	</div>
</div>
<input type="hidden" id="stid" value="<?php echo $this->id; ?>">
<div class="btn-group" id="toolbar-save"></div>

