<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_BLUE_PAGEBUILDER
 *
 * @copyright   Copyright (C) 2005 - 2013 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;
// check sidebar
$checksidebar = JFactory::getApplication()->getTemplate(true)->params->get('type');
?>
<?php if($this->itemConfig->id!="") echo "<section id='{$this->itemConfig->id}'>"; ?>
<?php if($this->itemConfig->class!="") echo "<div class='{$this->itemConfig->class}'>"; ?>
<?php if($this->itemConfig->fullwidth!="1" && !$checksidebar) echo '<div class="container">'; ?>
<?php echo do_shortcode($this->item->code); ?>
<?php if(!$this->itemConfig->fullwidth && !$checksidebar) echo '</div>'; ?>
<?php if($this->itemConfig->class!="") echo "</div>"; ?>
<?php if($this->itemConfig->id!="") echo "</section>"; ?>
