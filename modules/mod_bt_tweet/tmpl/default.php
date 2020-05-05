<?php
	/*
	# mod_sp_tweet - Twitter Module by Cmsbluetheme.com
	# -----------------------------------------------
	# Author    Cmsbluetheme http://www.Cmsbluetheme.com
	# Copyright (C) 2010 - 2012 Cmsbluetheme.com. All Rights Reserved.
	# license - PHP files are licensed under  GNU/GPL V2
	# license - CSS  - JS - IMAGE files  are Copyrighted material
	# Websites: http://www.Cmsbluetheme.com
	*/
    // no direct access
    defined( '_JEXEC' ) or die( 'Restricted access' );
?>
<div class="tweet-list">
<div class="tweet_style1_arrow">
    <span><a href="#tweet_slider2" data-slide="prev" class="tweet_style1_arrow_left"></a></span>
    <span><a href="#tweet_slider2" data-slide="next" class="tweet_style1_arrow_right"></a></span>
</div>
<div id="tweet_slider2" class="carousel slide" data-ride="carousel">                         
  <!-- Wrapper for slides -->
  <div class="carousel-inner">
        <?php foreach($data as $i=>$value) { ?>
            <div class="item <?php if ($i == 0) echo 'active'; ?>">
    
    
                <?php if($tweet_src) { ?>
    					<p><span class="icon-twitter icon"></span><?php echo JText::_('FROM') . ' ' . $value['source']?></p>
    					<?php } ?>
                <?php if ($avatar) { ?>
                    <?php if ($linked_avatar) { ?>
                        <a target="<?php echo $target ?>" href="http://twitter.com/<?php echo $value['user']['screen_name'] ?>">
                            <img class="tweet-avatar" src="<?php echo $value['user']['profile_image_url'] ?>" alt="<?php echo $value['user']['name'] ?>" title="<?php echo $value['user']['name'] ?>" width="<?php echo $avatar_width ?>" height="<?php echo $avatar_width ?>" />
                        </a>
                        <?php } else { ?>
                        <img class="tweet-avatar" src="<?php echo $value['user']['profile_image_url']  ?>" alt="<?php echo $value['user']['name']?>" title="<?php echo $value['user']['name'] ?>" width="<?php echo $avatar_width ?>" height="<?php echo $avatar_width ?>" />
                        <?php } ?>
                    <?php } ?>
                    <div class="tweet_style1_content">
                        <p class="tweet_text">
    				<?php echo $helper->prepareTweet($value['text'])?>
                    </p>
                        
                        <?php if($tweet_time) { ?>
    					<?php if ($tweet_time_linked) { ?>
    						<span><?php echo  JText::_('ABOUT') . '&nbsp;' . $helper->timeago( $value['created_at'] ) . '&nbsp;' . JText::_('AGO');    ?></span>
    						<?php } else { ?>	
    						<div class="date"><?php echo $value['created_at'] ?></div>	
    						<?php } ?>	
    					<?php } ?>
                    </div> 
    				
    
    				
    				<?php if($tweet_time || $tweet_src ) { ?>
    
    				<?php } ?>
            </div>
        <?php } ?>
    <?php if ($follow_us) { ?> 
        <a class="followme" target="<?php echo $target ?>" href="http://twitter.com/<?php echo $data[0]['user']['screen_name'] ?>"><?php echo JText::_('FOLLOW') . ' ' . $data[0]['user']['name'] . ' ' . JText::_('ON_TWITTER') ?></a>
    <?php } ?>
  </div>
  </div>
  </div>