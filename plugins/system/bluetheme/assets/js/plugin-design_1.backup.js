/*! Plugin Design - v1.0
* http://shinetheme.com
* author 	:Pham Tien Duc
* email 	:ducphamtien@gmail.com
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
		window.location="index.php?option=com_stpagebuilder";
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
		switch(data_ele.type){
			case "contact_desi":
				getContactOption(data_ele);
				break;
			case "gallery_desi":
				getGalleryOption(data_ele);
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
			default:
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
			switch(typepopup){
				case "portfolio_desi":
					this.width=320;
					this.height=320;
					break;
				case "page-config":
					this.width=300;
					this.height=300;
					break;
				case "contact_desi":
					this.width=350;
					this.height=320;
					break;
				case "columns_desi":
					this.width=300;
					this.height=310;
					break;
				case "html_desi":
					this.height=490;
					break;
				case "youtube_desi":
					this.width=350;
					this.height=205;
					break;
				case "vimeo_desi":
					this.width=350;
					this.height=205;
					break;
				case "moduleid_desi":
					this.width=290;
					this.height=320;
					break;
				case "alert_desi":
					this.width=400;
					this.height=420;
					jQuery(this.content).find('.st-nav-option').css({height:"330"});
					break;
				case "article_box_desi":
					this.width=350;
					this.height=330;
					break;
				case "recent_article_desi":
					this.width=500;
					this.height=470;
					jQuery(this.content).find('.st-nav-option').css({height:"380"});
					break;
				case "tabs_desi":
					this.width=280;
					this.height=200;
					break;
				case "divider_desi":
					this.width=300;
					this.height=262;
					break;
				case "flickr_desi":
					this.width=350;
					this.height=390;
					break;
				case "fb_likebox_desi":
					this.width=450;
					this.height=420;
					jQuery(this.content).find('.st-nav-option').css({height:"330"});
					break;
				case "slider_desi":
					this.width=800;
					this.height=650;
					break;
				case "gallery_desi":
					this.width=800;
					this.height=650;
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
				case "recent_article_desi":
					jQuery('#st-element #st-element-k2category').appendTo(".st-navigation .st-category");
					checkList('category_id','#jformk2category');
					break;
				case "gallery_desi":
					var link = jQuery("#st-navigation .st-path").val();
					loadImages(link);
					break;
				case "slider_desi":
					var link = jQuery("#st-navigation .st-path").val();
					loadImages(link);
					break;
				case "gmap_desi":
					jQuery('#st-element-map').appendTo("#st-navigation .st-loadgmap");
					var dt = jQuery.parseJSON(decodeURIComponent(jQuery(this.element).parent().parent().attr("data")));
					//console.log(dt)
					addGmap(dt.attr.latitude,dt.attr.longitude);
					jQuery('#st-navigation .st-lnggmap').val(dt.attr.longitude);
					jQuery('#st-navigation .st-latgmap').val(dt.attr.latitude);
					break;
				case "portfolio_desi":
					jQuery('#st-element #st-element-k2category').appendTo(".st-navigation .st-category");
					checkList('id','#jformk2category');
					break;
				case "html_desi":
					//getEditor();
					break;
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
			this.height=445;
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

				content+="<label>Class:</label>";
				content+="<div class='row-fluid'><input type='text' class='st-spanclass span12' value='"+((data.content[index].attr.class==null)?"":data.content[index].attr.class)+"'></div>";
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
				data.content[index].attr.class=jQuery('.st-navigation .st-spanclass').val();
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
		content+="<label>ID:</label>";
		content+="<div class='row-fluid'>";
			content+="<input type='text' class='column-id' value='"+((data.attr.id==null)?"":data.attr.id)+"' />";
		content+="</div>";
		content+="<label>Class:</label>";
		content+="<div class='row-fluid'>";
			content+="<input type='text' class='column-class' value='"+((data.attr.class==null)?"":data.attr.class)+"' />";
		content+="</div>";
		content+="<label>Full Width:</label>";
		content+="<div class='row-fluid'><div class='st-fullwidth st-radio'>"; 
			content+='<label class="radio inline"><input type="radio" name="st-fullwidth" value="1" checked="checked">Yes</label>';
			content+='<label class="radio inline"><input type="radio" name="st-fullwidth" value="0">No</label>';
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
	jQuery('.st-nav-option button.btn-primary.btn-save').click(function(){
		saveColumnDesign(data);
	});
}

function saveColumnDesign(data){
	data.attr.id = jQuery.trim(jQuery('#st-navigation .column-id').val());
	data.attr.class = jQuery.trim(jQuery('#st-navigation .column-class').val());
	data.attr.fullwidth = jQuery('#st-navigation .st-fullwidth input[type="radio"]:checked').val();
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

function buttonsave(){
	jQuery("#toolbar-apply").click(function(){
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
		var config = {"id":jQuery.trim(jQuery('#page-id-config').val()),"class":jQuery.trim(jQuery('#page-class-config').val()),"fullwidth":jQuery('#page-fullwidth [name="page-fullwidth"]:checked').val()};
		
		jQuery.ajax({
			type:"POST",
			url:"index.php?option=com_stpagebuilder&task=page.stSave&tmpl=component",
			data:{data:json,id:jQuery('#stid').val(),name:name,config:JSON.stringify(config)},
			dataType : 'html',
			beforeSend :function(){
				ajaxbeforesend();
			},
			success:function(response){
				ajaxsuccess(response);
				//jQuery('#system-message-container').html('<div><button type="button" class="close" data-dismiss="alert">×</button><div class="alert alert-success"><h4 class="alert-heading">Message</h4><p>'+response+'</p></div>');
			}
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
}

////////////////////////////////  Item //////////////////////////////////////


// get Portfolio Option
function getPortfolioOption(data){
	content ="<div class='st-nav-title'><i class='icon-folder-open-alt'></i> Portfolio<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
	content+="<div class='st-nav-option st-portfolio'>";
		content+="<label>Category:</label>";
		content+="<div class='row-fluid st-category'></div>";
		content+="<label>Columns:</label>";
		content+="<div class='row-fluid'><div class='st-column st-radio'>"; 
			content+='<label class="radio inline"><input type="radio" name="st-column" value="2" checked="checked">2 Columns</label>';
			content+='<label class="radio inline"><input type="radio" name="st-column" value="3">3 Columns</label>';
			content+='<label class="radio inline"><input type="radio" name="st-column" value="4">4 Columns</label><br>';
			content+='<label class="radio inline"><input type="radio" name="st-column" value="5">Masonry</label>';
		content+="</div></div>";
		content+="<div class='st-button-group'>";
		content+="<button class='btn btn-primary btn-save'>Save</button>";
		content+="<button class='btn btn-cancel'>Cancel</button>";
		content+="</div>";
	content+="</div>";
	jQuery('.st-navigation').html(content);
	jQuery('#st-navigation .st-column [value="'+((data.attr.column!=null)?data.attr.column:"2")+'"]').prop("checked",true);
	jQuery('#st-navigation .btn-primary.btn-save').click(function(){
		savePortfolio(data);
	});
}

function savePortfolio(data){
	data.attr.id = jQuery('#st-navigation .st-category select').val();
	data.attr.column = jQuery('#st-navigation .st-column [name="st-column"]:checked').val();
	jQuery('#st-page li.st-focus').attr("data",encodeURIComponent(JSON.stringify(data)));
	jQuery.stbox.close();
}
// End Portfolio

// Get Option Tabs
function getTabsOption(data){
	content ="<div class='st-nav-title'><i class='icon-box'></i> Tabs<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
	content+="<div class='st-nav-option'>";
		content+="<label>Position:</label>";
		content+="<div class='row-fluid'><select class='st-tabposition'>";
			content+='<option value="style1">Style 1</option>';
			content+='<option value="style2">Style2</option>';
			content+='<option value="accordion">Accordion</option>';
		content+="</select></div>";
		content+="<div class='st-button-group'>";
		content+="<button class='btn btn-primary btn-save'>Save</button>";
		content+="<button class='btn btn-cancel'>Cancel</button>";
		content+="</div>";
	content+="</div>";
	jQuery('.st-navigation').html(content);
	jQuery('.st-navigation .st-tabposition [value="'+data.attr.position+'"]').attr("selected","selected");
	jQuery('.st-nav-option button.btn-primary.btn-save').click(function(){
		saveTabs(data);
	});
}

function saveTabs(data){
	data.attr.position=jQuery('.st-nav-option .st-tabposition').val();
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
		content+="<div class='row-fluid'>";
			content+="<div class='span12 st-editor'>";
				content+="<iframe class='if-editor' src='index.php?option=com_stpagebuilder&task=page.getEditor&tmpl=component' width='100%' height='370'></iframe>";
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
		jQuery('#st-navigation iframe').contents().find('iframe').contents().find('body').html(decodeURIComponent(ct));
	},300);
}
function saveHtml(){
	var html = encodeURIComponent(jQuery('#st-navigation iframe').contents().find('iframe').contents().find('body').html());

	var json = encodeURIComponent(JSON.stringify({"type":"html_desi","content":html,"attr":{}}));
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
				content+="<label>Choose:</label>";
				content+="<div class='st-listmodule'></div>";
			content+="</div>";
		content+="</div>";
		content+="<label>Show title:</label>";
		content+="<div class='row-fluid'><div class='st-showtitle st-radio'>"; 
			content+='<label class="radio inline"><input type="radio" name="st-title" value="0" checked="checked">No</label>';
			content+='<label class="radio inline"><input type="radio" name="st-title" value="1">Yes</label>';
		content+="</div></div>";
		content+="<label>Module Class Suffix:</label>";
		content+="<div class='row-fluid'><input type='text' class='st-moduleclass span12' value='"+((data.attr.moduleclass==null)?"":data.attr.moduleclass)+"'></div>";
		content+="<div class='st-button-group'>";
		content+="<button class='btn btn-primary btn-save'>Save</button>";
		content+="<button class='btn btn-cancel'>Cancel</button>";
		content+="</div>";
	content+="</div>";
	jQuery('.st-navigation').html(content);
	if(typeof data.attr.showtitle !='undefined'){
		jQuery('#st-navigation .st-showtitle [value="'+data.attr.showtitle+'"]').prop('checked', true);
	}
	jQuery('.st-nav-option button.btn-primary.btn-save').click(function(){
		saveModule();
	});
}

function saveModule(){
	var title = jQuery('#st-navigation #jform_modules option:selected').text();
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
		data.attr.moduleclass = jQuery('#st-navigation .st-moduleclass').val();
		var json = encodeURIComponent(JSON.stringify(data));
		jQuery('#st-page li.st-focus').attr("data",json);
		jQuery.stbox.close();
	}else{
		alert('No special characters allowed.');
		return false;
	}
}

// End Option Module

// get Option Gallery
function getGalleryOption(data){
	content ="<div class='st-nav-title'><i class='icon-images'></i> Gallery<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
	content+="<div class='st-nav-option'>";
		//Create Tab
		content+='<ul class="nav nav-tabs" id="tabpopup">';
			content+='<li class="active"><a href="#getimage"><i class="icon-images"></i>Select Images</a></li>';
			content+='<li><a href="#getconfig"><i class="icon-cog-2"></i>Config</a></li>';
		content+='</ul>';
		content+='<div class="tab-content">';
			// Select Image
			content+='<div class="tab-pane active" id="getimage">';
				content+='<div class="row-fluid">';
					content+='<div class="span5">';
						content+='<strong>Path:</strong><input type="text" class="st-path" value="images/temp" /><button class="btn btn-primary st-go" type="button" >Go</button>';
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
							content+='<li class="st-selectimage">';
								content+='<i class="icon-cancel-circle "></i>';
								content+='<img data-site="'+data.content[i].content+'" src="'+data.content[i].attr.linkadmin+'" />';
							content+='</li>';
						}
						content+='</ul></div>';
					content+='</div>';
				content+="</div>";
			content+='</div>';
			//End Select Image
			content+='<div class="tab-pane" id="getconfig">';
				content+='<label>id:</label>';
				content+='<div class="row-fluid"><input class="span6 st-galleryid" type="text" value="'+(data.attr.id==null)?'':data.attr.id+'" /></div>';
				content+='<label>Class:</label>';
				content+='<div class="row-fluid"><input class="span6 st-galleryclass" type="text" value="'+(data.attr.class==null)?'':data.attr.id+'" /></div>';
			content+='</div>';
		content+='</div>';

		//End Tab
		content+="<div class='st-button-group'>";
		content+="<button class='btn btn-primary btn-save'>Save</button>";
		content+="<button class='btn btn-cancel'>Cancel</button>";
		content+="</div>";
	content+="</div>";
	jQuery('.st-navigation').html(content);
	
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
		saveGallery();
	});
}

function saveGallery(){
	data = {"type":"gallery_desi","content":[],"attr":{}};
	data.attr.id=jQuery('#st-navigation .st-galleryid').val();
	data.attr.class=jQuery('#st-navigation .st-galleryclass');
	var link = "";
	jQuery('#st-navigation #sortImage li').each(function(index){
		var arr = {"type":"item_gallery_desi","content":jQuery(this).find('img').attr("data-site"),"attr":{"linkadmin":jQuery(this).find('img').attr("src"),"title":""}};
		data.content.push(arr);
	});
	var json = encodeURIComponent(JSON.stringify(data));
	jQuery('#st-page li.st-focus').attr("data",json);
	jQuery.stbox.close();
}
//  End Gallery Option

// get Option Vimeo
function getVimeoOption(data){
	content ="<div class='st-nav-title'><i class='icon-vimeo'></i> Vimeo<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
	content+="<div class='st-nav-option'>";
		content+="<label>Vimeo Link:</label>";
		content+="<div class='row-fluid'><input type='text' class='st-linkvideo span12' value='"+data.content+"' placeholder='Enter the vimeo link'></div>";
		content+="<div class='st-button-group'>";
		content+="<button class='btn btn-primary btn-save'>Save</button>";
		content+="<button class='btn btn-cancel'>Cancel</button>";
		content+="</div>";
	content+="</div>";
	jQuery('.st-navigation').html(content);
	jQuery('.st-nav-option button.btn-primary.btn-save').click(function(){
		saveVimeo();
	});
}

function saveVimeo(){
	var link = jQuery('.st-navigation .st-nav-option .st-linkvideo').val();
	if(testEmpty(jQuery('.st-navigation .st-nav-option .st-linkvideo'))){
		alert('Please input your Vimeo link!');
		return false;
	}else{
		
		data = {"type":"vimeo_desi","content":"","attr":{}};
		data.content=link;
		var json = encodeURIComponent(JSON.stringify(data));
		jQuery('#st-page li.st-focus').attr("data",json);
		jQuery.stbox.close();
	}
}
//  End Vimeo Option

// get Option Youtube
function getYoutubeOption(data){
	content ="<div class='st-nav-title'><i class='icon-youtube'></i> Youtube<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
	content+="<div class='st-nav-option'>";
			content+="<label>Youtube Link:</label>";
			content+="<div class='row-fluid'><input type='text' class='st-linkvideo span12' value='"+data.content+"' placeholder='Enter the youtube link'></div>";
		content+="<div class='st-button-group'>";
		content+="<button class='btn btn-primary btn-save'>Save</button>";
		content+="<button class='btn btn-cancel'>Cancel</button>";
		content+="</div>";
	content+="</div>";
	jQuery('.st-navigation').html(content);
	jQuery('.st-nav-option button.btn-primary.btn-save').click(function(){
		saveYoutube();
	});
}

function saveYoutube(){
	var link = jQuery('.st-navigation .st-nav-option .st-linkvideo').val();
	if(testEmpty(jQuery('.st-navigation .st-nav-option .st-linkvideo'))){
		alert('Please input your Youtube link!');
		return false;
	}else{
		data = {"type":"youtube_desi","content":"","attr":{}};
		data.content=link;
		var json = encodeURIComponent(JSON.stringify(data));
		jQuery('#st-page li.st-focus').attr("data",json);
		jQuery.stbox.close();
	}
}
//  End Youtube Option

// get Option Message Box
function getMessageBoxOption(data){
	content ="<div class='st-nav-title'><i class='icon-exclamation-sign'></i> Message Box<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
	content+="<div class='st-nav-option'>";
		content+="<div class='row-fluid'>";
			content+="<label>Message Type:</label>";
			content+="<div class='row-fluid'><select class='st-type span12'>";
			content+='<option value="0">---- Select a type-----</option>';
			content+='<option value="warning">Warning</option>';
			content+='<option value="info">Info</option>';
			content+='<option value="error">Error</option>';
			content+='<option value="success">Success</option>';
			content+="</select><div>";
			content+="<label>Message Title: </label>";
			content+="<div class='row-fluid'>";
				content+="<input type='text' class='st-title_alert span12' placeholder='Input your title here' value='"+decodeURIComponent(data.attr.title)+"' />";
			content+="</div>";
			content+="<label>Message:</label>";
			content+="<div class='row-fluid'><textarea rows='6' class='st-content_alert span12'>";
			     content+=decodeURIComponent(data.content);
			content+="</textarea></div>";
		content+="</div>";
		content+="<div class='st-button-group'>";
		content+="<button class='btn btn-primary btn-save'>Save</button>";
		content+="<button class='btn btn-cancel'>Cancel</button>";
		content+="</div>";
	content+="</div>";
	jQuery('.st-navigation').html(content);
	jQuery('.st-navigation .st-type [value="'+data.attr.type+'"]').attr("selected","selected");
	jQuery('.st-nav-option button.btn-primary.btn-save').click(function(){
		if(testEmpty(jQuery('#st-navigation .st-content_alert'))){
			alert('The Message must be not empty!');
			jQuery('#st-navigation .st-content_alert').focus();
		}else{
			saveMessageBox();
		}
	});
}

function saveMessageBox(){
	var type_alert = jQuery('.st-navigation .st-nav-option .st-type').val();
	var title_alert = encodeURIComponent(convertHTML(jQuery('.st-navigation .st-nav-option .st-title_alert').val()));
	var content_alert = encodeURIComponent(convertHTML(jQuery('.st-navigation .st-nav-option .st-content_alert').val()));
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
		content+="<label>Margin:</label>";
		content+="<div class='row-fluid'><input type='text' class='st-margin span12' value='"+data.attr.margin+"' placeholder='Margin'><div>";
		content+="<div class='st-button-group'>";
		content+="<button class='btn btn-primary btn-save'>Save</button>";
		content+="<button class='btn btn-cancel'>Cancel</button>";
		content+="</div>";
	content+="</div>";
	jQuery('.st-navigation').html(content);
	jQuery('.st-navigation .st-style option[value="'+data.attr.style+'"]').attr("selected","selected");
	jQuery('.st-navigation .st-margin').val(data.attr.margin);
	jQuery('.st-nav-option button.btn-primary.btn-save').click(function(){
		saveDivider();
	});
}

function saveDivider(){
	var style = jQuery('.st-navigation .st-style').val();
	var margin = jQuery('.st-navigation .st-margin').val();
	if(testNumber(margin)){
		data = {"type":"divider_desi","content":" ","attr":{"style":style,"margin":margin}};
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
function getFlickrOption(data){
    content ="<div class='st-nav-title'><i class='icon-flickr'></i> Flickr<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
    content+="<div class='st-nav-option'>";
        content+="<label>Id Images flickr - link:</label>";
        content+="<div class='row-fluid'><input type='text' class='st-linkid span12' value='"+data.attr.id+"' placeholder='Link id image'></div>";

        content+="<label>Limit:</label>";
        content+="<div class='row-fluid'><input type='text' class='limit span12' value='"+data.attr.limit+"' placeholder='limit'></div>";
     
        content+="<label>Image Width:</label>";
        content+="<div class='row-fluid'><input type='text' class='st-widthimage span12' value='"+data.attr.width+"' placeholder='Width'></div>";              
          
        content+="<label>Image Height:</label>";
        content+="<div class='row-fluid'><input type='text' class='st-heightimgae span12' value='"+data.attr.height+"' placeholder='Height'></div>";              
       
        content+="<div class='st-button-group'>";
        content+="<button class='btn btn-primary btn-save'>Save</button>";
        content+="<button class='btn btn-cancel'>Cancel</button>";
        content+="</div>";
    content+="</div>";
    jQuery('.st-navigation').html(content);
    jQuery('.st-nav-option button.btn-primary.btn-save').click(function(){
        saveFlickr();
    });
}

function saveFlickr(){
    data = {"type":"flickr_desi","content":"","attr":{}};
    data.attr.width=jQuery('.st-navigation .st-nav-option .st-widthimage').val();
    data.attr.height=jQuery('.st-navigation .st-nav-option .st-heightimgae').val();
    data.attr.id=jQuery('.st-navigation .st-nav-option .st-linkid').val();
    data.attr.limit=jQuery('.st-navigation .st-nav-option .limit').val();
    var json = encodeURIComponent(JSON.stringify(data));
    jQuery('#st-page li.st-focus').attr("data",json);
    jQuery.stbox.close();
}

//End Flickr

// get Option Contact Form 
function getContactOption(data){
	content ="<div class='st-nav-title'><i class='icon-mail-6'></i> Contact Form<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
    content+="<div class='st-nav-option'>";
        content+="<label>Email:</label>";
        content+="<div class='row-fluid'><input type='text' class='st-email span12' value='"+((data.attr.email!=null)?data.attr.email:"")+"' placeholder='Email'></div>";

        content+="<label>Subject:</label>";
        content+="<div class='row-fluid'><input type='text' class='st-subject span12' value='"+((data.attr.subject!=null)?data.attr.subject:"")+"' placeholder='Subject'></div>";
     
        content+="<label>Thank You Message:</label>";
        content+="<div class='row-fluid'><input type='text' class='st-thanks span12' value='"+((data.attr.thanks!=null)?data.attr.thanks:"")+"' placeholder='Thank You Message'></div>";              
        
        content+="<div class='st-button-group'>";
        content+="<button class='btn btn-primary btn-save'>Save</button>";
        content+="<button class='btn btn-cancel'>Cancel</button>";
        content+="</div>";
    content+="</div>";
    jQuery('.st-navigation').html(content);
    jQuery('.st-nav-option button.btn-primary.btn-save').click(function(){
        saveContactForm();
    });
}

function saveContactForm(){
	data = {"type":"contact_desi","content":"","attr":{}};
    data.attr.email=jQuery('.st-navigation .st-nav-option .st-email').val();
    data.attr.subject=jQuery('.st-navigation .st-nav-option .st-subject').val();
    data.attr.thanks=jQuery('.st-navigation .st-nav-option .st-thanks').val();
    var json = encodeURIComponent(JSON.stringify(data));
    jQuery('#st-page li.st-focus').attr("data",json);
    jQuery.stbox.close();
}

// End Contact Form 

// get Option like box 
function getFb_likbeboxOption(data){
	content ="<div class='st-nav-title'><i class='icon-facebook-4'></i> Facebook likebox<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
	content+="<div class='st-nav-option'>";
		content+="<label>Facebook Link:</label>";
		content+="<div class='row-fluid'><input type='text' size='40' class='st-linkpage span12' value='"+data.content+"' placeholder='Link page'></div>";
		content+="<label>Width:</label>";
		content+="<div class='row-fluid'><input type='text' class='st-widthbox span12' value='"+data.attr.width+"' placeholder='Width'></div>";
		content+="<label>Height:</label>";
		content+="<div class='row-fluid'><input type='text' class='st-heightbox span12' value='"+data.attr.height+"' placeholder='Height (default \"auto\")'></div>";
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
        
		content+="<label>Color scheme:</label>";
        content+="<div class='row-fluid'><select class='st-colorScheme'>"; 
            if(data.attr.colorscheme=='light'){
			content+='<option value="light">light</option>';
			content+='<option value="dark">dark</option>';
		    }else{
		    	content+='<option value="dark">dark</option>';
		    	content+='<option value="light">light</option>';
		    }
		content+="</select></div>";
		 content+="<label>Language:</label>";
        content+="<div class='row-fluid'><select class='st-language'>"; 
			content+='<option value="en_US">US</option>';
			content+='<option value="ko_KR">Korea</option>';
		    content+='<option value="fr_FR">France</option>';
	        content+='<option value="ja_JP">Japanese</option>';
	        content+='<option value="it_IT">Italian</option>';
			content+='<option value="vi_VN">VietNam</option>';
		content+="</select></div>";
		content+="<div class='st-button-group'>";
			content+="<button class='btn btn-primary btn-save'>Save</button>";
			content+="<button class='btn btn-cancel'>Cancel</button>";
			content+="</div>";
	content+="</div>";
	jQuery('.st-navigation').html(content);
	jQuery('#st-navigation .st-language [value="'+data.attr.language+'"]').prop('selected', true);
	jQuery('#st-navigation .st-showfaces [value="'+data.attr.showfaces+'"]').prop('checked', true);
	jQuery('#st-navigation .st-showheader [value="'+data.attr.showheader+'"]').prop('checked', true);
	jQuery('#st-navigation .st-showstream [value="'+data.attr.showstream+'"]').prop('checked', true);
	jQuery('#st-navigation .st-showborder [value="'+data.attr.showborder+'"]').prop('checked', true);
	jQuery('.st-nav-option button.btn-primary.btn-save').click(function(){
		saveLikebox();
	});
}

function saveLikebox(){
	var width = jQuery('.st-navigation .st-nav-option .st-widthbox').val();
	var height = jQuery('.st-navigation .st-nav-option .st-heightbox').val();
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
	data.content=jQuery('.st-navigation .st-nav-option .st-linkpage').val();
	data.attr.width=width;
	data.attr.height=height;
	data.attr.showfaces=jQuery('.st-navigation .st-nav-option .st-showfaces [name="st-showfaces"]:checked').val();
	data.attr.showheader=jQuery('.st-navigation .st-nav-option .st-showheader [name="st-showheader"]:checked').val();
	data.attr.showstream=jQuery('.st-navigation .st-nav-option .st-showstream [name="st-showstream"]:checked').val();
	data.attr.showborder=jQuery('.st-navigation .st-nav-option .st-showborder [name="st-showborder"]:checked').val();
	data.attr.colorscheme=jQuery('.st-navigation .st-nav-option .st-colorScheme').val();
	data.attr.language=jQuery('.st-navigation .st-nav-option .st-language').val();
	var json = encodeURIComponent(JSON.stringify(data));
	jQuery('#st-page li.st-focus').attr("data",json);
	jQuery.stbox.close();
}
//  End likebox Option
// get Option Slider
function getSliderOption(data){
	content ="<div class='st-nav-title'><i class='icon-image'></i> Slider<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
	content+="<div class='st-nav-option st-slider-option'>";
		content+='<ul class="nav nav-tabs" id="tabpopup">';
			content+='<li class="active"><a href="#getimage"><i class="icon-images"></i>Select Images</a></li>';
			content+='<li><a href="#config"><i class="icon-cog-2"></i>Config</a></li>';
		content+='</ul>';
		content+='<div class="tab-content">';
			// Select Image
			content+='<div class="tab-pane active" id="getimage">';
				content+='<div class="row-fluid">';
					content+='<div class="span5">';
						content+='<strong>Path:</strong><input type="text" class="st-path" value="images/temp" /><button class="btn btn-primary st-go" type="button" >Go</button>';
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
							content+='<li class="st-selectimage" data-desc="'+((data.content[i].attr.desc!=null)?data.content[i].attr.desc:"")+'" data-title="'+((data.content[i].attr.title!=null)?data.content[i].attr.title:"")+'">';
								content+='<i class="icon-cancel-circle "></i>';
								content+='<img data-site="'+data.content[i].content+'" src="'+data.content[i].attr.linkadmin+'" />';
							content+='</li>';
						}
						content+='</ul></div>';
						content+='<div class="st-desc-item">';
							content+='<label>Title:</label>';
							content+='<div class="row-fluid"><input type="text" class="st-desc-title span12" /></div>'
							content+='<label>Description:</label>';
							content+='<div class="row-fluid">';
								content+='<textarea class="span12 st-desc-content" rows="4"></textarea>';
							content+='</div>';
						content+='</div>';
					content+='</div>';
				content+="</div>";
			content+='</div>';
			//End Select Image
			content+='<div class="tab-pane" id="config">';
				content+='<div class="row-fluid">';
					content+='<div class="span6">';
						content+='<label>Interval:</label>';
						content+='<div class="row-fluid"><input type="text" class="st-interval span6" value="'+data.attr.interval+'" /></div>';
						content+='<label>Auto:</label>';
						content+='<div class="row-fluid"><select class="st-auto span6">';
							content+='<option value="true">True</option>';
							content+='<option value="false">False</option>';
						content+='</select></div>';
					content+='</div>';
					content+='<div class="span6">';
						content+='<label>Type Slider:</label>';
						content+="<div class='st-typeslider st-radio'>"; 
							content+='<label class="radio "><input type="radio" name="st-pancontrol" value="2" checked="checked">Camera</label>';
							content+='<label class="radio "><input type="radio" name="st-pancontrol" value="3">Flex</label>';
							content+='<label class="radio "><input type="radio" name="st-pancontrol" value="4">Nivo</label>';
							content+='<label class="radio "><input type="radio" name="st-pancontrol" value="5">Elastic</label>';
							content+='<label class="radio "><input type="radio" name="st-pancontrol" value="6">Accordion</label>';
							content+='<label class="radio "><input type="radio" name="st-pancontrol" value="7">carousel Box</label>';
						content+="</div>";
					content+='</div>';
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
	jQuery('#st-navigation .st-auto [value="'+data.attr.auto+'"]').attr("selected","selected");
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
		console.log(encodeURIComponent('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed cumque distinctio labore minima ipsum fugit aspernatur dolore deserunt iure sunt officiis iusto <span class="color-text">itaque rerum reprehenderit laborum</span> dignissimos iste assumenda dolorem?'))
		jQuery('.st-navigation #sortImage .st-selectimage').removeClass('selected');
		jQuery(this).addClass('selected');
		jQuery('.st-navigation .st-desc-item .st-desc-title').val(jQuery(this).attr('data-title'));
		jQuery('.st-navigation .st-desc-item .st-desc-content').val((jQuery(this).attr('data-desc')!=null)?decodeURIComponent(jQuery(this).attr('data-desc')):"");
	});
	jQuery('.st-navigation .st-desc-item .st-desc-title').keyup(function() {
		jQuery('.st-navigation #sortImage .st-selectimage.selected').attr("data-title",jQuery(this).val());
	});
	jQuery('.st-navigation .st-desc-item .st-desc-content').keyup(function() {
		jQuery('.st-navigation #sortImage .st-selectimage.selected').attr("data-desc",encodeURIComponent(jQuery(this).val()));
	});
}

function saveSlider(){
	if(testNumber(jQuery('#st-navigation .st-interval').val())){
		data = {"type":"slider_desi","content":[],"attr":{"interval":"","auto":""}};
		data.attr.interval=jQuery('#st-navigation .st-interval').val();
		data.attr.auto=jQuery('#st-navigation .st-auto').val();
		data.attr.typeslider= jQuery('#st-navigation .st-typeslider input[type="radio"]:checked').val();
		var link = "";
		jQuery('#st-navigation #sortImage li').each(function(index){
			var arr = {"type":"item_gallery_desi","content":jQuery(this).find('img').attr("data-site"),"attr":{"linkadmin":jQuery(this).find('img').attr("src"),"title":jQuery.trim(jQuery(this).attr("data-title")),"desc":jQuery.trim(jQuery(this).attr("data-desc"))}};
			data.content.push(arr);
		});
		console.log(data);
		var json = encodeURIComponent(JSON.stringify(data));
		jQuery('#st-page li.st-focus').attr("data",json);
		jQuery.stbox.close();
	}else{
		alert('Numeric characters only.');
		return false;
	}
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
				content+='<ul class="nav nav-tabs" id="tabpopup">';
					content+='<li class="active"><a href="#find"><i class="icon-images"></i>Find</a></li>';
					content+='<li><a href="#config"><i class="icon-cog-2"></i>Config</a></li>';
				content+='</ul>';
				content+='<div class="tab-content">';
					//Begin tab Find
					content+='<div class="tab-pane active st-loadgmap" id="find">';
					content+='</div>';
					// End Tab Find

					//Begin tab Config
					content+='<div class="tab-pane" id="config">';
						content+='<div class="row-fluid">';
							content+='<div class="span6">';
								content+='<label>Formatted Address:</label><input name="formatted_address" class="st-fomartted" type="text" value="'+data.attr.location+'">';
								content+='<label>Zoom:</label><input name="zoom" class="st-zoom" type="text" value="'+data.attr.zoom+'" placeholder="maxZoom = 40">';
								content+='<label>MapTypeId:</label>';
								content+='<select class="st-map_type"><option value="ROADMAP">roadmap</option><option value="HYBRID">hybrid</option><option value="SATELLITE">satellite</option><option value="TERRAIN">terrain</option></select>';
								content+='<label>Height:</label><input name="height_map" class="st-heightmap" type="text" value="'+((data.attr.height==null)?"400":data.attr.height)+'">';
								content+='<label>Class:</label><input name="class_map" class="st-classmap" type="text" value="'+((data.attr.class==null)?"":data.attr.class)+'">';
							
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
					content+='</div>';
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
	jQuery('#st-navigation .st-zoomcontrol [value="'+data.attr.zoomcontrol+'"]').attr('checked','checked');
	jQuery('#st-navigation .st-maptypecontrol [value="'+data.attr.maptypecontrol+'"]').attr('checked','checked');
	jQuery('#st-navigation .st-streetcontrol [value="'+data.attr.streetcontrol+'"]').attr('checked','checked');
	jQuery('#st-navigation .st-scrollwheel [value="'+((data.attr.scrollwheel==null)?"false":data.attr.scrollwheel)+'"]').attr('checked','checked');
	jQuery('#tabpopup a').click(function (e) {
		e.preventDefault();
		jQuery(this).tab('show');
	});
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
	data.attr.latitude=jQuery('#st-navigation .st-latgmap').val();
	data.attr.longitude=jQuery('#st-navigation .st-lnggmap').val();
	data.attr.location=jQuery('#st-navigation .st-fomartted').val();
	data.attr.zoom=zoom;
	data.attr.maptype=jQuery('#st-navigation .st-map_type').val();
	data.attr.pancontrol = jQuery('#st-navigation [name="st-pancontrol"]:checked').val();
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
		url :"index.php?option=com_stpagebuilder&task=page.getImageFolder&tmpl=component",
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
	str = str.replace(/>/g, "&gt;");
	str = str.replace(/</g, "&lt;");
	str = str.replace(/"/g, "&quot;");
	str = str.replace(/'/g, "&#039;");
	return str;
}