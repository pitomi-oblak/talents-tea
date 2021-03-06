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

// Define default image size (do not change)
K2HelperUtilities::setDefaultImage($this->item, 'itemlist', $this->params);

?>

<!-- Start K2 Item Layout -->
<article class="post format-standard <?php echo ucfirst($this->item->itemGroup); ?><?php echo ($this->item->featured) ? ' catItemIsFeatured' : ''; ?><?php if($this->item->params->get('pageclass_sfx')) echo ' '.$this->item->params->get('pageclass_sfx'); ?>">

	<!-- Plugins: BeforeDisplay -->
	<?php echo $this->item->event->BeforeDisplay; ?>

	<!-- K2 Plugins: K2BeforeDisplay -->
	<?php echo $this->item->event->K2BeforeDisplay; ?>
    
	<div class="post-box">
		<ul class="post-tags">
			<li>
				<i class="fa fa-calendar-o"></i>
				<?php if($this->item->params->get('catItemDateCreated')): ?>
        		<!-- Date created -->
                  <span class="date">
        			<?php echo JHTML::_('date', $this->item->created , 'd M Y'); ?>
        		</span>
        		<?php endif; ?>
			</li>
			<li>
				<i class="fa fa-user"></i>
				<?php if($this->item->params->get('catItemAuthor')): ?>
    		<!-- Item Author -->
    		<span class="author vcard">
    			<?php echo K2HelperUtilities::writtenBy($this->item->author->profile->gender); ?> 
    			<?php if(isset($this->item->author->link) && $this->item->author->link): ?>
    			<a rel="author" href="<?php echo $this->item->author->link; ?>"><?php echo $this->item->author->name; ?></a>
    			<?php else: ?>
    			<?php echo $this->item->author->name; ?>
    			<?php endif; ?>
    		</span>
    		<?php endif; ?>
			</li>
			<li>
				<i class="fa fa-comments"></i>
				<?php if($this->item->params->get('catItemCommentsAnchor') && ( ($this->item->params->get('comments') == '2' && !$this->user->guest) || ($this->item->params->get('comments') == '1')) ): ?>
            	<!-- Anchor link to comments below -->
            		<?php if(!empty($this->item->event->K2CommentsCounter)): ?>
            			<!-- K2 Plugins: K2CommentsCounter -->
            			<?php echo $this->item->event->K2CommentsCounter; ?>
            		<?php else: ?>
            			<?php if($this->item->numOfComments > 0): ?>
            			<a href="<?php echo $this->item->link; ?>#itemCommentsAnchor">
            				<?php echo $this->item->numOfComments; ?> <?php echo ($this->item->numOfComments>1) ? JText::_('K2_COMMENTS') : JText::_('K2_COMMENT'); ?>
            			</a>
            			<?php else: ?>
            			<a href="<?php echo $this->item->link; ?>#itemCommentsAnchor">
            				<?php echo JText::_('K2_BE_THE_FIRST_TO_COMMENT'); ?>
            			</a>
            			<?php endif; ?>
            		<?php endif; ?>
            	<?php endif; ?>
			</li>
		</ul>
		<div class="post-gal">
			<?php if($this->item->params->get('catItemImage') && !empty($this->item->image)): ?>
    	  <!-- Item Image -->
    	  <div class="btentry-thumbnail">
    		  <span class="btcatItemImage">
    		    <a href="<?php echo $this->item->link; ?>" title="<?php if(!empty($this->item->image_caption)) echo K2HelperUtilities::cleanHtml($this->item->image_caption); else echo K2HelperUtilities::cleanHtml($this->item->title); ?>">
    		    	<img class="post-image" src="<?php echo $this->item->image; ?>" alt="<?php if(!empty($this->item->image_caption)) echo K2HelperUtilities::cleanHtml($this->item->image_caption); else echo K2HelperUtilities::cleanHtml($this->item->title); ?>"  />
    		    </a>
    		  </span>
    		  <div class="clr"></div>
    	  </div>
    	  <?php endif; ?>
          
			<div class="hover-post">
                <?php if ($this->item->params->get('catItemReadMore')): ?>
    	<!-- Item "read more..." link -->
    		<a  href="<?php echo $this->item->link; ?>">
    			<?php echo JText::_('K2_READ_MORE'); ?>
    		</a>
    	<?php endif; ?>
			</div>
		</div>
		<div class="post-content">
         <?php if($this->item->params->get('catItemTitle')): ?>
    	  <!-- Item title -->
    	  <h2 class="entry-title">
    			<?php if(isset($this->item->editLink)): ?>
    			<!-- Item edit link -->
    			<span class="catItemEditLink">
    				<a class="modal" rel="{handler:'iframe',size:{x:990,y:550}}" href="<?php echo $this->item->editLink; ?>">
    					<?php echo JText::_('K2_EDIT_ITEM'); ?>
    				</a>
    			</span>
    			<?php endif; ?>
    
    	  	<?php if ($this->item->params->get('catItemTitleLinked')): ?>
    			<a href="<?php echo $this->item->link; ?>">
    	  		<?php echo $this->item->title; ?>
    	  	</a>
    	  	<?php else: ?>
    	  	<?php echo $this->item->title; ?>
    	  	<?php endif; ?>
    
    	  	<?php if($this->item->params->get('catItemFeaturedNotice') && $this->item->featured): ?>
    	  	<!-- Featured flag -->
    	  	<span>
    		  	<sup>
    		  		<?php echo JText::_('K2_FEATURED'); ?>
    		  	</sup>
    	  	</span>
    	  	<?php endif; ?>
    	  </h2>
    	  <?php endif; ?>
	   <?php if($this->item->params->get('catItemIntroText')): ?>
    	  <!-- Item introtext -->
    	  <div class="btcatItemIntroText">
    	  	<?php echo $this->item->introtext; ?>
    	  </div>
    	  <?php endif; ?>
          
       </div>
	</div>
    <header class="entry-header">
        
          <?php if($this->item->params->get('catItemExtraFields') && count($this->item->extra_fields)): ?>
    	  <!-- Item extra fields -->
    	  <div class="entry-thumbnail">
          <div id="carousel-generic" class="carousel slide">
    	  <!-- Indicators -->
      <ol class="carousel-indicators">
        <?php foreach ($this->item->extra_fields as $key=>$extraField): ?>
        <li data-target="#carousel-generic" data-slide-to="<?php echo $key; ?>" class="<?php if($key == 0) echo 'active'; ?>"></li>
        <?php endforeach; ?>
      </ol>
      <!-- Item extra fields -->
	  <div class="carousel-inner">
	  	<!--<h3><?php echo JText::_('K2_ADDITIONAL_INFO'); ?></h3> -->
			<?php foreach ($this->item->extra_fields as $key=>$extraField): ?>
			<?php if($extraField->value != ''): ?>
            <div class="item <?php if($key == 0) echo 'active'; ?>">
              <?php if($extraField->type == 'header'): ?>
				<!--<h4 class="itemExtraFieldsHeader"><?php echo $extraField->name; ?></h4> -->
				<?php else: ?>
				<!--<span class="itemExtraFieldsLabel"><?php //echo $extraField->name; ?>:</span>-->
				<?php echo $extraField->value; ?>
				<?php endif; ?>
            </div>
			
			<?php endif; ?>
			<?php endforeach; ?>
	  </div>
      <!-- Controls -->
      <a class="left carousel-control" href="#carousel-generic" data-slide="prev">
        <span class="icon-prev"></span>
      </a>
      <a class="right carousel-control" href="#carousel-generic" data-slide="next">
        <span class="icon-next"></span>
      </a>
      </div>
    	  </div>
    	  <?php endif; ?>
          
           

          <?php if($this->item->params->get('catItemVideo') && !empty($this->item->video)): ?>
          <!-- Item video -->
          <div class="format-video">
          <div class="entry-thumbnail">
          	<h3><?php //echo JText::_('K2_RELATED_VIDEO'); ?></h3>
        		<?php if($this->item->videoType=='embedded'): ?>
        		<div class="catItemVideoEmbedded">
        			<?php echo $this->item->video; ?>
        		</div>
        		<?php else: ?>
        		<span class="catItemVideo"><?php echo $this->item->video; ?></span>
        		<?php endif; ?>
          </div>
          </div>
          <?php endif; ?>

         
        <div class="entry-meta">
            
          
            <?php if($this->item->params->get('catItemCategory')): ?>
		<!-- Item category name -->
		<span class="categories-links">
			<?php echo JText::_('K2_PUBLISHED_IN'); ?>
			<a href="<?php echo $this->item->category->link; ?>"><?php echo $this->item->category->name; ?></a>
		</span>
		<?php endif; ?>
              
        
        </div>
        <!-- .entry-meta --> 
      </header>
     
  <!-- Plugins: AfterDisplayTitle -->
  <?php echo $this->item->event->AfterDisplayTitle; ?>

  <!-- K2 Plugins: K2AfterDisplayTitle -->
  <?php echo $this->item->event->K2AfterDisplayTitle; ?>

	<?php if($this->item->params->get('catItemRating')): ?>
	<!-- Item Rating -->
	<div class="catItemRatingBlock">
		<span><?php echo JText::_('K2_RATE_THIS_ITEM'); ?></span>
		<div class="itemRatingForm">
			<ul class="itemRatingList">
				<li class="itemCurrentRating" id="itemCurrentRating<?php echo $this->item->id; ?>" style="width:<?php echo $this->item->votingPercentage; ?>%;"></li>
				<li><a href="#" data-id="<?php echo $this->item->id; ?>" title="<?php echo JText::_('K2_1_STAR_OUT_OF_5'); ?>" class="one-star">1</a></li>
				<li><a href="#" data-id="<?php echo $this->item->id; ?>" title="<?php echo JText::_('K2_2_STARS_OUT_OF_5'); ?>" class="two-stars">2</a></li>
				<li><a href="#" data-id="<?php echo $this->item->id; ?>" title="<?php echo JText::_('K2_3_STARS_OUT_OF_5'); ?>" class="three-stars">3</a></li>
				<li><a href="#" data-id="<?php echo $this->item->id; ?>" title="<?php echo JText::_('K2_4_STARS_OUT_OF_5'); ?>" class="four-stars">4</a></li>
				<li><a href="#" data-id="<?php echo $this->item->id; ?>" title="<?php echo JText::_('K2_5_STARS_OUT_OF_5'); ?>" class="five-stars">5</a></li>
			</ul>
			<div id="itemRatingLog<?php echo $this->item->id; ?>" class="itemRatingLog"><?php echo $this->item->numOfvotes; ?></div>
			<div class="clr"></div>
		</div>
		<div class="clr"></div>
	</div>
	<?php endif; ?>

  <div class="btcatItemBody">

	  <!-- Plugins: BeforeDisplayContent -->
	  <?php echo $this->item->event->BeforeDisplayContent; ?>

	  <!-- K2 Plugins: K2BeforeDisplayContent -->
	  <?php echo $this->item->event->K2BeforeDisplayContent; ?>

	  

	  <!-- Plugins: AfterDisplayContent -->
	  <?php echo $this->item->event->AfterDisplayContent; ?>

	  <!-- K2 Plugins: K2AfterDisplayContent -->
	  <?php echo $this->item->event->K2AfterDisplayContent; ?>

  </div>

  <?php if(
  $this->item->params->get('catItemHits') ||
  $this->item->params->get('catItemTags') ||
  $this->item->params->get('catItemAttachments')
  ): ?>
  <div class="catItemLinks">

		<?php if($this->item->params->get('catItemHits')): ?>
		<!-- Item Hits -->
		<div class="catItemHitsBlock">
			<span class="catItemHits">
				<?php echo JText::_('K2_READ'); ?> <b><?php echo $this->item->hits; ?></b> <?php echo JText::_('K2_TIMES'); ?>
			</span>
		</div>
		<?php endif; ?>

		

	  <?php if($this->item->params->get('catItemTags') && count($this->item->tags)): ?>
	  <!-- Item tags -->
	  <div class="catItemTagsBlock">
		  <span><?php echo JText::_('K2_TAGGED_UNDER'); ?></span>
		  <ul class="catItemTags">
		    <?php foreach ($this->item->tags as $tag): ?>
		    <li><a href="<?php echo $tag->link; ?>"><?php echo $tag->name; ?></a></li>
		    <?php endforeach; ?>
		  </ul>
		  <div class="clr"></div>
	  </div>
	  <?php endif; ?>

	  <?php if($this->item->params->get('catItemAttachments') && count($this->item->attachments)): ?>
	  <!-- Item attachments -->
	  <div class="catItemAttachmentsBlock">
		  <span><?php echo JText::_('K2_DOWNLOAD_ATTACHMENTS'); ?></span>
		  <ul class="catItemAttachments">
		    <?php foreach ($this->item->attachments as $attachment): ?>
		    <li>
			    <a title="<?php echo K2HelperUtilities::cleanHtml($attachment->titleAttribute); ?>" href="<?php echo $attachment->link; ?>">
			    	<?php echo $attachment->title ; ?>
			    </a>
			    <?php if($this->item->params->get('catItemAttachmentsCounter')): ?>
			    <span>(<?php echo $attachment->hits; ?> <?php echo ($attachment->hits==1) ? JText::_('K2_DOWNLOAD') : JText::_('K2_DOWNLOADS'); ?>)</span>
			    <?php endif; ?>
		    </li>
		    <?php endforeach; ?>
		  </ul>
	  </div>
	  <?php endif; ?>

		<div class="clr"></div>
  </div>
  <?php endif; ?>

  <?php if($this->item->params->get('catItemImageGallery') && !empty($this->item->gallery)): ?>
  <!-- Item image gallery -->
  <div class="catItemImageGallery">
	  <h4><?php echo JText::_('K2_IMAGE_GALLERY'); ?></h4>
	  <?php echo $this->item->gallery; ?>
  </div>
  <?php endif; ?>


	<?php if($this->item->params->get('catItemDateModified')): ?>
	<!-- Item date modified -->
	<?php if($this->item->modified != $this->nullDate && $this->item->modified != $this->item->created ): ?>
	<span class="catItemDateModified">
		<?php echo JText::_('K2_LAST_MODIFIED_ON'); ?> <?php echo JHTML::_('date', $this->item->modified, JText::_('K2_DATE_FORMAT_LC2')); ?>
	</span>
	<?php endif; ?>
	<?php endif; ?>

  <!-- Plugins: AfterDisplay -->
  <?php echo $this->item->event->AfterDisplay; ?>

  <!-- K2 Plugins: K2AfterDisplay -->
  <?php echo $this->item->event->K2AfterDisplay; ?>

</article>
<!-- End K2 Item Layout -->
