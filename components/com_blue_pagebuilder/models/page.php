<?php
/**
 * @author cmsbluetheme - www.cmsbluetheme.com
 * @date: Aug 2013.
 * @copyright  Copyright (C) 2013 cmsbluetheme.com . All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE
 */
defined('_JEXEC') or die;
jimport('joomla.application.component.modellist');
jimport('joomla.application.component.modelitem');
/**
 * Component Controller
 *
 * @package     Joomla.Administrator
 * @subpackage  com_book
 */
class Blue_pagebuilderModelPage extends JModelItem
{
	/**
	 * Model context string.
	 *
	 * @var        string
	 */
	protected $_context = 'com_blue_pagebuilder.page';

	/**
	 * Method to auto-populate the model state.
	 *
	 * Note. Calling getState in this method will result in recursion.
	 *
	 * @since   1.6
	 *
	 * @return void
	 */
	protected function populateState()
	{
		$app = JFactory::getApplication('site');
		$designid = null;
		if($app->input->getInt('id')){
			$designid = $app->input->getInt('id');
		}else{
			$menus		= $app->getMenu();
	        $active = $menus->getActive();
	                
	        $designid = (int) $active->params->get('designid');
		}
     
		$this->setState('page.id', $designid);

		// Load the parameters.
		$params = $app->getParams();
		$this->setState('params', $params);

	}

	/**
	 * Method to get an object.
	 *
	 * @param   integer	The id of the object to get.
	 *
	 * @return  mixed  Object on success, false on failure.
	 */
	public function getItem($id = null)
	{
		if ($this->_item === null)
		{
			$this->_item = false;

			if (empty($id))
			{
				$id = $this->getState('page.id');
			}

			// Get a level row instance.
			$table = JTable::getInstance('Page', 'Blue_pagebuilderTable');
                        

			// Attempt to load the row.
			if ($table->load($id))
			{

				// Convert the JTable to a clean JObject.
				$properties = $table->getProperties(1);
				$this->_item = JArrayHelper::toObject($properties, 'JObject');
			}
			elseif ($error = $table->getError())
			{
				$this->setError($error);
			}
		}

		return $this->_item;
	}

	/**
	 * Returns a reference to the a Table object, always creating it.
	 *
	 * @param	type	The table type to instantiate
	 * @param	string	A prefix for the table class name. Optional.
	 * @param	array	Configuration array for model. Optional.
	 * @return	JTable	A database object
	 * @since	1.6
	 */
	public function getTable($type = 'Page', $prefix = 'Blue_pagebuilderTable', $config = array())
	{
		return JTable::getInstance($type, $prefix, $config);
	}

}
