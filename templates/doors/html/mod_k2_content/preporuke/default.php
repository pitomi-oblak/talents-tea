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

<div id="recommendation" class="recommendation-section">
    <div class="container">
        <div class="row text-center section-title">
            <div class="col-sm-6 col-sm-offset-3">
                <h3 class="wow fadeInDown" data-wow-duration="700ms"
                    data-wow-delay="300ms"><?php echo $module->title; ?></h3>
                <hr class="title-border">
                <p class="wow fadeInUp" data-wow-duration="700ms" data-wow-delay="300ms">
                    <?php if ($params->get('itemPreText')): ?>
                        <?php echo $params->get('itemPreText'); ?>
                    <?php endif; ?>
                </p>
            </div>
        </div>
        <div class="row recommendation-module">
            <?php if (count($items)): ?>
                <?php foreach ($items as $key => $item): ?>
                    <div class="col-sm-12 col-md-4">
                        <div class="recommendation-wrapper">
                            <div class="text">
                                <?php if ($params->get('itemIntroText')): ?>
                                    <?php echo $item->introtext; ?>
                                <?php endif; ?>
                            </div>
                            <div class="recommended-by">
                                <?php foreach ($item->extra_fields as $extraField): ?>
                                    <?php if ($extraField->value != ''): ?>
                                        <div class="type<?php echo ucfirst($extraField->type); ?> group<?php echo $extraField->group; ?>">
                                            <span class="moduleItemExtraFieldsValue"><?php echo $extraField->value; ?></span>
                                        </div>
                                    <?php endif; ?>
                                <?php endforeach; ?>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>
    </div>
</div>