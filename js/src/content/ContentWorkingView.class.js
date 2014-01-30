function ContentWorkingView(){

}

ContentWorkingView.prototype.init = function(tag){

	this.tag = jQuery(tag);
	this.checkLang();
};

ContentWorkingView.prototype.checkLang = function(){
	var lang = Cookie.getCookie('lang.curtius.com');

    // Lifi Explanation
    jQuery('#lifiTitle').html(eval('Internationalization.LifiExpTitle'+lang));
    jQuery('#lifiSubtitle').html(eval('Internationalization.LifiExpSubTitle'+lang));
    jQuery('#lifiStep1').html(eval('Internationalization.LifiExpStep1'+lang));
    jQuery('#lifiStep2').html(eval('Internationalization.LifiExpStep2'+lang));
    jQuery('#lifiTxt1').html(eval('Internationalization.LifiTxt1'+lang));
    jQuery('#lifiTxt2').html(eval('Internationalization.LifiTxt2'+lang));
    jQuery('#lifiTxt3').html(eval('Internationalization.LifiTxt3'+lang));
    jQuery('#lifiNext').html(eval('Internationalization.LifiBtnNext'+lang));	
};
