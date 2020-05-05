<?php
defined('_JEXEC') or die;
$doc = JFactory::getDocument();
$doc->addScript(JURI::root(true) . '/plugins/system/bluetheme/assets/js/form-validation.js');
$app = JFactory::getApplication('site');
$componentParams = $app->getParams('com_blue_pagebuilder');
$style = $componentParams->get('style', '1');
$business_hours = explode('|', $business);
if ($stateggcaptcha == '1' && $captchasecret && $captchasitekey) {
    $captcha = true;
} else
    $captcha = false;
?>
<section data-animate="flipInY"
         class="contact-setion box-section contact-section triggerAnimation animated <?php echo $sclass; ?>"
         id="<?php echo $sid; ?>">
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <div class="section-title">
                    <h3 class="wow fadeInDown" data-wow-duration="700ms"
                        data-wow-delay="300ms"><?php echo $title; ?></h3>
                    <p class="wow fadeInUp" data-wow-duration="700ms" data-wow-delay="300ms">
                        <?php echo htmlspecialchars_decode($description); ?>
                    <hr class="title-border">
                    </p>
                </div>
            </div>
        </div>
        <div class="contact-content">
            <div class="row">
                <div class="col-md-8 col-md-offset-2 wow zoomIn" data-wow-duration="700ms" data-wow-delay="500ms">
                    <!--                    <h2>-->
                    <?php //echo JText::_('COM_BLUE_PAGEBUILDER_CONTACT_FORM_TITLE'); ?><!--</h2>-->
                    <div class="alert alert-error error text-center theme_btn color1 inverse" id="fname">
                        <p><?php echo JText::_('COM_BLUE_PAGEBUILDER_NAME_MUST_NOT_BE_EMPTY_TEXT'); ?></p>
                    </div>
                    <div class="alert alert-error  error text-center theme_btn color1 inverse" id="fmail">
                        <p><?php echo JText::_('COM_BLUE_PAGEBUILDER_PLEASE_PROVIDE_A_VALID_EMAIL_TEXT'); ?></p>
                    </div>
                    <div class="alert alert-error  error text-center theme_btn color1 inverse" id="fmsg">
                        <p><?php echo JText::_('COM_BLUE_PAGEBUILDER_MESSAGE_SHOULD_NOT_BE_EMPTY_TEXT'); ?></p>
                    </div>
                    <div class="alert alert-success success text-center theme_btn inverse color3"></div>
                    <form id="contact-form" class="contact-form" name="contact-form" method="post"
                          action="index.php?option=com_blue_pagebuilder&amp;task=page.contact&amp;tmpl=component"
                          enctype="multipart/form-data" method="post">
                        <div class="row">
                            <div class="form-group col-sm-6 name-field">
                                <input type="text" name="name" id="name" class="form-control" required="required"
                                       placeholder="<?php echo JText::_('COM_BLUE_PAGEBUILDER_YOUR_NAME_TEXT'); ?>">
                            </div>
                            <div class="form-group col-sm-6 email-field">
                                <input type="email" name="email" id="email" class="form-control" required="required"
                                       placeholder="<?php echo JText::_('COM_BLUE_PAGEBUILDER_VALID_EMAIL_ID_TEXT'); ?>">
                            </div>
                            <div class="form-group col-sm-12">
                                <textarea name="message" id="msg" required="required" class="form-control" rows="8"
                                          placeholder="<?php echo JText::_('COM_BLUE_PAGEBUILDER_YOUR_MESSAGE_TEXT'); ?>"></textarea>
                            </div>

                            <!--                                                    </div>-->
                            <!--                                                    <div class="clearfix clear-both" style="margin-bottom: 5px;">-->
                            <!--                                                        ?php if ($captcha): ?>-->
                            <!--                                                            <script src='https://www.google.com/recaptcha/api.js'></script>-->
                            <!--                                                            <div class="g-recaptcha" data-sitekey="-->
                            <!--                            ?php echo $captchasitekey; ?>"></div>-->
                            <!--                                                        ?php endif; ?-->
                            <!--                                                    </div>-->
                            <!--                                                    <input type="hidden" class="captchasecret" name="captchasecret"-->
                            <!--                                                           value="?php echo $captchasecret; ?"/>-->
                            <!--                                                    <input type="hidden" class="bt_check_gg" name="bt_check_gg" value="-->
                            <!--                            ?php echo $captcha; ?"/>-->

                            <div class="form-group btn-align">
                                <button type="submit"
                                        class="send-btn btn btn-default"><?php echo JText::_('COM_BLUE_PAGEBUILDER_BTN_SUBMIT'); ?></button>
                            </div>
                        </div>
                        <input type="hidden" class="subject" name="subject"
                               value="<?php echo(!empty($subject) ? $subject : ''); ?>"/>
                        <input type="hidden" class="thank" name="thanks"
                               value="<?php echo(!empty($thanks) ? $thanks : ''); ?>"/>
                        <input type="hidden" class="emailauthor" name="emailauthor"
                               value="<?php echo(!empty($email) ? $email : ''); ?>"/>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div class="row contact-data">
        <address>
            <!--                            <p><i class="fa fa-map-marker"></i>-->
            <!--                                ?php echo JText::_('COM_BLUE_PAGEBUILDER_ADDRESS_LBL') . $address; ?> </p>-->
<!--            <p><i class="fa fa-phone"></i>-->
<!--                ?php echo JText::_('COM_BLUE_PAGEBUILDER_PHONE_LBL') . $phone; ?> </p>-->
            <p><i class="fa fa-envelope"></i>
                <?php echo JText::_('COM_BLUE_PAGEBUILDER_EMAIL_LBL') . $email; ?></p>
        </address>
    </div>
</section>    