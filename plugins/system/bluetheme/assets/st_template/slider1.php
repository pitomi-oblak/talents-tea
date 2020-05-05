<?php
defined('_JEXEC') or die;
$d = 4;
$random = rand();
$items = count($ig_new_array);
?>
<div id="<?php echo $sid; ?>" class="clients <?php echo $sclass; ?>">
    <div class="container">
        <div class="row text-center section-title">
            <div class="col-sm-6 col-sm-offset-3">
                <h3 class="wow fadeInDown" data-wow-duration="700ms" data-wow-delay="300ms"><?php echo $title; ?></h3>
                <hr class="title-border">
                <p class="wow fadeInUp" data-wow-duration="700ms" data-wow-delay="300ms">
                    <?php echo htmlspecialchars_decode($sdesc); ?>
                </p>
            </div>
        </div>
        <div id="clients-carousel" class="carousel slide hidden-sm hidden-xs" data-ride="carousel">
            <div class="carousel-inner wow zoomIn" data-wow-duration="700ms" data-wow-delay="300ms">
                <?php $i = 0;
                foreach ($ig_new_array as $key => $item):
                    //var_dump($item);
                    $i++;
                    $btactive = "";
                    if ($key == 0) $btactive = 'active';
                    if ($i == 1) {

                        echo '<div class="item ' . $btactive . '">
    							<ul>';
                    }
                    ?>
                    <li><a class="img-responsive" href="#"><img src="<?php echo trim($item['content']); ?>" alt=""/></a>
                    </li>

                    <?php
                    if ($key == (count($ig_new_array) - 1)) {
                        echo '</ul></div>';
                        break;
                    }
                    if ($i == $d) {
                        echo '</ul></div>';
                        $i = 0;
                    }
                endforeach;
                ?>
            </div>
            <a class="client-left" href="#clients-carousel" data-slide="prev"><i class="fa fa-angle-left"></i></a>
            <a class="client-right" href="#clients-carousel" data-slide="next"><i class="fa fa-angle-right"></i></a>
        </div>

        <div id="clients-carousel" class="carousel slide hidden-md hidden-lg" data-ride="carousel">
            <div class="carousel-inner wow zoomIn text-center" data-wow-duration="700ms" data-wow-delay="300ms">
                <?php $i = 0;
                foreach ($ig_new_array as $key => $item):
                    $class_active = '';
                    if ($key == 0) $class_active = 'active';
                    ?>
                    <div class="item <?php echo $class_active; ?>">
                        <div>
                            <a class="img-responsive" href="#"><img src="<?php echo trim($item['content']); ?>"
                                                                    alt=""/>
                            </a>
                        </div>
                    </div>
                    <?php
                endforeach;
                ?>
            </div>
        </div>
    </div>
</div><!--/#clients-->


