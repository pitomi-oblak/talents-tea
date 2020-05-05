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
jimport( 'joomla.filesystem.folder' );
jimport( 'joomla.filesystem.file' );
class Blue_pagebuilderHelper
{
	/**
	 * Configure the Linkbar.
	 *
	 * @param   string	$vName	The name of the active view.
	 *
	 * @return  void
	 * @since   1.6
	 */

	public static function checkGroupView($catid){
		$user 	= JFactory::getUser();
		if($user->id==0){
			return false;
		}
		return true;
	}

	public static function checkGroupDelete(){
		$user 		= JFactory::getUser();
		$group 	= self::selectData('#__user_usergroup_map','group_id','user_id='.$user->id);
		foreach ($group as $g) {
			if($g==8) return true;
		}
		return false;
	}

	public static function renameFile($file){
		$array = explode(".", $file["name"]['file']);
		$exten = end($array);
		$name='';
		$count= count($array);
		for($i=0;$i<$count;$i++){
			$name.=$array[$i].'-';
		}
		$array=explode(" ", $name);
		$name='';
		$count= count($array);
		for($i=0;$i<$count;$i++){
			$name.=$array[$i];
		}
		$date = getDate();
		$name.=$date[0].'.'.$exten;
		$file["name"]["file"]=$name;
		return $file;
	}
	public static function fileUpload($file,$catid,$typeid=0){
		$url = self::getDirectoryCategory($catid,$typeid);
		JFile::upload($file['tmp_name']['file'], $url.JFile::makeSafe($file['name']['file']));
		return $file;
	}

	public static function getDirectoryCategory($catid,$typeid=0){
		$url = JPATH_SITE.'/filesharing/';
		//folder category
		
		$url .=md5($catid).'/';

		//folder type
		if($typeid!=0){
			$where = 'id='.$typeid;
			$data = self::selectData('#__filesharing_file_type','name',$where,'',1);
			$url.=strtolower($data->name).'/';
		}
		return $url;
	}

	public static function getUsername($id){
		return self::selectData('#__users','name','id='.$id,'',1)->name;
	}

	public static function checkAddfile(){
		$app = JFactory::getApplication();
		$catid = JRequest::getVar('catid',0);
		$itemID = JRequest::getVar('Itemid',0);
		$user = JFactory::getUser();
		if($user->id==0){
			$app->enqueueMessage('error','warrning');
			$app->redirect('index.php');
			return true;
		}
	}

	public static function checkimageExtension($file){
		$allowedExts = array("xlsx", "txt", "docx", "pptx","ppt","doc","xls","pdf");
		$extension = end(explode(".", $file["name"]['file']));
		if ((($file["type"]['file'] == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
		|| ($file["type"]['file'] == "text/plain")
		|| ($file["type"]['file'] == "application/pdf")
		|| ($file["type"]['file'] == "application/vnd.ms-powerpoint")
		|| ($file["type"]['file'] == "application/msword")
		|| ($file["type"]['file'] == "application/vnd.ms-excel")
		|| ($file["type"]['file'] == "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
		|| ($file["type"]['file'] == "application/vnd.openxmlformats-officedocument.presentationml.presentation"))
		&& in_array($extension, $allowedExts))
		{
			return false;
		}
		else
		{
			return true;
		}
	}

	public static function setUrlValid($str){
		return strtolower(implode('-',explode(" ", $str)));
	}
	public static function addSubmenu($vName)
	{
		JHtmlSidebar::addEntry(
			JText::_('COM_FILESHARING_FILES'),
			'index.php?option=com_blue_pagebuilder',
			$vName == 'files'
		);
		JHtmlSidebar::addEntry(
			JText::_('COM_FILESHARING_CATEGORY'),
			'index.php?option=com_blue_pagebuilder&view=categories',
			$vName == 'categories'
		);
	}

	public static function deleteData($table,$conditions){
		$db = &JFactory::getDbo();
		$query = $db->getQuery(true);
		$query->delete($db->quoteName($table));
		$query->where($conditions);
		$db->setQuery($query);
		try {
		   return $db->execute();
		} catch (Exception $e) {
		   return false;
		}
	}

	public static function selectData($table,$columns='*',$where='',$order='',$limit=''){
		$db = JFactory::getDbo();
		$query = $db->getQuery(true);
		$query 		->select($columns)
					->from($table);
		if($where!=''){
			$query->where($where);
		}
		if($order!=''){
			$query->order($order);
		}
		
		if($limit==''){
			$db->setQuery($query);
		}else{
			$db->setQuery($query,0,$limit);
		}
		if($limit==1){
			return $db->loadObject();
		}
		return $db->loadObjectList();
	}


	public static function insertData($table,$columns,$values,$getid=false){
		$db = &JFactory::getDbo();
		$query = $db->getQuery(true);
		$query 	->insert($db->quoteName($table))
			    ->columns($db->quoteName($columns))
			    ->values(implode(',', $values));
	   
		$db->setQuery($query);
		try {
			if(!$getid){
				return $db->execute();
			}else{
				$db->execute();
				return $db->insertid();
			}
		} catch (Exception $e) {
		   return false;
		}
	}

	public static function checkCount($table,$column,$where=''){
		$db = &JFactory::getDbo();
		$query = $db->getQuery(true);
		$query 		->select($column)
					->from($table);
		if($where!=''){
			$query->where($where);
		}
		//echo $query->dump();
		$db->setQuery($query);
		$data=$db->loadObjectList();
		return count($data);
	}

	public static function dumpdata($object){
		var_dump($object);
		die();
	}

	public static function updateData($table,$fields,$conditions){
		$db = JFactory::getDbo();
		$query = $db->getQuery(true);
		$query->update($db->quoteName($table))->set($fields)->where($conditions);
		$db->setQuery($query);
		try {
		    $result = $db->execute();
		} catch (Exception $e) {
		    return false;
		}
	}
}
