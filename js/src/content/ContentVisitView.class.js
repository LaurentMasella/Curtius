function ContentVisitView(){
	
}

ContentVisitView.prototype = new MainContentSmoothyView();

ContentVisitView.prototype.init = function(tag){
	MainContentView.prototype.init.call(this, tag);
	this.tag = jQuery(tag);
	this.listButtons = jQuery("#visits .chooseSquare .visit");
	//events
	
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
		this.checkLang();
		this.enableView();
	}else{
		this.disableView();
	}
};

ContentVisitView.prototype.enableView = function(){
		this.listButtons.bind('mousedown', jQuery.proxy(this.onClick, this));
		jQuery('#backBtn').bind('mousedown', jQuery.proxy(this.onClickBack, this));
};

ContentVisitView.prototype.disableView = function(){
		this.listButtons.unbind('mousedown', jQuery.proxy(this.onClick, this));
		jQuery('#backBtn').unbind('mousedown', jQuery.proxy(this.onClickBack, this));
};

ContentVisitView.prototype.onClickBack = function(){
	this.controller.goPrevious();
};

ContentVisitView.prototype.checkLang = function(){
	var lang = Cookie.getCookie('lang.curtius.com');
	jQuery('#free').html(eval('Internationalization.VisitBtnFree'+lang));
    jQuery('#fast').html(eval('Internationalization.VisitBtnFast'+lang));
    jQuery('#per').html(eval('Internationalization.VisitBtnPer'+lang));
    jQuery('#scol').html(eval('Internationalization.VisitBtnScol'+lang));	
};