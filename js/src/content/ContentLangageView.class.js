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
			jQuery('html').removeClass('langENG, langNED, langDEU');
		    jQuery('html').addClass('langFR');
		    jQuery('.lang').parent().removeClass('paramSelected');
		    jQuery('#fr').parent().addClass('paramSelected');
		break;
		case 'eng':
			Cookie.setCookie('lang.curtius.com','eng','365');
	        jQuery('html').removeClass('langFR, langNED, langDEU');
	        jQuery('html').addClass('langENG');
	        jQuery('.lang').parent().removeClass('paramSelected');
	        jQuery('#eng').parent().addClass('paramSelected');
		break;
		case 'ned':
			Cookie.setCookie('lang.curtius.com','ned','365');
	        jQuery('html').removeClass('langFR, langENG, langDEU');
	        jQuery('html').addClass('langNED');
	        jQuery('.lang').parent().removeClass('paramSelected');
	        jQuery('#ned').parent().addClass('paramSelected');
		break;
		case 'deu':
			Cookie.setCookie('lang.curtius.com','deu','365');
	        jQuery('html').removeClass('langFR, langENG, langNED');
	        jQuery('html').addClass('langDEU');
	        jQuery('.lang').parent().removeClass('paramSelected');
	        jQuery('#deu').parent().addClass('paramSelected');
		break;
	}
};
