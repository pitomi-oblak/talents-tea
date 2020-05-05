<?php
/**
 * @version        3.0.x
 * @package        Simple Image Gallery Pro
 * @author        JoomlaWorks - http://www.joomlaworks.net
 * @copyright    Copyright (c) 2006 - 2014 JoomlaWorks Ltd. All rights reserved.
 * @license        http://www.joomlaworks.net/license
 */

// no direct access
defined('_JEXEC') or die('Restricted access');


?>

<div id="sigProGalleriaWhite<?php echo $gal_id; ?>"
     class="sigProContainer sigProGalleriaWhiteContainer<?php echo $extraWrapperClass; ?> slider-main">
    <div class="sigProGalleriaWhitePlaceholder">
        <div class="grid-gallery row">
            <?php $i = 0;
            foreach ($gallery as $count => $photo) { ?>
                <div class="grid-photo col-sm-6 col-md-3">
                    <a href="<?php echo $gallery[$i]->sourceImageFilePath; ?>"
                       class="sigProGalleriaWhiteTargetLink<?php echo $extraClass; ?>"
                       rel="<?php echo $relName; ?>"
                       title="<?php echo $gallery[$i]->captionDescription . $gallery[$i]->downloadLink . $modulePosition; ?>"
                       target="_blank">

                        <img class="sigProGalleriaWhiteTargetImg" src="<?php echo $gallery[$i]->sourceImageFilePath; ?>"
                             alt="<?php echo JText::_('JW_SIGP_LABELS_08') . ' ' . $gallery[$i]->filename; ?>"
                             title="<?php echo JText::_('JW_SIGP_LABELS_08') . ' ' . $gallery[$i]->filename; ?>"
                             width="100%"/>

                        <?php if ($photo->captionTitle): ?>
                            <div class="image-title"><b><?php echo $photo->captionTitle; ?></b></div>
                        <?php endif; ?>
                    </a>
                </div>
                <?php $i++;
            } ?>
        </div>
    </div>
</div>


