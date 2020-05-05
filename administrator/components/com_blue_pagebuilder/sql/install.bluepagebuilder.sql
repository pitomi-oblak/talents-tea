CREATE TABLE IF NOT EXISTS `#__blue_pagebuilder` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `code` text,
  `config` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `#__blue_pagebuilder_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(40) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `class` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `defaultcode` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=19 ;

CREATE TABLE IF NOT EXISTS `#__blue_pagebuilder_design` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pageid` int(11) NOT NULL,
  `json` text NOT NULL,
  `type` varchar(40) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

INSERT INTO `#__blue_pagebuilder_type` (`id`, `type`, `name`, `class`, `defaultcode`) VALUES
(1, 'columns_desi', 'Columns', 'st-column', '{"type":"columns_desi","content":[{"type":"column_item_desi","content":[],"attr":{"col":"4"}},{"type":"column_item_desi","content":[],"attr":{"col":"4"}},{"type":"column_item_desi","content":[],"attr":{"col":"4"}}],"attr":{}}'),
(2, 'divider_desi', 'Divider', 'st-divider', '{"type":"divider_desi","content":" ","attr":{"style":"","margin":"0"}}'),
(3, 'html_desi', 'HTML', 'st-html', '{"type":"html_desi","content":"","attr":{}}'),
(4, 'moduleid_desi', 'Module', 'st-module', '{"type":"moduleid_desi","content":"","attr":{"id":"0"}}'),
(5, 'gmap_desi', 'GMap', 'st-gmap', '{"type":"gmap_desi","content":"","attr":{"latitude":"21.038204","longitude":"105.851011","location":"hanoi","zoom":"15","maptype":"roadmap"}}'),
(6, 'tabs_desi', 'Tabs+Accordion', 'st-tabs', '{"type":"tabs_desi","content":[{"type":"tabst_item_desi","content":"","attr":{"title":"tab1"}}],"attr":{"position":"top"}}'),
(7, 'contact_desi', 'Contact Form', 'st-contact', '{"type":"contact_desi","content":"Contact Form","attr":{}}'),
(8, 'portfolio_desi', 'Portfolio', 'st-portfolio', '{"type":"portfolio_desi","content":"","attr":{}}'),
(10, 'slider_desi', 'Slider', 'st-slider', '{"type":"slider_desi","content":[],"attr":{"interval":"5000","auto":"true"}}'),
(11, 'vimeo_desi', 'Vimeo', 'st-vimeo', '{"type":"vimeo_desi","content":"","attr":{"width":"400","height":"300"}}'),
(12, 'youtube_desi', 'Youtube', 'st-youtube', '{"type":"youtube_desi","content":"","attr":{"width":"400","height":"300"}}'),
(13, 'flickr_desi', 'Flickr gallery', 'st-flickr', '{"type":"flickr_desi","content":"","attr":{"id":"100707032@N06","limit":"10","width":"","height":""}}'),
(14, 'fb_likebox_desi', 'FB Like Box', 'st-fblikebox', '{"type":"fb_likebox_desi","content":"https://www.facebook.com/shinethemetoday","attr":{"showfaces":"true","showheader":"false","width":"292","height":"","showstream":"false","showborder":"true","colorscheme":"light","language":"vi_VN"}}'),
(15, 'alert_desi', 'Message Box', 'st-mesagebox', '{"type":"alert_desi","content":"Lorem ipsum dolor sit amet","attr":{"type":"Info","title":"Title Info"}}'),
(16, 'services_desi', 'Services', 'st-services', '{"type":"services_desi","content":"","attr":{"title":"","description":"","category":"12","itemcount":"4","template":""}}'),
(17, 'gallery_desi', 'Gallery', 'st-gallery', '{"type":"gallery_desi","content":[],"attr":{"interval":"5000","auto":"true"}}'),
(18, 'intro_desi', 'Statistic', 'st-intro', '{"type":"intro_desi","content":[],"attr":{"interval":"5000","auto":"true"}}'),
(19, 'pricing_desi', 'Pricing', 'st-pricing', '{"type":"pricing_desi","content":"","attr":{"title":"","position":"","avatar":"","description":"","template":""}}'),
(20, 'testimonial_desi', 'Testimonial', 'st-testimonial', '{"type":"testimonial_desi","content":[],"attr":{"interval":"5000","auto":"true"}}'),
(21, 'skill_desi', 'Skill', 'st-skill', '{"type":"skill_desi","content":"","attr":{"title":"","percent":"","bg_image":"","class":"","template":""}}');
