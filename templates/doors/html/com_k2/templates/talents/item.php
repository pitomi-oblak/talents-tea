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


$fields = array();


foreach ($this->item->extra_fields as $value) {

    $item_n = array();

    $item_n['id'] = $value->id;

    $item_n['name'] = $value->name;

    $item_n['value'] = $value->value;

    $item_n['type'] = $value->type;

    $item_n['group'] = $value->group;

    $item_n['published'] = $value->published;

    $item_n['ordering'] = $value->ordering;

    $item_n['alias'] = $value->alias;

    $fields[$value->id] = $item_n;

}


?>

<div class="talents-page">



    <div class="container">
        <div class="row section-title">
            <div class="col-md-12">
                <h3>
                    <?php if ($this->item->params->get('itemTitle')): ?>
                        <!-- Item title -->
                        <?php echo $this->item->title; ?>
                    <?php endif; ?>
                    <hr class="title-border">
                </h3>
            </div>
            <div class="col-md-10 col-md-offset-1">
                <div class="short-intro">
                    <?php if ($fields["3"]["value"]): ?>
                        <?php print $fields["3"]["value"]; ?>
                    <?php endif; ?>
                </div>
            </div>
        </div>
        <div class="row about">
            <div class="col-md-10 col-md-offset-1">
                <div class="introduction">
                    <?php if (!empty($this->item->fulltext)): ?>
                        <?php if ($this->item->params->get('itemIntroText')): ?>
                            <!-- Item introtext -->
                            <?php echo $this->item->introtext; ?>
                        <?php endif; ?>
                        <?php if ($this->item->params->get('itemFullText')): ?>
                            <!-- Item fulltext -->
                            <?php echo $this->item->fulltext; ?>
                        <?php endif; ?>
                    <?php else: ?>
                        <!-- Item text -->
                        <?php echo $this->item->introtext; ?>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>

    <div class="container-fluid parallax">
        <div class="contact-bg">
            <div class="row section-title">
                <div class="col-md-12">
                    <h3> Kontaktirajte Nas
                        <hr class="title-border">
                    </h3>
                </div>
            </div>
            <div class="row contact">
                <div class="col-sm-10 col-sm-offset-1">
                    <div class="contact-wrapper">
                        <div class="row">
                            <div class="col-sm-10 col-sm-offset-1">
                                <div><?php if ($fields["7"]["value"]): ?>
                                        <p class="text">
                                            <?php print $fields["7"]["value"]; ?>
                                        </p>
                                    <?php endif; ?>
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="align-wrap" style="text-align: center">
                                    <div><?php if ($fields["4"]["value"]): ?>
                                            <span>
                                <i class="fa fa-phone" aria-hidden="true"></i>
                                                <?php print $fields["4"]["name"]; ?>

                                                <?php print $fields["4"]["value"]; ?>
                            </span>
                                        <?php endif; ?></div>

                                    <div><?php if ($fields["6"]["value"]): ?>
                                            <span>
                                <i class="fa fa-phone" aria-hidden="true"></i>
                                                <?php print $fields["6"]["name"]; ?>

                                                <?php print $fields["6"]["value"]; ?>
                            </span>
                                        <?php endif; ?></div>

                                    <div><?php if ($fields["5"]["value"]): ?>
                                            <span>
                                <i class="fa fa-envelope" aria-hidden="true"></i>
                                                <?php print $fields["5"]["name"]; ?>

                                                <?php print $fields["5"]["value"]; ?>
                            </span>
                                        <?php endif; ?>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
