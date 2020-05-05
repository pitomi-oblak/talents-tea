<?php
	/*
	# mod_tp_tweet - Twitter Module by Shinetheme.com
	# -----------------------------------------------
	# Author    Shinetheme http://www.Shinetheme.com
	# Copyright (C) 2010 - 2012 Shinetheme.com. All Rights Reserved.
	# license - PHP files are licensed under  GNU/GPL V2
	# license - CSS  - JS - IMAGE files  are Copyrighted material
	# Websites: http://www.Shinetheme.com
	*/
    // no direct access
    defined( '_JEXEC' ) or die( 'Restricted access' );
?>
<div class="tweet_wrap text-center">
<div class="tweet_arrow2">
    <span><a href="#tweet_slider" data-slide="prev" class="ar_left"></a></span>
    <span><a href="#tweet_slider" data-slide="next" class="ar_right"></a></span>
</div>
<div id="tweet_slider" class="carousel slide" data-ride="carousel">                       
  <!-- Wrapper for slides -->
  <div class="carousel-inner">
        <?php foreach($data as $i=>$value) { ?>
            <div class="item <?php if ($i == 0) echo 'active'; ?>">
    
    
                <?php if($tweet_src) { ?>
    					<div class="tweer_head"><span class="icon-twitter icon"></span>
                        <span> <?php echo $data[0]['user']['name']; ?>
                        <?php //echo JText::_('FROM') . ' ' . $value['source']?></span>
                        </div>
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
                    <div class="tweer_content">
                        <p class="tweet_text">
    				<?php echo $helper->prepareTweet($value['text'])?>
                    </p>
                        
                        <?php if($tweet_time) { ?>
    					<?php if ($tweet_time_linked) { ?>
    						<h2 class="tweet_time"><a target="<?php echo $target ?>" href="http://twitter.com/<?php echo $value['user']['screen_name'] ?>/status/<?php
    						echo  $value['id_str'] ?>"><?php echo  JText::_('ABOUT') . '&nbsp;' . $helper->timeago( $value['created_at'] ) . '&nbsp;' . JText::_('AGO');    ?></a></h2>
    						<?php } else { ?>	
    						<div class="date"><?php echo $value['created_at'] ?></div>	
    						<?php } ?>	
    					<?php } ?>
                        <?php if ($follow_us) { ?> 
                            <a class="button follow_us_button follow_button_default" target="<?php echo $target ?>" href="http://twitter.com/<?php echo $data[0]['user']['screen_name'] ?>"><?php echo JText::_('FOLLOW') . ' ' . $data[0]['user']['name'] ; ?></a>
                        <?php } ?>
                    </div> 
    				
    
    				
    				<?php if($tweet_time || $tweet_src ) { ?>
    
    				<?php } ?>
            </div>
        <?php } ?>
    
  </div>
  </div>
  </div>