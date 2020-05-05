<?php
	/*
	# mod_st_tweet - Twitter Module by Shinetheme.com
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

<div class="sp-tweet-list">
    <?php foreach($data as $i=>$value) { ?>
		<div class="latest_tweet">
			<?php if ($avatar) { ?>
            <?php if ($linked_avatar) { ?>
                <a target="<?php echo $target ?>" href="http://twitter.com/<?php echo $value['user']['screen_name'] ?>">
                    <img class="tweet-avatar" src="<?php echo $value['user']['profile_image_url'] ?>" alt="<?php echo $value['user']['name'] ?>" title="<?php echo $value['user']['name'] ?>" width="<?php echo $avatar_width ?>" height="<?php echo $avatar_width ?>" />
                </a>
                <?php } else { ?>
                <img class="tweet-avatar" src="<?php echo $value['user']['profile_image_url']  ?>" alt="<?php echo $value['user']['name']?>" title="<?php echo $value['user']['name'] ?>" width="<?php echo $avatar_width ?>" height="<?php echo $avatar_width ?>" />
                <?php } ?>
            <?php }else{ ?>
				
            <?php } ?>	
			
			<p>
				<?php if($tweet_time) { ?>
					<?php if ($tweet_time_linked) { ?>
						<div class="date"></div>	
						<?php } else { ?>	
						<div class="date"><?php echo $value['created_at'] ?></div>	
					<?php } ?>	
				<?php } ?>	
				<?php if($tweet_src) { ?>
					<p><?php echo JText::_('FROM') . ' ' . $value['source'] ?><?php echo $value['text'] ?></p>
				<?php } ?>
				
			</p>
            <h3><a target="<?php echo $target ?>" href="http://twitter.com/<?php echo $value['user']['screen_name'] ?>/status/<?php 
						echo  $value['id_str'] ?>"><?php echo  JText::_('ABOUT') . '&nbsp;' . $helper->timeago( $value['created_at'] ) . '&nbsp;' . JText::_('AGO');    ?></a></h3>
		</div>
	<?php } ?>	
</div>

<?php if ($follow_us) { ?> 
	<a class="followme" target="<?php echo $target ?>" href="http://twitter.com/<?php echo $data[0]['user']['screen_name'] ?>"><?php echo JText::_('FOLLOW') . ' ' . $data[0]['user']['name'] . ' ' . JText::_('ON_TWITTER') ?></a>
<?php } ?>
<div class="sp-tweet-clr"></div>