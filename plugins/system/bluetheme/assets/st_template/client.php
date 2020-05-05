<section class="client_wrap parallax" <?php if (!empty($bg)) echo 'style="background-image: url('.JUri::root().$bg.');"'; ?>>
        <div class="container">
            <div class="row">
                <?php if($title != ''): ?>
                <div class="col-md-12 <?php echo $class; ?> mb content_pb wow bounceIn">
                    <h1><?php echo $title;?></h1>
                </div>
                <?php  endif; ?>
                <div class="col-md-12 content_pt mt">
                    <div class="client_slider">
                           <ul>
                              <?php
    foreach($ig_new_array as $item){
        //var_dump($item);
    ?>
                               <li class="wow fadeIn">
                                   <a href="#" class="client_logo " style="background-image: url(<?php echo JUri::base().ltrim(urldecode($item['content'])); ?>);"></a>
                               </li>  
    <?php } ?>                         
                           </ul> 
                           <div class="clear"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>