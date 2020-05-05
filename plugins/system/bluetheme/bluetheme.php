<?php
defined('_JEXEC') or die('Restricted access');

// Import Joomla core library
jimport('joomla.filesystem.folder');
jimport('joomla.filesystem.file');
jimport('joomla.plugin.plugin');

// Require common functions
require_once dirname(__FILE__) . "/assets/includes/common.php";
class plgSystemBluetheme extends JPlugin
{
	var $document = NULL;
	var $baseurl  = NULL;
	public function __construct(&$subject, $config)
	{
		parent::__construct($subject, $config);
		if(!defined('STVersion')){
			$arr = explode('.',JVERSION);
			define('STVersion',$arr[0]);
		}
		config_shortcode($this->params);
		$this->document = JFactory::getDocument();
		$this->baseurl = str_replace("/administrator", "", JURI::base());
		define('STPLUGIN',$this->baseurl. "plugins/system/bluetheme/assets/");
	}
    
	private function allowUseTypo(){
		$app 	= JFactory::getApplication();
		$option = JRequest::getVar("option","");
		$format = JRequest::getVar("format","");
		if( $option == "com_content" && $format == "feed"){
			return false;
		}
		return true;
	}

	// Function on after render
	public function onAfterRender()
	{
		$runmode = $this->params->get('runmode', 0);
		$app 	 = JFactory::getApplication();
		// Only enable shortcodes in fontend & work with buffer of page
		if($app->isSite())
		{
			if($runmode == 1) {
				$page = JResponse::GetBody();
				$page = do_shortcode($page);
				JResponse::SetBody($page);
			}
		}
	}
	// Enable shortcodes in Articles content
	public function onContentPrepare($context, &$article, &$params, $page=0)
	{
		$runmode = $this->params->get('runmode', 0);
		if($runmode != 0) return;
		$article->text = do_shortcode($article->text);
		return true;
	}
	// Add media
	public function onBeforeRender()
	{
		$app = JFactory::getApplication();

		if($app->isSite())
		{	//$this->document->addStyleSheet($this->baseurl . "plugins/system/bluetheme/assets/css/bootstrap.min.css");
			//$this->document->addStyleSheet($this->baseurl . "plugins/system/bluetheme/assets/css/new-shortcodes.css");
		//	$this->document->addStyleSheet($this->baseurl . "plugins/system/bluetheme/assets/css/main.css");
		//	$this->document->addStyleSheet($this->baseurl . "plugins/system/bluetheme/assets/css/main-responsive.css");
			//$this->document->addStyleSheet($this->baseurl . "plugins/system/bluetheme/assets/css/main-retina.css");

		//	$this->document->addStyleSheet($this->baseurl . "plugins/system/bluetheme/assets/fonts/fonts.css");
			// $this->document->addStyleSheet($this->baseurl . "plugins/system/bluetheme/assets/css/shortcodes.css");
			// $this->document->addStyleSheet($this->baseurl . "plugins/system/bluetheme/assets/css/shortcodes-responsive.css");
			// $this->document->addStyleSheet($this->baseurl . "plugins/system/bluetheme/assets/css/icon.css");
			// $this->document->addStyleSheet($this->baseurl . "plugins/system/bluetheme/assets/css/animate.min.css");
			// $this->document->addScript($this->baseurl . "plugins/system/bluetheme/assets/js/jquery.fancybox.pack.js");
			// $this->document->addScript($this->baseurl . "plugins/system/bluetheme/assets/js/jquery.easing.1.3.js");
			// $this->document->addScript($this->baseurl . "plugins/system/bluetheme/assets/js/jquery.jcarousel.min.js");
			// $this->document->addScript($this->baseurl . "plugins/system/bluetheme/assets/js/jquery.isotope.min.js");
			// $this->document->addScript($this->baseurl . "plugins/system/bluetheme/assets/js/shortcodes.js");
			// $this->document->addScript($this->baseurl . "plugins/system/bluetheme/assets/js/jflickrfeed.min.js");
			
			$effect = $this->params->get('lightbox-effect','none');
			$speed = $this->params->get('lightbox-speed',250);
			$title_position = $this->params->get('titleposition','inside');

			
		}else{
			if(JRequest::getVar('option')=='com_blue_pagebuilder' && JRequest::getVar('view')=='page' ){
				if(STVersion==2){
					if(JRequest::getVar('layout') == 'edit'){
						$this->document->addStyleSheet($this->baseurl . "plugins/system/bluetheme/assets/css/style.design.2.5.css");
						$this->document->addStyleSheet($this->baseurl . "plugins/system/bluetheme/assets/css/bootstrap.2.3.min.css");
						$this->document->addScript($this->baseurl . "plugins/system/bluetheme/assets/js/jquery.min.js");
						$this->document->addScript($this->baseurl . "plugins/system/bluetheme/assets/js/jquery-noconflict.js");
						$this->document->addScript($this->baseurl . "plugins/system/bluetheme/assets/js/bootstrap.min.js");
						$this->document->addScript($this->baseurl . "plugins/system/bluetheme/assets/js/plugin-design_1.js");
					}else{
						$this->document->addStyleSheet($this->baseurl . "plugins/system/bluetheme/assets/css/style.design.2.5.css");
						$this->document->addStyleSheet($this->baseurl . "plugins/system/bluetheme/assets/css/bootstrap.2.3.min.css");
						$this->document->addScript($this->baseurl . "plugins/system/bluetheme/assets/js/jquery.min.js");
						$this->document->addScript($this->baseurl . "plugins/system/bluetheme/assets/js/jquery-noconflict.js");
						//$this->document->addScript($this->baseurl . "plugins/system/bluetheme/assets/js/bootstrap.min.js");
						//$this->document->addScript($this->baseurl . "plugins/system/bluetheme/assets/js/plugin-design_1.js");
					}
				}else{
					if(JRequest::getVar('layout') == 'edit'){
						$this->document->addScript($this->baseurl . "plugins/system/bluetheme/assets/js/plugin-design.js");
					}
				}
				$this->document->addScript('http://maps.googleapis.com/maps/api/js?sensor=false&amp;libraries=places');
				$this->document->addStyleSheet($this->baseurl . "plugins/system/bluetheme/assets/css/st-box.css");
				$this->document->addStyleSheet($this->baseurl . "plugins/system/bluetheme/assets/css/icon-admin.css");
				$this->document->addScript($this->baseurl . "plugins/system/bluetheme/assets/js/jquery.fancybox.pack.js");
				$this->document->addScript($this->baseurl . "plugins/system/bluetheme/assets/js/jquery-ui.min.js");
				$this->document->addScript($this->baseurl . "plugins/system/bluetheme/assets/js/jquery.geocomplete.min.js");
				
			}
		}
	}
	public function onAfterRoute()
	{
		$app = JFactory::getApplication();
		if( $this->allowUseTypo() ){
			$doc 		= JFactory::getDocument();
			//JHTML::_('behavior.framework', true);
		}
		BluethemePlugin::includeShortcode();
	}

	public function loadTemplate ($template) {
		if (!is_file ($template)) return '';
		$buffer = ob_get_clean();
		ob_start();
		include ($template);
		$content = ob_get_clean();
		ob_start();
		echo $buffer;
		return $content;
	}
    
        function onContentPrepareForm($form, $data)
        {
            if ($form->getName()=='com_menus.item') //Add bluetheme menu params to the menu item
            {
//                JHtml::_('behavior.framework');
//                $doc = JFactory::getDocument();
//
//                JForm::addFormPath(JPATH_PLUGINS.'/system/bluetheme/fields');
//                $form->loadFile('params', false);

            }
        }
}