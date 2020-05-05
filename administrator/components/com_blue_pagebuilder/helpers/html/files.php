<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_contact
 *
 * @copyright   Copyright (C) 2005 - 2013 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

/**
 * Contact component helper.
 *
 * @package     Joomla.Administrator
 * @subpackage  com_contact
 * @since       1.6
 */
abstract class JHtmlFiles
{
	static function featured($value = 0, $i, $canChange = true)
	{
		// Array of image, task, title, action
		$states	= array(
			0	=> array('disabled.png', 'files.featured', 'COM_FILESHARING_UNFEATURED', 'COM_FILESHARING_TOGGLE_TO_FEATURE'),
			1	=> array('featured.png', 'files.unfeatured', 'JFEATURED', 'COM_FILESHARING_TOGGLE_TO_FEATURE'),
		);
		$state	= JArrayHelper::getValue($states, (int) $value, $states[1]);
		$html	= JHtml::_('image', 'admin/'.$state[0], JText::_($state[2]), NULL, true);
		if ($canChange) {
			$html	= '<a href="#" onclick="return listItemTask(\'cb'.$i.'\',\''.$state[1].'\')" title="'.JText::_($state[3]).'">'
					. $html .'</a>';
		}

		return $html;
	}

	static function published($value = 0, $i, $canChange = true)
	{
		// Array of image, task, title, action
		$states	= array(
			0	=> array('publish_r.png', 'files.published', 'COM_FILESHARING_UNPUBLISH', 'COM_FILESHARING_TOGGLE_TO_PUBLISH'),
			1	=> array('publish_g.png', 'files.published', 'JFEATURED', 'COM_FILESHARING_TOGGLE_TO_PUBLISH'),
		);
		$state	= JArrayHelper::getValue($states, (int) $value, $states[1]);
		$html	= JHtml::_('image', 'admin/'.$state[0], JText::_($state[2]), NULL, true);
		if ($canChange) {
			$html	= '<a href="#" onclick="return listItemTask(\'cb'.$i.'\',\''.$state[1].'\')" title="'.JText::_($state[3]).'">'
					. $html .'</a>';
		}

		return $html;
	}
}
