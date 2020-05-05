<?php 
/**
 * @version		2.6.x
 * @package		K2
 * @author		JoomlaWorks http://www.joomlaworks.net
 * @copyright	Copyright (c) 2006 - 2014 JoomlaWorks Ltd. All rights reserved.
 * @license		GNU/GPL license: http://www.gnu.org/copyleft/gpl.html
 */

// no direct access
defined('_JEXEC') or die;

?>
<div id="btk2ModuleBox<?php echo $module->id; ?>" class="btk2ArchivesBlock<?php if($params->get('moduleclass_sfx')) echo ' '.$params->get('moduleclass_sfx'); ?>">
  <ul class="nav menu">
    <?php foreach ($months as $month): ?>
    <li>
      <a href="<?php echo $month->link; ?>">
        <?php echo $month->name.' '.$month->y; ?>
        <?php if ($params->get('archiveItemsCounter')) echo '('.$month->numOfItems.')'; ?>
      </a>
    </li>
    <?php endforeach; ?>
  </ul>
</div>
