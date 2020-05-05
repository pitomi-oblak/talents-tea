
/*! Plugin Design - v1.0
* http://cmsbluetheme.com
* author 	:cmsbluetheme
* Copyright 2013  */
//encodeURIComponent
//decodeURIComponent
var arrayType;
var data_ele;
jQuery(document).ready(function(){
	addEventPopup();
	jQuery('#pageconfig-submit').click(function(){
		jQuery.stbox.close();
	});
	arrayType=jQuery.parseJSON(decodeURIComponent(jQuery('#st-arrName').attr("data")));
	if(jQuery('#st-page>li').length>0){
		jQuery('#st-page>li').each(function(){
			if(jQuery(this).hasClass("st-column")){
				jQuery(this).removeClass("st-column").addClass("st-column-container");
				AddColumn(this);
				data = jQuery.parseJSON(decodeURIComponent(jQuery(this).attr("data")));
				ColumnDesign(this,data.content);
			}else if(jQuery(this).hasClass("st-tabs")){
				jQuery(this).removeClass("st-tabs").addClass("st-tabs-container");
				AddTab(this);
				data = jQuery.parseJSON(decodeURIComponent(jQuery(this).attr("data")));
				TabsDesign(this,data.content);
			}
		});
		AddEvent();
	}
	jQuery('#st-page li').removeClass("btn");
	addsort();
	jQuery( "#draggable li" ).draggable({
		connectToSortable: ".sortable",
		appendTo: "body",
		placeholder: 'placeholder',
		helper: "clone",
		revert: "invalid"
	});
	// Remove action button toolbar default Joomla
	jQuery("#toolbar button").removeAttr("onclick");
	// Add Event Save
	buttonsave();
	// Append Input Name to Toolbar
	jQuery(".namepage .st-namepage").appendTo("#toolbar");
	jQuery('#toolbar-cancel').click(function(){
		window.location="index.php?option=com_blue_pagebuilder";
	});
	setTitleModule();
	duplicateItem();
});

function duplicateItem(){
	jQuery('#st-page .st-duplicate').unbind('click');
	jQuery('#st-page .st-duplicate').click(function(){
		var item = jQuery(this).parent().parent();
		//console.log(item.attr('tabs_desi'));
		if(item.attr('data-type')=='tabs_desi'){
			var selectab = item.find('.nav-tabs');
			var oldtabid = selectab.attr("id").split('-')[1];
			var tabid =makeid();
			var myid = selectab.attr("id").split('-')[0]+'-'+tabid;
			item.after('<li data-type="'+item.attr('data-type')+'" data="'+item.attr('data')+'" class="'+item.attr('class')+'" style="display:block;">'+item.html()+'</li>');
			var itemnew = item.next();
			var lengtab = itemnew.find('.tab-content .tab-pane').length;
			itemnew.find('.nav-tabs').attr('id',myid).find('>li').each(function(index, el) {
				if(index<lengtab){
					jQuery(this).find('a').attr('href','#'+myid+'-'+index);
					jQuery(itemnew.find('.tab-content .tab-pane')[index]).attr('id',myid+'-'+index);
					var idinput = jQuery(this).find('a .input-edittab').attr('id');
					var idinput = idinput.replace(oldtabid,tabid);
					jQuery(this).find('a .input-edittab').attr('id',idinput);
				}
			});
			addEventTab(tabid);
		}else{
			item.after('<li data-type="'+item.attr('data-type')+'" data="'+item.attr('data')+'" class="'+item.attr('class')+'" style="display:block;">'+item.html()+'</li>');
		}
		AddEvent();
		changeColumn();
	});
	
}
// AddEvent 
function AddEvent(){
	// add event data
	duplicateItem();
	jQuery('#st-page li .st-edit').bind('click',function(){
		jQuery('#st-page li').removeClass("st-focus");
		select = jQuery(this).closest('li');
		select.addClass("st-focus");
		data_ele = jQuery.parseJSON(decodeURIComponent(select.attr("data")));
		//console.log(data_ele);
		switch(data_ele.type){
			case "contact_desi":
				getContactOption(data_ele);
				break;
            case "bgvideo_desi":
				getBgVideoOption(data_ele);
				break;
			case "vimeo_desi":
				getVimeoOption(data_ele);
				break;
			case "youtube_desi":
				getYoutubeOption(data_ele);
				break;
			case "alert_desi":
				getMessageBoxOption(data_ele);
				break;
			case "recent_article_desi":
				getArticleRecentOption(data_ele);
				break;
			case "article_box_desi":
				getArticleBoxOption(data_ele);
				break;
			case "moduleid_desi":
				getModuleOption(data_ele);
				break;
			case "divider_desi":
				getDividerOption(data_ele);
				break;
			case "tabs_desi":
				getTabsOption(data_ele);
				break;
			case "flickr_desi":
			    getFlickrOption(data_ele);	
			    break;
			case "fb_likebox_desi":
			    getFb_likbeboxOption(data_ele);
			    break;
			case "slider_desi":
			    getSliderOption(data_ele);
			    break; 
            case "gallery_desi":
			    getGalleryOption(data_ele);
			    break; 
			case "gmap_desi":
				getGmapOption(data_ele);
				break;
			case "html_desi":
				getHtmlOption(data_ele);
				break;
			case "columns_desi":
				getColumDesignOption(data_ele);
				break;
			case "portfolio_desi":
				getPortfolioOption(data_ele);
				break;
            case "services_desi":
                getServicesOption(data_ele);
                break;
			case "about_desi":
				getAboutOption(data_ele);
				break;
            case "parallax_desi":
				getParallaxOption(data_ele);
				break;
            
            case "skill_desi":
				getSkillOption(data_ele);
				break;
            case "pricing_desi":
				getPricingOption(data_ele);
				break;
            case "intro_desi":
				getIntroOption(data_ele);
				break;
            case "testimonial_desi":
				getTestimonialOption(data_ele);
				break;
		}
	});
	//add event close item
	jQuery('#st-page .st-close').bind('click',function(e){
		jQuery(this).closest('li').remove();
	});

	//add event close item
	jQuery('#st-page .st-hide').toggle(function(){
		var sele =jQuery(this).closest('li');
		sele.find('.st-columns').addClass('none');
		sele.find('.column-button-group').addClass("none");
		sele.find('.st-tabitems').addClass("none");
	},function(){
		var sele =jQuery(this).closest('li');
		sele.find('.st-columns').removeClass('none');
		sele.find('.column-button-group').removeClass("none");
		sele.find('.st-tabitems').removeClass("none");
	});
}


function setTitleModule(){
	jQuery('#st-page li').each(function(){
		if(jQuery(this).hasClass('st-module')){
			var title = jQuery.parseJSON(decodeURIComponent(jQuery(this).attr('data'))).attr.title;
			jQuery(this).find('.st-header-title .st-name').append(' <span class="st-modulename">'+title+'</span>');
		}else if(jQuery(this).hasClass('st-html')){
            var title = jQuery.parseJSON(decodeURIComponent(jQuery(this).attr('data'))).attr.title;
            if(title!=null && title!="")
            jQuery(this).find('.st-header-title .st-name').append(' <span class="st-modulename">'+title+'</span>');
        }else if(jQuery(this).hasClass('st-services')){
            var title = jQuery.parseJSON(decodeURIComponent(jQuery(this).attr('data'))).attr.title;
            if(title!=null && title!="")
                jQuery(this).find('.st-header-title .st-name').append(' <span class="st-modulename">'+title+'</span>');
        }
	});
}

function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
// Add Event sorttable
function addsort(){
	jQuery( ".sortable" ).sortable({
		connectToSortable: "#draggable",
		connectWith:".sortable",
		appendTo: "body",
		placeholder: 'placeholder',
	    revert: true,
	    receive: function(event, ui) {
      		AddEvent(); // add Event 
      		//duplicateItem();
        },
        start: function( event, ui ) {
        	if(jQuery(ui.item).hasClass("st-column-container")){
        		jQuery(ui.item).find('.st-columns').hide();
        		jQuery(ui.item).find('.btn-group').hide();
        		jQuery(ui.item).css('height','40');
        	}else if(jQuery(ui.item).hasClass("st-tabs-container")){
        		 jQuery(ui.item).find('.st-tabitems').hide();
        		 jQuery(ui.item).css('height','40');
        	}
        },
        stop: function( event, ui ) {
        	if(ui.item.hasClass("st-column")){
        		jQuery(ui.item).removeClass("st-column").addClass("st-column-container");
        		//jQuery(ui.item).find('.st-edit').remove();
	    		AddColumn(ui.item);
	    	}
	    	else if(ui.item.hasClass("st-tabs")){
	    		jQuery(ui.item).removeClass("st-tabs").addClass("st-tabs-container");
	    		AddTab(ui.item);
	    	}else if(ui.item.hasClass("st-column-container")){
	    		jQuery(ui.item).find('.st-columns').show();
        		jQuery(ui.item).find('.btn-group').show();
        		jQuery(ui.item).css('height','auto');
	    	}else if(jQuery(ui.item).hasClass("st-tabs-container")){
	    		jQuery(ui.item).find('.st-tabitems').show();
        		jQuery(ui.item).css('height','auto');
	    	}
        }
	});
}


function addsortSub(){
	jQuery( ".sortable" ).sortable({
		connectToSortable: "#draggable",
		connectWith:".sortable",
		appendTo: "body",
		placeholder: 'placeholder',
	    revert: true,
	    receive: function(event, ui) {
      		AddEvent(); // add Event 
        },
        stop: function( event, ui ) {
        	if(ui.item.hasClass("st-column")){
        		jQuery(ui.item).remove();
        		alert('no support');
	    	}
	    	ui.item.removeClass("btn");
        }
	});
}


function addEventPopup(){
	jQuery('.stmodal').stbox({
		padding     :0,
		openEffect	: 'elastic',
		closeEffect	: 'elastic',
		helpers : {
			overlay:{
				closeClick :false,
				speedOut   : 200
			},
			title:null
		},
		closeBtn : false,
		autoSize : false,
		beforeLoad  :function(){
			var typepopup =jQuery(this.element).attr("data-type");
			switch(typepopup){//
//			     case "bgvideo_desi":
//					this.width=400;
//					this.height=400;
//					break;
				case "portfolio_desi":
					this.width=600;
					this.height=600;
					break;
				case "page-config":
					this.width=400;
					this.height=350;
					break;
				case "contact_desi":
					this.width=600;
					this.height=400;
					break;
				case "columns_desi":
					this.width=350;
					this.height=800;
					break;
				case "html_desi":
					this.height=588;
					break;
				case "youtube_desi":
					this.width=500;
					this.height=450;
					break;
				case "vimeo_desi":
					this.width=400;
					this.height=630;
					break;
				case "moduleid_desi":
					this.width=400;
					this.height=450;
					break;
				case "alert_desi":
					this.width=400;
					this.height=400;
					jQuery(this.content).find('.st-nav-option').css({height:"330"});
					break;
				case "article_box_desi":
					this.width=350;
					this.height=330;
					break;
                case "pricing_desi":
                    this.width=500;
                    this.height=500;
                    break;
                case "skill_desi":
                    this.width=500;
                    this.height=500;
                    break;
				case "tabs_desi":
					this.width=400;
					this.height=350;
					break;
				case "divider_desi":
					this.width=300;
					this.height=242;
					break;
				case "flickr_desi":
					this.width=750;
					this.height=450;
					break;
				case "fb_likebox_desi":
					this.width=500;
					this.height=400;
					//jQuery(this.content).find('.st-nav-option').css({height:"330"});
					break;
				case "slider_desi":
					this.width=800;
					this.height=700;
					break;
				case "gallery_desi":
					this.width=800;
					this.height=630;
					break;
                case "services_desi":
                    this.width=500;
                    this.height=450;
                    break;
                case "gmap_desi":
                    this.width=600;
                    this.height=500;
                    break;
			
			}
		},
		afterLoad:function(){
			var typepopup =jQuery(this.element).attr("data-type");
			switch(typepopup){
				case "moduleid_desi":
					jQuery('#st-element-modules').appendTo(".st-navigation .st-listmodule");
					checkList('id','#jform_modules');
					break;
				case "article_box_desi":
					//load combobox article
					if(jQuery('.st-navigation .st-extension').val()=='com_k2'){
						jQuery('#st-element #st-element-k2contents').appendTo(".st-navigation .st-article");
						checkList('article_id','#jform_k2contents');
					}else{
						jQuery('#st-element #st-element-contents').appendTo(".st-navigation .st-article");
						checkList('article_id','#jform_contents');
					}
					break;
				//case "recent_article_desi":
//					jQuery('#st-element #st-element-k2category').appendTo(".st-navigation .st-category");
//					checkList('category_id','#jformk2category');
//					break;
				case "gallery_desi":
					var link = jQuery("#st-navigation .st-path").val();
					loadImages(link);
					break;
				case "slider_desi":
					var link = jQuery("#st-navigation .st-path").val();
					loadImages(link);
					break;
				case "gmap_desi":
					//jQuery('#st-element-map').appendTo("#st-navigation .st-loadgmap");
					var dt = jQuery.parseJSON(decodeURIComponent(jQuery(this.element).parent().parent().attr("data")));

				//	addGmap(dt.attr.latitude,dt.attr.longitude);
				//	jQuery('#st-navigation .st-lnggmap').val(dt.attr.longitude);
				//	jQuery('#st-navigation .st-latgmap').val(dt.attr.latitude);
					break;
				case "portfolio_desi":
					jQuery('#st-element #st-element-k2category').appendTo(".st-navigation .st-category");
					checkList('id','#jformk2category');
					break;
				case "html_desi":
					//getEditor();
					break;
                case "services_desi":
                    jQuery('#st-element #st-element-k2category').appendTo(".st-navigation .st-category");
                    checkList('category','#jformk2category');
                    break;
                // case "about_desi":
//					jQuery('#st-element #st-element-k2category').appendTo(".st-navigation .st-category");
//					checkList('category','#jformk2category');
//					break;  
//                  case "parallax_desi":
//					jQuery('#st-element #st-element-k2category').appendTo(".st-navigation .st-category");
//					checkList('category_id','#jformk2category');
//					break;    
			}
			jQuery(this.content).find('.btn-cancel').click(function(){
				jQuery.stbox.close();
			});
			jQuery(this.content).find('.st-nav-title .icon-cancel-circle').click(function(){
				jQuery.stbox.close();
			});
		},
		beforeClose:function(){
			var typepopup =jQuery(this.element).attr("data-type");
			switch(typepopup){
				//case "bgvideo_desi":
//					jQuery(this.content).find('#st-element-bgvideo').appendTo("#st-element");
//					break;
                case "moduleid_desi":
					jQuery(this.content).find('#st-element-modules').appendTo("#st-element");
					break;
				case "article_box_desi":
					jQuery(this.content).find('#st-element-k2contents').appendTo("#st-element");
					jQuery(this.content).find('#st-element-contents').appendTo("#st-element");
					break;
				case "recent_article_desi":
					jQuery(this.content).find('#st-element-k2category').appendTo("#st-element");
					jQuery(this.content).find('#st-element-category').appendTo("#st-element");
					break;
				case "gmap_desi":
					jQuery(this.content).find('#st-element-map').appendTo("#st-element");
					break;
				case "portfolio_desi":
					jQuery(this.content).find('#st-element-k2category').appendTo("#st-element");
					break;
                case "services_desi":
                    jQuery(this.content).find('#st-element-k2category').appendTo("#st-element");
                    break;
                //case "about_desi":
//                    jQuery(this.content).find('#st-element-k2category').appendTo("#st-element");
//                    break;
//                case "parallax_desi":
//                    jQuery(this.content).find('#st-element-k2category').appendTo("#st-element");
//                    break;
			}
			jQuery('#st-navigation').html("");
		}
	});
}

function checkList(id,sle){
	if(typeof(data_ele.attr[id])!='undefined'){
		jQuery('.st-navigation '+sle).val(data_ele.attr[id]);
		jQuery('.st-navigation  '+sle+' option[value='+data_ele.attr[id]+']').attr('selected','selected');
		var sele = jQuery('.st-navigation  '+sle+' option[value='+data_ele.attr[id]+']').text();
		jQuery('.st-navigation .chzn-container .chzn-single>span').text(sele);
		jQuery('.st-navigation .chzn-container .chzn-results li').removeClass("result-selected");
		jQuery('.st-navigation .chzn-container .chzn-results li').each(function(){
			if(jQuery(this).text()==sele){
				jQuery(this).addClass("result-selected ");
			}
		});
	}
}



// AddColumn
function AddColumn(item){
	data = jQuery.parseJSON(decodeURIComponent(jQuery(item).attr("data")));
	content ='<div class="row-fluid st-columns">';
	for(i=0;i<data.content.length;i++){
		content+='<div class="span'+data.content[i].attr.col+'" index="'+i+'">';
		content+='<span class="st-changerow" href="#st-navigation" index="'+i+'"><i class="icon-cog-2"></i></span>';
		content+='<ul class="sortable sortable-column"></ul>';
		content+='</div>';
	}
	content+='</div>';
	content+='<div class="btn-group column-button-group">';
		for(i=1;i<=6;i++)
			content+='<span class="btn '+((i==data.content.length)?'btn-primary':'')+'">'+i+'</span>';
	content+='</div>';
	jQuery(item).append(content);
	changeColumn();
	addsort();
	changeSpan();
}

function changeSpan(){
	jQuery('.st-changerow').stbox({
		padding     : 0,
		openEffect	: 'elastic',
		closeEffect	: 'elastic',
		helpers : {
			overlay:{
			  	closeClick :false,
			  	speedOut   : 200
			},
			title:null
		},
		closeBtn : false,
		autoSize : false,
		beforeLoad:function(){
			this.width=350;
			this.height=500;
			var sele = jQuery(this.element).closest(".st-column-container");
			var data = jQuery.parseJSON(decodeURIComponent(sele.attr("data")));
			var index = jQuery(this.element).attr("index");
			content ="<div class='st-nav-title'><i class='icon-columns'></i> Column<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
			content+="<div class='st-nav-option'>";
				content+="<label>Large Column:</label>";
				content+="<div class='row-fluid'><select class='st-lg-col span12'>";
				for(i=1;i<=12;i++){
					content+='<option value="'+i+'">col-lg-'+i+'</option>';
				}
				content+="</select></div>";

				content+="<label>Medium Column:</label>";
				content+="<div class='row-fluid'><select class='st-md-col span12'>";
					content+='<option value="0">---- Auto -----</option>';
				for(i=1;i<=12;i++){
					content+='<option value="'+i+'">col-md-'+i+'</option>';
				}
				content+="</select></div>";

				content+="<label>Small Column:</label>";
				content+="<div class='row-fluid'><select class='st-sm-col span12'>";
					content+='<option value="0">---- Auto -----</option>';
				for(i=1;i<=12;i++){
					content+='<option value="'+i+'">col-sm-'+i+'</option>';
				}
				content+="</select></div>";

				content+="<label>Phone Column:</label>";
				content+="<div class='row-fluid'><select class='st-xs-col span12'>";
					content+='<option value="0">---- Auto -----</option>';
				for(i=1;i<=12;i++){
					content+='<option value="'+i+'">col-xs-'+i+'</option>';
				}
				content+="</select></div>";
                content+="<label>Box Wrapper:</label>";
				content+="<div class='row-fluid'><select class='st-box span12'>";
					content+='<option value="0">No</option>';
					content+='<option value="1">Yes</option>';
				
				content+="</select></div>";
                
				content+="<label>Class:</label>";
				content+="<div class='row-fluid'><input type='text' class='st-spanclass span12' value='"+((data.content[index].attr.class==null)?"":data.content[index].attr.class)+"'></div>";
				content+="<label>Padding:</label>";
				content+="<div class='row-fluid'><input type='text' class='st-spanpadding span12' value='"+((data.content[index].attr.padding==null)?"":data.content[index].attr.padding)+"'></div>";
				content+="<div class='st-button-group'>";
					content+="<button class='btn btn-primary btn-save'>Save</button>";
					content+="<button class='btn btn-cancel'>Cancel</button>";
				content+="</div>";
			content+="</div>";
			jQuery('.st-navigation').html(content);
			jQuery('.st-navigation .st-lg-col option[value="'+data.content[index].attr.col+'"]').attr("selected","selected");
			jQuery('.st-navigation .st-md-col option[value="'+data.content[index].attr.col_md+'"]').attr("selected","selected");
			jQuery('.st-navigation .st-sm-col option[value="'+data.content[index].attr.col_sm+'"]').attr("selected","selected");
			jQuery('.st-navigation .st-xs-col option[value="'+data.content[index].attr.col_xs+'"]').attr("selected","selected");
			jQuery('.st-navigation .st-box option[value="'+data.content[index].attr.col_box+'"]').attr("selected","selected");
			jQuery('.st-navigation .btn-cancel').click(function(){
				jQuery.stbox.close();
			});
			jQuery('.st-navigation .icon-cancel-circle').click(function(){
				jQuery.stbox.close();
			});
			jQuery('.st-navigation .btn-primary.btn-save').click(function(){
				data.content[index].attr.col = jQuery('.st-navigation .st-lg-col').val();
				data.content[index].attr.col_md = jQuery('.st-navigation .st-md-col').val();
				data.content[index].attr.col_sm = jQuery('.st-navigation .st-sm-col').val();
				data.content[index].attr.col_xs = jQuery('.st-navigation .st-xs-col').val();
				data.content[index].attr.col_box = jQuery('.st-navigation .st-box').val();
				data.content[index].attr.class=jQuery('.st-navigation .st-spanclass').val();
				data.content[index].attr.padding=jQuery('.st-navigation .st-spanpadding').val();
                data.content[index].attr.box = jQuery('.st-navigation select[name="st-box"] option:selected').val();
				sele.attr("data",encodeURIComponent(JSON.stringify(data)));
				sele.find('div[index="'+index+'"]').attr("class","").addClass("span"+jQuery('.st-navigation .st-lg-col').val());
				jQuery.stbox.close();
			});
		}
	});
}

function changeColumn(){
	jQuery('.column-button-group span.btn').unbind('click');
	jQuery('.column-button-group span.btn').bind('click',function(){
		if(!jQuery(this).hasClass("btn-primary")){
			var sl = jQuery(this).closest('div');
			sl.find('span.btn').removeClass("btn-primary");
			jQuery(this).addClass("btn-primary");
			var col = jQuery(this).text();
			var data = jQuery.parseJSON(decodeURIComponent(jQuery(jQuery(this).closest("li")).attr("data")));
			
			var loop = true;
			if(col==5) classspan=2;
			else classspan=(12/col);
			sl.prev().find('[class^="span"]').attr("class","span"+classspan);
			var len = data.content.length;
			if(col>data.content.length){
				// Add column
				for(i=0;i<(col-len);i++){
					var index = sl.prev().find('>[class^="span"]').length;
					sl.prev().append("<div class='span"+classspan+"' index='"+index+"'><span class='st-changerow' href='#st-navigation' index='"+index+"'><i class='icon-cog-2'></i></span><ul class='sortable sortable-column'></ul></div>");
					arr = {"type":"column_item_desi","content":"","attr":{"col":classspan,"col_md":"0","col_sm":"0","col_xs":"0"}};
					data.content.push(arr);
				}
			}else{
				//remove column
				for(i=0;i<(len-col);i++){
					sl.prev().find('[class^="span"]:last-child').remove();
					data.content.pop();
				}
			}
			for(i=0;i<data.content.length;i++){
				if(i==4 && data.content.length==5) data.content[i].attr.col=4;
				else data.content[i].attr.col=classspan;
			}
			if(col==5) sl.prev().find('>[index^="4"]').attr("class","span4");
			sl.parent().attr("data",encodeURIComponent(JSON.stringify(data)));
			addsort();
		}
	});
}


function getColumDesignOption(data){
	content ="<div class='st-nav-title'><i class='icon-columns'></i> Column<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
	content+="<div class='st-nav-option st-column'>";
        content+="<label>Title:</label>";
		content+="<div class='row-fluid'>";
			content+="<input type='text' class='column-title' value='"+((data.attr.title==null)?"":data.attr.title)+"' />";
		content+="</div>";
        content+="<label>Short description:</label>";
		content+="<div class='row-fluid'>";
			content+="<input type='text' class='column-sdesc' value='"+((data.attr.sdesc==null)?"":data.attr.sdesc)+"' />";
		content+="</div>";
		content+="<label>Section ID:</label>";
		content+="<div class='row-fluid'>";
			content+="<input type='text' class='column-id' value='"+((data.attr.id==null)?"":data.attr.id)+"' />";
		content+="</div>";
		content+="<label>Section Class:</label>";
		content+="<div class='row-fluid'>";
			content+="<input type='text' class='column-class' value='"+((data.attr.class==null)?"":data.attr.class)+"' />";
		content+="</div>";
        content+="<label>Container ID:</label>";
		content+="<div class='row-fluid'>";
			content+="<input type='text' class='column-cid' value='"+((data.attr.cid==null)?"":data.attr.cid)+"' />";
		content+="</div>";
		content+="<label>Container Class:</label>";
		content+="<div class='row-fluid'>";
			content+="<input type='text' class='column-cclass' value='"+((data.attr.cclass==null)?"":data.attr.cclass)+"' />";
		content+="</div>";
        content += getBt2Selectgroup('Heading tag', 'st-htag', '', '', data.attr.htag, [['H1', 'h1'],['H2', 'h2'],['H3', 'h3']], false);
		content += getBt2Selectgroup('Animate', 'st-animate', '', '', data.attr.animate, [['slideInLeft', 'slideInLeft'],
                                                                                        ['slideInRight', 'slideInRight'],
                                                                                        ['slideInDown', 'slideInDown'],
                                                                                        ['bounceInUp', 'bounceInUp'],
                                                                                        ['bounceInLeft', 'bounceInLeft'],
                                                                                        ['bounceInRight', 'bounceInRight'],
                                                                                        ['rotateInUpRight', 'rotateInUpRight'],
                                                                                        ['rotateInUpLeft', 'rotateInUpLeft'],
                                                                                        ['flipInX', 'flipInX'],
                                                                                        ['flipInY', 'flipInY'],
                                                                                        ['fadeInUpBig', 'fadeInUpBig'],
                                                                                        ['fadeInDownBig', 'fadeInDownBig'],
                                                                                        ['fadeIn', 'fadeIn'],
                                                                                        ['lightSpeedIn', 'lightSpeedIn'],
                                                                                        ['rollIn', 'rollIn'],
                                                                                        ['wobble', 'wobble'],
                                                                                        ['swing', 'swing'],
                                                                                        ['wobble', 'wobble'],
                                                                                        ],false);
				
        content+="<label>Heading Class:</label>";
		content+="<div class='row-fluid'>";
			content+="<input type='text' class='column-heading' value='"+((data.attr.heading==null)?"":data.attr.heading)+"' />";
		content+="</div>";
        content+="<label>Background image:</label>";
		content+="<div class='row-fluid'>";
			content+="<input type='text' class='column-bg' value='"+((data.attr.bg==null)?"":data.attr.bg)+"' />";
		content+="</div>";
        content+="<label>Padding:</label>";
		content+="<div class='row-fluid'>";
			content+="<input type='text' class='column-cpadding' value='"+((data.attr.cpadding==null)?"":data.attr.cpadding)+"' />";
		content+="</div>";        
		content+="<label>Full Width:</label>";
		content+="<div class='row-fluid'><div class='st-fullwidth st-radio'>"; 
			content+='<label class="radio inline"><input type="radio" name="st-fullwidth" value="1" checked="checked">Yes</label>';
			content+='<label class="radio inline"><input type="radio" name="st-fullwidth" value="0">No</label>';
		content+="</div></div>";
        content+="<label>State:</label>";
		content+="<div class='row-fluid'><div class='st-state st-radio'>"; 
			content+='<label class="radio inline"><input type="radio" name="st-state" value="1" checked="checked">Yes</label>';
			content+='<label class="radio inline"><input type="radio" name="st-state" value="0">No</label>';
		content+="</div></div>";
		content+="<div class='st-button-group'>";
		content+="<button class='btn btn-primary btn-save'>Save</button>";
		content+="<button class='btn btn-cancel'>Cancel</button>";
		content+="</div>";
	content+="</div>";
	jQuery('.st-navigation').html(content);
	if(typeof data.attr.fullwidth !='undefined'){
		jQuery('#st-navigation .st-fullwidth [value="'+data.attr.fullwidth+'"]').prop('checked', true);
	}
    if(typeof data.attr.state !='undefined'){
		jQuery('#st-navigation .st-state [value="'+data.attr.state+'"]').prop('checked', true);
	}
	jQuery('.st-nav-option button.btn-primary.btn-save').click(function(){
		saveColumnDesign(data);
	});
}

function saveColumnDesign(data){
	data.attr.title = jQuery.trim(jQuery('#st-navigation .column-title').val());
	data.attr.sdesc = jQuery.trim(jQuery('#st-navigation .column-sdesc').val());
	data.attr.id = jQuery.trim(jQuery('#st-navigation .column-id').val());
	data.attr.class = jQuery.trim(jQuery('#st-navigation .column-class').val());
	data.attr.cid = jQuery.trim(jQuery('#st-navigation .column-cid').val());
	data.attr.cclass = jQuery.trim(jQuery('#st-navigation .column-cclass').val());
	data.attr.heading = jQuery.trim(jQuery('#st-navigation .column-heading').val());
    data.attr.htag = jQuery('select[name="st-htag"] option:selected').val();
    data.attr.animate = jQuery('select[name="st-animate"] option:selected').val();
	data.attr.bg = jQuery.trim(jQuery('#st-navigation .column-bg').val());
	data.attr.cpadding = jQuery.trim(jQuery('#st-navigation .column-cpadding').val());
	data.attr.fullwidth = jQuery('#st-navigation .st-fullwidth input[type="radio"]:checked').val();
	data.attr.state = jQuery('#st-navigation .st-state input[type="radio"]:checked').val();
	var json = encodeURIComponent(JSON.stringify(data));
	jQuery('#st-page li.st-focus').attr("data",json);
	jQuery.stbox.close();
}

function ColumnDesign(sele,data){
	jQuery(sele).find('.sortable-column').each(function(index){
		for(i=0;i<data[index].content.length;i++){
			var html="";
			if(arrayType[data[index].content[i].type].type=="tabs_desi"){
				arrayType[data[index].content[i].type].class="st-tabs-container";
			}
			html+="<li data-type='"+arrayType[data[index].content[i].type].type+"' class='ui-state-highlight btn ui-draggable "+arrayType[data[index].content[i].type].class+"' style='display:block;' data=\""+encodeURIComponent(JSON.stringify(data[index].content[i]))+"\">";
			html+="<div class='st-header-title'>";
			html+="<span class='st-name'>"+arrayType[data[index].content[i].type].name+"</span> ";
			html+="<span href='#' class='st-close' title='Close'><i class='icon-cancel-circle'></i></span> ";
			html+="<span href='#st-navigation' data-type='"+arrayType[data[index].content[i].type].type+"' title='Edit' class='st-edit stmodal'><i class='icon-cog-2'></i></span>";
			if(arrayType[data[index].content[i].type].type=="tabs_desi"){
			html+='<span class="st-hide"><i class="icon-new-window"></i></span>';
			}else{
			
			}
			html+='<span href="#" class="st-duplicate" title="Duplicate"><i class="icon-copy"></i></span>';
			html+="</div>";
			if(data[index].content[i].type=='tabs_desi'){
				var id = makeid();
				html+='<div class="st-tabitems">';
					html+='<ul class="nav nav-tabs" id="myTab-'+id+'">';
					for(j=0;j<data[index].content[i].content.length;j++){
						html+='<li '+((j==0)?'class="active"':'')+'><a class="st-tab" href="#'+id+'-'+j+'" index="'+j+'" >'+data[index].content[i].content[j].attr.title;
							html+='<input index="'+j+'" class="input-edittab" type="text" id="myTab-input-'+id+'-'+j+'" value="'+data[index].content[i].content[j].attr.title+'" />'
							html+='<i class="icon-cancel-circle" title="close" index="#'+id+'-'+j+'"></i>';
						html+='</a></li>';
					}
						html+='<li><a class="newtab" href="#"><i class=" icon-plus"></i></a></li>';
					html+='</ul>';
					html+='<div class="tab-content">';
					for(j=0;j<data[index].content[i].content.length;j++){
						html+='<div class="tab-pane '+((j==0)?'active':'')+'" id="'+id+'-'+j+'"><ul class="sortable sortable-tabitem">';
						for(var k=0;k<data[index].content[i].content[j].content.length;k++){
							html+="<li data-type='"+data[index].content[i].content[j].content[k].type+"' class='ui-state-highlight btn ui-draggable "+arrayType[data[index].content[i].content[j].content[k].type].class+"' style='display:block;' data='"+encodeURIComponent(JSON.stringify(data[index].content[i].content[j].content[k]))+"'>";
								html+="<div class='st-header-title'>";
									html+="<span class='st-name'>"+arrayType[data[index].content[i].content[j].content[k].type].name+"</span> ";
									html+="<span href='#' class='st-close' title='Close'><i class='icon-cancel-circle'></i></span> ";
									html+="<span href='#st-navigation' data-type='"+data[index].content[i].content[j].content[k].type+"' title='Edit' class='st-edit stmodal'><i class='icon-cog-2'></i></span>";
								html+="</div>";
							html+="</li>";
						}
						html+='</ul></div>';
					}
					html+='</div>';
				html+='</div>';
			}
			html+="</li>";
			jQuery(this).append(html);
			jQuery('[id*="myTab"] a.newtab').click(function (e) {
				
				var array = jQuery(this).parent().prev().find('.input-edittab').attr('id').split("-");
				array[3]=(array[3]+1);
				jQuery(this).parent().before('<li class=""><a class="st-tab" href="#'+array[2]+'-'+array[3]+'"><span class="tabname">New Tab</span><input class="input-edittab" type="text" id="myTab-input-'+array[2]+'-'+array[3]+'" value="New Tab" /><i class="icon-cancel-circle" title="close" index="#'+array[2]+'-'+array[3]+'"></a></li>');
				jQuery(this).parent().parent().parent().find('.tab-content').append('<div class="tab-pane " id="'+array[2]+'-'+array[3]+'"><ul class="sortable sortable-tabitem ui-sortable"></ul></div>');
				addEventTab(array[2]);
				jQuery('#st-page #myTab-'+array[2]+' .input-edittab').hide();
				return false;
			});
			jQuery('[id*="myTab"] a.st-tab .icon-cancel-circle').click(function(){
				var sele = jQuery(this).attr('index');
				var count = jQuery(this).parent().parent().parent().find('>li').length;
				if(count==2){
					alert('Keep minimum 1 tab');
					return false;
				}else{
					jQuery(sele).remove();
					jQuery(this).parent().parent().remove();
					return false;
				}
			});
			jQuery('[id*="myTab"] a.st-tab').click(function (e) {
				e.preventDefault();
				jQuery(this).tab('show');
			});
			jQuery('[id*="myTab"] [id*="myTab-input"]').hide();
		}
	});
}

//////////////////////////////// Button ////////////////////////////////////
function appendDataColumn(sele){
	if(!sele.hasClass("st-column-container")){
		arr = [];
		sele.each(function(index){
			arr.push(jQuery.parseJSON(decodeURIComponent(jQuery(this).attr("data"))));
		});
		return arr;
	}else{
		data = jQuery.parseJSON(decodeURIComponent(jQuery(this).attr("data")));
		jQuery(this).find('.sortable-column').each(function(){
			var a = appendDataColumn(jQuery(this).find('>li'));
			data.content[index].content.push(a);
		});
		return data;
	}
}

function saveblue_pagebuilder(){
		jQuery('#system-message-container').html("");

		name=jQuery("#toolbar #inputNamepage").val();

		if(name==""){
			alert("Name Page is not empty !");
			jQuery("#toolbar #inputNamepage").focus();
			return false;
		}
		arr = [];
		jQuery('#st-page>li').each(function(){
			if(jQuery(this).hasClass("st-column-container")){
				data = jQuery.parseJSON(decodeURIComponent(jQuery(this).attr("data")));
				jQuery(this).find('.sortable-column').each(function(index){
					var a = [];
					jQuery(this).find('>li').each(function(){
						if(jQuery(this).attr("data-type")=='tabs_desi'){
							jQuery(this).attr("data",saveTabOption(jQuery(this),jQuery.parseJSON(decodeURIComponent(jQuery(this).attr("data")))));
						}
						a.push(jQuery.parseJSON(decodeURIComponent(jQuery(this).attr("data"))));
					});
					data.content[index].content = a;
				});
				jQuery(this).attr("data",encodeURIComponent(JSON.stringify(data)));
			}else if(jQuery(this).hasClass("st-tabs-container")){
				data = jQuery.parseJSON(decodeURIComponent(jQuery(this).attr("data")));
				jQuery(this).attr("data",saveTabOption(jQuery(this),data));
			}
			//jQuery('#st-debug').html();
			arr.push(jQuery(this).attr('data'));
		});
		json = JSON.stringify(arr);
		var config = {"id":jQuery.trim(jQuery('#page-id-config').val()),"class":jQuery.trim(jQuery('#page-class-config').val()),"fullwidth":jQuery('#page-fullwidth [name="page-fullwidth"]:checked').val(),"author":jQuery.trim(jQuery('#page-author-config').val())};
		jQuery.ajax({
			type:"POST",
			url:"index.php?option=com_blue_pagebuilder&task=page.stSave&tmpl=component",
			data:{data:json,id:jQuery('#stid').val(),name:name,config:JSON.stringify(config)},
			dataType : 'html',
			beforeSend :function(){
				ajaxbeforesend();
			},
			success:function(response){
				//console.log(response);
				ajaxsuccess(response);
				
				//jQuery('#system-message-container').html('<div><button type="button" class="close" data-dismiss="alert">×</button><div class="alert alert-success"><h4 class="alert-heading">Message</h4><p>'+response+'</p></div>');
			}
		});
	}

function buttonsave(){
	jQuery("#toolbar-apply").click(function(){
		saveblue_pagebuilder();
	});
	jQuery("#toolbar-save").click(function(){
		saveblue_pagebuilder();
		//setTimeout(function(){window.location="index.php?option=com_blue_pagebuilder";},wait);
		jQuery("body").on("stSaveSuccess", function(){
			window.location="index.php?option=com_blue_pagebuilder";
		});
	});
}
function ajaxbeforesend(){
	var inputs = jQuery("#toolbar").find("input, select, button, textarea");
    inputs.prop("disabled", true);
    jQuery('#st-save-eff .icon-spinner').show();
    jQuery('#st-save-eff .message').hide();
	jQuery('#st-save-eff').show();
	jQuery('.st-design .st-items,.st-design .st-desi').css({opacity:0.6});
}

function ajaxsuccess(response){
	var inputs = jQuery("#toolbar").find("input, select, button, textarea");
    inputs.prop("disabled", false);
    jQuery('#st-save-eff .icon-spinner').hide();
    jQuery('#st-save-eff .message').fadeIn(200);
    var wait = window.setTimeout( function(){
	    	jQuery('#st-save-eff').fadeOut(400);
	    	jQuery('.st-design .st-items,.st-design .st-desi').css({opacity:1});
		},1000
	);
	jQuery("body").trigger("stSaveSuccess");
}

////////////////////////////////  Item //////////////////////////////////////


// get Portfolio Option
function getPortfolioOption(data){
	content ="<div class='st-nav-title'><i class='icon-folder-open-alt'></i> Portfolio<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
	content+="<div class='st-nav-option st-portfolio'>";
		content +="<div class='row-fluid'>";
			content +="<div class='span6'>";
				content+="<label>Category:</label>";
        		content+="<div class='row-fluid st-category'></div>";
        		content += getBt2Inputgroup([['text', 'st-title','span12','','Title','Title', data.attr.title,'Portfolio']],false);
        		content += getBt2Textareagroup([['st-description','span12','',data.attr.description,'Description', '5','']], false);
                content += getBt2Inputgroup([['text', 'st-stid','span12','','Id','Id', data.attr.stid,'Id']],false);
        		content += getBt2Inputgroup([['text', 'st-menuid','span12','','Menu Id','Menu Id', data.attr.menuid,'']],false);
        		content += getBt2Textareagroup([['st-class','span12','',data.attr.class,'Class', '5','Portfolio class']], false);
			
            content +="</div>";
			content +="<div class='span6'>";
				content += getBt2Inputgroup([['text', 'st-itemcount','span12','','Count','Count', data.attr.count,'All']],false);
				content += getBt2Selectgroup('Order', 'st-order', 'span12', '', data.attr.order, [['Created', 'created'],['Ordering', 'ordering']], false);
				content += getBt2Selectgroup('Direction', 'st-direction', 'span12', '', data.attr.direction, [['ASC', 'ASC'],['DESC', 'DESC']], false);
				content += getBt2Selectgroup('Columns', 'st-portfolio-columns', 'span12', '', data.attr.columns, [['2 Columns', '2'],['3 Columns', '3'],['4 Columns', '4'],['6 Columns', '6']], false);
				content += getBt2Selectgroup('State', 'st-state', 'span12', '', data.attr.state, [['Yes', '1'],['No', '0']], false);
				content += getBt2Selectgroup('Template', 'st-portfolio-template', 'span12', '', data.attr.template, [['Default', 'portfolio'],['Default1', 'portfolio1']], false);
			content +="</div>";
		content +="</div>";
		content+="<div class='st-button-group'>";
		content+="<button class='btn btn-primary btn-save'>Save</button>";
		content+="<button class='btn btn-cancel'>Cancel</button>";
		content+="</div>";
	content+="</div>";

	jQuery('.st-navigation').html(content);
	jQuery('#st-navigation .btn-primary.btn-save').click(function(){
		savePortfolio(data);
	});
}



function savePortfolio(data){
	data.attr.id = jQuery('#st-navigation .st-category select').val();
	data.attr.title = jQuery('#st-navigation .st-portfolio [name="st-title"]').val();
    data.attr.description = jQuery('#st-navigation .st-portfolio [name="st-description"]').val();
	data.attr.stid = jQuery('#st-navigation .st-portfolio [name="st-stid"]').val();
	data.attr.menuid = jQuery('#st-navigation .st-portfolio [name="st-menuid"]').val();
    data.attr.class = jQuery('#st-navigation .st-portfolio [name="st-class"]').val();
    data.attr.order = jQuery('select[name="st-order"] option:selected').val();
    data.attr.direction = jQuery('select[name="st-direction"] option:selected').val();
    data.attr.state = jQuery('select[name="st-state"] option:selected').val();
	data.attr.count = jQuery('input[name="st-itemcount"]').val();
    data.attr.columns = jQuery('select[name="st-portfolio-columns"] option:selected').val();
	data.attr.template = jQuery('select[name="st-portfolio-template"] option:selected').val();
	jQuery('#st-page li.st-focus').attr("data",encodeURIComponent(JSON.stringify(data)));
	jQuery.stbox.close();
}
// End Portfolio

// Get Option Tabs
function getTabsOption(data){
	content ="<div class='st-nav-title'><i class='icon-box'></i> Tabs<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
	content+="<div class='st-nav-option'>";
        content+='<label>Title:</label>';
		content+='<div class="row-fluid"><input type="text" class="st-title" value="'+((data.attr.title!=null)?data.attr.title:"")+'" /></div>';
        content+='<label>Heading class:</label>';
		content+='<div class="row-fluid"><input type="text" class="st-hclass" value="'+((data.attr.hclass!=null)?data.attr.hclass:"item_heading")+'" /></div>';
        
		content+="<label>Type:</label>";
		content+="<div class='row-fluid'><select class='st-tabposition'>";
			content+='<option value="style1">Horizontal Tabs</option>';
			content+='<option value="style2">Vertical Tabs</option>';
			content+='<option value="accordion">Accordions</option>';
		content+="</select></div>";
        content+="<label>State:</label>";
        content+="<div class='row-fluid'><select class='st-state'>";
			content+='<option value="1">Yes</option>';
			content+='<option value="0">No</option>';
		content+="</select></div>";
		content+="<div class='st-button-group'>";
		content+="<button class='btn btn-primary btn-save'>Save</button>";
		content+="<button class='btn btn-cancel'>Cancel</button>";
		content+="</div>";
	content+="</div>";
	jQuery('.st-navigation').html(content);
	jQuery('.st-navigation .st-tabposition [value="'+data.attr.position+'"]').attr("selected","selected");
	jQuery('.st-navigation .st-state [value="'+data.attr.state+'"]').attr("selected","selected");
    jQuery('.st-navigation .st-title [value="'+((data.attr.title!=null)?data.attr.title:"")+'"]').prop("checked",true);
    jQuery('.st-navigation .st-hclass [value="'+((data.attr.hclass!=null)?data.attr.hclass:"")+'"]').prop("checked",true);
    
	jQuery('.st-nav-option button.btn-primary.btn-save').click(function(){
		saveTabs(data);
	});
}

function saveTabs(data){
    data.attr.title = jQuery('.st-nav-option .st-title').val();
    data.attr.hclass = jQuery('.st-nav-option .st-hclass').val();
	data.attr.position=jQuery('.st-nav-option .st-tabposition').val();
	data.attr.state=jQuery('.st-nav-option .st-state').val();
	var json = encodeURIComponent(JSON.stringify(data));
	jQuery('#st-page li.st-focus').attr("data",json);
	jQuery.stbox.close();
}

function AddTab(item){
	data = jQuery.parseJSON(decodeURIComponent(jQuery(item).attr("data")));
	var id = makeid();
	content ='<div class="st-tabitems">';
		content+='<ul class="nav nav-tabs" id="myTab-'+id+'">';
		for(i=0;i<data.content.length;i++){
			content+='<li '+((i==0)?'class="active"':'')+'><a class="st-tab" href="#'+id+'-'+i+'" index="'+i+'">';
				content+='<span class="tabname">'+data.content[i].attr.title+'</span>';
				content+='<input index="'+i+'" class="input-edittab" type="text" id="myTab-input-'+id+'-'+i+'" value="'+data.content[i].attr.title+'" />';
				content+='<i class="icon-cancel-circle" title="close" index="#'+id+'-'+i+'"></i>';
			content+='</a></li>';
		}
			content+='<li><a class="newtab" href="#"><i class=" icon-plus"></i></a></li>';
		content+='</ul>';
		content+='<div class="tab-content">';
		for(i=0;i<data.content.length;i++){
			content+='<div class="tab-pane '+((i==0)?'active':'')+'" id="'+id+'-'+i+'"><ul class="sortable sortable-tabitem"></ul></div>';
		}
		content+='</div>';
	content+='</div>';
	jQuery(item).append(content);
	jQuery('#myTab-'+id+' a.newtab').click(function (e) {
		var len = jQuery(this).parent().parent().find('>li').length - 1;
		jQuery(this).parent().before('<li class=""><a class="st-tab" href="#'+id+'-'+len+'"><span class="tabname">New Tab</span><input class="input-edittab" type="text" id="myTab-input-'+id+'-'+len+'" value="New Tab" /><i class="icon-cancel-circle" title="close" index="#'+id+'-'+len+'"></i></a></li>');
		jQuery(this).parent().parent().parent().find('.tab-content').append('<div class="tab-pane " id="'+id+'-'+len+'"><ul class="sortable sortable-tabitem ui-sortable"></ul></div>');
		addEventTab(id);
		jQuery('#st-page #myTab-'+id+' .input-edittab').hide();
		return false;
	});
	jQuery('#st-page #myTab-'+id+' .input-edittab').hide();
	addEventTab(id);
}

function addEventTab(id){
	duplicateItem();
	buttonNewtab();
	jQuery('#myTab-'+id+' a.st-tab').click(function (e) {
		e.preventDefault();
		jQuery(this).tab('show');
	});
	jQuery('#myTab-'+id+' a.st-tab').dblclick(function(){
		jQuery(this).find('.tabname').hide();
		jQuery(this).find('.input-edittab').show();
		addEventIputTab(jQuery(this),jQuery('#myTab-'+id).parent().parent());
	});
	jQuery('#myTab-'+id+' a.st-tab .icon-cancel-circle').click(function(){
		var sele = jQuery(this).attr('index');
		var count = jQuery(this).parent().parent().parent().find('>li').length;
		if(count==2){
			alert('Keep minimum 1 tab');
			return false;
		}else{
			jQuery(sele).remove();
			jQuery(this).parent().parent().remove();
			return false;
		}
	});
	addsort();
}

function buttonNewtab(){
	jQuery('[id*="myTab"] a.newtab').unbind('click');
	jQuery('[id*="myTab"] a.newtab').click(function (e) {
		var array = jQuery(this).parent().prev().find('.input-edittab').attr('id').split("-");
		console.log(array);
		array[3]=(array[3]+1);
		console.log(array);
		jQuery(this).parent().before('<li class=""><a class="st-tab" href="#'+array[2]+'-'+array[3]+'"><span class="tabname">New Tab</span><input class="input-edittab" type="text" id="myTab-input-'+array[2]+'-'+array[3]+'" value="New Tab" /><i class="icon-cancel-circle" title="close" index="#'+array[2]+'-'+array[3]+'"></a></li>');
		jQuery(this).parent().parent().parent().find('.tab-content').append('<div class="tab-pane " id="'+array[2]+'-'+array[3]+'"><ul class="sortable sortable-tabitem ui-sortable"></ul></div>');
		addEventTab(array[2]);
		jQuery('#st-page #myTab-'+array[2]+' .input-edittab').hide();
		return false;
	});
}

function addEventIputTab(ele,pare){
	ele.find('.input-edittab').focus().keyup(function(e){
		if(e.which==13){
			var data = jQuery.parseJSON(decodeURIComponent(pare.attr('data')));
			var title = ele.find('.input-edittab').val();
			var index = ele.attr('index');
			ele.find('.tabname').text(title).show();
			ele.find('.input-edittab').hide();
			data.content[index].attr.title = title;
		}else if(e.which==27){
			ele.find('.tabname').show();
			ele.find('.input-edittab').val(ele.find('.tabname').text()).hide();
		}
	}).blur(function(){
		var data = jQuery.parseJSON(decodeURIComponent(pare.attr('data')));
		var title = ele.find('.input-edittab').val();
		var index = ele.attr('index');
		ele.find('.tabname').text(title).show();
		ele.find('.input-edittab').hide();
		data.content[index].attr.title = title;
	});
}

function saveTabOption(sele,data){
	data.content=[];
	sele.find('.sortable-tabitem').each(function(index){
		var title = jQuery(jQuery(this).closest('.tab-content').parent().find('.nav-tabs li')[index]).find('a').text();
		var a = [];
		jQuery(this).find('>li').each(function(){
			a.push(jQuery.parseJSON(decodeURIComponent(jQuery(this).attr("data"))));
		});
		var item = {"attr":{"title":title},"content":a,"type":"tabst_item_desi"};
		data.content.push(item);
	});
	return encodeURIComponent(JSON.stringify(data));
}

function TabsDesign(sele,data){
	jQuery(sele).find('.sortable-tabitem').each(function(index){
		for(i=0;i<data[index].content.length;i++){
			var html="";
			html+="<li data-type='"+arrayType[data[index].content[i].type].type+"' class='ui-state-highlight btn ui-draggable "+arrayType[data[index].content[i].type].class+"' style='display:block;' data='"+encodeURIComponent(JSON.stringify(data[index].content[i]))+"'>";
				html+="<div class='st-header-title'>";
					html+="<span class='st-name'>"+arrayType[data[index].content[i].type].name+"</span> ";
					html+="<span href='#' class='st-close' title='Close'><i class='icon-cancel-circle'></i></span> ";
					html+="<span href='#st-navigation' data-type='"+arrayType[data[index].content[i].type].type+"' title='Edit' class='st-edit stmodal'><i class='icon-cog-2'></i></span>";
					html+='<span href="#" class="st-duplicate" title="Duplicate"><i class="icon-copy"></i></span>';
				html+="</div>";
			html+="</li>";
			jQuery(this).append(html);
		}
	});
}
//End Tab Option

// Get Option HTML
function getHtmlOption(data){
	content ="<div class='st-nav-title'><i class='icon-code'></i> HTML<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
	content+="<div class='st-nav-option'>";
        content+="<label>Title</label>";
        content+="<div class='title'><input type='text' class='html-title' value='"+((data.attr.title==null)?"":data.attr.title)+"' ></div>";
		content+="<div class='row-fluid'>";
			content+="<div class='span12 st-editor'>";
				content+="<iframe class='if-editor' src='index.php?option=com_blue_pagebuilder&task=page.getEditor&tmpl=component' width='100%' height='370'></iframe>";
			content+="</div>";
		content+="</div>";
		content+="<div class='st-button-group'>";
		content+="<button class='btn btn-primary btn-html'>Save</button>";
		content+="<button class='btn btn-cancel'>Cancel</button>";
		content+="</div>";
	content+="</div>";
	jQuery('.st-navigation').html(content);
	jQuery('#st-navigation .if-editor').load(function(){
		setDataEditor(data.content);
		jQuery('#st-navigation iframe').contents().find('.mce_editable').css('width', '98%');
	});
	jQuery('.st-nav-option button.btn-primary.btn-html').click(function(){
		saveHtml();
	});
}

function setDataEditor(ct){	
	window.setTimeout(function(){
		  if(jQuery('#st-navigation iframe').contents().find('iframe').contents().find('body').length>0){
		   jQuery('#st-navigation iframe').contents().find('iframe').contents().find('body').html(decodeURIComponent(ct));
		  }else{
		   setDataEditor(ct);
		  }
	},300);
}
function saveHtml(){
    var title = convertHTML(jQuery('.st-navigation .html-title').val());
    jQuery('#st-page .st-focus .st-header-title .st-name').find('.st-modulename').remove();
    jQuery('#st-page .st-focus .st-header-title .st-name').append(' <span class="st-modulename">'+title+'</span>');
	var html = encodeURIComponent(jQuery('#st-navigation iframe').contents().find('iframe').contents().find('body').html());

	var json = encodeURIComponent(JSON.stringify({"type":"html_desi","content":html,"attr":{"title":title}}));
	jQuery('#st-page li.st-focus').attr("data",json);
	jQuery.stbox.close();
}

// End Option HMTL

// Get Option Module
function getModuleOption(data){
	content ="<div class='st-nav-title'><i class='icon-qrcode-2'></i> Module<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
	content+="<div class='st-nav-option st-module'>";
		content+="<div class='row-fluid'>";
			content+="<div class='span12'>";
				content+="<label>Choose Module From Module Manager:</label>";
				content+="<div class='st-listmodule'></div>";
			content+="</div>";
		//content+="</div>";
		content+="<div class='span12'>";
			content+="<label>Show title:</label>";
			content+="<div class='st-showtitle st-radio'>"; 
				content+='<label class="radio inline"><input type="radio" name="st-title" value="0" checked="checked">No</label>';
				content+='<label class="radio inline"><input type="radio" name="st-title" value="1">Yes</label>';
			content+="</div>";
		content+="</div>";
		content+="<div class='span11'>";
		content+="<label>Chose Template:</label>";
		//content+="<div class='row-fluid'>";
		content +="<select name='st-module-template' class='span12'>";
			content +="<option value='module' " + ((data.attr.template == "module")? 'selected="selected"' : '')+ ">Default11</option>";
			content +="<option value='module-none'" + ((data.attr.template == "module-none")? 'selected="selected"' : '')+ ">Clean</option>";
		content +="</select>";
		content+="</div>";
		content+="<div class='span11'>";
			content+="<label>Module Class Suffix:</label>";
			content+="<input type='text' class='st-moduleclass span12' value='"+((data.attr.moduleclass==null)?"":data.attr.moduleclass)+"'></div>";
		content+="<div class='span11'>";
			content+="<label>Heading Class:</label>";
			content+="<input type='text' class='st-hclass span12' value='"+((data.attr.hclass==null)?"":data.attr.hclass)+"'></div>";
		content+="<div class='span11'>";
			content+="<label>State:</label>";
			content+="<div class='st-state st-radio'>"; 
				content+='<label class="radio inline"><input type="radio" name="st-state" value="0" checked="checked">No</label>';
				content+='<label class="radio inline"><input type="radio" name="st-state" value="1">Yes</label>';
			content+="</div>";
		content+="</div>";
        content+="<div class='st-button-group'>";
		content+="<button class='btn btn-primary btn-save'>Save</button>";
		content+="<button class='btn btn-cancel'>Cancel</button>";
		content+="</div>";
		content+="</div>";
	content+="</div>";
	jQuery('.st-navigation').html(content);
	if(typeof data.attr.showtitle !='undefined'){
		jQuery('#st-navigation .st-showtitle [value="'+data.attr.showtitle+'"]').prop('checked', true);
	}
    if(typeof data.attr.state !='undefined'){
		jQuery('#st-navigation .st-state [value="'+data.attr.state+'"]').prop('checked', true);
	}
	jQuery('.st-nav-option button.btn-primary.btn-save').click(function(){
		saveModule();
	});
}

function saveModule(){
	var title = jQuery('#st-navigation #jform_modules_chzn>a>span').text();
	jQuery('#st-page .st-focus .st-header-title .st-name').find('.st-modulename').remove();
	jQuery('#st-page .st-focus .st-header-title .st-name').append(' <span class="st-modulename">'+title+'</span>');
	// validate
	if(jQuery('#st-navigation #jform_modules').val()==0){
		alert('Please select a module !');
		return false;
	}
	if(testspecialclass(jQuery('#st-navigation .st-moduleclass').val())){
		data = {"type":"moduleid_desi","content":"","attr":{"id":jQuery('.st-nav-option #jform_modules').val(),"title":title}};
		data.attr.showtitle=jQuery('#st-navigation .st-showtitle [type="radio"]:checked').val();
		data.attr.state=jQuery('#st-navigation .st-state [type="radio"]:checked').val();
		data.attr.moduleclass = jQuery('#st-navigation .st-moduleclass').val();
		data.attr.hclass = jQuery('#st-navigation .st-hclass').val();
		data.attr.template = jQuery('select[name="st-module-template"] option:selected').val();
		var json = encodeURIComponent(JSON.stringify(data));
		jQuery('#st-page li.st-focus').attr("data",json);
		//console.log(json);
		jQuery.stbox.close();
	}else{
		alert('No special characters allowed.');
		return false;
	}
}

// End Option Module

// get Option Gallery
function getGalleryOption(data){
	content ="<div class='st-nav-title'><i class='icon-image'></i> Gallery<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
	content+="<div class='st-nav-option st-gallery-option'>";
		content+='<ul class="nav nav-tabs" id="tabpopup">';
			content+='<li class="active"><a href="#getimage"><i class="icon-images"></i>Select Images</a></li>';
			content+='<li><a href="#config"><i class="icon-cog-2"></i>Config</a></li>';
		content+='</ul>';
		content+='<div class="tab-content">';
			//Select Image
			content+='<div class="tab-pane active" id="getimage">';
				content+='<div class="row-fluid">';
					content+='<div class="span5">';
                        
						content+='<label>Path:</label><input type="text" class="st-path" value="images/" /><button class="btn btn-primary st-go" type="button" >Go</button>';
						content+='<div class="st-dragimage">'; 
							content+='<div id="st-load"><div class="st-loadding"><i class="icon-spinner-5 icon-spinning"></i></div>';
							content+='<div class="st-mark"></div></div>';
							content+='<ul id="dragImage">';
							content+='</ul>';
						content+='</div>';
					content+='</div>';
					content+='<div class="span2">';
						content+='<span>Drag and Drop</span>';
					content+='</div>';
					content+='<div class="span5">';
						content+='<strong>Drag & Drop images here:</strong>';
						content+='<div class="st-sortimage"><ul id="sortImage">';
						for(var i=0;i<data.content.length;i++){
							content+='<li class="st-selectimage" data-desc="'+((data.content[i].attr.desc!=null)?data.content[i].attr.desc:"")+'" data-title="'+((data.content[i].attr.title!=null)?data.content[i].attr.title:"")+'" data-link-text="'+((data.content[i].attr.link_text!=null)?data.content[i].attr.link_text:"")+'" data-link="'+((data.content[i].attr.link!=null)?data.content[i].attr.link:"")+'" data-image-full="'+((data.content[i].attr.image_full!=null)?data.content[i].attr.image_full:"")+'">';
								content+='<i class="icon-cancel-circle "></i>';
								content+='<img data-site="'+data.content[i].content+'" src="'+data.content[i].attr.linkadmin+'" />';
							content+='</li>';
						}
						content+='</ul></div>';
						content+='<div class="st-desc-item">';
							content+='<label>Image Title:</label>';
							content+='<div class="row-fluid"><input type="text" class="st-desc-title span12" /></div>'
							content+='<label>Description:</label>';
							content+='<div class="row-fluid">';
								content+='<textarea class="span12 st-desc-content" rows="3"></textarea>';
							content+='</div>';
                            content+='<label>Link Text:</label>';
							content+='<div class="row-fluid"><input type="text" class="st-desc-link-text span12" /></div>'
							content+='<label>Link:</label>';
							content+='<div class="row-fluid"><input type="text" class="st-desc-link span12" /></div>'
							
						content+='</div>';
					content+='</div>';
				content+="</div>";
			content+='</div>';
			//End Select Image
			content+='<div class="tab-pane" id="config">';
				content+='<div class="row-fluid">';
                    
					content+='<div class="span6">';
                        content+='<label>Title:</label>';
						content+='<div class="row-fluid"><input type="text" class="st-title span6" value="'+((data.attr.title!=null)?data.attr.title:"")+'" /></div>';
						content+='<label>Heading Class:</label>';
						content+='<div class="row-fluid"><input type="text" class="st-class span6" value="'+((data.attr.class!=null)?data.attr.class:"iteam_heading")+'" /></div>';
						
    					//content+='<label>Thumb Width:</label>';
//    					content+='<div class="row-fluid"><input type="text" class="st-width span6" value="'+((data.attr.width!=null)?data.attr.width:"80")+'" /></div>';
//                        content+='<label>Thumb Height:</label>';
//    					content+='<div class="row-fluid"><input type="text" class="st-height span6" value="'+((data.attr.height!=null)?data.attr.height:"80")+'" /></div>';
    //						content+='<label>Auto:</label>';
    //						content+='<div class="row-fluid"><select class="st-auto span6">';
    //							content+='<option value="true">True</option>';
    //							content+='<option value="false">False</option>';
    //						content+='</select></div>';
                        content+='<div class="row-fluid">';
                        content += getBt2Selectgroup('Columns', 'st-columns', 'span6', '', data.attr.columns, [['2 Columns', '2'],['3 Columns', '3'],['4 Columns', '4'],['6 Columns', '6']], false);
				        content+='</div>';
                        content+='<div class="row-fluid">';
                            content += getBt2Selectgroup('Template', 'st-slider-template', 'span6', '', data.attr.template, [['Default','gallery'],['Default1','gallery1']], false);
                        content+='</div>';
                        content+="<label>State:</label>";
            			content+="<div class='st-state st-radio'>"; 
            				content+='<label class="radio inline"><input type="radio" name="st-state" value="0" checked="checked">No</label>';
            				content+='<label class="radio inline"><input type="radio" name="st-state" value="1">Yes</label>';
            			content+="</div>";
					content+='</div>';
                    
					//content+='<div class="span6">';
//						content+='<label>Type Slider:</label>';
//						content+="<div class='st-typeslider st-radio'>"; 
//							content+='<label class="radio "><input type="radio" name="st-pancontrol" value="2" checked="checked">Camera</label>';
//							content+='<label class="radio "><input type="radio" name="st-pancontrol" value="3">Flex</label>';
//							content+='<label class="radio "><input type="radio" name="st-pancontrol" value="4">Nivo</label>';
//							content+='<label class="radio "><input type="radio" name="st-pancontrol" value="5">Elastic</label>';
//							content+='<label class="radio "><input type="radio" name="st-pancontrol" value="6">Accordion</label>';
//							content+='<label class="radio "><input type="radio" name="st-pancontrol" value="7">carousel Box</label>';
//						content+="</div>";
//					content+='</div>';
				content+='</div>';
			content+='</div>';
		content+='</div>';
        

		content+="<div class='st-button-group'>";
    		content+="<button class='btn btn-primary btn-save'>Save</button>";
    		content+="<button class='btn btn-cancel'>Cancel</button>";
		content+="</div>";
	content+="</div>";
	jQuery('.st-navigation').html(content);

	gallerySelectImage();
	jQuery('#st-navigation .st-typeslider [value="'+((data.attr.typeslider!=null)?data.attr.typeslider:"1")+'"]').prop('checked', true);
	jQuery('#st-navigation .st-state [value="'+((data.attr.state!=null)?data.attr.state:"1")+'"]').prop('checked', true);
//	jQuery('#st-navigation .st-state [value="'+data.attr.state+'"]').attr("selected","selected");
	jQuery('#tabpopup a').click(function (e) {
		e.preventDefault();
		jQuery(this).tab('show');
	});
    if(typeof data.attr.state !='undefined'){
		jQuery('#st-navigation .st-state [value="'+data.attr.state+'"]').prop('checked', true);
	}
	jQuery('#st-navigation .st-go').click(function(){
		loadImages(jQuery("#st-navigation .st-path").val());
	});
	
	jQuery('#sortImage [class^="icon-"]').click(function(){
		jQuery(this).parent().remove();
	});
	jQuery('.st-nav-option .st-button-group button.btn-primary.btn-save').click(function(){
		saveGallery();
	});
}

function gallerySelectImage(){
	jQuery('.st-navigation #sortImage .st-selectimage').click(function(){
		//console.log(encodeURIComponent('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed cumque distinctio labore minima ipsum fugit aspernatur dolore deserunt iure sunt officiis iusto <span class="color-text">itaque rerum reprehenderit laborum</span> dignissimos iste assumenda dolorem?'))
		jQuery('.st-navigation #sortImage .st-selectimage').removeClass('selected');
		jQuery(this).addClass('selected');
		jQuery('.st-navigation .st-desc-item .st-desc-title').val(jQuery(this).attr('data-title'));
        jQuery('.st-navigation .st-desc-item .st-desc-link-text').val(jQuery(this).attr('data-link-text'));
        jQuery('.st-navigation .st-desc-item .st-desc-link').val(jQuery(this).attr('data-link'));
        jQuery('.st-navigation .st-desc-item .st-desc-image-full').val(jQuery(this).attr('data-image-full'));
        jQuery('.st-navigation .st-desc-item .st-desc-content').val((jQuery(this).attr('data-desc')!=null)?decodeURIComponent(jQuery(this).attr('data-desc')):"");
	});
	jQuery('.st-navigation .st-desc-item .st-desc-title').keyup(function() {
		jQuery('.st-navigation #sortImage .st-selectimage.selected').attr("data-title",jQuery(this).val());
	});
    jQuery('.st-navigation .st-desc-item .st-desc-link-text').keyup(function() {
		jQuery('.st-navigation #sortImage .st-selectimage.selected').attr("data-link-text",jQuery(this).val());
	});
    jQuery('.st-navigation .st-desc-item .st-desc-link').keyup(function() {
		jQuery('.st-navigation #sortImage .st-selectimage.selected').attr("data-link",jQuery(this).val());
	});    
    
	jQuery('.st-navigation .st-desc-item .st-desc-content').keyup(function() {
		jQuery('.st-navigation #sortImage .st-selectimage.selected').attr("data-desc",encodeURIComponent(jQuery(this).val()));
	});
}

function saveGallery(){
		data = {"type":"gallery_desi","content":[],"attr":{}};
        data.attr.template = jQuery('select[name="st-slider-template"] option:selected').val();
        data.attr.columns = jQuery('select[name="st-columns"] option:selected').val();
        data.attr.state=jQuery('#st-navigation .st-state [type="radio"]:checked').val();
		data.attr.class=jQuery('#st-navigation .st-class').val();
		data.attr.title=jQuery('#st-navigation .st-title').val();
		data.attr.class=jQuery('#st-navigation .st-class').val();
		data.attr.width=jQuery('#st-navigation .st-width').val();
		data.attr.height=jQuery('#st-navigation .st-height').val();
		//data.attr.typeslider= jQuery('#st-navigation .st-typeslider input[type="radio"]:checked').val();
		var link = "";
		jQuery('#st-navigation #sortImage li').each(function(index){
			var arr = {"type":"item_gallery_desi","content":jQuery(this).find('img').attr("data-site"),"attr":{"linkadmin":jQuery(this).find('img').attr("src"),"title":jQuery.trim(jQuery(this).attr("data-title")),"desc":jQuery.trim(jQuery(this).attr("data-desc")),"link_text":jQuery.trim(jQuery(this).attr("data-link-text")),"link":jQuery.trim(jQuery(this).attr("data-link"))}};
			data.content.push(arr);
		});
		//console.log(data);
		var json = encodeURIComponent(JSON.stringify(data));
		jQuery('#st-page li.st-focus').attr("data",json);
		jQuery.stbox.close();
}
//  End Slider Option

// get Option Vimeo
function getVimeoOption(data) {
    content = "<div class='st-nav-title'><i class='icon-vimeo'></i> Vimeo<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
    content += "<div class='st-nav-option'>";
	    //content += "<!-- Nav tabs -->";
	    content += '<div class="row-fluid">';
		    
	    		content += getBt2Inputgroup([['text', 'st-link','span12','','Video link','Enter vimeo link here', data.content]], false);

	    		content += '<div class="control-group row-fluid">';
	    			content += '<label class="control-label">Demensions</label>';
	    			content += '<div class="controls">';
	    				content += '<div class="input-prepend input-append span6">';
	    					content += '<span class="add-on">W</span>';
	    					content += '<input class="st-widthoption span4" name="st-width" id="appendedPrependedInput" value="' + data.attr.width + '" type="text">';
	    					content += '<span class="add-on">px</span>';
	    				content += '</div>';
	    				content += '<div class="input-prepend input-append span6">';
						    content += '<span class="add-on">H</span>';
						    content += '<input class="st-heightoption span4" name="st-height" id="appendedPrependedInput" value="' + data.attr.height + '"  type="text">';
						    content += '<span class="add-on">px</span>';
	    				content += '</div>';
	    			content += '</div>';
	    		content += '</div>';

	    	content += '<div class="row-fluid">';

	    		content += '<div class="span6">';
	    			content += getBtRadioCheckbox('Autoplay', 'st-autoplay' ,data.attr.autoplay , '1' ,[['radio','inputbox','','1','Yes'],['radio','inputbox','','0','No']], false);

		    		content += getBtRadioCheckbox('Loop', 'st-loop' ,data.attr.loop , '0',[['radio','inputbox','','1','Yes'],['radio','inputbox','','0','No']], false);


		    		content += getBtRadioCheckbox('Enables the badge', 'st-badge' ,data.attr.badge , '1',[['radio','inputbox','','1','Yes'],['radio','inputbox','','0','No']], false);

		    		

	    		content += '</div>';

	    		content += '<div class="span6">';

	    			content += getBtRadioCheckbox('Show the user\’s byline', 'st-byline' ,data.attr.byline , '1',[['radio','inputbox','','1','Yes'],['radio','inputbox','','0','No']], false);

	    			content += getBtRadioCheckbox('Show the user\’s portrait', 'st-portrait' ,data.attr.portrait , '1',[['radio','inputbox','','1','Yes'],['radio','inputbox','','0','No']], false);

		    		content += getBtRadioCheckbox('Show title', 'st-title' ,data.attr.title , '1',[['radio','inputbox','','1','Yes'],['radio','inputbox','','0','No']], false);

		    		
	    		content += '</div>';

	    	content += '</div>';

	    		content += getBt2Inputgroup([['text', 'st-color','span12','','Color (make sure that you don\'t include the #)','Enter the player color', data.attr.color,'00adef']], false);

		    	content += getBt2Selectgroup('Alignment', 'st-alignment', 'inputbox span12' , '', data.attr.alignment, [['Left','left'],['Center','center'],['Right','right']], false);
		content += '</div>';

	    content += "<div class='st-button-group'>";
	    content += "<button class='btn btn-primary btn-save'>Save</button>";
	    content += "<button class='btn btn-cancel'>Cancel</button>";
	    content += "</div>";

    content += "</div>";

    jQuery('.st-navigation').html(content);
    jQuery('.st-nav-option button.btn-primary.btn-save').click(function() {
        saveVimeo();
    });
}

function saveVimeo() {
    var link = convertHTML(jQuery('input[name="st-link"]').val());
    if (testEmpty(jQuery('input[name="st-link"]'))) {
       
            alert('Please input your Vimeo link!');
            return false;
    } else {
        data = {"type": "vimeo_desi", "content": "", "attr": {}};
        data.content = link;
        //data.embed = embed;
        data.attr.width = jQuery('input[name="st-width"]').val();
        data.attr.height = jQuery('input[name="st-height"]').val();
        data.attr.autoplay = jQuery('input[name="st-autoplay"]:checked').val();
        data.attr.loop = jQuery('input[name="st-loop"]:checked').val();
        data.attr.badge = jQuery('input[name="st-badge"]:checked').val();
        data.attr.byline = jQuery('input[name="st-byline"]:checked').val();
        data.attr.portrait = jQuery('input[name="st-portrait"]:checked').val();
        data.attr.title = jQuery('input[name="st-title"]:checked').val();
        data.attr.color = jQuery('input[name="st-color"]').val();
        data.attr.alignment = jQuery('select[name="st-alignment"] option:selected').val();
        var json = encodeURIComponent(JSON.stringify(data));
        jQuery('#st-page li.st-focus').attr("data", json);
        jQuery.stbox.close();
    }
}
//  End Youtube Option

// get Option Youtube
function getYoutubeOption(data) {
    content = "<div class='st-nav-title'><i class='icon-youtube'></i> Youtube<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
    content += "<div class='st-nav-option'>";
	    content += "<!-- Nav tabs -->";
	    content += '<ul class="nav nav-tabs">';
		    content += '<li class="active"><a href="#youtube-content" data-toggle="tab">Content</a></li>';
		    content += '<li><a href="#youttube-settings" data-toggle="tab">Settings</a></li>';
	    content += '</ul>';
    content += '<!-- Tab panes -->';
    content += '<div class="tab-content">';
    	content += '<div class="tab-pane active" id="youtube-content">\n\n\ ';
    		content += "<div class='row-fluid'><input type='text' name='link-option' class='span12' value='" + data.content + "' placeholder='Enter the youtube link'></div>";
    	content += '</div>';
    	content += '<!-- End Tab panes 1 -->';
	    content += '<div class="tab-pane" id="youttube-settings">';
	    	content += '<div class="form-horizontal">';
	    		content += '<div class="control-group row-fluid">';
	    			content += '<label for="youtube-demensions-option" class="control-label col-md-4">Demensions</label>';
	    			content += '<div class="controls">';
	    				content += '<div class="input-prepend input-append">';
	    					content += '<span class="add-on">W</span>';
	    					content += '<input class="st-widthoption span4" id="appendedPrependedInput" value="' + data.attr.width + '" type="text">';
	    					content += '<span class="add-on">px</span>';
	    				content += '</div>';
	    				content += '<div class="input-prepend input-append">';
						    content += '<span class="add-on">H</span>';
						    content += '<input class="st-heightoption span4" id="appendedPrependedInput" value="' + data.attr.height + '"  type="text">';
						    content += '<span class="add-on">px</span>';
	    				content += '</div>';
	    			content += '</div>';
	    		content += '</div>';

			    content += '<div class="control-group row-fluid">';
				    content += '<label class="control-label col-md-4">Autoplay</label>';
				    content += '<div class="controls">';
					    content += '<label class="radio inline">Yes';
					    content += "<input type='radio' id='youtube-autoplay-option' name='autoplay-option' class='st-autoplayoption inputbox'" + ((data.attr.autoplay == '1') ? 'checked="checked"' : '') + " checked='checked'  value='1'></label>";
					    content += '<label class="radio inline">No';
					    content += "<input type='radio' id='youtube-autoplay-option' name='autoplay-option' class='st-autoplayoption inputbox' " + ((data.attr.autoplay == '0') ? 'checked="checked"' : '') + " value='0'></label>";
				    content += '</div>';
			    content += '</div>';

			    content += '<div class="control-group row-fluid">';
			    	content += '<label class="control-label col-md-4">Loop</label>';
				    content += '<div class="controls">';
					    content += '<label class="radio inline">Yes';
					    content += "<input type='radio' id='youtube-loop-option' name='loop-option' class='st-looption inputbox'" + ((data.attr.loop == '1') ? 'checked="checked"' : '') + "  checked='checked'  value='1'></label>";
					    content += '<label class="radio inline">No';
					    content += "<input type='radio' id='youtube-loop-option' name='loop-option' class='st-loopoption inputbox' " + ((data.attr.loop == '0') ? 'checked="checked"' : '') + "  value='0'></label>";
				    content += '</div>';
			    content += '</div>';


			    content += '<div class="control-group row-fluid">';
				    content += '<label class="control-label col-md-4">Controls Auto Hide</label>';
				    content += '<div class="controls">';
					    content += "<select name='hidecontrols-option' class='st-showcaptionoption inputbox'>";
						    content += "<option " + ((data.attr.hidecontrols == '0') ? 'selected="selected"' : '') + " value='0'>Automatic hide controls</option>";
						    content += "<option " + ((data.attr.hidecontrols == '1') ? 'selected="selected"' : '') + " value='1'>Show controls and load video</option>";
						    content += "<option " + ((data.attr.hidecontrols == '2') ? 'selected="selected"' : '') + " value='2'>Show controls</option>";
					    content += "</select>";
				    content += '</div>';
			    content += '</div>';

			    content += '<div class="control-group row-fluid">';
				    content += '<label class="control-label col-md-4">Show caption</label>';
				    content += '<div class="controls">';
					    content += '<label class="radio inline">Yes';
					    content += "<input type='radio' id='youtube-loop-option' name='showcaption-option' class='st-looption inputbox'" + ((data.attr.showcaption == '1') ? 'checked="checked"' : '') + "  checked='checked'  value='1'></label>";
					    content += '<label class="radio inline">No';
					    content += "<input type='radio' id='youtube-loop-option' name='showcaption-option' class='st-loopoption inputbox' " + ((data.attr.showcaption == '0') ? 'checked="checked"' : '') + "  value='0'></label>";
				    content += '</div>';
			    content += '</div>';

			    content += '<div class="control-group row-fluid">';
			    	content += '<label for="youtube-alignment-option" class="control-label col-md-4">Alignment</label>';
				    content += '<div class="controls">';
					    content += "<select id='youtube-alignment-option' class='st-showcaptionoption inputbox'>";
						    content += "<option " + ((data.attr.alignment == 'left') ? 'selected="selected"' : '') + " value='left'>Left</option>";
						    content += "<option " + ((data.attr.alignment == 'center') ? 'selected="selected"' : '') + " value='center'>Center</option>";
						    content += "<option " + ((data.attr.alignment == 'right') ? 'selected="selected"' : '') + " value='right'>Right</option>";
					    content += "</select>";
				    content += '</div>';
			    content += '</div>';
	    content += '</div>';

	content += '</div>';

	content += '</div>';
    content += "<div class='st-button-group'>";
    content += "<button class='btn btn-primary btn-save'>Save</button>";
    content += "<button class='btn btn-cancel'>Cancel</button>";
    content += "</div>";
    content += "</div>";
    jQuery('.st-navigation').html(content);
    jQuery('.st-nav-option button.btn-primary.btn-save').click(function() {
        saveYoutube();
    });
}

function saveYoutube() {
    var link = convertHTML(jQuery('input[name="link-option"]').val());
    //var embed = convertHTML(jQuery('input[name="embed-option"]').val());
    if (testEmpty(jQuery('input[name="link-option"]'))) {
        if (embed == "") {
            alert('Please input your Youtube link!');
            return false;
        }
    } else {
        data = {"type": "youtube_desi", "content": "", "attr": {"autoplay": ""}};
        data.content = link;
        //data.embed = embed;
        data.attr.width = jQuery('.st-navigation .st-nav-option .st-widthoption').val();
        data.attr.height = jQuery('.st-navigation .st-nav-option .st-heightoption').val();
        data.attr.autoplay = jQuery('input[name="autoplay-option"]:checked').val();
        data.attr.loop = jQuery('input[name="loop-option"]:checked').val();
        data.attr.hidecontrols = jQuery('select[name="hidecontrols-option"] option:checked').val();
        data.attr.showcaption = jQuery('input[name="showcaption-option"]:checked').val();
        data.attr.alignment = jQuery('select[name="alignment-option"] option:checked').val();
        var json = encodeURIComponent(JSON.stringify(data));
        jQuery('#st-page li.st-focus').attr("data", json);
        jQuery.stbox.close();
    }
}
//  End Youtube Option

// get Option Message Box
function getMessageBoxOption(data){
	content ="<div class='st-nav-title'><i class='icon-exclamation-sign'></i> Message Box<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
	content+="<div class='st-nav-option'>";
		content+="<div class='row-fluid'>";
			content +="<div class='span12'>";
				content += getBt2Selectgroup('Message Type', 'st-type', 'span12', '', data.attr.type, [['--- Select a type ---','0'],['Warning','warning'],['Info','info'],['Error','error'],['Success','success']], false);
				content += getBt2Inputgroup([['text', 'st-title_alert','span12','','Message Title','Input your title here', decodeURIComponent(data.attr.title)]], false);
				content += getBt2Textareagroup([['st-content_alert','span12','',decodeURIComponent(data.content),'Message', '5']], false);
			content +="</div>";

		content+="<div class='st-button-group'>";
			content+="<button class='btn btn-primary btn-save'>Save</button>";
			content+="<button class='btn btn-cancel'>Cancel</button>";
		content+="</div>";
	content+="</div>";
	jQuery('.st-navigation').html(content);
	jQuery('.st-nav-option button.btn-primary.btn-save').click(function(){
		if(testEmpty(jQuery('textarea[name="st-content_alert"]'))){
			alert('The Message must be not empty!');
			jQuery('textarea[name="st-content_alert"]').focus();
		}else{
			saveMessageBox();
		}
	});
}

function saveMessageBox(){
	var type_alert = jQuery('select[name="st-type"] option:selected').val();
	var title_alert = encodeURIComponent(convertHTML(jQuery('input[name="st-title_alert"]').val()));
	var content_alert = encodeURIComponent(convertHTML(jQuery('textarea[name="st-content_alert"]').val()));
	if(type_alert==0){
		alert('Please select a type !');
		return false;
	}
	data = {"type":"alert_desi","content":content_alert,"attr":{"type":type_alert,"title":title_alert}};
	var json = encodeURIComponent(JSON.stringify(data));
	jQuery('#st-page li.st-focus').attr("data",json);
	jQuery.stbox.close();
}
//  End Message Box Option

////////////////////////////////  Article Recent //////////////////////////////////////

// get Option Article Recent
function getArticleRecentOption(data){
	content ="<div class='st-nav-title'><i class='icon-newspaper'></i> Article Recent<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
	content+="<div class='st-nav-option'>";
		content+="<label>Select category:</label>";
		content+="<div class='row-fluid st-category'></div>";
		content+="<label>Style:</label>";
        content+="<div class='row-fluid'><select class='st-style span12'>"; 
		content+='<option value="style-1">style-1</option>';
		content+='<option value="style-2">style-2</option>';
		content+="</select></div>";

		content+="<label>ID:</label>";
		content+="<div class='row-fluid'><input type='text' value='"+((data.attr.id_ar!=null)?data.attr.id_ar:"")+"' class='st-id span12' /></div>";

		content+="<label>Class:</label>";
		content+="<div class='row-fluid'><input type='text' value='"+((data.attr.class!=null)?data.attr.class:"")+"' class='st-class span12' /></div>";

		content+="<div class='st-isVisble'><label>Title Article recent:</label>";
		content+="<div class='row-fluid'><input type='text' value='"+data.attr.title+"' class='st-title_article span12' /></div>";
		content+="<label>Content Intro:</label>";
        content+="<div class='row-fluid'><textarea rows='6' class='st-content_article span12'>";
			content+=decodeURIComponent(data.content);
        content+="</textarea></div></div>";
		
		content+="<div class='st-button-group'>";
		content+="<button class='btn btn-primary btn-save'>Save</button>";
		content+="<button class='btn btn-cancel'>Cancel</button>";
		content+="</div>";
	content+="</div>";
	jQuery('.st-navigation').html(content);

	
	jQuery('.st-navigation .st-style option[value="'+data.attr.style+'"]').attr("selected","selected");
	jQuery('.st-navigation .st-type input[value="'+data.attr.type+'"]').attr("checked","checked");
	//console.log(data.attr.type);

	jQuery('.st-nav-option button.btn-primary.btn-save').click(function(){
		saveArticleRecent();
	});
}

function saveArticleRecent(){
	var title_article = jQuery('.st-navigation .st-nav-option .st-title_article').val();
	var content = encodeURIComponent(jQuery('.st-navigation .st-nav-option .st-content_article').val());
	var category_id = jQuery('.st-navigation .st-category select').val();
	var classarticle = jQuery('.st-navigation .st-class').val();
	var idarticle = jQuery('.st-navigation .st-id').val();
	data = {"type":"recent_article_desi","content":content,"attr":{"title":title_article,"category_id":category_id,"class":classarticle,"id_ar":idarticle}};
	var json = encodeURIComponent(JSON.stringify(data));
	jQuery('#st-page li.st-focus').attr("data",json);
	jQuery.stbox.close();
}	

//get option Article box
function getArticleBoxOption(data){
	content ="<div class='st-nav-title'><i class='icon-frame'></i> Article Box<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
	content+="<div class='st-nav-option'>";
		content+="<label>Select Article from:</label>";
		content+=
			"<div class='row-fluid'><select class='st-extension span12'>" + 
				"<option value='com_k2'>com_k2</option><option value='com_content'>com_content</option>" + 
			"</select></div>";
		content+="<label>Articles:</label>";
		content+="<div class='row-fluid st-article'></div>";
		content+="<label>Type:</label>";
		content+=
			"<div class='row-fluid'><select class='st-type span12'>" + 
			  "<option value='outside'>Outside</option>" + 
			  "<option value='inside' selected='selected'>Inside</option>" + 
			"</select></div>";
		content+="<div class='st-button-group'>";
		content+="<button class='btn btn-primary btn-save'>Save</button>";
		content+="<button class='btn btn-cancel'>Cancel</button>";
		content+="</div>";
	content+="</div>";
	jQuery('.st-navigation').html(content);
	jQuery('.st-navigation .st-extension option[value="'+data.attr.extension+'"]').attr("selected","selected");
	jQuery('.st-navigation .st-type option[value="'+data.attr.type+'"]').attr("selected","selected");
	jQuery('.st-navigation .st-extension').change(function(){
		if(jQuery('.st-navigation .st-extension').val()=='com_k2'){
			jQuery('.st-navigation #st-element-contents').appendTo("#st-element");
			jQuery('#st-element #st-element-k2contents').appendTo(".st-navigation .st-article");
		}else{
			jQuery('.st-navigation #st-element-k2contents').appendTo("#st-element");
			jQuery('#st-element #st-element-contents').appendTo(".st-navigation .st-article");
		}
	});

	jQuery('.st-nav-option button.btn-primary.btn-save').click(function(){
		saveArticleBox();
	});
}

function saveArticleBox(){
	var extension = jQuery('.st-navigation .st-nav-option .st-extension').val();
	var article = jQuery('.st-navigation .st-nav-option .st-article select').val();
	var type = jQuery('.st-navigation .st-nav-option .st-type').val();
	data = {"type":"article_box_desi","content":"","attr":{"extension":extension,"article_id":article,"type":type}};
	var json = encodeURIComponent(JSON.stringify(data));
	jQuery('#st-page li.st-focus').attr("data",json);
	jQuery.stbox.close();
}
//End Article box

//Get Option Divider
function getDividerOption(data){
	content ="<div class='st-nav-title'><i class='icon-minus-2'></i> Divider<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
	content+="<div class='st-nav-option'>";
		content+="<label>Style:</label>";
		content+="<div class='row-fluid'><select class='st-style span12'>"; 
			content+='<option value="none">None</option>';
			content+='<option value="border">Border</option>';
		content+="</select></div>";
		content+="<label>Class:</label>";
		content+="<div class='row-fluid'><input type='text' class='st-dclass span12' value='"+data.attr.dclass+"' placeholder='Class'><div>";
		
		content+="<label>Margin:</label>";
		content+="<div class='row-fluid'><input type='text' class='st-margin span12' value='"+data.attr.margin+"' placeholder='Margin'><div>";
		content+="<div class='st-button-group'>";
		content+="<button class='btn btn-primary btn-save'>Save</button>";
		content+="<button class='btn btn-cancel'>Cancel</button>";
		content+="</div>";
	content+="</div>";
	jQuery('.st-navigation').html(content);
	jQuery('.st-navigation .st-style option[value="'+data.attr.style+'"]').attr("selected","selected");
	jQuery('.st-navigation .st-dclass').val(data.attr.dclass);
	jQuery('.st-navigation .st-margin').val(data.attr.margin);
	jQuery('.st-nav-option button.btn-primary.btn-save').click(function(){
		saveDivider();
	});
}

function saveDivider(){
	var style = jQuery('.st-navigation .st-style').val();
	var dclass = jQuery('.st-navigation .st-dclass').val();
	var margin = jQuery('.st-navigation .st-margin').val();
	if(testNumber(margin)){
		data = {"type":"divider_desi","content":" ","attr":{"style":style,"margin":margin,"dclass":dclass}};
		var json = encodeURIComponent(JSON.stringify(data));
		jQuery('#st-page li.st-focus').attr("data",json);
		jQuery.stbox.close();
	}else{
		alert('Margin must be number format.');
		return false;
	}
}

//End Divider

// get Option flickr
function getFlickrOption(data) {
    content = "<div class='st-nav-title'><i class='icon-flickr'></i> Flickr<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
    content += "<div class='st-nav-option'>";
    // row-fluid
    content += "<div class='row-fluid'>";
        // span6
        content += "<div class='span6'>";
            content += getBt2Inputgroup([['text', 'flickr-id','span12','','Id Images flickr - Link:','Link id image', data.attr.id],['text', 'flickr-title','span12','','Title','Title', data.attr.title],['text', 'flickr-description','span12','','Description','Description', data.attr.description],['text', 'flickr-limit','span6','','Limit','Limit', data.attr.limit]], false);
            
        content += "</div>";

        content += "<div class='span6'>";
                     
            content += getBt2Selectgroup('Image Fixed width', 'flickr-fixedwidth', 'span12', '', data.attr.fixedwidth, [['75x75', 's'],['Max 100', 't'],['Max 240', 'm'],['Max 1024', 'b']], false);
            content += "<div class='row-fluid'>";
                 content += "<div class='span6'>";
                        content += getBt2Inputgroup([['text','flickr-containerwidth','span12','','Container Width','Container Width', data.attr.containerwidth]],false);
                 content += "</div>";
                 content += "<div class='span6'>";
                        content += getBt2Inputgroup([['text','flickr-containerheight','span12','','Container Height','Container Height', data.attr.containerheight]],false);
                 content += "</div>";
                content += "</div>";

              content += "<div class='row-fluid'>";
              		content += getBtRadioCheckbox('Image Callback Function', 'st-callbackfx' ,data.attr.callbackfx , 'cycle' ,[['radio','inputbox','','cycle','Cycle'],['radio','inputbox','','cbox','ColorBox'],['radio','inputbox','','nocallback','No Callback']], false);
                    
              content += "</div>";
            content += "<div class='row-fluid'>";
                    content +="<div class='span6'>";
                        content += getBt2Selectgroup('Alignment','flickr-align','span12','', data.attr.align, [['Left','left'],['Center','center'],['Right','right']], false);
                    content +="</div>";
                    content += "<div class='span6'>";
                        content += getBt2Selectgroup('Column','flickr-column','span12','', data.attr.column, [['1','1'],['2','2'],['3','3'],['4','4'],['5','5'],['6','6'],['7','7'],['8','8'],['9','9'],['10','10']], false);
                    content +="</div>";
            content += "</div>";
        content += "</div>";

    content += "</div>";

    content += "<div class='st-button-group row-fluid'>";
    content += "<button class='btn btn-primary btn-save'>Save</button>";
    content += "<button class='btn btn-cancel'>Cancel</button>";
    content += "</div>";

    content += "</div>";

    jQuery('.st-navigation').html(content);
    if(data.attr.callbackfx && (data.attr.callbackfx == 'cycle')){
        jQuery('select[name="flickr-column"]').prop('disabled', true); 
    }
    jQuery('input[name="st-callbackfx"]').filter('[value="cycle"]').click(function(){
        jQuery('select[name="flickr-column"]').prop('disabled', true); 
    });
    jQuery('input[name="st-callbackfx"]').filter('[value!="cycle"]').click(function(){
        jQuery('select[name="flickr-column"]').prop('disabled', false); 
    });
    jQuery('.st-nav-option button.btn-primary.btn-save').click(function() {
        saveFlickr();
    });
}

function saveFlickr() {
    data = {"type": "flickr_desi", "content": "", "attr": {}};
    data.attr.containerwidth = parseFloat(jQuery('input[name="flickr-containerwidth"]').val());
    data.attr.containerheight = parseFloat(jQuery('input[name="flickr-containerheight"]').val());
    // data.attr.imagewidth = parseFloat(jQuery('input[name="flickr-imagewidth"]').val());
    // data.attr.imageheight = parseFloat(jQuery('input[name="flickr-imageheight"]').val());
    data.attr.id = jQuery('input[name="flickr-id"]').val();
    data.attr.limit = jQuery('input[name="flickr-limit"]').val();
    data.attr.title = jQuery('input[name="flickr-title"]').val();
    data.attr.description = jQuery('input[name="flickr-description"]').val();
    data.attr.callbackfx = jQuery('input[name="st-callbackfx"]:checked').val();
    data.attr.fixedwidth = jQuery('select[name="flickr-fixedwidth"] option:selected').val();
    data.attr.align = jQuery('select[name="flickr-align"] option:selected').val();
    // data.attr.fluid = jQuery('input[name="flickr-fluid"]:checked').val();
    if (jQuery('select[name="flickr-column"]').prop('disabled')) {
        data.attr.column = null;
    }else{
        data.attr.column = jQuery('select[name="flickr-column"] option:selected').val();
    }
    var json = encodeURIComponent(JSON.stringify(data));
    jQuery('#st-page li.st-focus').attr("data", json);
    jQuery.stbox.close();
}

//End Flickr

// BgVideo//
//function getBgVideoOption(data){
//	content ="<div class='st-nav-title'><i class='icon-film'></i> Background Video<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
//    content+="<div class='st-nav-option'>";
//    content+="<div class='row-fluid'>";
//        content+="<div class='span12'>";
//            content += getBt2Inputgroup([['text','bgvideo-image','span12','','Image link','Image link',data.attr.imagelink,'images/badge.png'],['text','bgvideo-title','span12','','Title','Title',data.attr.title,'Background Video'],['text','bgvideo-id','span12','','Video ID','Video ID',data.attr.id,'81676731'],['text','bgvideo-volume','span12','','Volume','Volume',data.attr.volume,'50']], false);
//        content +="</div>";
//    content +="</div>";
//        content+="<div class='st-button-group'>";
//        content+="<button class='btn btn-primary btn-save'>Save</button>";
//        content+="<button class='btn btn-cancel'>Cancel</button>";
//        content+="</div>";
//    content+="</div>";
//    jQuery('.st-navigation').html(content);
//    jQuery('.st-nav-option button.btn-primary.btn-save').click(function(){
//        saveBgVideo();
//    });
//}
//
//function saveBgVideo(){
//	data = {"type":"bgvideo_desi","content":"","attr":{}};
//    data.attr.imagelink=jQuery('input[name="bgvideo-image"]').val();
//    data.attr.title=jQuery('input[name="bgvideo-title"]').val();
//    data.attr.id=jQuery('input[name="bgvideo-id"]').val();
//    data.attr.volume=jQuery('input[name="bgvideo-volume"]').val();
//    var json = encodeURIComponent(JSON.stringify(data));
//    jQuery('#st-page li.st-focus').attr("data",json);
//    jQuery.stbox.close();
//}

// End BgVideo

// get Option Contact Form 
function getContactOption(data){
	content ="<div class='st-nav-title'><i class='icon-mail-6'></i> Contact Form<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
    content+="<div class='st-nav-option'>";
    content+="<div class='row-fluid'>";
        content+="<div class='span6'>";
            content += getBt2Inputgroup([['text','contact-title','span12','','Title','Title',data.attr.title,'Contact Us']], false);
            content += getBt2Inputgroup([['text','contact-address','span12','','Address','Address',data.attr.address,'']], false);
            content += getBt2Inputgroup([['text','contact-phone','span12','','Phone','Phone',data.attr.phone,'']], false);
            content += getBt2Textareagroup([['contact-description','span12','',data.attr.description,'Description','3','']], false);
            content += getBt2Textareagroup([['contact-business','span12','',data.attr.business,'Business hours','3','']], false);
            //content += getBt2Inputgroup([['text','contact-email','span12','','Email','Email',data.attr.email,'hello@domain.inc'],['text','contact-subject','span12','','Subject','Subject',data.attr.subject,'We are online from 09.00 - 18.00, Mountain Time'],['text','contact-thanks','span12','','Thanks Message','Thans Message',data.attr.thanks,'Thanks for contacting us']], false);
            content+="<label>Show google captcha:</label>";
			content+="<div class='st-stateggcaptcha st-radio'>"; 
				content+='<label class="radio inline"><input type="radio" name="st-stateggcaptcha" value="1" checked="checked">Yes</label>';
				content+='<label class="radio inline"><input type="radio" name="st-stateggcaptcha" value="0">No</label>';
			content+="</div>";
            content += getBt2Inputgroup([['text','contact-captchasecret','span12','','Captcha secret','Captcha secret',data.attr.captchasecret,'6LcmtPsSAAAAAPyaElzphAhPVJXWwxQ2IazGzc9A']], false);
            content += getBt2Inputgroup([['text','contact-captchasitekey','span12','','Captcha sitekey','Captcha sitekey',data.attr.captchasitekey,'6LcmtPsSAAAAADtLfsf2lxbhsNoe8vWnlsdoyioh']], false);
            
            content+="<label>State:</label>";
			content+="<div class='st-state st-radio'>"; 
				content+='<label class="radio inline"><input type="radio" name="st-state" value="1" checked="checked">Yes</label>';
				content+='<label class="radio inline"><input type="radio" name="st-state" value="0">No</label>';
			content+="</div>";
        content +="</div>";
			
        content+="<div class='span6'>";
			 content += getBt2Inputgroup([['text','contact-email','span12','','Email','Email',data.attr.email,'hello@domain.inc'],['text','contact-subject','span12','','Subject','Subject',data.attr.subject,'We are online from 09.00 - 18.00, Mountain Time'],['text','contact-thanks','span12','','Thanks Message','Thans Message',data.attr.thanks,'Thanks for contacting us'],['text','contact-sclass','span12','','Section class','Section class',data.attr.sclass,''],['text','contact-sid','span12','','Section id','Section id',data.attr.sid,''],['text','contact-cclass','span12','','Container class','Container class',data.attr.cclass,'']], false);
            //content += getBt2Inputgroup([['text','contact-subscribe-link','span12','','Subscribe Link','Subscribe Link',data.attr.subscribelink,'shinetheme.com'],['text','contact-subscribe-message','span12','','Subscribe Message','Subscribe Message',data.attr.subscribemessage,'We are releasing amazing newsletters each month'],['text','contact-grabnewletter-link','span12','','Grab NewLetter Link','Grab NewLetter Link',data.attr.grabnewletterlink,'shinetheme.com'],['text','contact-followus-link','span12','','Follow Us Link','Follow Us Link',data.attr.followuslink,'shinetheme.com'],['text','contact-followus-message','span12','','Follow Us Message','Follow Us Message',data.attr.followusmessage,'We are always active on twitter'],['text','contact-username-link','span12','','Username Link','Username Link',data.attr.usernamelink,'usernamelink']], false);
        content +="</div>";
    content +="</div>";
        
        
        content+="<div class='st-button-group'>";
        content+="<button class='btn btn-primary btn-save'>Save</button>";
        content+="<button class='btn btn-cancel'>Cancel</button>";
        content+="</div>";
    content+="</div>";
    jQuery('.st-navigation').html(content);
    
    if(typeof data.attr.state !='undefined'){
		jQuery('#st-navigation .st-state [value="'+data.attr.state+'"]').prop('checked', true);
	}
    if(typeof data.attr.state !='undefined'){
		jQuery('#st-navigation .st-stateggcaptcha [value="'+data.attr.stateggcaptcha+'"]').prop('checked', true);
	}
    jQuery('.st-nav-option button.btn-primary.btn-save').click(function(){
        saveContactForm();
    });
}

function saveContactForm(){
	data = {"type":"contact_desi","content":"","attr":{}};
	data.attr.state = jQuery('#st-navigation .st-state input[type="radio"]:checked').val();
    data.attr.stateggcaptcha = jQuery('#st-navigation .st-stateggcaptcha input[type="radio"]:checked').val();
    data.attr.title=jQuery('input[name="contact-title"]').val();
    data.attr.captchasecret=jQuery('input[name="contact-captchasecret"]').val();
    data.attr.captchasitekey=jQuery('input[name="contact-captchasitekey"]').val();
    data.attr.address=jQuery('input[name="contact-address"]').val();
    data.attr.phone=jQuery('input[name="contact-phone"]').val();
//    data.attr.fax=jQuery('input[name="contact-fax"]').val();
    data.attr.description=jQuery('textarea[name="contact-description"]').val();
    data.attr.business=jQuery('textarea[name="contact-business"]').val();
    data.attr.email=jQuery('input[name="contact-email"]').val();
    data.attr.subject=jQuery('input[name="contact-subject"]').val();
    data.attr.thanks=jQuery('input[name="contact-thanks"]').val();
    data.attr.sid=jQuery('input[name="contact-sid"]').val();
    data.attr.sclass=jQuery('input[name="contact-sclass"]').val();
    data.attr.cclass=jQuery('input[name="contact-cclass"]').val();
    var json = encodeURIComponent(JSON.stringify(data));
    jQuery('#st-page li.st-focus').attr("data",json);
    jQuery.stbox.close();
}

// End Contact Form 

// get Option like box 
function getFb_likbeboxOption(data){
	content ="<div class='st-nav-title'><i class='icon-facebook-4'></i> Facebook likebox<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
	content+="<div class='st-nav-option'>";
		content +="<div class='row-fluid'>";
			content +="<div class='span6'>";
				content += getBt2Inputgroup([['text', 'st-linkpage','span12','','Facebook Link','Facebook Link Page', data.content],['text', 'st-widthbox','span12','','Width','Width', data.attr.width, 300],['text', 'st-heightbox','span12','','Height','Height (default: auto)', data.attr.height]],false);
				content += getBt2Selectgroup('Color Scheme', 'st-colorScheme', 'span12', '', data.attr.colorscheme, [['Light', 'light'],['Dark', 'dark']], false);
				content += getBt2Selectgroup('Language', 'st-language', 'span12', '', data.attr.language, [['US', 'en_us'],['Korea', 'ko_KR'],['France', 'fr_FR'],['Japanese', 'ja_JP'],['Italian', 'it_IT'],['VietNamese', 'vi_VN']], false);
			content +="</div>";
			content +="<div class='span6'>";
				content+="<label>Show faces:</label>";
				content+="<div class='st-showfaces st-radio'>"; 
					content+='<label class="radio inline"><input type="radio" name="st-showfaces" value="true" checked="checked">Yes</label>';
					content+='<label class="radio inline"><input type="radio" name="st-showfaces" value="false">No</label>';
				content+="</div>";
		       
		        content+="<label>Show header:</label>";
		        content+="<div class='st-showheader st-radio'>"; 
					content+='<label class="radio inline"><input type="radio" name="st-showheader" value="true" checked="checked">Yes</label>';
					content+='<label class="radio inline"><input type="radio" name="st-showheader" value="false">No</label>';
				content+="</div>";
		        
				content+="<label>Show stream:</label>";
				content+="<div class='st-showstream st-radio'>"; 
					content+='<label class="radio inline"><input type="radio" name="st-showstream" value="true" checked="checked">Yes</label>';
					content+='<label class="radio inline"><input type="radio" name="st-showstream" value="false">No</label>';
				content+="</div>";
		        
				content+="<label>Show border:</label>";
				content+="<div class='st-showborder st-radio'>"; 
					content+='<label class="radio inline"><input type="radio" name="st-showborder" value="true" checked="checked">Yes</label>';
					content+='<label class="radio inline"><input type="radio" name="st-showborder" value="false">No</label>';
				content+="</div>";
			content +="</div>";
		content +="</div>";

		content+="<div class='st-button-group'>";
			content+="<button class='btn btn-primary btn-save'>Save</button>";
			content+="<button class='btn btn-cancel'>Cancel</button>";
			content+="</div>";
	content+="</div>";
	jQuery('.st-navigation').html(content);
	jQuery('#st-navigation .st-showfaces [value="'+data.attr.showfaces+'"]').prop('checked', true);
	jQuery('#st-navigation .st-showheader [value="'+data.attr.showheader+'"]').prop('checked', true);
	jQuery('#st-navigation .st-showstream [value="'+data.attr.showstream+'"]').prop('checked', true);
	jQuery('#st-navigation .st-showborder [value="'+data.attr.showborder+'"]').prop('checked', true);
	jQuery('.st-nav-option button.btn-primary.btn-save').click(function(){
		saveLikebox();
	});
}

function saveLikebox(){
	var width = jQuery('input[name="st-widthbox"]').val();
	var height = jQuery('input[name="st-heightbox"]').val();
	if(!testNumber(width)){
		alert('Width must be number format.');
		return false;
	}
	if(height!=""){
		if(!testNumber(height)){
			alert('Height must be number format.');
			return false;
		}
	}
	data = {"type":"fb_likebox_desi","content":"","attr":{}};
	data.content=jQuery('input[name="st-linkpage"]').val();
	data.attr.width=width;
	data.attr.height=height;
	data.attr.showfaces=jQuery('input[name="st-showfaces"]:checked').val();
	data.attr.showheader=jQuery('input[name="st-showheader"]:checked').val();
	data.attr.showstream=jQuery('input[name="st-showstream"]:checked').val();
	data.attr.showborder=jQuery('input[name="st-showborder"]:checked').val();
	data.attr.colorscheme=jQuery('select[name="st-colorScheme"] option:selected').val();
	data.attr.language=jQuery('select[name="st-language"] option:selected').val();
	var json = encodeURIComponent(JSON.stringify(data));
	jQuery('#st-page li.st-focus').attr("data",json);
	jQuery.stbox.close();
}
//  End likebox Option



// get Option Slider
function getSliderOption(data){
	content ="<div class='st-nav-title'><i class='icon-image'></i> slider<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
	content+="<div class='st-nav-option st-slider-option'>";
		content+='<ul class="nav nav-tabs" id="tabpopup">';
			content+='<li class="active"><a href="#getimage"><i class="icon-images"></i>Select Images</a></li>';
			content+='<li><a href="#config"><i class="icon-cog-2"></i>Config</a></li>';
		content+='</ul>';
		content+='<div class="tab-content">';
			//Select Image
			content+='<div class="tab-pane active" id="getimage">';
				content+='<div class="row-fluid">';
					content+='<div class="span5">';
                        
						content+='<label>Path:</label><input type="text" class="st-path" value="images/" /><button class="btn btn-primary st-go" type="button" >Go</button>';
						content+='<div class="st-dragimage">'; 
							content+='<div id="st-load"><div class="st-loadding"><i class="icon-spinner-5 icon-spinning"></i></div>';
							content+='<div class="st-mark"></div></div>';
							content+='<ul id="dragImage">';
							content+='</ul>';
						content+='</div>';
					content+='</div>';
					content+='<div class="span2">';
						content+='<span>Drag and Drop</span>';
					content+='</div>';
					content+='<div class="span5">';
						content+='<strong>Drag & Drop images here:</strong>';
						content+='<div class="st-sortimage"><ul id="sortImage">';
						for(var i=0;i<data.content.length;i++){
							content+='<li class="st-selectimage" data-desc="'+((data.content[i].attr.desc!=null)?data.content[i].attr.desc:"")+'" data-stitle="'+((data.content[i].attr.stitle!=null)?data.content[i].attr.stitle:"")+'" data-title="'+((data.content[i].attr.title!=null)?data.content[i].attr.title:"")+'" data-bg-image="'+((data.content[i].attr.bg_image!=null)?data.content[i].attr.bg_image:"")+'" data-link-text="'+((data.content[i].attr.link_text!=null)?data.content[i].attr.link_text:"")+'" data-link="'+((data.content[i].attr.link!=null)?data.content[i].attr.link:"")+'" data-short-title="'+((data.content[i].attr.short_title!=null)?data.content[i].attr.short_title:"")+'" data-show-image="'+((data.content[i].attr.show_image!='undefined')?data.content[i].attr.show_image:"true")+'">';
								content+='<i class="icon-cancel-circle "></i>';
								content+='<img data-site="'+data.content[i].content+'" src="'+data.content[i].attr.linkadmin+'" />';
							content+='</li>';
						}
						content+='</ul></div>';
						content+='<div class="st-desc-item">';
							content+='<label>Title:</label>';
							content+='<div class="row-fluid"><input type="text" class="st-desc-title span12" /></div>'
							content+='<label>Sub Title:</label>';
							content+='<div class="row-fluid"><input type="text" class="st-desc-stitle span12" /></div>'
							
							content+='<label>Description:</label>';
							content+='<div class="row-fluid">';
								content+='<textarea class="span12 st-desc-content" rows="3"></textarea>';
							content+='</div>';
                            content+='<label>Link Text:</label>';
							content+='<div class="row-fluid"><input type="text" class="st-desc-link-text span12" /></div>'
							content+='<label>Link:</label>';
							content+='<div class="row-fluid"><input type="text" class="st-desc-link span12" /></div>'
//                            content+='<label>Show Image:</label>';
//    						content+='<div class="row-fluid"><select class="st-desc-show-image span6">';
//    							content+='<option value="true">True</option>';
//    							content+='<option value="false">False</option>';
//    						content+='</select></div>';							
       
						content+='</div>';
					content+='</div>';
				content+="</div>";
			content+='</div>';
			//End Select Image
			content+='<div class="tab-pane" id="config">';
				content+='<div class="row-fluid">';
					content+='<div class="span6">';
                        content+='<label>Title:</label>';
						content+='<div class="row-fluid"><input type="text" class="st-title span6" value="'+((data.attr.title!=null)?data.attr.title:"")+'" /></div>';
						content+='<label>Short description:</label>';
						content+='<div class="row-fluid"><input type="textare" class="st-sdesc span6" value="'+((data.attr.sdesc!=null)?data.attr.sdesc:"")+'" /></div>';
						content+='<label>Section Id:</label>';
						content+='<div class="row-fluid"><input type="text" class="st-sid span6" value="'+((data.attr.sid!=null)?data.attr.sid:"")+'" /></div>';
						content+='<label>Section Class:</label>';
						content+='<div class="row-fluid"><input type="text" class="st-sclass span6" value="'+((data.attr.sclass!=null)?data.attr.sclass:"")+'" /></div>';
						content+='<label>Heading Class:</label>';
						content+='<div class="row-fluid"><input type="text" class="st-class span6" value="'+((data.attr.class!=null)?data.attr.class:"")+'" /></div>';
						content+='<label>Background image:</label>';
						content+='<div class="row-fluid"><input type="text" class="st-bg span6" value="'+((data.attr.bg!=null)?data.attr.bg:"")+'" /></div>';
						//content+='<label>Show Image:</label>';
//						content+='<div class="row-fluid"><select class="st-show-image span6">';
//							content+='<option value="true">True</option>';
//							content+='<option value="false">False</option>';
						//content+='</select></div>';
						//content+='<label>Interval:</label>';
						//content+='<div class="row-fluid"><input type="text" class="st-interval span6" value="'+data.attr.interval+'" /></div>';
						//content+='<label>Auto:</label>';
						//content+='<div class="row-fluid"><select class="st-auto span6">';
						//	content+='<option value="true">True</option>';
						//	content+='<option value="false">False</option>';
						//content+='</select></div>';
                        content+='<div class="row-fluid">';
                            content += getBt2Selectgroup('Template', 'st-slider-template', 'span6', '', data.attr.template, [['Default','slider'],['Default1','slider1']], false);
                        content+='</div>';
					content+='</div>';
					//content+='<div class="span6">';
//						content+='<label>Type Slider:</label>';
//						content+="<div class='st-typeslider st-radio'>"; 
//							content+='<label class="radio "><input type="radio" name="st-pancontrol" value="2" checked="checked">Camera</label>';
//							content+='<label class="radio "><input type="radio" name="st-pancontrol" value="3">Flex</label>';
//							content+='<label class="radio "><input type="radio" name="st-pancontrol" value="4">Nivo</label>';
//							content+='<label class="radio "><input type="radio" name="st-pancontrol" value="5">Elastic</label>';
//							content+='<label class="radio "><input type="radio" name="st-pancontrol" value="6">Accordion</label>';
//							content+='<label class="radio "><input type="radio" name="st-pancontrol" value="7">carousel Box</label>';
//						content+="</div>";
//					content+='</div>';
				content+='</div>';
			content+='</div>';
		content+='</div>';
        

		content+="<div class='st-button-group'>";
    		content+="<button class='btn btn-primary btn-save'>Save</button>";
    		content+="<button class='btn btn-cancel'>Cancel</button>";
		content+="</div>";
	content+="</div>";
	jQuery('.st-navigation').html(content);

	sliderSelectImage();
	jQuery('#st-navigation .st-typeslider [value="'+((data.attr.typeslider!=null)?data.attr.typeslider:"1")+'"]').prop('checked', true);
	//jQuery('#st-navigation .st-auto [value="'+data.attr.auto+'"]').attr("selected","selected");
    jQuery('#st-navigation .st-show-image [value="'+data.attr.show_image+'"]').attr("selected","selected");
	jQuery('#tabpopup a').click(function (e) {
		e.preventDefault();
		jQuery(this).tab('show');
	});
	jQuery('#st-navigation .st-go').click(function(){
		loadImages(jQuery("#st-navigation .st-path").val());
	});
	
	jQuery('#sortImage [class^="icon-"]').click(function(){
		jQuery(this).parent().remove();
	});
	jQuery('.st-nav-option .st-button-group button.btn-primary.btn-save').click(function(){
		saveSlider();
	});
}

function sliderSelectImage(){
	jQuery('.st-navigation #sortImage .st-selectimage').click(function(){
		//console.log(encodeURIComponent('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed cumque distinctio labore minima ipsum fugit aspernatur dolore deserunt iure sunt officiis iusto <span class="color-text">itaque rerum reprehenderit laborum</span> dignissimos iste assumenda dolorem?'))
		jQuery('.st-navigation #sortImage .st-selectimage').removeClass('selected');
		jQuery(this).addClass('selected');
		jQuery('.st-navigation .st-desc-item .st-desc-title').val(String(jQuery(this).attr('data-title')));
		jQuery('.st-navigation .st-desc-item .st-desc-stitle').val(String(jQuery(this).attr('data-stitle')));
		jQuery('.st-navigation .st-desc-item .st-desc-short-title').val(jQuery(this).attr('data-short-title'));
		jQuery('.st-navigation .st-desc-item .st-desc-bg-image').val(jQuery(this).attr('data-bg-image'));
		jQuery('.st-navigation .st-desc-item .st-desc-show-image').val(jQuery(this).attr('data-show-image'));
        jQuery('.st-navigation .st-desc-item .st-desc-link-text').val(jQuery(this).attr('data-link-text'));
        jQuery('.st-navigation .st-desc-item .st-desc-link').val(jQuery(this).attr('data-link'));
        jQuery('.st-navigation .st-desc-item .st-desc-content').val((jQuery(this).attr('data-desc')!=null)?decodeURIComponent(jQuery(this).attr('data-desc')):"");
	});
	jQuery('.st-navigation .st-desc-item .st-desc-title').keyup(function() {
		jQuery('.st-navigation #sortImage .st-selectimage.selected').attr("data-title",String(jQuery(this).val()));
	});
	jQuery('.st-navigation .st-desc-item .st-desc-stitle').keyup(function() {
		jQuery('.st-navigation #sortImage .st-selectimage.selected').attr("data-stitle",String(jQuery(this).val()));
	});
    jQuery('.st-navigation .st-desc-item .st-desc-bg-image').keyup(function() {
		jQuery('.st-navigation #sortImage .st-selectimage.selected').attr("data-bg-image",String(jQuery(this).val()));
	});
    jQuery('.st-navigation .st-desc-item .st-desc-show-image').change(function() {
		jQuery('.st-navigation #sortImage .st-selectimage.selected').attr("data-show-image",jQuery(this).val());
        
	});
    jQuery('.st-navigation .st-desc-item .st-desc-short-title').keyup(function() {
		jQuery('.st-navigation #sortImage .st-selectimage.selected').attr("data-short-title",jQuery(this).val());
	});
    jQuery('.st-navigation .st-desc-item .st-desc-link-text').keyup(function() {
		jQuery('.st-navigation #sortImage .st-selectimage.selected').attr("data-link-text",jQuery(this).val());
	});
    jQuery('.st-navigation .st-desc-item .st-desc-link').keyup(function() {
		jQuery('.st-navigation #sortImage .st-selectimage.selected').attr("data-link",jQuery(this).val());
	});    
	jQuery('.st-navigation .st-desc-item .st-desc-content').keyup(function() {
		jQuery('.st-navigation #sortImage .st-selectimage.selected').attr("data-desc",encodeURIComponent(jQuery(this).val()));
	});
}

function saveSlider(){
		data = {"type":"slider_desi","content":[],"attr":{}};
        data.attr.template = jQuery('select[name="st-slider-template"] option:selected').val();
		data.attr.class=jQuery('#st-navigation .st-class').val();
		data.attr.title=jQuery('#st-navigation .st-title').val();
		data.attr.sid=jQuery('#st-navigation .st-sid').val();
		data.attr.sclass=jQuery('#st-navigation .st-sclass').val();
		data.attr.sdesc=jQuery('#st-navigation .st-sdesc').val();
		data.attr.bg=jQuery('#st-navigation .st-bg').val();
		//data.attr.auto=jQuery('#st-navigation .st-auto').val();
		//data.attr.typeslider= jQuery('#st-navigation .st-typeslider input[type="radio"]:checked').val();
		var link = "";
		jQuery('#st-navigation #sortImage li').each(function(index){
			var arr = {"type":"item_gallery_desi","content":jQuery(this).find('img').attr("data-site"),"attr":{"linkadmin":jQuery(this).find('img').attr("src"),"stitle":jQuery.trim(jQuery(this).attr("data-stitle")),"title":jQuery.trim(jQuery(this).attr("data-title")),"desc":jQuery.trim(jQuery(this).attr("data-desc")),"link_text":jQuery.trim(jQuery(this).attr("data-link-text")),"link":jQuery.trim(jQuery(this).attr("data-link")),"image_full":jQuery.trim(jQuery(this).attr("data-image-full"))}};
			data.content.push(arr);
		});
		//console.log(data);
		var json = encodeURIComponent(JSON.stringify(data));
		jQuery('#st-page li.st-focus').attr("data",json);
		jQuery.stbox.close();
}
//  End Slider Option


// get Option Slider
function getTestimonialOption(data){
	content ="<div class='st-nav-title'><i class='icon-image'></i> Testimonial<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
	content+="<div class='st-nav-option st-testimonial-option'>";
		content+='<ul class="nav nav-tabs" id="tabpopup">';
			content+='<li class="active"><a href="#getimage"><i class="icon-images"></i>Select Images</a></li>';
			content+='<li><a href="#config"><i class="icon-cog-2"></i>Config</a></li>';
		content+='</ul>';
		content+='<div class="tab-content">';
			//Select Image
			content+='<div class="tab-pane active" id="getimage">';
				content+='<div class="row-fluid">';
					content+='<div class="span5">';
                        
						content+='<label>Path:</label><input type="text" class="st-path" value="images/" /><button class="btn btn-primary st-go" type="button" >Go</button>';
						content+='<div class="st-dragimage">'; 
							content+='<div id="st-load"><div class="st-loadding"><i class="icon-spinner-5 icon-spinning"></i></div>';
							content+='<div class="st-mark"></div></div>';
							content+='<ul id="dragImage">';
							content+='</ul>';
						content+='</div>';
					content+='</div>';
					content+='<div class="span2">';
						content+='<span>Drag and Drop</span>';
					content+='</div>';
					content+='<div class="span5">';
						content+='<strong>Drag & Drop images here:</strong>';
						content+='<div class="st-sortimage"><ul id="sortImage">';
						for(var i=0;i<data.content.length;i++){
							content+='<li class="st-selectimage" data-desc="'+((data.content[i].attr.desc!=null)?data.content[i].attr.desc:"")+'" data-title="'+((data.content[i].attr.title!=null)?data.content[i].attr.title:"")+'" data-position="'+((data.content[i].attr.position!=null)?data.content[i].attr.position:"")+'" data-show-image="'+((data.content[i].attr.show_image!='undefined')?data.content[i].attr.show_image:"true")+'">';
								content+='<i class="icon-cancel-circle "></i>';
								content+='<img data-site="'+data.content[i].content+'" src="'+data.content[i].attr.linkadmin+'" />';
							content+='</li>';
						}
						content+='</ul></div>';
						content+='<div class="st-desc-item">';
							content+='<label>Title:</label>';
							content+='<div class="row-fluid"><input type="text" class="st-desc-title span12" /></div>'
							content+='<label>Position:</label>';
							content+='<div class="row-fluid"><input type="text" class="st-desc-position span12" /></div>'
							content+='<label>Description:</label>';
							content+='<div class="row-fluid">';
								content+='<textarea class="span12 st-desc-content" rows="3"></textarea>';
							content+='</div>';
                            content+='<label>Show Image:</label>';
    						content+='<div class="row-fluid"><select class="st-desc-show-image span6">';
    							content+='<option value="true">True</option>';
    							content+='<option value="false">False</option>';
    						content+='</select></div>';							
       
						content+='</div>';
					content+='</div>';
				content+="</div>";
			content+='</div>';
			//End Select Image
			content+='<div class="tab-pane" id="config">';
				content+='<div class="row-fluid">';
					content+='<div class="span6">';
                        content+='<label>Title:</label>';
						content+='<div class="row-fluid"><input type="text" class="st-title span6" value="'+((data.attr.title!=null)?data.attr.title:"")+'" /></div>';
						content+='<label>Class:</label>';
						content+='<div class="row-fluid"><input type="text" class="st-class span6" value="'+((data.attr.class!=null)?data.attr.class:"testimonial")+'" /></div>';
						content+='<label>Show Image:</label>';
						content+='<div class="row-fluid"><select class="st-show-image span6">';
							content+='<option value="true">True</option>';
							content+='<option value="false">False</option>';
						content+='</select></div>';
						//content+='<label>Interval:</label>';
						//content+='<div class="row-fluid"><input type="text" class="st-interval span6" value="'+data.attr.interval+'" /></div>';
						//content+='<label>Auto:</label>';
						//content+='<div class="row-fluid"><select class="st-auto span6">';
						//	content+='<option value="true">True</option>';
						//	content+='<option value="false">False</option>';
						//content+='</select></div>';
                        content+='<div class="row-fluid">';
                            content += getBt2Selectgroup('Template', 'st-testimonial-template', 'span6', '', data.attr.template, [['Testimonial','testimonial']], false);
                        content+='</div>';
					content+='</div>';
					//content+='<div class="span6">';
//						content+='<label>Type Slider:</label>';
//						content+="<div class='st-typetestimonial st-radio'>"; 
//							content+='<label class="radio "><input type="radio" name="st-pancontrol" value="2" checked="checked">Camera</label>';
//							content+='<label class="radio "><input type="radio" name="st-pancontrol" value="3">Flex</label>';
//							content+='<label class="radio "><input type="radio" name="st-pancontrol" value="4">Nivo</label>';
//							content+='<label class="radio "><input type="radio" name="st-pancontrol" value="5">Elastic</label>';
//							content+='<label class="radio "><input type="radio" name="st-pancontrol" value="6">Accordion</label>';
//							content+='<label class="radio "><input type="radio" name="st-pancontrol" value="7">carousel Box</label>';
//						content+="</div>";
//					content+='</div>';
				content+='</div>';
			content+='</div>';
		content+='</div>';
        

		content+="<div class='st-button-group'>";
    		content+="<button class='btn btn-primary btn-save'>Save</button>";
    		content+="<button class='btn btn-cancel'>Cancel</button>";
		content+="</div>";
	content+="</div>";
	jQuery('.st-navigation').html(content);

	testimonialSelectImage();
	jQuery('#st-navigation .st-typetestimonial [value="'+((data.attr.typetestimonial!=null)?data.attr.typetestimonial:"1")+'"]').prop('checked', true);
	//jQuery('#st-navigation .st-auto [value="'+data.attr.auto+'"]').attr("selected","selected");
    jQuery('#st-navigation .st-show-image [value="'+data.attr.show_image+'"]').attr("selected","selected");
	jQuery('#tabpopup a').click(function (e) {
		e.preventDefault();
		jQuery(this).tab('show');
	});
	jQuery('#st-navigation .st-go').click(function(){
		loadImages(jQuery("#st-navigation .st-path").val());
	});
	
	jQuery('#sortImage [class^="icon-"]').click(function(){
		jQuery(this).parent().remove();
	});
	jQuery('.st-nav-option .st-button-group button.btn-primary.btn-save').click(function(){
		saveTestimonial();
	});
}

function testimonialSelectImage(){
	jQuery('.st-navigation #sortImage .st-selectimage').click(function(){
		//console.log(encodeURIComponent('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed cumque distinctio labore minima ipsum fugit aspernatur dolore deserunt iure sunt officiis iusto <span class="color-text">itaque rerum reprehenderit laborum</span> dignissimos iste assumenda dolorem?'))
		jQuery('.st-navigation #sortImage .st-selectimage').removeClass('selected');
		jQuery(this).addClass('selected');
		jQuery('.st-navigation .st-desc-item .st-desc-title').val(String(jQuery(this).attr('data-title')));
		jQuery('.st-navigation .st-desc-item .st-desc-position').val(jQuery(this).attr('data-position'));
		jQuery('.st-navigation .st-desc-item .st-desc-show-image').val(jQuery(this).attr('data-show-image'));
        jQuery('.st-navigation .st-desc-item .st-desc-content').val((jQuery(this).attr('data-desc')!=null)?decodeURIComponent(jQuery(this).attr('data-desc')):"");
	});
	jQuery('.st-navigation .st-desc-item .st-desc-title').keyup(function() {
		jQuery('.st-navigation #sortImage .st-selectimage.selected').attr("data-title",String(jQuery(this).val()));
	});
	jQuery('.st-navigation .st-desc-item .st-desc-position').keyup(function() {
		jQuery('.st-navigation #sortImage .st-selectimage.selected').attr("data-position",String(jQuery(this).val()));
	});
    jQuery('.st-navigation .st-desc-item .st-desc-show-image').change(function() {
		jQuery('.st-navigation #sortImage .st-selectimage.selected').attr("data-show-image",jQuery(this).val());
        
	});
    jQuery('.st-navigation .st-desc-item .st-desc-short-title').keyup(function() {
		jQuery('.st-navigation #sortImage .st-selectimage.selected').attr("data-short-title",jQuery(this).val());
	});
	jQuery('.st-navigation .st-desc-item .st-desc-content').keyup(function() {
		jQuery('.st-navigation #sortImage .st-selectimage.selected').attr("data-desc",encodeURIComponent(jQuery(this).val()));
	});
}

function saveTestimonial(){
		data = {"type":"testimonial_desi","content":[],"attr":{}};
        data.attr.template = jQuery('select[name="st-testimonial-template"] option:selected').val();
		data.attr.class=jQuery('#st-navigation .st-class').val();
		data.attr.title=jQuery('#st-navigation .st-title').val();
		data.attr.show_image=jQuery('#st-navigation .st-show-image').val();
		//data.attr.interval=jQuery('#st-navigation .st-interval').val();
		//data.attr.auto=jQuery('#st-navigation .st-auto').val();
		//data.attr.typeslider= jQuery('#st-navigation .st-typeslider input[type="radio"]:checked').val();
		var link = "";
		jQuery('#st-navigation #sortImage li').each(function(index){
			var arr = {"type":"item_gallery_desi","content":jQuery(this).find('img').attr("data-site"),"attr":{"linkadmin":jQuery(this).find('img').attr("src"),"title":jQuery.trim(jQuery(this).attr("data-title")),"desc":jQuery.trim(jQuery(this).attr("data-desc")),"position":jQuery.trim(jQuery(this).attr("data-position")),"show_image":jQuery(this).attr("data-show-image")}};
			data.content.push(arr);
		});
		//console.log(data);
		var json = encodeURIComponent(JSON.stringify(data));
		jQuery('#st-page li.st-focus').attr("data",json);
		jQuery.stbox.close();
}
//  End Slider Testimonial Option

// get Option Slider
function getIntroOption(data){
	content ="<div class='st-nav-title'><i class='icon-image'></i> Statistic<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
	content+="<div class='st-nav-option st-intro-option'>";
		content+='<ul class="nav nav-tabs" id="tabpopup">';
			content+='<li class="active"><a href="#getimage"><i class="icon-images"></i>Select Images</a></li>';
			content+='<li><a href="#config"><i class="icon-cog-2"></i>Config</a></li>';
		content+='</ul>';
		content+='<div class="tab-content">';
			//Select Image
			content+='<div class="tab-pane active" id="getimage">';
				content+='<div class="row-fluid">';
					content+='<div class="span5">';
                        
						content+='<label>Path:</label><input type="text" class="st-path" value="images/" /><button class="btn btn-primary st-go" type="button" >Go</button>';
						content+='<div class="st-dragimage">'; 
							content+='<div id="st-load"><div class="st-loadding"><i class="icon-spinner-5 icon-spinning"></i></div>';
							content+='<div class="st-mark"></div></div>';
							content+='<ul id="dragImage">';
							content+='</ul>';
						content+='</div>';
					content+='</div>';
					content+='<div class="span2">';
						content+='<span>Drag and Drop</span>';
					content+='</div>';
					content+='<div class="span5">';
						content+='<strong>Drag & Drop images here:</strong>';
						content+='<div class="st-sortimage"><ul id="sortImage">';
						for(var i=0;i<data.content.length;i++){
							content+='<li class="st-selectimage"  data-title="'+((data.content[i].attr.title!=null)?data.content[i].attr.title:"")+'" data-number="'+((data.content[i].attr.number!=null)?data.content[i].attr.number:"")+'" data-iconname="'+((data.content[i].attr.iconname!=null)?data.content[i].attr.iconname:"")+'" data-show-image="'+((data.content[i].attr.show_image!='undefined')?data.content[i].attr.show_image:"true")+'" >';
								content+='<i class="icon-cancel-circle "></i>';
								content+='<img data-site="'+data.content[i].content+'" src="'+data.content[i].attr.linkadmin+'" />';
							content+='</li>';
						}
						content+='</ul></div>';
						content+='<div class="st-desc-item">';
							content+='<label>Title:</label>';
							content+='<div class="row-fluid"><input type="text" class="st-desc-title span12" /></div>'
							content+='<label>Number:</label>';
							content+='<div class="row-fluid"><input type="text" class="st-desc-number span12" /></div>'
							content+='<label>Icon name:</label>';
							content+='<div class="row-fluid"><input type="text" class="st-desc-iconname span12" /></div>'
							//content+='<label>Background image:</label>';
//							content+='<div class="row-fluid"><input type="text" class="st-desc-bg-image span12" /></div>'
//							content+='<label>Description:</label>';
//							content+='<div class="row-fluid">';
//								content+='<textarea class="span12 st-desc-content" rows="3"></textarea>';
//							content+='</div>';
//                            content+='<label>Link Text:</label>';
//							content+='<div class="row-fluid"><input type="text" class="st-desc-link-text span12" /></div>'
//							content+='<label>Link:</label>';
//							content+='<div class="row-fluid"><input type="text" class="st-desc-link span12" /></div>'
                            content+='<label>Show Image:</label>';
    						content+='<div class="row-fluid"><select class="st-desc-show-image span6">';
    							content+='<option value="true">True</option>';
    							content+='<option value="false">False</option>';
    						content+='</select></div>';							
       
						content+='</div>';
					content+='</div>';
				content+="</div>";
			content+='</div>';
			//End Select Image
			content+='<div class="tab-pane" id="config">';
				content+='<div class="row-fluid">';
					content+='<div class="span6">';
                        content+='<label>Class:</label>';
						content+='<div class="row-fluid"><input type="text" class="st-class span6" value="'+((data.attr.class!=null)?data.attr.class:"")+'" /></div>';
						content+='<label>Title:</label>';
						content+='<div class="row-fluid"><input type="text" class="st-title span6" value="'+((data.attr.title!=null)?data.attr.title:"")+'" /></div>';
						content+='<label>Id:</label>';
						content+='<div class="row-fluid"><input type="text" class="st-sid span6" value="'+((data.attr.sid!=null)?data.attr.sid:"")+'" /></div>';
						content+='<label>Description:</label>';
						content+='<div class="row-fluid"><input type="text" class="st-hclass span6" value="'+((data.attr.hclass!=null)?data.attr.hclass:"")+'" /></div>';
						//content+='<label>Show Title:</label>';
						//content+='<div class="row-fluid"><select class="st-show-title span6">';
//							content+='<option value="true">True</option>';
//							content+='<option value="false">False</option>';
//						content+='</select></div>';
						content+='<label>Background image:</label>';
						content+='<div class="row-fluid"><input type="text" class="st-bg span6" value="'+data.attr.bg_image+'" /></div>';
						//content+='<label>Auto:</label>';
						//content+='<div class="row-fluid"><select class="st-auto span6">';
						//	content+='<option value="true">True</option>';
						//	content+='<option value="false">False</option>';
						//content+='</select></div>';
                        content+='<div class="row-fluid">';
                            content += getBt2Selectgroup('Template', 'st-intro-template', 'span6', '', data.attr.template, [['Statistic','statistic'],['Statistic1','statistic1']], false);
                        content+='</div>';
					content+='</div>';
					//content+='<div class="span6">';
//						content+='<label>Type Slider:</label>';
//						content+="<div class='st-typeintro st-radio'>"; 
//							content+='<label class="radio "><input type="radio" name="st-pancontrol" value="2" checked="checked">Camera</label>';
//							content+='<label class="radio "><input type="radio" name="st-pancontrol" value="3">Flex</label>';
//							content+='<label class="radio "><input type="radio" name="st-pancontrol" value="4">Nivo</label>';
//							content+='<label class="radio "><input type="radio" name="st-pancontrol" value="5">Elastic</label>';
//							content+='<label class="radio "><input type="radio" name="st-pancontrol" value="6">Accordion</label>';
//							content+='<label class="radio "><input type="radio" name="st-pancontrol" value="7">carousel Box</label>';
//						content+="</div>";
//					content+='</div>';
				content+='</div>';
			content+='</div>';
		content+='</div>';
        

		content+="<div class='st-button-group'>";
    		content+="<button class='btn btn-primary btn-save'>Save</button>";
    		content+="<button class='btn btn-cancel'>Cancel</button>";
		content+="</div>";
	content+="</div>";
	jQuery('.st-navigation').html(content);

	introSelectImage();
	jQuery('#st-navigation .st-typeintro [value="'+((data.attr.typeintro!=null)?data.attr.typeintro:"1")+'"]').prop('checked', true);
	jQuery('#st-navigation .st-title [value="'+data.attr.title+'"]').attr("title");
    jQuery('#st-navigation .st-hclass [value="'+data.attr.hclass+'"]').attr("hclass");
    jQuery('#st-navigation .st-bg [value="'+data.attr.title+'"]').attr("bg");
    //jQuery('#st-navigation .st-show-title [value="'+data.attr.show_title+'"]').attr("selected","selected");
	jQuery('#tabpopup a').click(function (e) {
		e.preventDefault();
		jQuery(this).tab('show');
	});
	jQuery('#st-navigation .st-go').click(function(){
		loadImages(jQuery("#st-navigation .st-path").val());
	});
	
	jQuery('#sortImage [class^="icon-"]').click(function(){
		jQuery(this).parent().remove();
	});
	jQuery('.st-nav-option .st-button-group button.btn-primary.btn-save').click(function(){
		saveIntro();
	});
}

function introSelectImage(){
	jQuery('.st-navigation #sortImage .st-selectimage').click(function(){
		//console.log(encodeURIComponent('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed cumque distinctio labore minima ipsum fugit aspernatur dolore deserunt iure sunt officiis iusto <span class="color-text">itaque rerum reprehenderit laborum</span> dignissimos iste assumenda dolorem?'))
		jQuery('.st-navigation #sortImage .st-selectimage').removeClass('selected');
		jQuery(this).addClass('selected');
		jQuery('.st-navigation .st-desc-item .st-desc-title').val(String(jQuery(this).attr('data-title')));
		jQuery('.st-navigation .st-desc-item .st-desc-number').val(jQuery(this).attr('data-number'));
		jQuery('.st-navigation .st-desc-item .st-desc-iconname').val(jQuery(this).attr('data-iconname'));
//		jQuery('.st-navigation .st-desc-item .st-desc-bg-image').val(jQuery(this).attr('data-bg-image'));
		jQuery('.st-navigation .st-desc-item .st-desc-show-image').val(jQuery(this).attr('data-show-image'));
//        jQuery('.st-navigation .st-desc-item .st-desc-link-text').val(jQuery(this).attr('data-link-text'));
//        jQuery('.st-navigation .st-desc-item .st-desc-link').val(jQuery(this).attr('data-link'));
//        jQuery('.st-navigation .st-desc-item .st-desc-content').val((jQuery(this).attr('data-desc')!=null)?decodeURIComponent(jQuery(this).attr('data-desc')):"");
	});
	jQuery('.st-navigation .st-desc-item .st-desc-title').keyup(function() {
		jQuery('.st-navigation #sortImage .st-selectimage.selected').attr("data-title",String(jQuery(this).val()));
	});
    jQuery('.st-navigation .st-desc-item .st-desc-show-image').change(function() {
		jQuery('.st-navigation #sortImage .st-selectimage.selected').attr("data-show-image",jQuery(this).val());
        
	});
    jQuery('.st-navigation .st-desc-item .st-desc-number').keyup(function() {
		jQuery('.st-navigation #sortImage .st-selectimage.selected').attr("data-number",jQuery(this).val());
	});
    jQuery('.st-navigation .st-desc-item .st-desc-iconname').keyup(function() {
		jQuery('.st-navigation #sortImage .st-selectimage.selected').attr("data-iconname",jQuery(this).val());
	});
    //jQuery('.st-navigation .st-desc-item .st-desc-link-text').keyup(function() {
//		jQuery('.st-navigation #sortImage .st-selectimage.selected').attr("data-link-text",jQuery(this).val());
//	});
    //jQuery('.st-navigation .st-desc-item .st-desc-link').keyup(function() {
//		jQuery('.st-navigation #sortImage .st-selectimage.selected').attr("data-link",jQuery(this).val());
//	});    
	jQuery('.st-navigation .st-desc-item .st-desc-content').keyup(function() {
		jQuery('.st-navigation #sortImage .st-selectimage.selected').attr("data-desc",encodeURIComponent(jQuery(this).val()));
	});
}

function saveIntro(){
		data = {"type":"intro_desi","content":[],"attr":{}};
        data.attr.template = jQuery('select[name="st-intro-template"] option:selected').val();
		data.attr.class=jQuery('#st-navigation .st-class').val();
		data.attr.title=jQuery('#st-navigation .st-title').val();
		data.attr.sid=jQuery('#st-navigation .st-sid').val();
		data.attr.hclass=jQuery('#st-navigation .st-hclass').val();
		//data.attr.show_title=jQuery('#st-navigation .st-show-title').val();
		data.attr.bg_image=jQuery('#st-navigation .st-bg').val();
		//data.attr.auto=jQuery('#st-navigation .st-auto').val();
		//data.attr.typeslider= jQuery('#st-navigation .st-typeslider input[type="radio"]:checked').val();
		var link = "";
		jQuery('#st-navigation #sortImage li').each(function(index){
			var arr = {"type":"item_gallery_desi","content":jQuery(this).find('img').attr("data-site"),"attr":{"linkadmin":jQuery(this).find('img').attr("src"),"title":jQuery.trim(jQuery(this).attr("data-title")),"number":jQuery.trim(jQuery(this).attr("data-number")),"iconname":jQuery.trim(jQuery(this).attr("data-iconname")),"show_image":jQuery(this).attr("data-show-image")}};
			data.content.push(arr);
		});
		//console.log(data);
		var json = encodeURIComponent(JSON.stringify(data));
		jQuery('#st-page li.st-focus').attr("data",json);
		jQuery.stbox.close();
}
//  End Slider Option
//  Gmap Option
function addGmap(log,lat){
	var center = new google.maps.LatLng(log,lat);
	var loca = log+','+lat;
    jQuery('#geocomplete').geocomplete({
		map: '.map_canvas',
		types: ['establishment'],
		country: 'de',
		details: 'form ',
		markerOptions: {
			draggable: true
		},
		location:loca,
		mapOptions: {
			scrollwheel :true,
			center:center,
			zoom:15
		}
    });
    jQuery('#geocomplete').bind('geocode:dragged', function(event, latLng){
		jQuery('input[name=lat]').val(latLng.lat());
		jQuery('input[name=lng]').val(latLng.lng());
    });
}
function getGmapOption(data){
	content ="<div class='st-nav-title'><i class='icon-map-marker'></i> Gmap<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
	content+="<div class='st-nav-option'>";
		content+="<div class='row-fluid'>";
			content+="<div class='span12'>";
				//content+='<ul class="nav nav-tabs" id="tabpopup">';
				//	content+='<li class="active"><a href="#find"><i class="icon-images"></i>Find</a></li>';
				//	content+='<li><a href="#config"><i class="icon-cog-2"></i>Config</a></li>';
			//	content+='</ul>';
			//	content+='<div class="tab-content">';
					//Begin tab Find
				//	content+='<div class="tab-pane active st-loadgmap" id="find">';
				//	content+='</div>';
					// End Tab Find

					//Begin tab Config
					content+='<div class="tab-pane" >';
						content+='<div class="row-fluid">';
							content+='<div class="span6">';
								content+='<label>Title:</label><input name="st-title" class="st-title" type="text" value="'+((data.attr.title==null)?"":data.attr.title)+'">';
								content+='<label>Address:</label><input name="formatted_address" class="st-fomartted" type="text" value="'+data.attr.location+'">';
								content+='<label>Zoom:</label><input name="zoom" class="st-zoom" type="text" value="'+data.attr.zoom+'" placeholder="maxZoom = 40">';
								content+='<label>MapTypeId:</label>';
								content+='<select class="st-map_type"><option value="ROADMAP">roadmap</option><option value="HYBRID">hybrid</option><option value="SATELLITE">satellite</option><option value="TERRAIN">terrain</option></select>';
								content+='<label>Height:</label><input name="height_map" class="st-heightmap" type="text" value="'+((data.attr.height==null)?"400":data.attr.height)+'">';
								content+='<label>Class:</label><input name="class_map" class="st-classmap" type="text" value="'+((data.attr.class==null)?"":data.attr.class)+'">';
							    content+='<label>State</label>';
                                content+="<div class='st-state st-radio'>"; 
									content+='<label class="radio inline"><input type="radio" name="st-state" value="1" checked="checked">Yes</label>';
									content+='<label class="radio inline"><input type="radio" name="st-state" value="0">No</label>';
								content+="</div>";
							content+='</div>';
							content+='<div class="span6">';
								content+='<label>Show Pan control:</label>';
								content+="<div class='st-pancontrol st-radio'>"; 
									content+='<label class="radio inline"><input type="radio" name="st-pancontrol" value="true" checked="checked">Yes</label>';
									content+='<label class="radio inline"><input type="radio" name="st-pancontrol" value="false">No</label>';
								content+="</div>";
								content+='<label>Show Zoom control:</label>';
								content+="<div class='st-zoomcontrol st-radio'>"; 
									content+='<label class="radio inline"><input type="radio" name="st-zoomcontrol" value="true" checked="checked">Yes</label>';
									content+='<label class="radio inline"><input type="radio" name="st-zoomcontrol" value="false">No</label>';
								content+="</div>";
								content+='<label>Show Maptype control:</label>';
								content+="<div class='st-maptypecontrol st-radio'>"; 
									content+='<label class="radio inline"><input type="radio" name="st-maptypecontrol" value="true" checked="checked">Yes</label>';
									content+='<label class="radio inline"><input type="radio" name="st-maptypecontrol" value="false">No</label>';
								content+="</div>";
								content+='<label>Show Streets control:</label>';
								content+="<div class='st-streetcontrol st-radio'>"; 
									content+='<label class="radio inline"><input type="radio" name="st-streetcontrol" value="true" checked="checked">Yes</label>';
									content+='<label class="radio inline"><input type="radio" name="st-streetcontrol" value="false">No</label>';
								content+="</div>";
								content+='<label>Scroll Wheel:</label>';
								content+="<div class='st-scrollwheel st-radio'>"; 
									content+='<label class="radio inline"><input type="radio" name="st-scrollwheel" value="false" checked="checked">No</label>';
									content+='<label class="radio inline"><input type="radio" name="st-scrollwheel" value="true">Yes</label>';
								content+="</div>";
							content+='</div>';
						content+='</div>';
				//	content+='</div>';
				//End tab Config
				content+='</div>';
			content+="</div>";
		content+="</div>";
		content+="<div class='st-button-group'>";
		content+="<button class='btn btn-primary btn-save'>Save</button>";
		content+="<button class='btn btn-cancel'>Cancel</button>";
		content+="</div>";
	content+="</div>";
	jQuery('#st-navigation').html(content);
	jQuery('#st-navigation .st-map_type [value="'+data.attr.maptype+'"]').attr('selected','selected');
	jQuery('#st-navigation .st-pancontrol [value="'+data.attr.pancontrol+'"]').attr('checked','checked');
	jQuery('#st-navigation .st-state [value="'+data.attr.state+'"]').attr('checked','checked');
	jQuery('#st-navigation .st-zoomcontrol [value="'+data.attr.zoomcontrol+'"]').attr('checked','checked');
	jQuery('#st-navigation .st-maptypecontrol [value="'+data.attr.maptypecontrol+'"]').attr('checked','checked');
	jQuery('#st-navigation .st-streetcontrol [value="'+data.attr.streetcontrol+'"]').attr('checked','checked');
	jQuery('#st-navigation .st-scrollwheel [value="'+((data.attr.scrollwheel==null)?"false":data.attr.scrollwheel)+'"]').attr('checked','checked');
	//jQuery('#tabpopup a').click(function (e) {
//		e.preventDefault();
//		jQuery(this).tab('show');
//	});
/*	jQuery("#find1").click(function(){
	  var searchstr = jQuery("#geocomplete").val();
	  jQuery("#geocomplete").geocomplete('find', searchstr);
	});
	jQuery("#reset").click(function(){
	  jQuery("#geocomplete").val('');
	}); */
    
	jQuery('.st-nav-option button.btn-primary.btn-save').click(function(){
		saveGmap();
	});
}

function saveGmap(){
	var zoom = jQuery.trim(jQuery('#st-navigation .st-zoom').val());
	if(!testNumber(zoom)){
		alert('Zoom must be number format.');
		return false;
	}
	if(zoom<0 && zoom>21){
		alert('Zoom must be bettwen 1 and 21');
		return false;
	}
	data = {"type":"gmap_desi","content":"","attr":{}};
	data.attr.title=jQuery('#st-navigation .st-title').val();
	data.attr.latitude=jQuery('#st-navigation .st-latgmap').val();
	data.attr.longitude=jQuery('#st-navigation .st-lnggmap').val();
	data.attr.location=jQuery('#st-navigation .st-fomartted').val();
	data.attr.zoom=zoom;
	data.attr.maptype=jQuery('#st-navigation .st-map_type').val();
	data.attr.pancontrol = jQuery('#st-navigation [name="st-pancontrol"]:checked').val();
	data.attr.state = jQuery('#st-navigation [name="st-state"]:checked').val();
	data.attr.zoomcontrol = jQuery('#st-navigation [name="st-zoomcontrol"]:checked').val();
	data.attr.maptypecontrol = jQuery('#st-navigation [name="st-maptypecontrol"]:checked').val();
	data.attr.streetcontrol = jQuery('#st-navigation [name="st-streetcontrol"]:checked').val();
	data.attr.height=jQuery.trim((jQuery('#st-navigation .st-heightmap').val()==null)?'400':jQuery('#st-navigation .st-heightmap').val());
	data.attr.class=jQuery.trim((jQuery('#st-navigation .st-classmap').val()==null)?'':jQuery('#st-navigation .st-classmap').val());
	data.attr.scrollwheel = jQuery('#st-navigation [name="st-scrollwheel"]:checked').val();
	var json = encodeURIComponent(JSON.stringify(data));
	jQuery('#st-page li.st-focus').attr("data",json);
	jQuery.stbox.close();
}

//  End Gmap


// Ajax load Images
function loadImages(url){
	jQuery.ajax({
		type:"POST",
		url :"index.php?option=com_blue_pagebuilder&task=page.getImageFolder&tmpl=component",
		data:{folder:url},
		beforeSend:function(){
			var inputs = jQuery("#st-navigation #getimage").find("input,button");
        	inputs.prop("disabled", true);
        	jQuery("#st-navigation #dragImage li").remove();
			if(jQuery('#st-navigation .st-dragimage #st-load').length==0){
				jQuery('#st-navigation .st-dragimage').append('<div id="st-load"><div class="st-loadding"><i class="icon-spinner-5 icon-spinning"></i></div><div class="st-mark"></div></div>');
			}
		},
		success:function(response){
			response = jQuery.parseJSON(response);
			if(response.check==1){
				var html ="";
				for(var i=0;i<response.data.length;i++){
					html+='<li class="st-selectimage"><i class="icon-cancel-circle "></i><img title="'+response.data[i]["name"]+'" data-site="'+response.data[i]["site"]+'" src="'+response.data[i]["admin"]+'" /></li>';
				}
				jQuery('#st-navigation .st-dragimage #st-load').remove();
				var inputs = jQuery("#st-navigation #getimage").find("input,button");
	        	inputs.prop("disabled", false);
				jQuery('#st-navigation #dragImage').html(html);
			}else{
				jQuery('#st-navigation .st-dragimage #st-load').remove();
				var inputs = jQuery("#st-navigation #getimage").find("input,button");
	        	inputs.prop("disabled", false);
			}
			jQuery( ".st-navigation #dragImage li" ).draggable({
				connectToSortable: "#sortImage",
				appendTo: "body",
				placeholder: 'placeholder',
				helper: "clone",
				revert: "invalid"
			});

			jQuery( ".st-navigation #sortImage" ).sortable({
				connectToSortable: "#dragImage",
				appendTo: "body",
				placeholder: 'placeholder',
			    receive: function(event, ui) {
		      		jQuery('#sortImage [class^="icon-"]').click(function(){
		      			jQuery(this).parent().remove();
		      		});
		        },
		        deactivate: function(event,ui){
		        	sliderSelectImage();
		        } 
		    });
		    jQuery( ".st-navigation #sortImage" ).disableSelection();
		}
	});
}
function testNumber(text){
	var reg = /^\d+$/;
	return reg.test(text);
}
function testEmpty(sele){
	if(jQuery.trim(sele.val())==""){
		return true;
	}else{
		return false;
	}
}
function testspecialclass(text){
	var reg = /^\s*[a-zA-Z0-9\_\-\s]*\s*$/;
	return reg.test(text);
}
function testspecial(text){
	var reg = /^\s*[a-zA-Z0-9,\s]*\s*$/;
	return reg.test(text);
}
function testpath(text){
	var reg = /^[a-zA-Z0-9\/]*$/;
	return reg.test(text);
}

function convertHTML(str)
{	
	str = str.replace(/&/g, "&amp;");
	str = str.replace(/"/g, "&quot;");
	str = str.replace(/'/g, "&apos;");
	str = str.replace(/</g, "&lt;");
	str = str.replace(/>/g, "&gt;");	
	return str;
}




// get Services Option
function getServicesOption(data){
    content ="<div class='st-nav-title'><i class='icon-folder-open-alt'></i> Services<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
    content+="<div class='st-nav-option st-services'>";
    	content += "<div class='row-fluid'>";
    		content += "<div class='span6'>";
	    		content+="<label>Category:</label>";
	    		content+="<div class='row-fluid st-category'></div>";
	    		content += getBt2Inputgroup([['text', 'st-title','span12','','Title','Title', data.attr.title,''],['text', 'st-sid','span12','','Section id','Section id', data.attr.sid,''],['text', 'st-sclass','span12','','Section class','Section class', data.attr.sclass,''],['text', 'st-hclass','span12','','Heading class','Heading class', data.attr.hclass,''],['text', 'st-menuid','span12','','Menu id','Menu id', data.attr.menuid,''],['text', 'st-bg','span12','','Background image','Background image', data.attr.bg,'']],false);
        		content += getBt2Textareagroup([['st-description','span12','',data.attr.description,'Description', '5','']], false);
	    	content +="</div>";
	    	content += "<div class='span6'>";
	    		content += getBt2Inputgroup([['text', 'st-itemcount','span12','','Count','Count', data.attr.itemcount,'All']],false);
				//content += getBt2Selectgroup('Full width', 'st-full', 'span12', '', data.attr.full, [['Yes', '1'],['No', '0']], false);
				content += getBt2Selectgroup('Animate', 'st-animate', 'span12', '', data.attr.animate, [['Yes', '1'],['No', '0']], false);
				content += getBt2Selectgroup('Order', 'st-order', 'span12', '', data.attr.order, [['Created', 'created'],['Ordering', 'ordering']], false);
				content += getBt2Selectgroup('Direction', 'st-direction', 'span12', '', data.attr.direction, [['ASC', 'ASC'],['DESC', 'DESC']], false);
				content += getBt2Selectgroup('Template', 'st-template', 'span12', '', data.attr.template, [['Services', 'services'],['Team', 'team'],['Blog', 'blog']], false);
	    	content +="</div>";
    	content +="</div>";
	    content+="<div class='st-button-group'>";
	   	 	content+="<button class='btn btn-primary btn-save'>Save</button>";
	    	content+="<button class='btn btn-cancel'>Cancel</button>";
	    content+="</div>";
    content+="</div>";
    jQuery('.st-navigation').html(content);
    jQuery('#st-navigation .st-column [value="'+((data.attr.title!=null)?data.attr.title:"")+'"]').prop("checked",true);
    jQuery('#st-navigation .st-column [value="'+((data.attr.menuid!=null)?data.attr.menuid:"")+'"]').prop("checked",true);
    jQuery('#st-navigation .st-column [value="'+((data.attr.sid!=null)?data.attr.sid:"")+'"]').prop("checked",true);
    jQuery('#st-navigation .st-column [value="'+((data.attr.sclass!=null)?data.attr.sclass:"")+'"]').prop("checked",true);
    jQuery('#st-navigation .st-column [value="'+((data.attr.bg!=null)?data.attr.bg:"")+'"]').prop("checked",true);
    jQuery('#st-navigation .st-column [value="'+((data.attr.hclass!=null)?data.attr.hclass:"")+'"]').prop("checked",true);
    jQuery('#st-navigation .st-template [value="'+data.attr.template+'"]').attr("selected","selected");
    jQuery('#st-navigation .btn-primary.btn-save').click(function(){
        saveServices(data);
    });
}

function saveServices(data){
    data.attr.title = convertHTML(jQuery('input[name="st-title"]').val());
    data.attr.bg = convertHTML(jQuery('input[name="st-bg"]').val());
    data.attr.sclass = convertHTML(jQuery('input[name="st-sclass"]').val());
    data.attr.sid = convertHTML(jQuery('input[name="st-sid"]').val());
    data.attr.hclass = convertHTML(jQuery('input[name="st-hclass"]').val());
    data.attr.menuid = convertHTML(jQuery('input[name="st-menuid"]').val());
    data.attr.description = convertHTML(jQuery('textarea[name="st-description"]').val());
    data.attr.category = jQuery('#st-navigation .st-category select').val();
    data.attr.template = jQuery('select[name="st-template"] option:selected').val();
    //data.attr.full = jQuery('select[name="st-full"] option:selected').val();
    data.attr.order = jQuery('select[name="st-order"] option:selected').val();
    data.attr.direction = jQuery('select[name="st-direction"] option:selected').val();
    data.attr.animate = jQuery('select[name="st-animate"] option:selected').val();
    data.attr.itemcount = jQuery('input[name="st-itemcount"]').val();
    var title = convertHTML(jQuery('#st-navigation .st-services [name="st-title"]').val());
    jQuery('#st-page .st-focus .st-header-title .st-name').find('.st-modulename').remove();
    jQuery('#st-page .st-focus .st-header-title .st-name').append(' <span class="st-modulename">'+title+'</span>');


    var json = encodeURIComponent(JSON.stringify(data));
    jQuery('#st-page li.st-focus').attr("data",json);

//    jQuery('#st-page li.st-focus').attr("data",JSON.stringify(data));
    jQuery.stbox.close();
}
// End Services
//////////////////////////////

// GetskillOption
function getSkillOption(data){
    content ="<div class='st-nav-title'><i class='icon-folder-open-alt'></i> skill<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
    content+="<div class='st-nav-option st-skill'>";
    	content += "<div class='row-fluid'>";
    		
	    	content += "<div class='span12'>";
	    		content += getBt2Inputgroup([['text', 'st-title','span12','','Title','', data.attr.title,'']],false);
				content += getBt2Inputgroup([['textare', 'st-sdesc','span12','','Short Description','', data.attr.sdesc,'']],false);
				content += getBt2Inputgroup([['text', 'st-percent','span12','','Percent','Percent', data.attr.percent,'']],false);
	    		content += getBt2Inputgroup([['text', 'st-bg-image','span12','','Background color','Background color', data.attr.bg_image,'']],false);
	    		content += getBt2Inputgroup([['text', 'st-color','span12','','Color','Color', data.attr.color,'']],false);
	    		content += getBt2Inputgroup([['text', 'st-class','span12','','class','class', data.attr.class,'']],false);
	    		content += getBt2Selectgroup('Template', 'st-template', 'span12', '', data.attr.template, [['Default ', 'skill'],['Default1 ', 'skill1']], false);
	    	content +="</div>";
    	content +="</div>";
	    content+="<div class='st-button-group'>";
	   	 	content+="<button class='btn btn-primary btn-save'>Save</button>";
	    	content+="<button class='btn btn-cancel'>Cancel</button>";
	    content+="</div>";
    content+="</div>";
    jQuery('.st-navigation').html(content);
    jQuery('#st-navigation .st-column [value="'+((data.attr.title!=null)?data.attr.title:"")+'"]').prop("checked",true);
    jQuery('#st-navigation .st-template [value="'+data.attr.template+'"]').attr("selected","selected");
    jQuery('#st-navigation .btn-primary.btn-save').click(function(){
        saveSkill(data);
    });
}

function saveSkill(data){
    data.attr.class = convertHTML(jQuery('#st-navigation .st-skill [name="st-class"]').val());
    data.attr.title = convertHTML(jQuery('#st-navigation .st-skill input[name="st-title"]').val());
    data.attr.sdesc = convertHTML(jQuery('#st-navigation .st-skill input[name="st-sdesc"]').val());
    data.attr.percent = convertHTML(jQuery('#st-navigation .st-skill input[name="st-percent"]').val());
    data.attr.bg_image = convertHTML(jQuery('#st-navigation .st-skill input[name="st-bg-image"]').val());
    data.attr.color = convertHTML(jQuery('#st-navigation .st-skill input[name="st-color"]').val());
    data.attr.template = jQuery('select[name="st-template"] option:selected').val();
    var title = convertHTML(jQuery('#st-navigation .st-skill [name="st-title"]').val());
    jQuery('#st-page .st-focus .st-header-title .st-name').find('.st-modulename').remove();
    jQuery('#st-page .st-focus .st-header-title .st-name').append(' <span class="st-modulename">'+title+'</span>');

    var json = encodeURIComponent(JSON.stringify(data));
    jQuery('#st-page li.st-focus').attr("data",json);

//    jQuery('#st-page li.st-focus').attr("data",JSON.stringify(data));
    jQuery.stbox.close();
}

// GetpricingOption
function getPricingOption(data){
    content ="<div class='st-nav-title'><i class='icon-folder-open-alt'></i> Pricing<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
    content+="<div class='st-nav-option st-pricing'>";
    	content += "<div class='row-fluid'>";
    		content += "<div class='span6'>";
				content += getBt2Inputgroup([['text', 'st-class','span12','','class','class', data.attr.class,'']],false);
	    		content += getBt2Inputgroup([['text', 'st-price','span12','','Price','Price', data.attr.price,'']],false);
	    		content += getBt2Inputgroup([['text', 'st-unit','span12','','Unit','Unit', data.attr.unit,'']],false);
	    		content += getBt2Inputgroup([['text', 'st-time','span12','','Time','Time', data.attr.time,'']],false);
	    		content += getBt2Inputgroup([['text', 'st-text_button','span12','','Text Button','Text Button', data.attr.text_button,'']],false);
	    		content += getBt2Inputgroup([['text', 'st-link_button','span12','','Link Button','Link Button', data.attr.link_button,'']],false);
	    	content +="</div>";
	    	content += "<div class='span6'>";
	    		content += getBt2Inputgroup([['text', 'st-title','span12','','Title','Title', data.attr.title,'']],false);
				content += getBt2Textareagroup([['st-description','span12','',data.attr.description,'Features', '7','']], false);
				content += getBt2Selectgroup('Template', 'st-template', 'span12', '', data.attr.template, [['Default ', 'pricing'],['Default1 ', 'pricing1']], false);
	    	content +="</div>";
    	content +="</div>";
	    content+="<div class='st-button-group'>";
	   	 	content+="<button class='btn btn-primary btn-save'>Save</button>";
	    	content+="<button class='btn btn-cancel'>Cancel</button>";
	    content+="</div>";
    content+="</div>";
    jQuery('.st-navigation').html(content);
    jQuery('#st-navigation .st-column [value="'+((data.attr.title!=null)?data.attr.title:"")+'"]').prop("checked",true);
    jQuery('#st-navigation .st-template [value="'+data.attr.template+'"]').attr("selected","selected");
    jQuery('#st-navigation .btn-primary.btn-save').click(function(){
        savePricing(data);
    });
}

function savePricing(data){
    data.attr.class = convertHTML(jQuery('#st-navigation .st-pricing [name="st-class"]').val());
    data.attr.title = convertHTML(jQuery('#st-navigation .st-pricing input[name="st-title"]').val());
    data.attr.price = convertHTML(jQuery('#st-navigation .st-pricing input[name="st-price"]').val());
    data.attr.unit = convertHTML(jQuery('#st-navigation .st-pricing input[name="st-unit"]').val());
    data.attr.time = convertHTML(jQuery('#st-navigation .st-pricing input[name="st-time"]').val());
    data.attr.description = convertHTML(jQuery('#st-navigation .st-pricing textarea[name="st-description"]').val());
    data.attr.template = jQuery('select[name="st-template"] option:selected').val();
    data.attr.text_button = convertHTML(jQuery('#st-navigation .st-pricing input[name="st-text_button"]').val());
    data.attr.link_button = convertHTML(jQuery('#st-navigation .st-pricing input[name="st-link_button"]').val());
    var title = convertHTML(jQuery('#st-navigation .st-pricing [name="st-title"]').val());
    jQuery('#st-page .st-focus .st-header-title .st-name').find('.st-modulename').remove();
    jQuery('#st-page .st-focus .st-header-title .st-name').append(' <span class="st-modulename">'+title+'</span>');

    var json = encodeURIComponent(JSON.stringify(data));
    jQuery('#st-page li.st-focus').attr("data",json);

//    jQuery('#st-page li.st-focus').attr("data",JSON.stringify(data));
    jQuery.stbox.close();
}
/////////////////////
// get Parallax Option
function getParallaxOption(data){
    content ="<div class='st-nav-title'><i class='icon-folder-open-alt'></i> Parallax<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
    content+="<div class='st-nav-option st-services'>";
    content+="<label>Title:</label>";
    content+='<input type="text" name="st-title" value="'+((data.attr.title==null)?"Services":data.attr.title)+'">';
    content+="<label>Description:</label>";
    content+='<textarea name="st-description" rows="4" cols="50">'+ ((data.attr.description==null?"Services":data.attr.description))+'';
    content+="</textarea>";
    content+="<label>Category:</label>";
    content+="<div class='row-fluid st-category'></div>";
    content+="<label>Count:</label>";
    content+='<input type="text" name="st-itemcount" value="'+((data.attr.itemcount==null)?"4":data.attr.itemcount)+'">';

    content+="</div>";
    content+="<div class='st-button-group'>";
    content+="<button class='btn btn-primary btn-save'>Save</button>";
    content+="<button class='btn btn-cancel'>Cancel</button>";
    content+="</div>";
    content+="</div>";
    jQuery('.st-navigation').html(content);
    jQuery('#st-navigation .st-column [value="'+((data.attr.title!=null)?data.attr.title:"")+'"]').prop("checked",true);
    jQuery('#st-navigation .st-template [value="'+data.attr.template+'"]').attr("selected","selected");
    jQuery('#st-navigation .btn-primary.btn-save').click(function(){
        saveparallax(data);
    });
}

function saveparallax(data){
    data.attr.title = convertHTML(jQuery('#st-navigation .st-services [name="st-title"]').val());
    data.attr.description = convertHTML(jQuery('#st-navigation .st-services [name="st-description"]').val());
    data.attr.category = jQuery('#st-navigation .st-category select').val();
    data.attr.template = jQuery('#st-navigation .st-template').val();
    data.attr.itemcount = jQuery('#st-navigation .st-services [name="st-itemcount"]').val();
    var title = convertHTML(jQuery('#st-navigation .st-services [name="st-title"]').val());
    jQuery('#st-page .st-focus .st-header-title .st-name').find('.st-modulename').remove();
    jQuery('#st-page .st-focus .st-header-title .st-name').append(' <span class="st-modulename">'+title+'</span>');


    var json = encodeURIComponent(JSON.stringify(data));
    jQuery('#st-page li.st-focus').attr("data",json);

//    jQuery('#st-page li.st-focus').attr("data",JSON.stringify(data));
    jQuery.stbox.close();
}
// End Parallax


// Functions for get Bootstrap 2 input field
/**
* label : string
* name : string
* classlist: string
* id : string
* selected: string
* options: array('text','value')
* horizontal: boolean
**/
function getBt2Selectgroup(label, name, classlist, id, selected, options, horizontal){
    var ht ='';
    if(horizontal){
        ht +="<div class=\"form-horizontal\">";
    }

    ht +="<div class=\"control-group\">";

    if(label != ''){
        ht +="<label class=\"control-label\">";
        ht += label +"</label>";
    } 
        ht +="<div class=\"controls\">";
            ht +="<select ";
            if(name)
                ht += " name=\""+name+"\"";
            if(classlist)
                ht +=" class=\""+classlist+"\"";
            if(id)
                ht +=" id=\""+id+"\"";
            ht +=">";
            for (var i = 0 ; i < options.length; i++) {
                ht +="<option ";
                if(selected == options[i][1])
                    ht +=" selected=\"selected\"";
                ht +=" value=\""+options[i][1]+"\">"+options[i][0]+"</option>";
            }  
        ht +="</select>";
        ht +="</div>";
        ht +="</div>";
    if(horizontal)
        ht +="</div>";
    return ht;
}
//function getBt2Textareagroup([['name','class','id','value','label', 'rows','default value']], horizontal)
function getBt2Textareagroup(textareas, horizontal){
    var ht ='';
    if(horizontal){
        ht +="<div class=\"form-horizontal\">";
    }

    for (var i = 0 ; i < textareas.length; i++) {

    ht +="<div class=\"control-group\">";

    if(textareas[i][4]){
        ht +="<label class=\"control-label\">";
        ht += textareas[i][4] +"</label>";
    } 
        ht +="<div class=\"controls\">";
            ht +="<textarea ";
            if(textareas[i][0])
                ht += " name=\""+textareas[i][0]+"\"";
            if(textareas[i][1])
                ht +=" class=\""+textareas[i][1]+"\"";
            if(textareas[i][2])
                ht +=" id=\""+textareas[i][2]+"\"";
            if(textareas[i][5])
                ht +=" rows=\""+textareas[i][5]+"\"";
            ht +=">";
            if(textareas[i][3])
                ht +=textareas[i][3];
            else if(textareas[i][6])
                ht +=textareas[i][6];
            ht +="</textarea>";    
        ht +="</div>";
        //end div controls
        ht +="</div>";
        // end div control-group
    }
    if(horizontal)
        ht +="</div>";
        //end div horizontal
    return ht;
}


function getBt2Radio(){
    ht = "<label class=\"checkbox inline\">";
    ht += "<input type=\"checkbox\" id=\"inlineCheckbox1\" value=\"option1\"> 1";
    ht += "</label>";
    ht += "<label class=\"checkbox inline\">";
      ht += "<input type=\"checkbox\" id=\"inlineCheckbox2\" value=\"option2\"> 2";
    ht += "</label>";
    ht += "<label class=\"checkbox inline\">";
      ht += "<input type=\"checkbox\" id=\"inlineCheckbox3\" value=\"option3\"> 3";
    ht += "</label>";
    
    return ht;
}

//function getBtRadioCheckbox('Full width', 'st-fullwidth' ,'1' ,[['radio','inputbox','id','1','Yes']], false);
function getBtRadioCheckbox(label, name, checked, valdefault, radios, horizontal){
    var ht ='';
    if(horizontal){
        ht +="<div class=\"form-horizontal\">";
    }

    ht +="<div class=\"control-group\">";

    if(label != '')
        ht +="<label class=\"control-label\">"+label +"</label>";

        ht +="<div class=\"controls\">";
         for (var i = 0 ; i < radios.length; i++) {
         		if(radios[i][4])
                    ht += "<label class=\""+radios[i][0]+" inline\">"+ radios[i][4];
                    ht +="<input type=\""+radios[i][0]+"\"";
                    if(name)
                        ht += " name=\""+name+"\"";
                    if(radios[i][1])
                        ht +=" class=\""+radios[i][1]+"\"";
                    if(radios[i][2])
                        ht +=" id=\""+radios[i][2]+"\"";
                    if(radios[i][3])
                        ht += " value=\""+radios[i][3] + "\"";
                    if(checked == radios[i][3] || valdefault == radios[i][3])
                        ht += " checked=\"checked\"";
                        //ht +=" title=\""+radios[i][5]+"\"";
                   
                    ht +=">";
                    //if(radios[i][5])
                       //ht +=radios[i][5];
                if(radios[i][4])
                    ht +="</label>";
        }  
        ht +="</div>";
        ht +="</div>";
    if(horizontal)
        ht +="</div>";
    return ht;
}

//function getBt2Radiogroup('Row fluid', 'checked' ,[['radio','name','class','id','value','title','toogle']], horizontal)
function getBt2Radiogroup(label, checked, radios, horizontal){
    var ht ='';
    if(horizontal){
        ht +="<div class=\"form-horizontal\">";
    }

    ht +="<div class=\"control-group\">";

    if(label != ''){
        ht +="<label class=\"control-label\">";
        ht += label +"</label>";
    } 
        ht +="<div class=\"controls\">";
         for (var i = 0 ; i < radios.length; i++) {
                    //ht = "<label class=\""+ radios[i][0]+" inline\">";
                    ht +="<input type=\""+radios[i][0]+"\"";
                    if(radios[i][1])
                        ht += " name=\""+radios[i][1]+"\"";
                    //if(radios[i][2])
                        ht +=" class=\""+radios[i][2]+"\"";
                    if(radios[i][3])
                        ht +=" id=\""+radios[i][3]+"\"";
                    if(radios[i][4])
                        ht += " value=\""+radios[i][4] + "\"";
                    if(checked == radios[i][4])
                        ht += " checked=\"checked\"";
                        ht +=" title=\""+radios[i][5]+"\"";
                    if(!radios[i][6]){
                        ht +=" data-toggle=\"tooltip\"";
                    }
                    else{
                        ht +="data-toggle=\""+radios[i][6]+"\"";
                        if(radios[i][7])
                            ht +="data-target=\""+radios[i][7]+"\"";
                        if(radios[i][8])
                            ht +="data-parent=\""+radios[i][8]+"\"";
                    }
                    ht +=">";
                    //if(radios[i][5])
                       //ht +=radios[i][5];
                    //ht +="</label>";
        }  
        ht +="</div>";
        ht +="</div>";
    if(horizontal)
        ht +="</div>";
    return ht;
}

//getBt2Inputgroup([['text', 'name1','class1','id1','label1','placeholder1', 'value'],['text', 'name2','class2','id2','label2','placeholder2']], true);
function getBt2Inputgroup(inputs, horizontal){
    var ht ='';
    if(horizontal)
        ht +="<div class=\"form-horizontal\">";
    for (var i = 0 ; i < inputs.length; i++) {
        ht +="<div class=\"control-group\">";
        if(inputs[i][4]){
            ht +="<label class=\"control-label\"";
            if(inputs[i][3])
                ht +="for=\""+inputs[i][3]+"\"";
            ht += ">"+inputs[i][4] + "</label>";
        } 
            ht +="<div class=\"controls\">";
                ht +="<input type=\""+inputs[i][0]+"\"";
                if(inputs[i][1])
                    ht += "name=\""+inputs[i][1]+"\"";
                if(inputs[i][2])
                    ht +=" class=\""+inputs[i][2]+"\"";
                if(inputs[i][3])
                    ht +="id=\""+inputs[i][3]+"\"";
                if(inputs[i][5])
                    ht +="placeholder=\""+inputs[i][5]+"\"";
                if(inputs[i][6])
                    ht += "value=\""+inputs[i][6] + "\"";
                else if(inputs[i][7])
                    ht += "value=\""+inputs[i][7] + "\"";
                ht +=">";
            ht +="</div>";
        ht +="</div>";
    }  
    if(horizontal)
        ht +="</div>";
    return ht;
}
//getBt2Inputprepend([['text', 'name1','class1','id1','add-on','placeholder1', 'value'],['text', 'name2','class2','id2','label2','placeholder2']], true);
function getBt2Inputprepend(label,inputs, horizontal){
    var ht ='';
    if(horizontal)
        ht +="<div class=\"form-horizontal\">";
    
        ht +="<div class=\"control-group\">";
        if(label){
            ht +="<label class=\"control-label\"";
            //if(label)
                //ht +="for=\""+inputs[i][3]+"\"";
            ht += ">"+label + "</label>";
        } 
            ht +="<div class=\"controls\">";
            for (var i = 0 ; i < inputs.length; i++) {
                ht +="<div class=\"input-prepend\">";
                    ht +="<span class=\"add-on\">";
                    if(inputs[i][4])
                        ht +="<i class=\""+inputs[i][4]+"\"></i>";
                    ht +="</span>";
                    ht +="<input type=\""+inputs[i][0]+"\"";
                    if(inputs[i][1])
                        ht += "name=\""+inputs[i][1]+"\"";
                    if(inputs[i][2])
                        ht +=" class=\""+inputs[i][2]+"\"";
                    if(inputs[i][3])
                        ht +="id=\""+inputs[i][3]+"\"";
                    if(inputs[i][5])
                        ht +="placeholder=\""+inputs[i][5]+"\"";
                    if(inputs[i][6])
                        ht += "value=\""+inputs[i][6] + "\"";
                    ht +=">";
                ht +="</div>";
            }  
            ht +="</div>";
        ht +="</div>";
   
    if(horizontal)
        ht +="</div>";
    return ht;
}



// Functions for get Bootstrap 3 input field
//getBt3Inputgroup([['text', 'name1','class1','id1','label1','placeholder1'],['text', 'name2','class2','id2','label2','placeholder2']], true);
function getBt3Inputgroup(inputs, inlineOrhorizontal){
    var ht ='';
    if(inlineOrhorizontal)
        ht +="<div class=\""+inlineOrhorizontal+"\">";
    for (var i = 0 ; i < inputs.length; i++) {
        ht +="<div class=\"form-group\">";
        if(inputs[i][4]){
            ht +="<label ";
            if(inputs[i][3])
                ht +="for=\""+inputs[i][3]+"\"";
            ht += ">"+inputs[i][4] + "</label>";
        } 
                ht +="<input type=\""+inputs[i][0]+"\"";
                if(inputs[i][1])
                    ht += "name=\""+inputs[i][1]+"\"";
                if(inputs[i][2])
                    ht +=" class=\""+inputs[i][2]+" form-control\"";
                if(inputs[i][3])
                    ht +="id=\""+inputs[i][3]+"\"";
                if(inputs[i][5])
                    ht +="placeholder=\""+inputs[i][5]+"\"";
                if(inputs[i][6])
                    ht += "value=\""+inputs[i][6] + "\"";
                ht +=">";
        ht +="</div>";
    }  
    if(inlineOrhorizontal)
        ht +="</div>";
    return ht;
}

//function getBt3Radiogroup('Row fluid', 'checked' ,[['radio','name','class','id','value','label']], inline)
function getBt3Radiogroup(label, checked, radios, inline){
    var ht ='';
    
    ht +="<div class=\"control-group\">";

    if(label != ''){
        ht +="<label class=\"control-label\">";
        ht += label +"</label>";
    } 
        ht +="<div class=\"controls\">";
         for (var i = 0 ; i < radios.length; i++) {
                    //ht = "<label class=\""+ radios[i][0]+" inline\">";
                    ht +="<input type=\""+radios[i][0]+"\"";
                    if(radios[i][1])
                        ht += " name=\""+radios[i][1]+"\"";
                    //if(radios[i][2])
                        ht +=" class=\""+radios[i][2]+"\"";
                    if(radios[i][3])
                        ht +=" id=\""+radios[i][3]+"\"";
                    if(radios[i][4])
                        ht += " value=\""+radios[i][4] + "\"";
                    if(checked == radios[i][4])
                        ht += " checked=\"checked\"";
                        ht +=" title=\""+radios[i][5]+"\"";
                    ht +=" data-toggle=\"tooltip\">";
                    //if(radios[i][5])
                       //ht +=radios[i][5];
                    //ht +="</label>";
        }  
        ht +="</div>";
        ht +="</div>";
    if(horizontal)
        ht +="</div>";
    return ht;
}

function addslashes(string) {
    return string.replace(/\\/g, '\\\\').
        replace(/\u0008/g, '\\b').
        replace(/\t/g, '\\t').
        replace(/\n/g, '\\n').
        replace(/\f/g, '\\f').
        replace(/\r/g, '\\r').
        replace(/'/g, '\\\'').
        replace(/"/g, '\\"');
}
function removeslashes(string) {
    return string./*replace(/\\/g, '\\\\').
        replace(/\u0008/g, '\\b').
        replace(/\t/g, '\\t').
        replace(/\n/g, '\\n').
        replace(/\f/g, '\\f').
        replace(/\r/g, '\\r').*/
        replace(/'/g, '\\\'').
        replace(/"/g, '\\"');
}