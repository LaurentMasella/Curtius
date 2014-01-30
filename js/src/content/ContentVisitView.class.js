function ContentVisitView(){
	
}

ContentVisitView.prototype.init = function(tag){
	this.tag = jQuery(tag);
	var listButtons = jQuery("#visits .chooseSquare .visit");
	//events
	listButtons.bind('mousedown', jQuery.proxy(this.onClick, this));
	//functions
	this.checkLang();
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
};

ContentVisitView.prototype.checkLang = function(){
	var lang = Cookie.getCookie('lang.curtius.com');
	jQuery('#free').html(eval('Internationalization.VisitBtnFree'+lang));
    jQuery('#fast').html(eval('Internationalization.VisitBtnFast'+lang));
    jQuery('#per').html(eval('Internationalization.VisitBtnPer'+lang));
    jQuery('#scol').html(eval('Internationalization.VisitBtnScol'+lang));
};