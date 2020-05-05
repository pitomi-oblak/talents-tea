<?php
/**
 * @version 1.0 
 * @package Joomla
 * @author contact.bluetheme@gmail.com
 * @subpackage Blue Pagebuilder
 * @copyright (C) 2013 the cmsBlueTheme
 * @license GNU/GPL see LICENSE.php
 */

// no direct access
defined('_JEXEC') or die('Restricted access');
// jimport( 'joomla.filesystem.folder' );
// jimport( 'joomla.filesystem.file' );

class Com_blue_pagebuilderInstallerScript
{
    
    public function postflight($action, $parent)
    {
    	$db = JFactory::getDBO();
        $src = $parent->getParent()->getPath('source');
        $manifest = $parent->getParent()->manifest;
        $plugins = $manifest->xpath('plugins/plugin');
        
        foreach ($plugins as $plugin){
            $name = (string)$plugin->attributes()->plugin;
            $path = $src.'/plugins/'.$name;
            $installer = new JInstaller;
            $result = $installer->install($path);
            $query = "UPDATE #__extensions SET enabled=1 WHERE type='plugin' AND element=".$db->Quote($name);
            $db->setQuery($query);
            $db->query();
        }
    }
    public function install($parent)
    {
        $db = JFactory::getDBO();
        $sample_data_file       = JPATH_ADMINISTRATOR.'/components/com_blue_builder/sql/install.bluepagebuilder.sample.sql';
        if(JFile::exists($sample_data_file)){
            if($samplequery = JFile::read($sample_data_file)){ // Can't read sample data file - set error
                $arr = explode("\n", $samplequery);
                foreach($arr as $item){
                    if($item!=""){
                        $db->setQuery($item);
                        $db->query();
                    }
                }
            }
        }
    }

    public function uninstall($parent)
    {
        $db = JFactory::getDBO();
        $manifest = $parent->getParent()->manifest;
        $plugins = $manifest->xpath('plugins/plugin');
        foreach ($plugins as $plugin)
        {
            $name = (string)$plugin->attributes()->plugin;
            $query = "SELECT `extension_id` FROM #__extensions WHERE `type`='plugin' AND element = ".$db->Quote($name);
            $db->setQuery($query);
            $extensions = $db->loadColumn();
            if (count($extensions))
            {
                foreach ($extensions as $id)
                {
                    $installer = new JInstaller;
                    $result = $installer->uninstall('plugin', $id);
                }
            }
            
        }
    }
}