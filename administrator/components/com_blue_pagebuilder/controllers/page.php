<?php
/**
 * 
 * @copyright ShineTheme.com
 * @author  ShineTheme
 * @mail contact@shinetheme.com
 * @link  http://shinetheme.com
 * @license  License GNU General Public License version 2 or later
 */
defined( '_JEXEC' ) or die( 'Restricted access' );
// Include the syndicate functions only once



jimport('joomla.application.component.controlleradmin');

class Blue_pagebuilderControllerPage extends JControllerAdmin
{
	public function getModel($name = 'Page', $prefix = 'Blue_pagebuilderModel', $config = array('ignore_request' => true))
	{
		$model = parent::getModel($name, $prefix, $config);
		return $model;
	}

	public function getEditor(){
		$editor = JFactory::getEditor();
		$pa = array( 'smilies'=> '0' ,
		                 'style'  => '1' ,  
		                 'layer'  => '0' , 
		                 'table'  => '0' ,
		                 'clear_entities'=>'0'
		                 );
		echo $editor->display( 'pbEditor', '', '100%', '300', '20', '20', false, null, null, $pa );
	}

	public function stSave(){
		$arr = json_decode(JRequest::getVar('data'));
		for($i=0;$i<count($arr);$i++){
			$arr[$i]=urldecode($arr[$i]);
		}
		$id = JRequest::getVar('id');
		$name= JRequest::getVar('name');
		$config = rawurldecode(JRequest::getVar('config'));
		// echo json_encode($arr);
		// die();
		$model = $this->getModel();
		echo $model->savePage($arr,$id,$name,$config);
		exit();
	}

	public function duplicate(){
		$ids = JRequest::getVar('cid');
		$model = $this->getModel();
		foreach ($ids as $key => $id) {
			$model->duplicate($id);
		}
		$this->setRedirect('index.php?option=com_blue_pagebuilder');
		return true;
	}

	public function add(){
		$this->setRedirect('index.php?option=com_blue_pagebuilder&view=page');
		return true;
	}
	public function demo(){
		$model = $this->getModel();
		$id = $model->addNewPage(JRequest::getVar('pagename'));
		$this->setRedirect('index.php?option=com_blue_pagebuilder&view=page&layout=edit&id='.$id);
		return true;
	}

	public function getImageFolder(){
		$folder = JRequest::getVar('folder');
		$fol = JPATH_SITE.'/'.$folder;
		if(!$dir = @opendir($fol)){
			$arr = array("check"=>"0","data"=>"null");
			echo json_encode($arr);
			die();
		};
		while (false !== ($file = readdir($dir)))
		{
		    if (preg_match('/.+\.(jpg|jpeg|gif|png)$/i', $file)) {
		    	// check with getimagesize() which attempts to return the image mime-type
		    	if(getimagesize($fol.'/'.$file)!==FALSE){
		    		$files[]=array("admin"=>JURI::root(true).'/'.$folder.'/'.$file,"site"=>$folder.'/'.$file,"name"=>$file);
		    	}
			}
		}
		closedir($dir);
		$arr = array("check"=>"1","data"=>$files);
		echo json_encode($arr);
		die();
	}

	public function delete(){
		$model = $this->getModel();
		$model->stdelete();
		$this->setRedirect('index.php?option=com_blue_pagebuilder','Delete success');
		return true;
	}
}
