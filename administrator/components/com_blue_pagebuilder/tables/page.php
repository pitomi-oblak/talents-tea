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
class Blue_pagebuilderTablePage extends JTable
{
	/**
	 * Constructor
	 *
	 * @param  JDatabase  Database connector object
	 *
	 * @since 1.0
	 */
	protected $published = 0;

	public function __construct(& $db)
	{
		parent::__construct('#__blue_pagebuilder', 'id', $db);
	}

	
	public function check()
	{
		return true;
	}
}
