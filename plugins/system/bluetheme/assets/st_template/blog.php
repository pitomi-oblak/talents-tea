<?php
defined('_JEXEC') or die;
?>

<section id="belowcontent" class="dark_section">
<div class="container">
 <div class="row">
      <?php if(!empty($title)): ?>
      <div class="col-sm-12 text-center <?php echo $hclass; ?>">
            
          <h2 class="block-header"><?php echo $title; ?></h2>
          <p>
            <?php echo htmlspecialchars_decode($description); ?>
          </p>
      </div>
      <?php endif; ?>
  </div>
  <div class="row widget_from_blog">
        <?php if (is_array($items)): foreach($items as $k=>$item): ?>
        <?php 
        // extra fields
        $extraFields = json_decode($item->extra_fields); 
        $check_ga = false;
        foreach($extraFields as $e=>$value){
            if ($e < 1) continue;
            if ($value->value != ''){
                $check_ga = true;
                break;
            }
        }        
        $video_link = $extraFields[0]->value;                       
        $gallery1 = $extraFields[1]->value;                
        $gallery2 = $extraFields[2]->value;  
        $image_normal = 'media' . '/' . 'k2' . '/'  . 'items' . '/'  . 'cache' . '/'  . md5("Image" . $item->id) . '_M.jpg';
        $image_full = 'media' . '/' . 'k2' . '/'  . 'items' . '/'  . 'cache' . '/'  . md5("Image" . $item->id) . '_L.jpg';
        $link = 'index.php?option=com_k2&amp;view=item&amp;id='.$item->id.'&amp;Itemid='.$menuid ;
        ?>
        <div class="col-sm-6">
          <article class="post format-standard">
              <header class="entry-header">
                <div class="entry-thumbnail">
                  <?php if (Jfile::exists(JPATH_ROOT.'/'.$image_normal)): ?>  
                  <img src="<?php echo $image_normal; ?>" class="post-image" alt="<?php echo $item->title; ?>">
                  <?php endif; ?>
                  <?php if (!Jfile::exists(JPATH_ROOT.'/'.$image_normal) && $video_link != ''): ?>  
                  <iframe width="650" height="430"
                    src="<?php echo $video_link; ?>">
                    </iframe>
                  <?php endif; ?>
                  <?php if($video_link != ''): ?>
                  <!--<a class="video-view prettyPhoto" title="" rel="prettyPhoto" href="<?php echo $video_link; ?>"></a>
                  --><?php endif;?>
                  <?php if($check_ga == 'true'): ?>
                  <div id="carousel-generic" class="carousel slide">
                  <!-- Indicators -->
                  <ol class="carousel-indicators">
                    <?php  foreach($extraFields as $e=>$value){
                        if ($e < 1) continue;
                        ?>
                        <li data-target="#carousel-generic" data-slide-to="<?php echo $e-1;?>" class="<?php if($e <= 1) echo 'active'; ?>"></li>
                        
                        <?php
                    }   ?>
                  </ol>

                  <!-- Wrapper for slides -->
                  <div class="carousel-inner">
                    <?php  foreach($extraFields as $e=>$value){
                        if ($e < 1) continue;
                        ?>
                        <div class="item <?php if($e <= 1) echo 'active'; ?>">
                          <img src="<?php echo JUri::base(false).$value->value; ?>" alt="image">
                        </div>
                        <?php
                    }   ?>
                    
                  </div>

                  <!-- Controls -->
                  <a class="left carousel-control" href="#carousel-generic" data-slide="prev">
                    <span class="icon-prev"></span>
                  </a>
                  <a class="right carousel-control" href="#carousel-generic" data-slide="next">
                    <span class="icon-next"></span>
                  </a>
                </div>
                <?php endif;?>
                
                </div>
              </header>
              <!-- .entry-header -->
              
              <div class="entry-content">
                <h2 class="entry-title">
                  <a href="<?php echo JRoute::_($link); ?>" rel="bookmark"><?php echo $item->title; ?></a>
                </h2>
                <p class="date">
                  <span class="entry-date"><?php echo $item->created; ?></span>
                </p>
                <?php echo $item->introtext; ?>
                
              </div>
              <!-- .entry-content -->
              <div class="entry-share">
                <p class="text-center">
                  <a class="socialico-facebook" href="#" title="Facebook">#</a>
                  <a class="socialico-twitter" href="#" title="Twitter">#</a>
                  <a class="socialico-google" href="#" title="Google">#</a>
                </p>
              </div>
              <!-- .entry-share -->
            </article>
        </div>
        <?php endforeach;endif; ?>
  </div><!--eof col-sm6-->
  <div class="row">
    <div class="col-sm-12"><p class="text-center loadmore"><a href="<?php echo 'index.php?option=com_k2&amp;view=itemlist&amp;layout=category&amp;id='.$category; ?>" class="theme_btn inverse">View All</a></p></div>  
  </div>
</div>
</section>



