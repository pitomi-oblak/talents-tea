<?php 
defined('_JEXEC') or die;
add_shortcode('gmap_desi','geomapDesignShortcode');
function geomapDesignShortcode($atts, $content=null){
 	extract(shortcode_atts(array(
		"title" => '', 
		"class" => '', 
		"zoom"=>'14',
		"maptype"=>'ROADMAP',
		"pancontrol"=>"true",
		"zoomcontrol"=>"true",
		"maptypecontrol"=>"true",
		"streetcontrol"=>"true",
		"location"=>"",
		"height"=>400,
		"scrollwheel"=>"false",
        "state"=>"true"

	),$atts));
    if(!$state) return true;
    $l_map = getll($location);
    $latitude = $l_map[0];
    $longitude = $l_map[1];
    $st = new BluethemePlugin();
    $req = BluethemePlugin::addTemplate('gmap');
	if($req["check"]){
		require $req["src"];
	}
}
function getll($address){
    $result = array();
    $prepAddr = str_replace(' ','+',$address);
    $geocode=file_get_contents('http://maps.google.com/maps/api/geocode/json?address='.$prepAddr.'&sensor=false');
    $output= json_decode($geocode);
    $latitude = $output->results[0]->geometry->location->lat;
    $result[0] = $latitude;
    $longitude = $output->results[0]->geometry->location->lng;
    $result[1] = $longitude;
    return $result;
}
?>