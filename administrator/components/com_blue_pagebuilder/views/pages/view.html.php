<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_book
 *
 * @copyright   Copyright (C) 2005 - 2013 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

/**
 * Component Controller
 *
 * @package     Joomla.Administrator
 * @subpackage  com_book
 */
class Blue_pagebuilderViewPages extends JViewLegacy
{
	public function display($tpl = null)
	{
		$this->items		= $this->get('Items');
		$this->pagination	= $this->get('Pagination');
		$this->state		= $this->get('State');
		//var_dump($this->items);
		// Check for errors.
		if (count($errors = $this->get('Errors')))
		{
			JError::raiseError(500, implode("\n", $errors));
			return false;
		}
		if(STVersion==2){
			$this->setLayout('default_25');
		}
		$this->addToolbar();
		//$this->sidebar = JHtmlSidebar::render();
		parent::display($tpl);
	}
	protected function addToolbar()
	{
		JToolbarHelper::title(JText::_('COM_BLUE_PAGEBUILDER'));
		JToolbarHelper::addNew('page.add');
		JToolbarHelper::custom('page.duplicate', 'copy.png', 'copy_f2.png', 'JTOOLBAR_DUPLICATE', true);
		JToolbarHelper::deleteList('', 'page.delete', 'Delete');
		if(STVersion==3){
			JHtmlSidebar::setAction('index.php?option=com_blue_pagebuilder');
		}
	}
}
