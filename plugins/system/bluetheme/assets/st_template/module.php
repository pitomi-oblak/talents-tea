<?php 
defined('_JEXEC') or die;
?>
<div class="st-module module <?php echo $moduleclass; ?>" id="Mod<?php echo $module->id; ?>">
	<div class="module-inner">
		<?php if ($showtitle != 0) : ?>
			<h1 class="module-title <?php echo $hclass; ?>">
				<?php echo $module->title; ?>
			</h1>
		<?php endif; ?>
		<div class="module-ct">
			<?php echo $module->content; ?>
		</div>
	</div>
</div>