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



jimport('joomla.html.html');
jimport('joomla.form.formfield');
jimport('joomla.form.helper');
JFormHelper::loadFieldClass('list');
 
/**
 * Custom Field class for the Joomla Framework.
 *
 * @package             Joomla.Administrator
 * @subpackage          com_my
 * @since               1.6
 */
class JFormFieldCategories extends JFormFieldList
{
        /**
         * The form field type.
         *
         * @var         string
         * @since       1.6
         */
        protected $type = 'categories';
 
        /**
         * Method to get the field options.
         *
         * @return      array   The field option objects.
         * @since       1.6
         */
        public function getOptions()
        {
                // Initialize variables.
                $options = array();
                $db     = JFactory::getDbo();
                $query  = $db->getQuery(true);
                $query->select('id As value, name As text');
                $query->from('#__users AS a');
                $query  ->select('m.group_id')
                                ->join('LEFT', '#__user_usergroup_map AS m ON m.user_id=a.id');
                $query->where('m.group_id=2');
                $query->order('a.name');
                // Get the options.
                $db->setQuery($query);
                $options = $db->loadObjectList();
                // Check for a database error.
                if ($db->getErrorNum()) {
                        JError::raiseWarning(500, $db->getErrorMsg());
                }
                return $options;
        }
}
?>