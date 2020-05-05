<?php
/**
 * @package	AcyMailing for Joomla!
 * @version	5.7.0
 * @author	acyba.com
 * @copyright	(C) 2009-2017 ACYBA S.A.R.L. All rights reserved.
 * @license	GNU/GPLv3 http://www.gnu.org/licenses/gpl-3.0.html
 */
defined('_JEXEC') or die('Restricted access');
?><?php
	$db = JFactory::getDBO();
	$db->setQuery("SELECT count(*) FROM `#__contact_details` WHERE `email_to` LIKE '%@%'");
	try{
		$resultUsers = $db->loadResult();
	}catch(Exception $e){
		$resultUsers = 0;
		acymailing_display($e->getMessage(),'error');
	}


	echo acymailing_translation_sprintf('USERS_IN_COMP',$resultUsers,'com_contact');
