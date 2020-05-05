
<section id="<?php echo $sid; ?>" class="<?php echo $sclass; ?>">
  <div class="container">
    <div class="row">
        <?php if(!empty($title)): ?>
            <div class="col-md-12 col-sm-12 text-center">
                <h2 class="block-header <?php echo $hclass; ?>"><?php echo $title; ?></h2>
                <p><?php echo htmlspecialchars_decode($description); ?></p>
            
            </div>
            <?php endif; ?>
      
    </div>
    <div class="row">
      
        <?php
    		if(isset($items)) :
    			foreach($items as $key=>$value):
    				$extra_fields = json_decode($value->extra_fields);
    				
    				?>
        <div class="block col-sm-6">
        <div class="left_icons style2 <?php if($key %2 ==0){echo 'to_slide_left';}else{echo 'to_slide_right';} ?>">
          <div class="dxsingle_teaser_left">
              <i class="<?php echo $extra_fields[0]->value; ?>"></i>
          </div>
          <div class="dxsingle_teaser_right">
              <h3><?php echo $value->title; ?></h3>
              <?php echo $value->introtext ?>
          </div>
        </div>
        </div>
        <?php endforeach ;
            endif; ?>
      
    </div>
  </div>
</section>
