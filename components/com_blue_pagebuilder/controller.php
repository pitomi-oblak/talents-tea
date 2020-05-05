<?php

defined('_JEXEC') or die;

/**
 * Base controller class for Sanadownload.
 *
 * @package		Joomla.Site
 * @subpackage	com_sanadownload
 * @since		2.5
 */
class Blue_pagebuilderController extends JControllerLegacy
{

	public function display($cachable = false, $urlparams = false)
	{
		if(STVersion==3){
			$view   = $this->input->get('view', 'page');
			$layout = $this->input->get('layout', 'default');
			$id     = $this->input->getInt('id');
		}else{
			$view   = JRequest::getCmd('view', 'page');
			$layout = JRequest::getCmd('layout', 'default');
			$id     = JRequest::getCmd('id');
		}
		parent::display();
		return $this;
	}
}
