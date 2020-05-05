<?php 
defined('_JEXEC') or die;
?>
<div id='fb-root'></div>
<div class="fb-like-box" 
    data-href="<?php echo trim($content); ?>"
    data-width="<?php echo $width; ?>"
    data-height="<?php echo $height; ?>"
    data-colorscheme="<?php echo $colorscheme; ?>"
    data-show-faces="<?php echo $showfaces; ?>"
    data-header="<?php echo $showheader; ?>"
    data-stream="<?php echo $showstream; ?>"
    data-show-border="<?php echo $showborder; ?>"></div>