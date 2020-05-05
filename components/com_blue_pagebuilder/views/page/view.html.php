<?php
/**
 * @author cmsbluetheme - www.cmsbluetheme.com
 * @date: Aug 2013.
 * @copyright  Copyright (C) 2013 cmsbluetheme.com . All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE
 */
defined('_JEXEC') or die;

class Blue_pagebuilderViewPage extends JViewLegacy
{
    protected $item;
    
    protected $params;
    
    protected $state;
    
    public function display($tpl = null)
	{
        $this->item = $this->get('Item');

        $this->itemConfig = json_decode($this->item->config);
                
        $this->state = $this->get('State');

        $this->params = $this->state->get('params');

        if (count($errors = $this->get('Errors')))
		{
			JError::raiseError(500, implode("\n", $errors));

			return false;
		}

		if ($this->item == false)
		{
			return JError::raiseError(404, JText::_('Page not found'));
		}

		jimport( 'joomla.html.parameter');
        $this->_prepareDocument();
		parent::display($tpl);     
	}
        
        /**
	 * Prepares the document
	 */
	protected function _prepareDocument()
	{
		$app        = JFactory::getApplication();
		$menus		= $app->getMenu();
		$pathway	= $app->getPathway();
		$title		= null;

		// Because the application sets a default page title,
		// we need to get it from the menu item itself
		$menu = $menus->getActive();

		if ($menu)
		{
			$this->params->def('page_heading', $this->params->get('page_title', $menu->title));
		}
		else
		{
			$this->params->def('page_heading', JText::_('CMSBlueTheme Pagebuilder'));
		}

		$title = $this->params->get('page_title', '');

		// add pathway function here

		// Check for empty title and add site name if param is set
		if (empty($title))
		{
			$title = $app->getCfg('sitename');
		}
		elseif ($app->getCfg('sitename_pagetitles', 0) == 1)
		{
			$title = JText::sprintf('JPAGETITLE', $app->getCfg('sitename'), $title);
		}
		elseif ($app->getCfg('sitename_pagetitles', 0) == 2)
		{
			$title = JText::sprintf('JPAGETITLE', $title, $app->getCfg('sitename'));
		}

		if (empty($title))
		{
			$title = $this->item->name;
		}
		$this->document->setTitle($title);

		if ($this->params->get('menu-meta_description'))
		{
			$this->document->setDescription($this->params->get('menu-meta_description'));
		}

		if ($this->params->get('menu-meta_keywords'))
		{
			$this->document->setMetadata('keywords', $this->params->get('menu-meta_keywords'));
		}

		if ($this->params->get('robots'))
		{
			$this->document->setMetadata('robots', $this->params->get('robots'));
		}

		if ($app->getCfg('MetaAuthor') == '1')
		{
			$this->document->setMetaData('author', (!empty($this->itemConfig->author)? $this->itemConfig->author : $app->getCfg('sitename')));
		}

	}
}
