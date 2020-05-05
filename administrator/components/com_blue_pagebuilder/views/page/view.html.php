<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  COM_BLUE_PAGEBUILDER
 *
 * @copyright   Copyright (C) 2005 - 2013 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;


class Blue_pagebuilderViewPage extends JViewLegacy
{
	protected $form;

	protected $item;

	protected $state;

	/**
	 * Display the view
	 */
	public function display($tpl = null)
	{
		$doc = JFactory::getDocument();
		
		if($this->getLayout()=='edit'){

			//JFactory::getApplication()->input->set('hidemainmenu', true);
			$this->id=JRequest::getVar('id',0);
			$this->form = $this->get('Form');

			$model=$this->getModel();
			// Add Style And JS
			$this->url = JURI::root().'administrator/components/com_blue_pagebuilder/assets/';
			$doc->addStyleSheet($this->url.'css/jquery-ui.css');
			$doc->addStyleSheet($this->url.'css/style.css');
			
			//Get Data
			$this->item = $model->getItemcode();
			$this->listModule = $model->getListModule();
			$this->configpage = $model->getConfigPage($this->id);
			if($this->configpage==null){
				$this->configpage = json_decode('{"id":"","class":"","fullwidth":"1","author":"CMSBlueTheme"}');
			}else{
				$this->configpage = json_decode($this->configpage);
			}
			// Get Design
			$this->design = $model->getDesign($this->id);
			//$this->images = $model->getImageFolder('images/content');

			$this->folderList = $this->getFolderList(JPATH_ROOT.DIRECTORY_SEPARATOR.'images');
			
			$this->name="";
			$this->name= $model->getPageName($this->id);
		}

		$this->addToolbar();
		parent::display($tpl);
	}

	/**
	 * Add the page title and toolbar.
	 *
	 * @since   1.6
	 */
	protected function addToolbar()
	{
		JToolbarHelper::title(JText::_('COM_BLUE_PAGEBUILDER'));
		JToolbarHelper::apply('page.stsave');
		JToolbarHelper::save('page.stsaveclose');
		JToolbarHelper::cancel('page.cancel');
	}

	protected function getFolderList($base = null)
	{
		// Get some paths from the request
		if (empty($base))
		{
			$base = COM_MEDIA_BASE;
		}
		//corrections for windows paths
		$base = str_replace(DIRECTORY_SEPARATOR, '/', $base);
		$com_media_base_uni = $base;//str_replace(DIRECTORY_SEPARATOR, '/', COM_MEDIA_BASE);

		// Get the list of folders
		jimport('joomla.filesystem.folder');
		$folders = JFolder::folders($base, '.', true, true);

		//$document = JFactory::getDocument();
		//$document->setTitle(JText::_('COM_MEDIA_INSERT_IMAGE'));

		// Build the array of select options for the folder list
		$options[] = JHtml::_('select.option', "", "/");

		foreach ($folders as $folder)
		{
			$folder		= str_replace($com_media_base_uni, "", str_replace(DIRECTORY_SEPARATOR, '/', $folder));
			$value		= substr($folder, 1);
			$text		= str_replace(DIRECTORY_SEPARATOR, "/", $folder);
			$options[]	= JHtml::_('select.option', $value, $text);
		}

		// Sort the folder list array
		if (is_array($options))
		{
			sort($options);
		}



		// Create the drop-down folder select list
		$list = JHtml::_('select.genericlist', $options, 'st-folderlist', 'size="1" onchange="loadImages(this.options[this.selectedIndex].value)" ', 'value', 'text', $base);

		return $list;
	}

}
