<?php
/**
 * @version        2.6.x
 * @package        K2
 * @author        JoomlaWorks http://www.joomlaworks.net
 * @copyright    Copyright (c) 2006 - 2014 JoomlaWorks Ltd. All rights reserved.
 * @license        GNU/GPL license: http://www.gnu.org/copyleft/gpl.html
 */

// no direct access
defined('_JEXEC') or die;
?>

<div id="talents" class="talents-section">
    <div class="container">
        <div class="row talents-introduction">
            <?php if (count($items)): ?>
            <?php foreach ($items as $key => $item): ?>
            <div class="col-md-6">
                <div class="intro-img">
                    <?php if ($params->get('itemImage') && isset($item->image)): ?>
                        <img class="img-responsive" src="<?php echo $item->image; ?>"
                             alt="<?php echo K2HelperUtilities::cleanHtml($item->title); ?>"/>
                    <?php endif; ?>
                </div>
            </div>
            <div class="col-md-6">
                <div class="wrapper">
                    <div class="section-title text-center">
                        <?php if ($params->get('itemTitle')): ?>
                            <h3 class="wow fadeInDown" data-wow-duration="700ms"
                                data-wow-delay="300ms"><?php echo $item->title; ?></h3>
                            <hr class="title-border">
                        <?php endif; ?>
                    </div>

                    <div class="short-intro">
                        <?php foreach ($item->extra_fields as $extraField): ?>
                            <?php if ($extraField->value != '' && $extraField->id == 3): ?>
                                <div class="type<?php echo ucfirst($extraField->type); ?> group<?php echo $extraField->group; ?>">
                                    <span class="moduleItemExtraFieldsValue"><?php echo $extraField->value; ?></span>
                                </div>
                            <?php endif; ?>
                        <?php endforeach; ?>
                    </div>

                    <div class="desc">
                        <?php if ($params->get('itemIntroText')): ?>
                            <?php if ($params->get('itemIntroText')): ?>
                                <?php echo $item->introtext; ?>
                            <?php endif; ?>
                        <?php endif; ?>
                    </div>

                    <div class="read-btn">
                        <?php if ($params->get('itemReadMore') && $item->fulltext): ?>
                            <a href="<?php echo $item->link; ?>">
                                <?php echo JText::_('K2_READ_MORE'); ?>
                            </a>
                        <?php endif; ?>
                    </div>
                </div>
                <?php endforeach; ?>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>