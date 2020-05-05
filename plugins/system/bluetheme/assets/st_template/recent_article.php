<?php 
defined('_JEXEC') or die;
require_once (JPATH_SITE.'/components/com_k2/helpers/route.php');
?>
<?php if($class!="" || $id_ar!=""){ ?>
<div <?php echo ($id_ar!="")?"id='{$id_ar}'":""; ?> class="<?php echo $class; ?>">	
<?php } ?>
	<p class="section-title margint60">PORTFOLIO</p>
	<hr class="underline">
	<h2><?php echo $title; ?></h2>
	<p class="margint20">
		<?php echo rawurldecode($content); ?>
	</p>
	<ul class="prtfl-list">
	<?php foreach ($items as $key => $value) { ?>
		<li>
			<img src="<?php echo $st->getImagek2($value->id,'S'); ?>" class="img-responsive" alt="" />
			<div class="mask">
				<div class="prt-lnk-wrppr clearfix">
	            	<div class="pull-left popup"><a href="<?php echo $st->getImagek2($value->id,'XL'); ?>" class="prettyPhoto"><i class="icon-search"></i></a></div>
	            	<div class="pull-left extlink"><a href="<?php echo $st->getk2link($value->id,$value->alias,$value->catid,$value->categoryalias); ?>"><i class="icon-link"></i></a></div>
	            </div>
	        </div>
		</li>
	<?php } ?>
	</ul>

	<ul class="prtfl-list-controller margint40 clearfix">
		<li><a id="prev" href=""><i class="icon-angle-left"></i></a></li>
		<li><a href="<?php echo JRoute::_(K2HelperRoute::getCategoryRoute($category_id)); ?>"><i class="icon-expand-alt"></i></a></li>
		<li><a id="next" href=""><i class="icon-angle-right"></i></a></li>
	</ul>
<?php if($class!="" || $id!=""){ ?>
</div>
<?php } ?>
