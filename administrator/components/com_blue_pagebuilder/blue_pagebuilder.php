<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_book
 *
 * @copyright   Copyright (C) 2005 - 2013 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;
require_once JPATH_COMPONENT.'/helpers/blue_pagebuilder.php';
if (!JFactory::getUser()->authorise('core.manage', 'com_blue_pagebuilder'))
{
	return JError::raiseWarning(404, JText::_('JERROR_ALERTNOAUTHOR'));
}
$controller = JControllerLegacy::getInstance('blue_pagebuilder');
$controller->execute(JFactory::getApplication()->input->get('task'));
$controller->redirect();
