<?php
defined('_JEXEC') or die;
?>

<section class="team_member_wrap parallax" <?php if (!empty($bg)) echo 'style="background-image: url('.JUri::root().$bg.');"'; ?>>
    <div class="container">
        <div class="row">
            <?php if(!empty($title)): ?>
            <div class="col-md-12 mb content_pb wow fadeInDown">
                <div class="<?php echo $hclass; ?> wow">
                	<h1><?php echo $title; ?></h1>
                </div>
            </div>
            <?php endif; ?>
            <div class="team_member_content_wrap">
            <?php if (is_array($items)): foreach($items as $k=>$item): ?>
                <?php 
                $image_normal = 'media' . '/' . 'k2' . '/'  . 'items' . '/'  . 'cache' . '/'  . md5("Image" . $item->id) . '_S.jpg';
                // extra fields
                $extraFields = json_decode($item->extra_fields);
                $avatar = $extraFields[0]->value;                
                $position = $extraFields[1]->value;                
                $face = $extraFields[2]->value;                
                $linkin = $extraFields[3]->value;                
                $twiter = $extraFields[4]->value;
                
                ?>
                <div class="team_member_content mb content_pt wow <?php if ($k == 0) {echo 'fadeInLeftBig';}elseif ($k == (count($items)-1)){echo 'fadeInRightBig';}else{echo 'fadeInUpBig';} ?> content_pb">
                     <div class="team_member_head">
                            <div class="member_image">
                                <img src="<?php echo JUri::root().$avatar; ?>" alt="<?php echo $item->title; ?>">
                            </div>
                            <div class="member_detail">
                                <h1><?php echo $item->title; ?></h1>
                                <h3><?php echo $position; ?></h3>
                            </div>
                        </div>
                        <div class="clear"></div>
                        <div class="team_bottom">
                            <div class="member_social_icon">
                                <ul>
                                    <li><a href="<?php echo $face; ?>" class="icon-facebook-4 "></a></li>
                                    <li><a href="<?php echo $linkin; ?>" class="icon-linkedin"></a></li>
                                    <li><a href="<?php echo $twiter; ?>" class="icon-twitter"></a></li>                                
                                </ul>
                            </div>

                            <div class="view_icon view_icon<?php echo ($k+1); ?>">
                                <span class="icon-plus-3"></span>
                                <span class="icon-minus-3"></span>
                            </div>
                            <div class="clear"></div>
                        </div>

                        <div class="member_description member_description<?php echo ($k+1); ?>">
                            <?php echo $item->introtext; ?>
                        </div>
                </div>
            <?php endforeach;endif; ?>
            </div>
        </div>
    </div>
 </section>