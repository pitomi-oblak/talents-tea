<?php
/**
 * @package     Joomla.Site
 * @subpackage  Templates.Doors
 * @author      cmsBlueTheme.com
 * @copyright   Copyright (C) 2005 - 2013 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

// Getting params from template
$params = JFactory::getApplication()->getTemplate(true)->params;

$app = JFactory::getApplication();
$doc = JFactory::getDocument();
$this->language = $doc->language;
$this->direction = $doc->direction;

// Detecting Active Variables
$option = $app->input->getCmd('option', '');
$view = $app->input->getCmd('view', '');
$layout = $app->input->getCmd('layout', '');
$task = $app->input->getCmd('task', '');
$itemid = $app->input->getCmd('Itemid', '');
$sitename = $app->getCfg('sitename');

if ($task == "edit" || $layout == "form") {
    $fullWidth = 1;
} else {
    $fullWidth = 0;
}

// Add JavaScript Frameworks
//JHtml::_('bootstrap.framework');
// Load optional RTL Bootstrap CSS
//JHtml::_('bootstrap.loadCss', false, $this->direction);

// Add current user information
$user = JFactory::getUser();

// Logo file or site title param
if ($this->params->get('logoFile')) {
    $logo = '<img src="' . JUri::root() . $this->params->get('logoFile') . '" alt="' . $sitename . '" />';
} elseif ($this->params->get('sitetitle')) {
    $logo = '<span class="site-title" title="' . $sitename . '">' . htmlspecialchars($this->params->get('sitetitle')) . '</span>';
} else {
    $logo = '<span class="site-title" title="' . $sitename . '">' . $sitename . '</span>';
}
$menu = $app->getMenu();

$url = $this->baseurl . '/templates/' . $this->template . '/';
if ($this->params->get('favicon')) {
    $favicon = $this->params->get('favicon');
}
$main_color = $params->get('templateColor', '#d9232d');
$main_color1 = $params->get('templateColor2', '#bd1e26');
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php echo $this->language; ?>"
      lang="<?php echo $this->language; ?>" dir="<?php echo $this->direction; ?>">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <jdoc:include type="head"/>
    <!-- Standard Favicon-->
    <link rel="shortcut icon"
          href="<?php echo JURI::base(true) . (!empty($favicon) ? '/' . $favicon : '/images/favicon.ico'); ?>">
    <!--CSS-->
    <link href="https://fonts.googleapis.com/css?family=Roboto&amp;subset=latin-ext" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Sacramento" rel="stylesheet">
    <link href="<?php echo JUri::root() . 'templates/' . $this->template; ?>/css/bootstrap.min.css" rel="stylesheet">
    <link href="<?php echo JUri::root() . 'templates/' . $this->template; ?>/css/animate.css" rel="stylesheet">
    <link href="<?php echo JUri::root() . 'templates/' . $this->template; ?>/css/font-awesome.min.css" rel="stylesheet">
    <link href="<?php echo JUri::root() . 'templates/' . $this->template; ?>/css/font.css" rel="stylesheet">
    <link href="<?php echo JUri::root() . 'templates/' . $this->template; ?>/css/prettyPhoto.css" rel="stylesheet">
    <link href="<?php echo JUri::root() . 'templates/' . $this->template; ?>/css/main.css" rel="stylesheet">
    <link href="<?php echo JUri::root() . 'templates/' . $this->template; ?>/css/responsive.css" rel="stylesheet">
    <link href="<?php echo JUri::root() . 'templates/' . $this->template; ?>/css/custom.css" rel="stylesheet">
    <!-- LESS stylesheet for managing color presets -->
    <link rel="stylesheet/less" type="text/css"
          href="<?php echo $url; ?>less/color.php?group1=<?php echo str_replace('#', '', $main_color); ?>&group2=<?php echo str_replace('#', '', $main_color1); ?>">

    <!-- LESS JS engine-->
    <script src="<?php echo JURI::base(true); ?>/templates/<?php echo $this->template . '/'; ?>less/less-1.5.0.min.js"></script>

    <!--[if lt IE 9]>
    <script src="<?php echo $this->baseurl ?>/media/jui/js/html5.js"></script>
    <![endif]-->

</head>

<body id="<?php if ($option != 'com_blue_pagebuilder') {
    echo 'talent-blog-page';
} else {
    echo 'btsingle-blog-page';
}; ?>" class="site <?php echo $option
    . ' view-' . $view
    . ($layout ? ' layout-' . $layout : ' no-layout')
    . ($task ? ' task-' . $task : ' no-task')
    . ($itemid ? ' itemid-' . $itemid : '')
    . ($params->get('fluidContainer') ? ' fluid' : '');
?>">
<!-- Container -->
<!-- Page Loader -->
<div class="preloader">
    <div id="loaderImage"></div>
</div>
<input type="hidden" id="bturl" value="<?php echo JUri::root(); ?>"/>
<header id="navigation">
    <div class="navbar main-nav" role="banner">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="<?php echo JUri::root(); ?>">
                    <?php echo $logo; ?>
                </a>
            </div>
            <nav class="collapse navbar-collapse navbar-right">
                <jdoc:include type="modules" name="menu" style="xhtml"/>
            </nav>
        </div>
    </div>
</header><!--/#navigation-->
<?php if ($option != 'com_blue_pagebuilder') { ?>
    <section id="blog-details">
<!--        <div class="container">-->
            <div class="blog-item">
                <div class="blog-content">
                    <jdoc:include type="message"/>
                    <jdoc:include type="component"/>
                </div>
                <div class="col-md-3 col-sm-6">
                    <div class="sidebar">
                        <jdoc:include type="modules" name="right" style="widget"/>
                    </div>
                </div>
<!--            </div>-->
        </div>
    </section>
<?php } else { ?>
    <jdoc:include type="message"/>
    <jdoc:include type="component"/>
<?php } ?>

<footer id="footer">
    <div class="container text-center wow zoomIn" data-wow-duration="700ms" data-wow-delay="300ms">
        <jdoc:include type="modules" name="footer" style="xhtml"/>
    </div>
    <a data-scroll href="#navigation" class="to-top"></a>
</footer><!--/#footer-->

<jdoc:include type="modules" name="debug" style="none"/>

<!--/#scripts-->
<script type="text/javascript" src="<?php echo JUri::root() . 'templates/' . $this->template; ?>/js/jquery.js"></script>
<script type="text/javascript"
        src="<?php echo JUri::root() . 'templates/' . $this->template; ?>/js/bootstrap.min.js"></script>
<script type="text/javascript"
        src="<?php echo JUri::root() . 'templates/' . $this->template; ?>/js/jquery.prettyPhoto.js"></script>
<script type="text/javascript"
        src="<?php echo JUri::root() . 'templates/' . $this->template; ?>/js/jquery.parallax.js"></script>
<script type="text/javascript"
        src="<?php echo JUri::root() . 'templates/' . $this->template; ?>/js/jquery.isotope.min.js"></script>
<script type="text/javascript"
        src="<?php echo JUri::root() . 'templates/' . $this->template; ?>/js/jquery.easypiechart.min.js"></script>
<script type="text/javascript"
        src="<?php echo JUri::root() . 'templates/' . $this->template; ?>/js/jquery.appear.js"></script>
<script type="text/javascript"
        src="<?php echo JUri::root() . 'templates/' . $this->template; ?>/js/jquery.inview.min.js"></script>
<script type="text/javascript"
        src="<?php echo JUri::root() . 'templates/' . $this->template; ?>/js/wow.min.js"></script>
<script type="text/javascript"
        src="<?php echo JUri::root() . 'templates/' . $this->template; ?>/js/jquery.countTo.js"></script>
<script type="text/javascript"
        src="<?php echo JUri::root() . 'templates/' . $this->template; ?>/js/smooth-scroll.js"></script>
<script type="text/javascript" src="<?php echo JUri::root() . 'templates/' . $this->template; ?>/js/canvas.js"></script>
<script type="text/javascript"
        src="<?php echo JUri::root() . 'templates/' . $this->template; ?>/js/preloader.js"></script>
<script type="text/javascript" src="<?php echo JUri::root() . 'templates/' . $this->template; ?>/js/main.js"></script>

</body>
</html>
