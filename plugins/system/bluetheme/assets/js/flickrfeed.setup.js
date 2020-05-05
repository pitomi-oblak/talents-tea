jQuery(document).ready(function() {

jQuery('#basicuse').jflickrfeed({
limit: 14,
        qstrings: {
id: '37304598@N02'
},
        itemTemplate: '<li><a href="{{image_b}}"><img src="{{image_s}}" alt="{{title}}" /></a></li>'
});
        jQuery('#cbox').jflickrfeed({
limit: 14,
        qstrings: {
id: '37304598@N02'
},
        itemTemplate: '<li>' +
        '<a rel="colorbox" href="{{image}}" title="{{title}}">' +
        '<img src="{{image_s}}" alt="{{title}}" />' +
        '</a>' +
        '</li>'
}, function(data) {
jQuery('#cbox a').colorbox();
});
        jQuery('#cycle').jflickrfeed({
limit: 14,
        qstrings: {
id: '37304598@N02'
},
        itemTemplate: '<li><img src="{{image}}" alt="{{title}}" /><div>{{title}}</div></li>'
}, function(data) {
//jQuery('#cycle div').hide();
jQuery('#cycle').cycle({
timeout: 5000
});
        jQuery('#cycle li').hover(function() {
jQuery(this).children('div').show();
}, function() {
jQuery(this).children('div').hide();
});
});
        jQuery('#nocallback').jflickrfeed({
limit: 10,
        qstrings: {
id: '37304598@N02'
},
        useTemplate: false,
        itemCallback: function(item) {
jQuery(this).append("<li><img src='" + item.image_m + "' alt=''/></li>");
}
});
        });
        jQuery(document).ready(function(){

jQuery('#cycle').jflickrfeed({
limit: 10,
        qstrings : {
id: '37304598@N02'
},
        useTemplate : true,
        itemTemplate:'<li><img src="/3.x.y/{{image}}" alt="{{title}}" /><div>{{title}}</div></li>'},
        function(data) {
                $('#cycle div').hide();
                $('#cycle').cycle({
                     timeout: 5000
                });
                $('#cycle li').hover(function(){
                        $(this).children('div').show();
                    }, function(){
                        $(this).children('div').hide();
                    });
        });
    }); 
jQuery(document).ready(function(){
               
      		jQuery('#colorbox').jflickrfeed({ 
				limit: 10,
                                    qstrings : {
                                        id: '37304598@N02'
                                    },
                                useTemplate : true,
                    itemTemplate: '<li><a rel="colorbox" href=\'{{image}}\' title="{{title}}"><img src=\'{{image_s}}\' alt="{{title}}" /></a></li>'
            }, function(data) {
                jQuery('#cbox a').colorbox();
            
            });});