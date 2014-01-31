function ContentVisitView(){
	
}

ContentVisitView.prototype = new MainContentSmoothyView();

ContentVisitView.prototype.init = function(tag){
	MainContentView.prototype.init.call(this, tag);
	this.tag = jQuery(tag);
	var listButtons = jQuery("#visits .chooseSquare .visit");
	//events
	listButtons.bind('mousedown', jQuery.proxy(this.onClick, this));
};

ContentVisitView.prototype.onClick = function(e){
	switch(jQuery(e.currentTarget).attr('id')){
		case 'free':
			Cookie.setCookie('visit.curtius.com','free','365');
		break;
		case 'fast':
			Cookie.setCookie('visit.curtius.com','fast','365');
		break;
		case 'per':
			Cookie.setCookie('visit.curtius.com','per','365');
		break;
		case 'scol':
			Cookie.setCookie('visit.curtius.com','scol','365');
		break;
	}
	this.controller.setCurrent(Repository.PAGE3_ID);
};

ContentVisitView.prototype.onCurrentUpdated = function(){
	MainContentView.prototype.onCurrentUpdated.call(this);
	if(this.controller.model.current == this.id){	
		var lang = Cookie.getCookie('lang.curtius.com');
		jQuery('#free').html(eval('Internationalization.VisitBtnFree'+lang));
	    jQuery('#fast').html(eval('Internationalization.VisitBtnFast'+lang));
	    jQuery('#per').html(eval('Internationalization.VisitBtnPer'+lang));
	    jQuery('#scol').html(eval('Internationalization.VisitBtnScol'+lang));
	}
};