function ContentLangageView(){
	
}

ContentLangageView.prototype.init = function(tag){
	this.tag = jQuery(tag);
	var listButtons = jQuery("#langs .chooseSquare .lang");
	//events
	listButtons.bind('mousedown', jQuery.proxy(this.onClick, this));
};

ContentLangageView.prototype.onClick = function(e){
	switch(jQuery(e.currentTarget).attr('id')){
		case 'fr':
			Cookie.setCookie('lang.curtius.com','fr','365');
		break;
		case 'eng':
			Cookie.setCookie('lang.curtius.com','eng','365');
		break;
		case 'ned':
			Cookie.setCookie('lang.curtius.com','ned','365');
		break;
		case 'deu':
			Cookie.setCookie('lang.curtius.com','deu','365');
		break;
	}
};
