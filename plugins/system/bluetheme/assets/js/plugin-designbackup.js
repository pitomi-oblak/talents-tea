/*! Plugin Design - v1.0
* http://shinetheme.com
* author 	:Pham Tien Duc
* email 	:ducphamtien@gmail.com
* Copyright 2013  */

var arrayType;
var data_ele;
jQuery(document).ready(function(){
	addEventPopup();
	arrayType=jQuery.parseJSON(jQuery('#st-arrName').attr("data"));
	if(jQuery('#st-page>li').length>0){
		jQuery('#st-page>li').each(function(){
			if(jQuery(this).hasClass("st-column")){
				jQuery(this).removeClass("st-column").addClass("st-column-container");
				AddColumn(this);
				data = jQuery.parseJSON(jQuery(this).attr("data"));
				ColumnDesign(this,data.content);
			}else if(jQuery(this).hasClass("st-tabs")){
				jQuery(this).removeClass("st-tabs").addClass("st-tabs-container");
				AddTab(this);
				data = jQuery.parseJSON(jQuery(this).attr("data"));
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
});

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
        		jQuery(ui.item).find('.st-edit').remove();
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
				case "youtube":
					this.width=350;
					this.height=350;
					break;
				case "vimeo":
					this.width=350;
					this.height=350;
					break;
				case "moduleid":
					this.width=300;
					this.height=220;
					break;
				case "alert":
					this.width=400;
					this.height=400;
					break;
				case "article_box":
					this.width=350;
					this.height=330;
					break;
				case "recent_article":
					this.width=500;
					this.height=450;
					jQuery(this.content).find('.st-nav-option').css({height:"380"});
					break;
				case "tabs":
					this.width=280;
					this.height=280;
					break;
				case "divider":
					this.width=300;
					this.height=280;
					break;
				case "flickr":
					this.width=350;
					this.height=370;
					break;
				case "fb_likebox":
					this.width=450;
					this.height=400;
					jQuery(this.content).find('.st-nav-option').css({height:"330"});
					break;
			}
		},
		afterLoad:function(){
			var typepopup =jQuery(this.element).attr("data-type");
			switch(typepopup){
				case "moduleid":
					jQuery('#st-element-modules').appendTo(".st-navigation .st-listmodule");
					checkList('id','#jform_modules');
					break;
				case "article_box":
					//load combobox article
					if(jQuery('.st-navigation .st-extension').val()=='com_k2'){
						jQuery('#st-element #st-element-k2contents').appendTo(".st-navigation .st-article");
						checkList('article_id','#jform_k2contents');
					}else{
						jQuery('#st-element #st-element-contents').appendTo(".st-navigation .st-article");
						checkList('article_id','#jform_contents');
					}
					break;
				case "recent_article":
					//load combobox Category
					if(jQuery('.st-navigation .st-extension').val()=='com_k2'){
						jQuery('#st-element #st-element-k2category').appendTo(".st-navigation .st-category");
						checkList('category_id','#jformk2category');
					}else{
						jQuery('#st-element #st-element-category').appendTo(".st-navigation .st-category");
						checkList('category_id','#jform_category');
					}
					break;
			}
			jQuery(this.content).find('.btn-cancel').click(function(){
				jQuery.stbox.close();
			});
			jQuery(this.content).find('.icon-cancel-circle').click(function(){
				jQuery.stbox.close();
			});
		},
		beforeClose:function(){
			var typepopup =jQuery(this.element).attr("data-type");
			switch(typepopup){
				case "moduleid":
					jQuery(this.content).find('#st-element-modules').appendTo("#st-element");
					break;
				case "article_box":
					jQuery(this.content).find('#st-element-k2contents').appendTo("#st-element");
					jQuery(this.content).find('#st-element-contents').appendTo("#st-element");
					break;
				case "recent_article":
					jQuery(this.content).find('#st-element-k2category').appendTo("#st-element");
					jQuery(this.content).find('#st-element-category').appendTo("#st-element");
					break;
			}
		}
	});
}

// AddEvent 
function AddEvent(){
	// add event data
	jQuery('#st-page li .st-edit').bind('click',function(){
		jQuery('#st-page li').removeClass("st-focus");
		select = jQuery(this).closest('li');
		select.addClass("st-focus");
		data_ele = jQuery.parseJSON(select.attr("data"));
		switch(data_ele.type){
			case "gallery":
				getGalleryOption(data_ele);
				break;
			case "vimeo":
				getVimeoOption(data_ele);
				break;
			case "youtube":
				getYoutubeOption(data_ele);
				break;
			case "alert":
				getMessageBoxOption(data_ele);
				break;
			case "recent_article":
				getArticleRecentOption(data_ele);
				break;
			case "article_box":
				getArticleBoxOption(data_ele);
				break;
			case "moduleid":
				getModuleOption(data_ele);
				break;
			case "divider":
				getDividerOption(data_ele);
				break;
			case "tabs":
				getTabsOption(data_ele);
				break;
			case "flickr":
			    getFlickrOption(data_ele);	
			    break;
			case "fb_likebox":
			    getFb_likbeboxOption(data_ele);
			    break;
			case "slider":
			    getSliderOption(data_ele);
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

// AddTab
function AddTab(item){
	data = jQuery.parseJSON(jQuery(item).attr("data"));
	var id = makeid();
	content ='<div class="st-tabitems">';
		content+='<ul class="nav nav-tabs" id="myTab">';
		for(i=0;i<data.content.length;i++){
			content+='<li '+((i==0)?'class="active"':'')+'><a href="#'+id+'-'+i+'">'+data.content[i].attr.title+'</a></li>';
		}
		content+='</ul>';
		content+='<div class="tab-content">';
		for(i=0;i<data.content.length;i++){
			content+='<div class="tab-pane '+((i==0)?'active':'')+'" id="'+id+'-'+i+'"><ul class="sortable sortable-tabitem"></ul></div>';
		}
		content+='</div>';
	content+='</div>';
	jQuery(item).append(content);
	jQuery('#myTab a').click(function (e) {
		e.preventDefault();
		jQuery(this).tab('show');
	});
	addsort();
}	
//End Addtab

// AddColumn
function AddColumn(item){
	data = jQuery.parseJSON(jQuery(item).attr("data"));
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
			this.width=300;
			this.height=300;
			var sele = jQuery(this.element).closest(".st-column-container");
			var data = jQuery.parseJSON(sele.attr("data"));
			var index = jQuery(this.element).attr("index");
			content ="<div class='st-nav-title'><i class='icon-columns'></i> Column<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
			content+="<div class='st-nav-option'>";
				content+="<label>Column</label>";
				content+="<div class='row-fluid'><select class='st-column span12'>";
				for(i=1;i<=12;i++){
					content+='<option value="'+i+'">span'+i+'</option>';
				}
				content+="</select></div>";
				content+="<button class='btn btn-primary'>Save</button>";
				content+="<button class='btn btn-cancel'>Cancel</button>";
			content+="</div>";
			jQuery('.st-navigation').html(content);
			jQuery('.st-navigation .st-column option[value="'+data.content[index].attr.col+'"]').attr("selected","selected");
			jQuery('.st-navigation .btn-cancel').click(function(){
				jQuery.stbox.close();
			});
			jQuery('.st-navigation .icon-cancel-circle').click(function(){
				jQuery.stbox.close();
			});
			jQuery('.st-navigation .btn-primary').click(function(){
				var s = jQuery('.st-navigation .st-column').val();
				data.content[index].attr.col = s;
				sele.attr("data",JSON.stringify(data));
				sele.find('div[index="'+index+'"]').attr("class","").addClass("span"+s);
				jQuery.stbox.close();
			});
		}
	});
}

function changeColumn(){
	jQuery('.column-button-group span.btn').bind('click',function(){
		if(!jQuery(this).hasClass("btn-primary")){
			var sl = jQuery(this).closest('div');
			sl.find('span.btn').removeClass("btn-primary");
			jQuery(this).addClass("btn-primary");
			var col = jQuery(this).text();
			var data = jQuery.parseJSON(jQuery(jQuery(this).closest("li")).attr("data"));
			
			var loop = true;
			if(col==5) classspan=2;
			else classspan=(12/col);
			sl.prev().find('[class^="span"]').attr("class","span"+classspan);
			var len = data.content.length;
			if(col>data.content.length){
				// Add column
				for(i=0;i<(col-len);i++){
					var index = sl.prev().find('>[class^="span"]').length;
					sl.prev().append("<div class='span"+classspan+"' index='"+index+"'><ul class='sortable sortable-column'></ul></div>");
					arr = {"type":"column_item","content":"","attr":{"col":classspan}};
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
			if(col==5) sl.prev().find('[index^="4"]').attr("class","span4");
			sl.parent().attr("data",JSON.stringify(data));
			addsort();
		}
	});
}

function ColumnDesign(sele,data){
	jQuery(sele).find('.sortable-column').each(function(index){
		for(i=0;i<data[index].content.length;i++){
			var html="";
			if(arrayType[data[index].content[i].type].type=="tabs"){
				arrayType[data[index].content[i].type].class="st-tabs-container";
			}
			html+="<li data-type='"+arrayType[data[index].content[i].type].type+"' class='ui-state-highlight btn ui-draggable "+arrayType[data[index].content[i].type].class+"' style='display:block;' data='"+JSON.stringify(data[index].content[i])+"'>";
			html+="<div class='st-header-title'>";
			html+="<span class='st-name'>"+arrayType[data[index].content[i].type].name+"</span> ";
			html+="<span href='#' class='st-close' title='Close'><i class='icon-cancel-circle'></i></span> ";
			html+="<span href='#st-navigation' data-type='"+arrayType[data[index].content[i].type].type+"' title='Edit' class='st-edit stmodal'><i class='icon-cog-2'></i></span>";
			if(arrayType[data[index].content[i].type].type=="tabs"){
			html+='<span class="st-hide"><i class="icon-new-window"></i></span>';
			}
			html+="</div>";
			if(data[index].content[i].type=='tabs'){
				var id = makeid();
				html+='<div class="st-tabitems">';
					html+='<ul class="nav nav-tabs" id="myTab">';
					for(j=0;j<data[index].content[i].content.length;j++){
						html+='<li '+((j==0)?'class="active"':'')+'><a href="#'+id+'-'+j+'">'+data[index].content[i].content[j].attr.title+'</a></li>';
					}
					html+='</ul>';
					html+='<div class="tab-content">';
					for(j=0;j<data[index].content[i].content.length;j++){
						html+='<div class="tab-pane '+((j==0)?'active':'')+'" id="'+id+'-'+j+'"><ul class="sortable sortable-tabitem">';
						for(var k=0;k<data[index].content[i].content[j].content.length;k++){
							html+="<li data-type='"+data[index].content[i].content[j].content[k].type+"' class='ui-state-highlight btn ui-draggable "+arrayType[data[index].content[i].content[j].content[k].type].class+"' style='display:block;' data='"+JSON.stringify(data[index].content[i].content[j].content[k])+"'>";
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
			jQuery('#myTab a').click(function (e) {
				e.preventDefault();
				jQuery(this).tab('show');
			});
		}
	});
}

function TabsDesign(sele,data){
	jQuery(sele).find('.sortable-tabitem').each(function(index){
		for(i=0;i<data[index].content.length;i++){
			var html="";
			html+="<li data-type='"+arrayType[data[index].content[i].type].type+"' class='ui-state-highlight btn ui-draggable "+arrayType[data[index].content[i].type].class+"' style='display:block;' data='"+JSON.stringify(data[index].content[i])+"'>";
				html+="<div class='st-header-title'>";
					html+="<span class='st-name'>"+arrayType[data[index].content[i].type].name+"</span> ";
					html+="<span href='#' class='st-close' title='Close'><i class='icon-cancel-circle'></i></span> ";
					html+="<span href='#st-navigation' data-type='"+arrayType[data[index].content[i].type].type+"' title='Edit' class='st-edit stmodal'><i class='icon-cog-2'></i></span>";
				html+="</div>";
			html+="</li>";
			jQuery(this).append(html);
		}
	});
}

//////////////////////////////// Button ////////////////////////////////////
function appendDataColumn(sele){
	if(!sele.hasClass("st-column-container")){
		arr = [];
		sele.each(function(index){
			arr.push(jQuery.parseJSON(jQuery(this).attr("data")));
		});
		return arr;
	}else{
		data = jQuery.parseJSON(jQuery(this).attr("data"));
		jQuery(this).find('.sortable-column').each(function(){
			var a = appendDataColumn(jQuery(this).find('>li'));
			data.content[index].content.push(a);
		});
		return data;
	}
}

function buttonsave(){
	jQuery("#toolbar-apply button").click(function(){
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
				data = jQuery.parseJSON(jQuery(this).attr("data"));
				jQuery(this).find('.sortable-column').each(function(index){
					var a = [];
					jQuery(this).find('>li').each(function(){
						if(jQuery(this).attr("data-type")=='tabs'){
							jQuery(this).attr("data",saveTabOption(jQuery(this),jQuery.parseJSON(jQuery(this).attr("data"))));
						}
						console.log(jQuery(this).attr("data"));
						a.push(jQuery.parseJSON(jQuery(this).attr("data")));
					});
					data.content[index].content = a;
				});
				jQuery(this).attr("data",JSON.stringify(data));
			}else if(jQuery(this).hasClass("st-tabs-container")){
				data = jQuery.parseJSON(jQuery(this).attr("data"));
				jQuery(this).attr("data",saveTabOption(jQuery(this),data));
			}
			arr.push(jQuery(this).attr("data"));
		});
		json = JSON.stringify(arr);
		jQuery.ajax({
			type:"POST",
			url:"index.php?option=com_stpagebuilder&task=page.stSave&tmpl=component",
			data:{data:json,id:jQuery('#stid').val(),name:name},
			success:function(response){
				//jQuery('#st-debug').html(response);
				jQuery('#system-message-container').html('<div><button type="button" class="close" data-dismiss="alert">×</button><div class="alert alert-success"><h4 class="alert-heading">Message</h4><p>'+response+'</p></div>');
			}
		});
	});
}

function saveTabOption(sele,data){
	sele.find('.sortable-tabitem').each(function(index){
		a = [];
		jQuery(this).find('>li').each(function(){
			a.push(jQuery.parseJSON(jQuery(this).attr("data")));
		});
		data.content[index].content = a;
	});
	return JSON.stringify(data);
}

////////////////////////////////  Item //////////////////////////////////////

// Get Option Tabs
function getTabsOption(data){
	content ="<div class='st-nav-title'><i class='icon-box'></i> Tabs<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
	content+="<div class='st-nav-option'>";
		content+="<label>Position:</label>";
		content+="<div class='row-fluid'><select class='st-tabposition'>";
			content+='<option value="top">Top</option>';
			content+='<option value="bottom">Bottom</option>';
			content+='<option value="left">Left</option>';
			content+='<option value="right">Right</option>';
		content+="</select></div>";
		content+="<div class='st-button-group'>";
		content+="<button class='btn btn-primary'>Save</button>";
		content+="<button class='btn btn-cancel'>Cancel</button>";
		content+="</div>";
	content+="</div>";
	jQuery('.st-navigation').html(content);
	jQuery('.st-navigation .st-tabposition [value="'+data.attr.position+'"]').attr("selected","selected");
	jQuery('.st-nav-option button.btn-primary').click(function(){
		saveTabs(data);
	});
}

function saveTabs(data){
	//data = {"type":"tabs","content":[],"attr":{"position":jQuery('.st-nav-option .st-tabposition').val()}};
	console.log(data);
	data.attr.position=jQuery('.st-nav-option .st-tabposition').val();
	var json = JSON.stringify(data);
	jQuery('#st-page li.st-focus').attr("data",json);
	jQuery.stbox.close();
}

//End Tab Option


// Get Option Module
function getModuleOption(data){
	content ="<div class='st-nav-title'><i class='icon-qrcode-2'></i> Module<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
	content+="<div class='st-nav-option'>";
		content+="<div class='row-fluid'>";
			content+="<div class='span12'>";
				content+="<label>Choose:</label>";
				content+="<div class='st-listmodule'></div>";
			content+="</div>";
		content+="</div>";
		content+="<div class='st-button-group'>";
		content+="<button class='btn btn-primary'>Save</button>";
		content+="<button class='btn btn-cancel'>Cancel</button>";
		content+="</div>";
	content+="</div>";
	jQuery('.st-navigation').html(content);
	jQuery('.st-nav-option button.btn-primary').click(function(){
		saveModule();
	});
}

function saveModule(){
	data = {"type":"moduleid","content":"","attr":{"id":jQuery('.st-nav-option #jform_modules').val()}};
	var json = JSON.stringify(data);
	jQuery('#st-page li.st-focus').attr("data",json);
	jQuery.stbox.close();
}

// End Option Module

// get Option Gallery
function getGalleryOption(data){
	content ="<div class='st-nav-title'>Gallery</div>";
	content+="<div class='st-nav-option'>";
		content+="<div class='row-fluid'>";
			content+="<div class='span12'>";
				content+="<label>Link Images</label>";
				content+="<textarea rows='6' class='st-linkimage span12'>";
				for(i=0;i<data.content.length;i++){
					content+=data.content[i].content+"\n";
				}
				content+="</textarea>";
			content+="</div>";
		content+="</div>";
		content+="<div class='row-fluid'>";
			content+="<div class='span12'>";
				content+="<label>Title Images</label>";
				content+="<textarea rows='6' class='st-title span12'>";
				for(i=0;i<data.content.length;i++){
					content+=data.content[i].attr.title+"\n";
				}
				content+="</textarea>";
			content+="</div>";
		content+="</div>";
		content+="<div class='st-button-group'>";
		content+="<button class='btn btn-primary'>Save</button>";
		content+="<button class='btn btn-cancel'>Cancel</button>";
		content+="</div>";
	content+="</div>";
	jQuery('.st-navigation').html(content);

	jQuery('.st-nav-option button.btn-primary').click(function(){
		saveGallery();
	});
}

function saveGallery(){
	var links = jQuery('.st-navigation .st-nav-option .st-linkimage').val().split("\n");
	for(i=0;i<links.length;i++){
		if(links[i]==""){
			links.splice(i,1);
		}
	}
	if(links[(links.length)-1]=="") links.pop();
	var titles = jQuery('.st-navigation .st-nav-option .st-title').val().split("\n");
	for(i=0;i<titles.length;i++){
		if(titles[i]=="") titles.splice(i,1);
	}
	if(titles[(titles.length)-1]=="") titles.pop();
	data = {"type":"gallery","content":[],"attr":{}};
	for(i=0;i<links.length;i++){
		arr = {"type":"item_gallery","content":"","attr":{}};
		if(i<titles.length){
			arr.attr.title=titles[i];
		}else{
			arr.attr.title="";
		}
		arr.content=links[i];
		data.content.push(arr);
	}
	var json = JSON.stringify(data);
	jQuery('#st-page li.st-focus').attr("data",json);
	jQuery.stbox.close();
}
//  End Gallery Option

// get Option Vimeo
function getVimeoOption(data){
	content ="<div class='st-nav-title'><i class='icon-vimeo'></i> Vimeo<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
	content+="<div class='st-nav-option'>";
		content+="<label>Link Vimeo</label>";
		content+="<div class='row-fluid'><input type='text' class='st-linkvideo span12' value='"+data.content+"' placeholder='Link Vimeo'></div>";
		content+="<label>Width</label>";
		content+="<div class='row-fluid'><input type='text' class='st-widthvideo span12' value='"+data.attr.width+"' placeholder='Width'></div>";
		content+="<label>Width</label>";
		content+="<div class='row-fluid'><input type='text' class='st-heightvideo span12' value='"+data.attr.height+"' placeholder='Height'></div>";
		content+="<div class='st-button-group'>";
		content+="<button class='btn btn-primary'>Save</button>";
		content+="<button class='btn btn-cancel'>Cancel</button>";
		content+="</div>";
	content+="</div>";
	jQuery('.st-navigation').html(content);
	jQuery('.st-nav-option button.btn-primary').click(function(){
		saveVimeo();
	});
}

function saveVimeo(){
	data = {"type":"vimeo","content":"","attr":{}};
	data.content=jQuery('.st-navigation .st-nav-option .st-linkvideo').val();
	data.attr.width=jQuery('.st-navigation .st-nav-option .st-widthvideo').val();
	data.attr.height=jQuery('.st-navigation .st-nav-option .st-heightvideo').val();
	var json = JSON.stringify(data);
	jQuery('#st-page li.st-focus').attr("data",json);
	jQuery.stbox.close();
}
//  End Vimeo Option

// get Option Youtube
function getYoutubeOption(data){
	content ="<div class='st-nav-title'><i class='icon-youtube'></i> Youtube<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
	content+="<div class='st-nav-option'>";
			content+="<label>Link Youtube</label>";
			content+="<div class='row-fluid'><input type='text' class='st-linkvideo span12' value='"+data.content+"' placeholder='Link Youtube'></div>";
			content+="<label>Width</label>";
			content+="<div class='row-fluid'><input type='text' class='st-widthvideo span12' value='"+data.attr.width+"' placeholder='Width'><div>";
			content+="<label>Width</label>";
			content+="<div class='row-fluid'><input type='text' class='st-heightvideo span12' value='"+data.attr.height+"' placeholder='Height'></div>";
		content+="<div class='st-button-group'>";
		content+="<button class='btn btn-primary'>Save</button>";
		content+="<button class='btn btn-cancel'>Cancel</button>";
		content+="</div>";
	content+="</div>";
	jQuery('.st-navigation').html(content);
	jQuery('.st-nav-option button.btn-primary').click(function(){
		saveYoutube();
	});
}

function saveYoutube(){
	data = {"type":"youtube","content":"","attr":{}};
	data.content=jQuery('.st-navigation .st-nav-option .st-linkvideo').val();
	data.attr.width=jQuery('.st-navigation .st-nav-option .st-widthvideo').val();
	data.attr.height=jQuery('.st-navigation .st-nav-option .st-heightvideo').val();
	var json = JSON.stringify(data);
	jQuery('#st-page li.st-focus').attr("data",json);
	jQuery.stbox.close();
}
//  End Youtube Option

// get Option Message Box
function getMessageBoxOption(data){
	content ="<div class='st-nav-title'><i class='icon-exclamation-sign'></i> Message Box<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
	content+="<div class='st-nav-option'>";
		content+="<div class='row-fluid'>";
			content+="<label>Type Alert</label>";
			content+="<div class='row-fluid'><select class='st-type span12'>";
			content+='<option value="warning">Warning</option>';
			content+='<option value="info">Info</option>';
			content+='<option value="error">Error</option>';
			content+='<option value="success">Success</option>';
			content+="</select><div>";
			content+="<label> Title Alert </label>";
			content+="<div class='row-fluid'><textarea rows='1' class='st-title_alert span12'>";
				content+=data.attr.title;
			content+="</textarea></div>";
			content+="<label>Content</label>";
			content+="<div class='row-fluid'><textarea rows='6' class='st-content_alert span12'>";
			     content+=data.content;
			content+="</textarea></div>";
		content+="</div>";
		content+="<div class='st-button-group'>";
		content+="<button class='btn btn-primary'>Save</button>";
		content+="<button class='btn btn-cancel'>Cancel</button>";
		content+="</div>";
	content+="</div>";
	jQuery('.st-navigation').html(content);
	jQuery('.st-navigation .st-type [value="'+data.attr.type+'"]').attr("selected","selected");
	jQuery('.st-nav-option button.btn-primary').click(function(){
		saveMessageBox();
	});
}

function saveMessageBox(){
	var type_alert = jQuery('.st-navigation .st-nav-option .st-type').val();
	var title_alert = jQuery('.st-navigation .st-nav-option .st-title_alert').val();
	var content_alert = jQuery('.st-navigation .st-nav-option .st-content_alert').val();
	data = {"type":"alert","content":content_alert,"attr":{"type":type_alert,"title":title_alert}};
	var json = JSON.stringify(data);
	jQuery('#st-page li.st-focus').attr("data",json);
	jQuery.stbox.close();
}
//  End Message Box Option

////////////////////////////////  Article Recent //////////////////////////////////////

// get Option Article Recent
function getArticleRecentOption(data){
	content ="<div class='st-nav-title'><i class='icon-newspaper'></i> Article Recent<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
	content+="<div class='st-nav-option'>";
		content+="<label>Extension</label>";
        content+="<div class='row-fluid'><select class='st-extension span12'>"; 
			content+='<option value="com_content">content</option>';
			content+='<option value="com_k2">k2</option>';
		content+="</select></div>";
		content+="<label>Category</label>";
		content+="<div class='row-fluid st-category'></div>";
		content+="<label>Style</label>";
        content+="<div class='row-fluid'><select class='st-style span12'>"; 
		content+='<option value="style-1">style-1</option>';
		content+='<option value="style-2">style-2</option>';
		content+="</select></div>";
		content+="<div class='st-isVisble'><label>Title Article recent</label>";
		content+="<div class='row-fluid'><input type='text' rows='1' class='st-title_article span12' value="+data.attr.title+" /></div>";
        content+="<div class='row-fluid'><textarea rows='6' class='st-content_article span12'>";
			content+=data.content;
        content+="</textarea></div></div>";
		content+="<label>Visible</label>";
        content+="<div class='row-fluid'><select class='st-visible span12'>"; 
			content+='<option value="1">1</option>';
			content+='<option value="2">2</option>';
			content+='<option value="3">3</option>';
			content+='<option value="4">4</option>';
			content+='<option value="6">6</option>';
		content+="</select></div>";
		content+="<label>Scroll</label>";
        content+="<div class='row-fluid'><select class='st-scroll span12'>"; 
			content+='<option value="1">1</option>';
			content+='<option value="2">2</option>';
			content+='<option value="3">3</option>';
			content+='<option value="4">4</option>';
		content+="</select></div>";
		content+="<label>Auto</label>";
        content+="<div class='row-fluid'><select class='st-auto span12'>"; 
			content+='<option value="2">Yes</option>';
			content+='<option value="0">No</option>';
		content+="</select></div>";
		content+="<label>Animation</label>";
        content+="<div class='row-fluid'><input type='number' class='st-animation span12' value="+data.attr.animation+" /></div>"; 
		content+="<label>Limit</label>";
        content+="<div class='row-fluid'><input type='number' class='st-limit span12' value="+data.attr.limit+" /></div>"; 
		content+="<label>type</label>";
        content+="<div class='row-fluid'><select class='st-type span12'>"; 
			content+='<option value="inside">inside</option>';
			content+='<option value="outside">outside</option>';
		content+="</select></div>";
		content+="<div class='st-button-group'>";
		content+="<button class='btn btn-primary'>Save</button>";
		content+="<button class='btn btn-cancel'>Cancel</button>";
		content+="</div>";
	content+="</div>";
	jQuery('.st-navigation').html(content);

	jQuery('.st-navigation .st-extension option[value="'+data.attr.extension+'"]').attr("selected","selected");
	jQuery('.st-navigation .st-style option[value="'+data.attr.style+'"]').attr("selected","selected");
	jQuery('.st-navigation .st-type option[value="'+data.attr.type+'"]').attr("selected","selected");
	if(jQuery('.st-navigation .st-style').val()=='style-1'){
		jQuery('.st-navigation .st-isVisble').show();
	}else{
		jQuery('.st-navigation .st-isVisble').hide();
	}
	jQuery('.st-navigation .st-style').change(function(){
		if(jQuery('.st-navigation .st-style').val()=='style-1'){
			jQuery('.st-navigation .st-isVisble').show();
		}else{
			jQuery('.st-navigation .st-isVisble').hide();
		}
	});
	jQuery('.st-navigation .st-extension').change(function(){
		if(jQuery('.st-navigation .st-extension').val()=='com_k2'){
			jQuery('.st-navigation #st-element-category').appendTo("#st-element");
			jQuery('#st-element #st-element-k2category').appendTo(".st-navigation .st-category");
		}else{
			jQuery('.st-navigation #st-element-k2category').appendTo("#st-element");
			jQuery('#st-element #st-element-category').appendTo(".st-navigation .st-category");
		}
	});

	jQuery('.st-nav-option button.btn-primary').click(function(){
		saveArticleRecent();
	});
}

function saveArticleRecent(){
	var title_article = jQuery('.st-navigation .st-nav-option .st-title_article').val();
	var content = jQuery('.st-navigation .st-nav-option .st-content_article').val();
	var extension = jQuery('.st-navigation .st-nav-option .st-extension').val();
	var category_id = jQuery('.st-navigation .st-category select').val();
	var visible = jQuery('.st-navigation .st-nav-option .st-visible').val();
	var scroll = jQuery('.st-navigation .st-nav-option .st-scroll').val();
	var auto = jQuery('.st-navigation .st-nav-option .st-auto').val();
	var animation = jQuery('.st-navigation .st-nav-option .st-animation').val();
	var limit = jQuery('.st-navigation .st-nav-option .st-limit').val();
	var type = jQuery('.st-navigation .st-nav-option .st-type').val();
	var style = jQuery('.st-navigation .st-nav-option .st-style').val();

	data = {"type":"recent_article","content":content,"attr":{"title":title_article,"extension":extension,"category_id":category_id,"auto":auto,"type":type,
             "style":style,"limit":limit,"animation":animation,"scroll":scroll,"visible":visible}};
	var json = JSON.stringify(data);
	jQuery('#st-page li.st-focus').attr("data",json);
	jQuery.stbox.close();
}	

//get option Article box
function getArticleBoxOption(data){
	content ="<div class='st-nav-title'><i class='icon-frame'></i> Article Box<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
	content+="<div class='st-nav-option'>";
		content+="<label>Extension</label>";
		content+=
			"<div class='row-fluid'><select class='st-extension span12'>" + 
			  "<option value='com_k2'>com_k2</option><option value='com_content'>com_content</option>" + 
			"</select></div>";
		content+="<label>Articles</label>";
		content+="<div class='row-fluid st-article'></div>";
		content+="<label>Type</label>";
		content+=
			"<div class='row-fluid'><select class='st-type span12'>" + 
			  "<option value='outside'>Outside</option>" + 
			  "<option value='inside' selected='selected'>Inside</option>" + 
			"</select></div>";
		content+="<div class='st-button-group'>";
		content+="<button class='btn btn-primary'>Save</button>";
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

	jQuery('.st-nav-option button.btn-primary').click(function(){
		saveArticleBox();
	});
}

function saveArticleBox(){
	var extension = jQuery('.st-navigation .st-nav-option .st-extension').val();
	var article = jQuery('.st-navigation .st-nav-option .st-article select').val();
	var type = jQuery('.st-navigation .st-nav-option .st-type').val();
	data = {"type":"article_box","content":"","attr":{"extension":extension,"article_id":article,"type":type}};
	var json = JSON.stringify(data);
	jQuery('#st-page li.st-focus').attr("data",json);
	jQuery.stbox.close();
}
//End Article box

//Get Option Divider
function getDividerOption(data){
	content ="<div class='st-nav-title'><i class='icon-minus-2'></i> Divider<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
	content+="<div class='st-nav-option'>";
		content+="<label>Style</label>";
		content+="<div class='row-fluid'><select class='st-style span12'>"; 
			content+='<option value="none">None</option>';
			content+='<option value="border">Border</option>';
		content+="</select></div>";
		content+="<label>Margin</label>";
		content+="<div class='row-fluid'><input type='text' class='st-margin span12' value='"+data.attr.margin+"' placeholder='Margin'><div>";
		content+="<div class='st-button-group'>";
		content+="<button class='btn btn-primary'>Save</button>";
		content+="<button class='btn btn-cancel'>Cancel</button>";
		content+="</div>";
	content+="</div>";
	jQuery('.st-navigation').html(content);
	jQuery('.st-navigation .st-style option[value="'+data.attr.style+'"]').attr("selected","selected");
	jQuery('.st-navigation .st-margin').val(data.attr.margin);
	jQuery('.st-nav-option button.btn-primary').click(function(){
		saveDivider();
	});
}

function saveDivider(){
	var style = jQuery('.st-navigation .st-style').val();
	var margin = jQuery('.st-navigation .st-margin').val();
	data = {"type":"divider","content":" ","attr":{"style":style,"margin":margin}};
	var json = JSON.stringify(data);
	jQuery('#st-page li.st-focus').attr("data",json);
	jQuery.stbox.close();
}

//End Divider

// get Option flickr
function getFlickrOption(data){
    content ="<div class='st-nav-title'><i class='icon-flickr'></i> Flickr<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
    content+="<div class='st-nav-option'>";
        content+="<label>Id Images flickr - link </label>";
        content+="<div class='row-fluid'><input type='text' class='st-linkid span12' value='"+data.attr.id+"' placeholder='Link id image'></div>";

        content+="<label>Limit</label>";
        content+="<div class='row-fluid'><input type='text' class='limit span12' value='"+data.attr.limit+"' placeholder='limit'></div>";
     
        content+="<label>Width</label>";
        content+="<div class='row-fluid'><input type='text' class='st-widthimage span12' value='"+data.attr.width+"' placeholder='Width'></div>";              
          
        content+="<label>Height</label>";
        content+="<div class='row-fluid'><input type='text' class='st-heightimgae span12' value='"+data.attr.height+"' placeholder='Height'></div>";              
       
        content+="<div class='st-button-group'>";
        content+="<button class='btn btn-primary'>Save</button>";
        content+="<button class='btn btn-cancel'>Cancel</button>";
        content+="</div>";
    content+="</div>";
    jQuery('.st-navigation').html(content);
    jQuery('.st-nav-option button.btn').click(function(){
        saveFlickr();
    });
}

function saveFlickr(){
    data = {"type":"flickr","content":"","attr":{}};
    data.attr.width=jQuery('.st-navigation .st-nav-option .st-widthimage').val();
    data.attr.height=jQuery('.st-navigation .st-nav-option .st-heightimgae').val();
    data.attr.id=jQuery('.st-navigation .st-nav-option .st-linkid').val();
    data.attr.limit=jQuery('.st-navigation .st-nav-option .limit').val();
    var json = JSON.stringify(data);
    jQuery('#st-page li.st-focus').attr("data",json);
    jQuery.stbox.close();
}

//End Flickr

// get Option like box 
function getFb_likbeboxOption(data){
	content ="<div class='st-nav-title'><i class='icon-facebook-4'></i> Facebook likebox<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
	content+="<div class='st-nav-option'>";
		content+="<label>Link page facebook</label>";
		content+="<div class='row-fluid'><input type='text' size='40' class='st-linkpage span12' value='"+data.content+"' placeholder='Link page'></div>";
		content+="<label>Width</label>";
		content+="<div class='row-fluid'><input type='text' class='st-widthbox span12' value='"+data.attr.width+"' placeholder='Width'></div>";
		content+="<label>Height</label>";
		content+="<div class='row-fluid'><input type='text' class='st-heightbox span12' value='"+data.attr.height+"' placeholder='Height'></div>";
		content+="<label>Show faces</label>";
        content+="<div class='row-fluid'><select class='st-showfaces'>"; 
			if(data.attr.showfaces=='true'){
			content+='<option value="true">Yes</option>';
			content+='<option value="false">No</option>';
		     }else{
                 content+='<option value="false">No</option>';
                 content+='<option value="true">Yes</option>';
		     }
		content+="</select></div>";
        content+="<label>Show header</label>";
        content+="<div class='row-fluid'><select class='st-showheader'>"; 
		if(data.attr.showheader=='true'){
			content+='<option value="true">Yes</option>';
			content+='<option value="false">No</option>';
		     }else{
                 content+='<option value="false">No</option>';
                 content+='<option value="true">Yes</option>';
		     }
		content+="</select></div>";
		 content+="<label>Show stream </label>";
        content+="<div class='row-fluid'><select class='st-showstream'>"; 
			if(data.attr.showstream=='true'){
			content+='<option value="true">Yes</option>';
			content+='<option value="false">No</option>';
		     }else{
                 content+='<option value="false">No</option>';
                 content+='<option value="true">Yes</option>';
		     }
		content+="</select></div>";
		 content+="<label>Show border</label>";
        content+="<div class='row-fluid'><select class='st-showborder'>"; 
           if(data.attr.showborder=='true'){
			content+='<option value="true">Yes</option>';
			content+='<option value="false">No</option>';
		     }else{
                 content+='<option value="false">No</option>';
                 content+='<option value="true">Yes</option>';
		     }
		content+="</select></div>";
		 content+="<label>Color scheme</label>";
        content+="<div class='row-fluid'><select class='st-colorScheme'>"; 
            if(data.attr.colorscheme=='light'){
			content+='<option value="light">light</option>';
			content+='<option value="dark">dark</option>';
		    }else{
		    	content+='<option value="dark">dark</option>';
		    	content+='<option value="light">light</option>';
		    }
		content+="</select></div>";
		 content+="<label>Language</label>";
        content+="<div class='row-fluid'><select class='st-language'>"; 
			content+='<option value="en_US">US</option>';
			content+='<option value="ko_KR">Korea</option>';
		    content+='<option value="fr_FR">France</option>';
	        content+='<option value="ja_JP">Japanese</option>';
	        content+='<option value="it_IT">Italian</option>';
			content+='<option value="vi_VN">VietNam</option>';
		content+="</select></div>";
		content+="<div class='st-button-group'>";
			content+="<button class='btn btn-primary'>Save</button>";
			content+="<button class='btn btn-cancel'>Cancel</button>";
			content+="</div>";
	content+="</div>";
	jQuery('.st-navigation').html(content);
	jQuery('.st-nav-option button.btn-primary').click(function(){
		saveLikebox();
	});
}

function saveLikebox(){
	data = {"type":"fb_likebox","content":"","attr":{}};
	data.content=jQuery('.st-navigation .st-nav-option .st-linkpage').val();
	data.attr.width=jQuery('.st-navigation .st-nav-option .st-widthbox').val();
	data.attr.height=jQuery('.st-navigation .st-nav-option .st-heightbox').val();
	data.attr.showfaces=jQuery('.st-navigation .st-nav-option .st-showfaces').val();
	data.attr.showheader=jQuery('.st-navigation .st-nav-option .st-showheader').val();
	data.attr.showstream=jQuery('.st-navigation .st-nav-option .st-showstream').val();
	data.attr.showborder=jQuery('.st-navigation .st-nav-option .st-showborder').val();
	data.attr.colorscheme=jQuery('.st-navigation .st-nav-option .st-colorScheme').val();
	data.attr.language=jQuery('.st-navigation .st-nav-option .st-language').val();
	var json = JSON.stringify(data);
	jQuery('#st-page li.st-focus').attr("data",json);
	jQuery.stbox.close();
}
//  End likebox Option
// get Option Slider
function getSliderOption(data){
	content ="<div class='st-nav-title'><i class='icon-image'></i> Slider<span class='st-close' title='Close'><i class='icon-cancel-circle'></i></span></div>";
	content+="<div class='st-nav-option'>";
		content+="<label>Link http image</label>";
		content+="<div class='row-fluid'><textarea rows='6' class='st-linkimage span12'>";
		for(i=0;i<data.content.length;i++){
			content+=data.content[i].content+"\n";
		}
		content+="</textarea></div>";
		
		content+="<label>Title Images</label>";
		content+="<div class='row-fluid'><textarea rows='6' class='st-title span12'>";
		for(i=0;i<data.content.length;i++){
			content+=data.content[i].attr.title+"\n";
		}
		content+="</textarea></div>";
		content+="<label>Interval</label>";
		content+="<div class='row-fluid'><input type='text' class='st-interval span12' value='"+data.attr.interval+"' placeholder='Interval'/></div>";
		
        content+="<label>Auto</label>";
        content+="<div class='row-fluid'><select class='st-auto'>"; 
       if(data.attr.auto=='true'){
			content+='<option value="true">true</option>';
			content+='<option value="false">false</option>';
	    }else {
	        content+='<option value="false">false</option>';
	 	    content+='<option value="true">true</option>';
		}
		content+="</select></div>";
		content+="<div class='st-button-group'>";
		content+="<button class='btn btn-primary'>Save</button>";
		content+="<button class='btn btn-cancel'>Cancel</button>";
		content+="</div>";
	content+="</div>";
	jQuery('.st-navigation').html(content);

	jQuery('.st-nav-option button.btn-primary').click(function(){
		saveSlider();
	});
}

function saveSlider(){
	var links = jQuery('.st-navigation .st-nav-option .st-linkimage').val().split("\n");
	for(i=0;i<links.length;i++){
		if(links[i]==""){
			links.splice(i,1);
		}
	}
	if(links[(links.length)-1]=="") links.pop();
	var titles = jQuery('.st-navigation .st-nav-option .st-title').val().split("\n");
	for(i=0;i<titles.length;i++){
		if(titles[i]=="") titles.splice(i,1);
	}
	if(titles[(titles.length)-1]=="") titles.pop();
	data = {"type":"slider","content":[],"attr":{"interval":"","auto":""}};
	for(i=0;i<links.length;i++){
		arr = {"type":"item_gallery","content":"","attr":{}};
		if(i<titles.length){
			arr.attr.title=titles[i];
		}else{
			arr.attr.title="";
		}
		arr.content=links[i];
		data.content.push(arr);
	}
	data.attr.interval=jQuery('.st-navigation .st-nav-option .st-interval').val();
	data.attr.auto=jQuery('.st-navigation .st-nav-option .st-auto').val();
	var json = JSON.stringify(data);
	jQuery('#st-page li.st-focus').attr("data",json);
	jQuery.stbox.close();
}
//  End Slider Option