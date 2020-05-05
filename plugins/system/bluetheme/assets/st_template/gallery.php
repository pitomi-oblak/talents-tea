<?php if($title != ''): ?>

<div class="<?php echo $class; ?>">
    <h1><?php echo $title; ?></h1>
</div>
<?php  endif; ?>
<div class="gallery_style gallery_style1">
    <div id="gallery-style1" class="carousel slide" data-ride="carousel">
        <!-- Wrapper for slides -->
        
        <div class="carousel-inner"><?php
        foreach($ig_new_array as $key=>$item):
            //var_dump($item);
        ?>
            <div class="item  <?php if($key == 0) echo 'active'; ?>">
              <img src="<?php echo JString::ltrim(urldecode($item['content'])); ?>" alt="image" >  
            </div>  
        <?php endforeach; ?>                      
        </div>
        <!-- Controls -->
        <a class="left carousel-control" href="#gallery-style1" data-slide="prev"></a>
        <a class="right carousel-control" href="#gallery-style1" data-slide="next"></a>
    </div>
</div>