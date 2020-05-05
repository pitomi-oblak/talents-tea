
<div class="box-section testimonial-section triggerAnimation animated" data-animate="swing">
<h2>Client Testimonials</h2>
    <ul class="bxslider triggerAnimation animated" data-animate="fadeIn">
        <?php
        foreach($ig_new_array as $k=>$item){
            //var_dump($item);
        ?>
        <li>
			<img alt="<?php echo urldecode($item['title']); ?>" src="<?php echo trim(urldecode($item['content'])); ?>">
			<div class="message-content">
				<p><?php echo urldecode($item['desc']); ?></p>
				<h6><?php echo urldecode($item['title']); ?><span>  <?php echo urldecode($item['position']); ?></span></h6>
			</div>
		</li>
        
        <?php } ?> 
    </ul>
</div>


