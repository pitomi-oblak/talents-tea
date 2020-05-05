<?php
defined( '_JEXEC' ) or die( 'Restricted access' );
// Include the syndicate functions only once



jimport('joomla.application.component.modeladmin');
/**
 * Component Controller
 *
 * @package     Joomla.Administrator
 * @subpackage  com_book
 */
class Blue_pagebuilderModelPage extends JModelAdmin
{
	private $code;

	public function getTable($type = 'Page', $prefix = 'Blue_pagebuilderTable', $config = array())
	{
		return JTable::getInstance($type, $prefix, $config);
	}
	public function getForm($data = array(), $loadData = true)
	{
		//JForm::addFieldPath('JPATH_ADMINISTRATOR/components/com_users/models/fields');

		// Get the form.
		$form = $this->loadForm('com_blue_pagebuilder.page', 'page', array('control' => 'jform', 'load_data' => $loadData));
		if (empty($form))
		{
			return false;
		}
		return $form;
	}

	public function savePage($data,$id,$name,$config){
	
		$this->AddDesign($id,$data);
		foreach ($data as $item) {
			$this->getCode(json_decode($item));
		}
		// echo $this->code;
		// die();
		$kt=false;
		if($id==0){

		}else{
			$kt =$this->editPage($id,$name,$config);
		}
		if($kt){
			return JText::_("COM_BLUE_PAGEBUILDER_SUCCESS_SAVE");
		}else{
			echo "loi roi";
		}
	}
	private function editPage($id,$name,$config){
		$db 	= $this->getDbo();
		$query  = $db->getQuery(true);
		$field  = array('code="'.$this->code.'"','name="'.$name.'"','config=\''.$config.'\'');
		$where  = array('id='.$id);
		$query->update($db->quoteName('#__blue_pagebuilder'))->set($field)->where($where);

		
		$db->setQuery($query);

		$db->setQuery($query);
		try {
		    if(STVersion==3){
				$result=$db->execute();
			}else{
				$result=$db->query();
			}
		} catch (Exception $e) {
		    $result = false;
		}
		return $result;
	}

	public function getConfigPage($id){
		$db 	= $this->getDbo();
		$query  = $db->getQuery(true);
		$query 		->select('config')
					->from('#__blue_pagebuilder')
					->where('id='.$id);
		$db->setQuery($query);
		return $db->loadResult();
	}

	public function stdelete(){
		$db = $this->getDbo();
		$ids = JRequest::getVar('cid');
		foreach ($ids as $key => $id) {
			$query= $db->getQuery(true);
			$query->delete($db->quoteName('#__blue_pagebuilder'))->where('id='.$id);
			$db->setQuery($query);
			$this->stexcute($db);
			$query= $db->getQuery(true);
			$query->delete($db->quoteName('#__blue_pagebuilder_design'))->where('pageid='.$id);
			$db->setQuery($query);
			$this->stexcute($db);
		}
		return true;
	}

	public function stexcute($db){
		try {
			if(STVersion==3){
				$db->execute();
			}else{
				$db->query();
			}
			
		} catch (Exception $e) {
			
		}
	}

	public function getDesign($id){
		$db 	= $this->getDbo();
		$query  = $db->getQuery(true);
		$query 		->select('a.*,b.class,b.name')
					->from('#__blue_pagebuilder_design AS a')
					->join('INNER', '#__blue_pagebuilder_type AS b ON (a.type = b.type)')
					->where('pageid='.$id)
					->order('a.id ASC');
		$db->setQuery($query);
		return $db->loadObjectList();
	}

	public function getItemcode(){
		$db 	= $this->getDbo();
		$query  = $db->getQuery(true);
		$query->select('*')->from('#__blue_pagebuilder_type');
		$db->setQuery($query);
		return $db->loadObjectList();
	}

	public function getPageName($id){
		$db 	= $this->getDbo();
		$query  = $db->getQuery(true);
		$query->select('name')->from('#__blue_pagebuilder')->where('id='.$id);
		$db->setQuery($query);
		return $db->loadResult();
	}

	public function getListModule(){
		$db = JFactory::getDbo();
		$query = $db->getQuery(true);
		$query->select("*")->from("#__modules")->where('published=1 and access=1 and client_id=0');
		$db->setQuery($query);
		return $db->loadObjectList();
	}

	public function addNewPage($name){
		$db = $this->getDbo();
		$query = $db->getQuery(true);
		$columns = array('name');
		$values = array($db->quote($name));
		$query 	->insert($db->quoteName('#__blue_pagebuilder'))
			    ->columns($db->quoteName($columns))
			    ->values(implode(',', $values));
		$db->setQuery($query);
		try {
			if(STVersion==3){
				$db->execute();
				return $db->insertid();
			}else{
				$db->query();
				return $db->insertid();
			}
			
		} catch (Exception $e) {
			
		}
	}


	

	private function AddDesign($id,$data){
		$db 	= $this->getDbo();
		$query  = $db->getQuery(true);
		$query->delete($db->quoteName('#__blue_pagebuilder_design'))->where('pageid='.$id);
		$db->setQuery($query);
		try {
		    if(STVersion==3){
				$result=$db->execute();
			}else{
				$result=$db->query();
			}
		} catch (Exception $e) {
		   // catch the error.
		}
		
		$columns = array('pageid','json','type');
		foreach($data as $item){
			$query  = $db->getQuery(true);
			$values = array($id, $db->quote($item),$db->quote(json_decode($item)->type));
			$query 	->insert($db->quoteName('#__blue_pagebuilder_design'))
			    	->columns($db->quoteName($columns))
			    	->values(implode(',', $values));
	    	$db->setQuery($query);
	    	try {
			    if(STVersion==3){
					$result=$db->execute();
				}else{
					$result=$db->query();
				}
			} catch (Exception $e) {
			   // catch the error.
			}
		}
	}

	private function getCode($data){
	
		$this->code.='['.$data->type.' '.$this->getCodeAttr($data->attr).'] ';
		if(is_array($data->content)){
			foreach($data->content as $item){
				$this->getCode($item);
			}
		}else
			$this->code.=$data->content;
		$this->code.='[/'.$data->type.'] ';
	}
	private function getCodeAttr($data){
		$arr = get_object_vars($data);
		$attr="";
		if(count($arr)>0){
			foreach ($arr as $key => $value) {
				$attr.="{$key}='{$value}' ";
			}
		}
		return $attr;
	}


	// Duplicate 
	public function duplicate($id){
		$db = JFactory::getDbo();
		$query = $db->getQuery(true);
		$query->select('*')->from('#__blue_pagebuilder')->where('id='.$id);
		$db->setQuery($query);
		$page = $db->loadObject();

		$query = $db->getQuery(true);
		$columns = array('name', 'code', 'config');
		$values = array($db->quote($page->name.' - (copy)'), $db->quote($page->code), $db->quote($page->config));
		$query 		->insert($db->quoteName('#__blue_pagebuilder'))
				    ->columns($db->quoteName($columns))
				    ->values(implode(',', $values));
	   	$db->setQuery($query);
		$db->query();
		$newid = $db->insertid();

		$query = $db->getQuery(true);
		$query->select('id')->from('#__blue_pagebuilder_design')->where('pageid='.$id)->order('pageid ASC');
		$db->setQuery($query);
		$desiId = $db->loadObjectList();
		foreach ($desiId as $key => $desi) {
			$this->duplicateDesign($desi->id,$newid);
		}
		
	}

	private function duplicateDesign($id,$newid){
		$db = JFactory::getDbo();
		$query = $db->getQuery(true);
		$query->select('*')->from('#__blue_pagebuilder_design')->where('id='.$id);
		$db->setQuery($query);
		$desi = $db->loadObject();

		$query = $db->getQuery(true);
		$columns = array('pageid', 'json', 'type');
		$values = array($newid, $db->quote($desi->json), $db->quote($desi->type));
		$query 		->insert($db->quoteName('#__blue_pagebuilder_design'))
				    ->columns($db->quoteName($columns))
				    ->values(implode(',', $values));
	   	$db->setQuery($query);
		$db->query();
	}
}
