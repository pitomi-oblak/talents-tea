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


	<p class="wow fadeInUp" data-wow-duration="700ms" data-wow-delay="300ms">
    <?php if($params->get('itemPreText')): ?>
	<?php echo $params->get('itemPreText'); ?>
	<?php endif; ?>
    </p>
	
    
	<?php if(count($items)): ?>
    <?php foreach ($items as $key=>$item):	?>
    <div class="media">
        <div class="pull-left">
            <?php if($params->get('itemImage') && isset($item->image)): ?>
    	      <a class="moduleItemImage" href="<?php echo $item->link; ?>" title="<?php echo JText::_('K2_CONTINUE_READING'); ?> &quot;<?php echo K2HelperUtilities::cleanHtml($item->title); ?>&quot;">
    	      	<img class="img-responsive" src="<?php echo $item->image; ?>" alt="<?php echo K2HelperUtilities::cleanHtml($item->title); ?>"/>
    	      </a>
    	      <?php endif; ?>
        </div>
        <div class="media-body">
            <h4>
            	<a class="moduleItemTitle" href="<?php echo $item->link; ?>">			
				<?php if($params->get('itemTitle')): ?>
          <?php echo $item->title; ?>
          <?php endif; ?></a>
            <?php if($params->get('itemIntroText')): ?>
      <div class="moduleItemIntrotext">
	      

      	<?php if($params->get('itemIntroText')): ?>
      	<?php echo $item->introtext; ?>
      	<?php endif; ?>
      </div>
      <?php endif; ?>
            </h4>
			<p>
            <?php if($params->get('itemDateCreated')): ?>
          <span class="news-date"><?php //echo JText::_('K2_WRITTEN_ON') ; ?> <?php echo JHTML::_('date', $item->created, 'd M Y'); ?></span>
          <?php endif; ?></p>
        </div>
    </div>
    <div >
		<div >
			
			<div class="btentry-content">			
				<div class="btentry-meta">
					
                     <?php if($params->get('itemAuthor')): ?>
                      <span>
                	      <?php echo K2HelperUtilities::writtenBy($item->authorGender); ?>
                	
            				<?php if(isset($item->authorLink)): ?>
            				<a rel="author" title="<?php echo K2HelperUtilities::cleanHtml($item->author); ?>" href="<?php echo $item->authorLink; ?>"><i class="fa fa-user"></i> <?php echo $item->author; ?></a>
            				<?php else: ?>
            				<i class="fa fa-user"></i> <?php echo $item->author; ?>
            				<?php endif; ?>
            				
            				<?php if($params->get('userDescription')): ?>
            				<?php echo $item->authorDescription; ?>
            				<?php endif; ?>
        				
        			</span>
			     <?php endif; ?>
					<span>
                    <?php if($params->get('itemCommentsCounter') && $componentParams->get('comments')): ?>		
            				<?php if(!empty($item->event->K2CommentsCounter)): ?>
            					<!-- K2 Plugins: K2CommentsCounter -->
            					<?php echo $item->event->K2CommentsCounter; ?>
            				<?php else: ?>
            					<?php if($item->numOfComments>0): ?>
            					<a class="moduleItemComments" href="<?php echo $item->link.'#itemCommentsAnchor'; ?>">
            					<i class="fa fa-comments"></i> 	<?php echo $item->numOfComments; ?> <?php if($item->numOfComments>1) echo JText::_('K2_COMMENTS'); else echo JText::_('K2_COMMENT'); ?>
            					</a>
            					<?php else: ?>
            					<a class="moduleItemComments" href="<?php echo $item->link.'#itemCommentsAnchor'; ?>">
            					<i class="fa fa-comments"></i> 	<?php echo JText::_('K2_BE_THE_FIRST_TO_COMMENT'); ?>
            					</a>
            					<?php endif; ?>
            				<?php endif; ?>
            			<?php endif; ?></span>
				</div>
				
                <?php if($params->get('itemReadMore')): ?>
			<a class="btn btn-primary" href="<?php echo $item->link; ?>">
				<?php echo trim(JText::_('K2_READ_MORE')); ?>
			</a>
			<?php endif; ?>
			</div>
		</div>
	</div>
    
       
      <!-- Plugins: BeforeDisplay -->
      <?php echo $item->event->BeforeDisplay; ?>

      <!-- K2 Plugins: K2BeforeDisplay -->
      <?php echo $item->event->K2BeforeDisplay; ?>

      


      

      <!-- Plugins: AfterDisplayTitle -->
      <?php echo $item->event->AfterDisplayTitle; ?>

      <!-- K2 Plugins: K2AfterDisplayTitle -->
      <?php echo $item->event->K2AfterDisplayTitle; ?>

      <!-- Plugins: BeforeDisplayContent -->
      <?php echo $item->event->BeforeDisplayContent; ?>

      <!-- K2 Plugins: K2BeforeDisplayContent -->
      <?php echo $item->event->K2BeforeDisplayContent; ?>

      

      <?php if($params->get('itemExtraFields') && count($item->extra_fields)): ?>
      <div class="moduleItemExtraFields">
	      <b><?php echo JText::_('K2_ADDITIONAL_INFO'); ?></b>
	      <ul>
	        <?php foreach ($item->extra_fields as $extraField): ?>
					<?php if($extraField->value != ''): ?>
					<li class="type<?php echo ucfirst($extraField->type); ?> group<?php echo $extraField->group; ?>">
						<?php if($extraField->type == 'header'): ?>
						<h4 class="moduleItemExtraFieldsHeader"><?php echo $extraField->name; ?></h4>
						<?php else: ?>
						<span class="moduleItemExtraFieldsLabel"><?php echo $extraField->name; ?></span>
						<span class="moduleItemExtraFieldsValue"><?php echo $extraField->value; ?></span>
						<?php endif; ?>
						<div class="clr"></div>
					</li>
					<?php endif; ?>
	        <?php endforeach; ?>
	      </ul>
      </div>
      <?php endif; ?>


      <?php if($params->get('itemVideo')): ?>
      <div class="moduleItemVideo">
      	<?php echo $item->video ; ?>
      	<span class="moduleItemVideoCaption"><?php echo $item->video_caption ; ?></span>
      	<span class="moduleItemVideoCredits"><?php echo $item->video_credits ; ?></span>
      </div>
      <?php endif; ?>


      <!-- Plugins: AfterDisplayContent -->
      <?php echo $item->event->AfterDisplayContent; ?>

      <!-- K2 Plugins: K2AfterDisplayContent -->
      <?php echo $item->event->K2AfterDisplayContent; ?>

      

      <?php if($params->get('itemCategory')): ?>
      <?php echo JText::_('K2_IN') ; ?> <a class="moduleItemCategory" href="<?php echo $item->categoryLink; ?>"><?php echo $item->categoryname; ?></a>
      <?php endif; ?>

      <?php if($params->get('itemTags') && count($item->tags)>0): ?>
      <div class="moduleItemTags">
      	<b><?php echo JText::_('K2_TAGS'); ?>:</b>
        <?php foreach ($item->tags as $tag): ?>
        <a href="<?php echo $tag->link; ?>"><?php echo $tag->name; ?></a>
        <?php endforeach; ?>
      </div>
      <?php endif; ?>

      <?php if($params->get('itemAttachments') && count($item->attachments)): ?>
			<div class="moduleAttachments">
				<?php foreach ($item->attachments as $attachment): ?>
				<a title="<?php echo K2HelperUtilities::cleanHtml($attachment->titleAttribute); ?>" href="<?php echo $attachment->link; ?>"><?php echo $attachment->title; ?></a>
				<?php endforeach; ?>
			</div>
      <?php endif; ?>

			

			<?php if($params->get('itemHits')): ?>
			<span class="moduleItemHits">
				<?php echo JText::_('K2_READ'); ?> <?php echo $item->hits; ?> <?php echo JText::_('K2_TIMES'); ?>
			</span>
			<?php endif; ?>

			

      <!-- Plugins: AfterDisplay -->
      <?php echo $item->event->AfterDisplay; ?>

      <!-- K2 Plugins: K2AfterDisplay -->
      <?php echo $item->event->K2AfterDisplay; ?>

    <?php endforeach; ?>
  <?php endif; ?>

	<?php if($params->get('itemCustomLink')): ?>
	<a class="moduleCustomLink" href="<?php echo $params->get('itemCustomLinkURL'); ?>" title="<?php echo K2HelperUtilities::cleanHtml($itemCustomLinkTitle); ?>"><?php echo $itemCustomLinkTitle; ?></a>
	<?php endif; ?>

	<?php if($params->get('feed')): ?>
	<div class="k2FeedIcon">
		<a href="<?php echo JRoute::_('index.php?option=com_k2&view=itemlist&format=feed&moduleID='.$module->id); ?>" title="<?php echo JText::_('K2_SUBSCRIBE_TO_THIS_RSS_FEED'); ?>">
			<span><?php echo JText::_('K2_SUBSCRIBE_TO_THIS_RSS_FEED'); ?></span>
		</a>
		<div class="clr"></div>
	</div>
	<?php endif; ?>

