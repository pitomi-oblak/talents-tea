<?php 
/**
 * @author cmsbluetheme - www.cmsbluetheme.com
 * @date: Aug 2013.
 * @copyright  Copyright (C) 2013 cmsbluetheme.com . All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE
 */
defined('_JEXEC') or die('Restricted access');

add_shortcode('contact_desi', 'ContactDesignShortcode');

function ContactDesignShortcode($atts,$content=null){

 	extract(shortcode_atts(array(
    	"captcha"=>false,
        "title"=>"",
        "description"=>"",
        "email"=>"",
        "subject"=>"",
        "thanks"=>"",
        "state"=>"1",
        "captchasitekey"=>"",
        "captchasecret"=>"",
        "stateggcaptcha"=>"1",
        "fax"=>"",
        "phone"=>"",
        "address"=>"",
        "business"=>"",
        "sid"=>"1",
        "sclass"=>"",
        "cclass"=>""
    	), $atts));
    if(!$state) return true;
    $req = BluethemePlugin::addTemplate('contact');
    $id=rand();

	if($req["check"]){

		require $req["src"];

	}

}

?>