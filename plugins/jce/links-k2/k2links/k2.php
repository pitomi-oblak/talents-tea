<?php
/**
 * @version     2.0.1
 * @package     K2 Links for JCE
 * @author      JoomlaWorks http://www.joomlaworks.net
 * @copyright   Copyright (c) 2006 - 2014 JoomlaWorks Ltd. All rights reserved.
 * @license     GNU/GPL license: http://www.gnu.org/copyleft/gpl.html
 */

defined('_WF_EXT') or die('ERROR_403');

/**
 * This class fetches K2 categories and items
 */
class K2linksK2 extends JObject
{

	var $_option = 'com_k2';
	var $_task = 'category';

	/**
	 * Constructor activating the default information of the class
	 *
	 * @access	protected
	 */
	function __construct($options = array())
	{
	}

	/**
	 * Returns a reference to a editor object
	 *
	 * This method must be invoked as:
	 * 		<pre>  $browser =JContentEditor::getInstance();</pre>
	 *
	 * @access	public
	 * @return	JCE  The editor object.
	 * @since	1.5
	 */
	function getInstance()
	{
		static $instance;

		if (!is_object($instance))
		{
			$instance = new K2linksK2();
		}
		return $instance;
	}

	public function getOption()
	{
		return $this->_option;
	}

	public function getTask()
	{
		return $this->_task;
	}

	public function getList()
	{
		$advlink = WFEditorPlugin::getInstance();
		$list = '';
		if ($advlink->checkAccess('k2links.k2', '1'))
		{
			$list = '<li id="index.php?option=com_k2&task=category"><div class="uk-tree-row"><a href="#"><span class="uk-tree-icon folder content nolink"></span><span class="uk-tree-text">'.JText::_('K2 Categories &amp; Items').'</span></a></div></li>';
		}
		return $list;
	}

	public static function _getK2Categories($parent_id = 0)
	{
		// K2 2.x
		if (defined('K2_JVERSION'))
		{
			$db = JFactory::getDBO();
			$query = 'SELECT id, name, alias FROM #__k2_categories WHERE published = 1';
			$user = JFactory::getUser();
			if (version_compare(JVERSION, '1.6.0', 'ge'))
			{
				$query .= ' AND `access` IN ('.implode(',', $user->getAuthorisedViewLevels()).')';
			}
			else
			{
				$query .= "\nAND `access` <=".(int)$user->get('aid');
			}
			$query .= ' AND parent = '.$db->Quote($parent_id).' ORDER BY ordering ASC';
			$db->setQuery($query);
			$rows = $db->loadObjectList();
		}
		// K2 3.x
		else
		{
			if ($parent_id == 0)
			{
				$parent_id = 1;
			}
			$model = K2Model::getInstance('Categories');
			$model->setState('site', true);
			$model->setState('parent', $parent_id);
			$model->setState('sorting', 'ordering');
			$rows = $model->getRows();
		}

		return $rows;
	}

	public static function _getK2Items($category_id = 0)
	{
		// K2 2.x
		if (defined('K2_JVERSION'))
		{
			$db = JFactory::getDBO();

			$query = 'SELECT id, title, alias FROM #__k2_items WHERE published = 1';

			$user = JFactory::getUser();
			if (version_compare(JVERSION, '1.6.0', 'ge'))
			{
				$query .= ' AND `access` IN ('.implode(',', $user->getAuthorisedViewLevels()).')';
			}
			else
			{
				$query .= "\nAND `access` <=".(int)$user->get('aid');
			}

			$query .= ' AND catid = '.$db->Quote($category_id).' ORDER BY ordering ASC';

			$db->setQuery($query);
			$rows = $db->loadObjectList();
		}
		// K2 3.x
		else
		{
			$model = K2Model::getInstance('Items');
			$model->setState('site', true);
			$model->setState('category', (int)$category_id);
			$model->setState('recursive', false);
			$model->setState('sorting', 'ordering');
			$rows = $model->getRows();
		}
		return $rows;
	}

	function getLinks($args)
	{
		$mainframe = JFactory::getApplication();

		$advlink = WFEditorPlugin::getInstance();
		if (defined('K2_JVERSION'))
		{
			require_once (JPATH_SITE.DS.'components'.DS.'com_k2'.DS.'helpers'.DS.'route.php');
		}

		$items = array();
		$view = isset($args->view) ? $args->view : '';

		switch ($view)
		{

			default :
				$categories = self::_getK2Categories();
				foreach ($categories as $category)
				{
					$category->href = K2HelperRoute::getCategoryRoute($category->id);
					$items[] = array('id' => $category->href, 'name' => $category->name, 'class' => 'folder content');
				}
				break;

			case 'itemlist' :
				$categories = self::_getK2Categories($args->id);
				$itemlist = self::_getK2Items($args->id);
				foreach ($categories as $category)
				{
					$category->href = K2HelperRoute::getCategoryRoute($category->id);
					$items[] = array('id' => $category->href, 'name' => $category->name, 'class' => 'folder content');
				}
				foreach ($itemlist as $item)
				{
					$item->href = K2HelperRoute::getItemRoute($item->id.':'.$item->alias, $item->catid);
					$items[] = array('id' => $item->href, 'name' => $item->title, 'class' => 'file');
				}
				break;

			case 'item' :
				break;
		}
		return $items;
	}

}
