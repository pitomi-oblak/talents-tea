<?php
header("Content-type: text/css; charset=Ansi");

$color1 = '#'.htmlspecialchars($_GET["group1"]);
$color2 = '#'.htmlspecialchars($_GET["group2"]);
?>
@color1:<?php echo $color1; ?>;

@color2:<?php echo $color2; ?>;
a:focus, 
a:hover {

	color:@color1;
}
.tag-cloud .nav-pills li a:hover{
    background-color: @color1;
}
.sidebar-item .media:hover.media .media-body h4 a{
  color: @color1;
}
.categories .navbar-stacked li.active a{
  color: @color1;
}
.categories .navbar-stacked li a:hover{
  color: @color1;
}
.replay-box  .form-control:focus {
	border-color:@color1;
}
.author-social a:hover {
	background-color:@color1;
}
.date {
	background-color: @color1;
}
#single-blog-page .main-nav {
	background-color: @color1;
}
#news-letter {	
	background-color: @color1;
}
.client-left:hover, 
.client-right:hover {
	color: @color1;
}
#fun-fact,.single-table.featured-table .price {
	background-color: @color1;	
    opacity: 0.9;	
}
.single-table.featured-table h2{
    background-color: @color1;	
    opacity: 0.8;
}
.single-table.featured-table .btn-signup, .single-table:hover .btn-signup:hover{
    background-color: @color1;
}
#contact-form .btn.btn-default:hover,#footer,#contact-form .btn.btn-default{
    background-color: @color1;
}
.contact-content i,.business-time span{
    color: @color1;	
    opacity: 0.9;
}
#footer a.to-top:before{
    border-color:transparent transparent @color1;
    opacity: 0.9;	
}
.btn.btn-primary {
	background-color: @color1;
}
.team-carousel-left:hover, 
.team-carousel-right:hover {
	background-color: @color1;
} 
.team-carousel-left, 
.team-carousel-right {
	color: @color1;
}
.service-icon {
	color: @color1;
}
#newsletter input.newsletter-email{
    background-color: @color1;
    opacity: 0.5;
}
#navigation .navbar-right li a.active, 
#navigation .navbar-right li a:hover, 
#navigation .navbar-right li a:focus, 
#navigation .navbar-right li.active a  {
	background-color:@color1;
}
#navigation .navbar-fixed-top {
	background-color: @color1;
}
a.navbar-brand {
	background-color: @color1;
 }
 .single-blog:hover .post-date{
    background-color: @color1;
    opacity: 0.9;
     }
 .top-bar span i {
	color: @color1;
}
.btn.btn-default,.brand-content,.filter li a:hover, .filter li a:active, .filter li a:focus, .filter li a.active{
    background-color:@color1;
}
.overlay{
    background-color:@color1;
}

.title-border {
	background-color:@color1;
}
.section-title h3 {
	color: @color1;
}
#single-blog-page #navigation .navbar-right li a.active, 
#single-blog-page #navigation .navbar-right li a:hover, 
#single-blog-page #navigation .navbar-right li a:focus, 
#single-blog-page #navigation .navbar-right li.active a {
  background-color: @color2;
}
#single-blog-page .navbar-brand {
  background-color: @color2;
}
#contact-form .btn.btn-default:hover {
	background-color: @color2;
}
.entry-meta span a:hover {
	color:@color2;
}
.btn.btn-primary:hover{
	background-color:@color2;
}
.overlay .folio-link{
    color: @color2;
}
#navigation .navbar-fixed-top .navbar-right li a.active, 
#navigation .navbar-fixed-top .navbar-right li a:hover, 
#navigation .navbar-fixed-top .navbar-right li a:focus, 
#navigation .navbar-fixed-top .navbar-right li.active a{
	background-color: @color2;
}
.navbar-brand.change-logo {	
	background-color: @color2;
}
.btn.btn-default:hover,.brand-content:hover{
    background-color:@color2;
}