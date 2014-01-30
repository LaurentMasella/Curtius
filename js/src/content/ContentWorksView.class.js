function ContentWorksView(){
	
}

ContentWorksView.prototype.init = function(tag){
	this.tag = jQuery(tag);
	this.checkLang();
	jQuery('.spacerTd').first().remove();

	jQuery('#slideBGArtworks img').bind('mousedown', jQuery.proxy(this.onClickWork, this));
	jQuery('#planButton').bind('mousedown', jQuery.proxy(this.onBackToMap,this));    
};

ContentWorksView.prototype.onClickWork = function(tag){
	window.location.href = "detail.html";
};

ContentWorksView.prototype.checkLang = function(){
	var lang = Cookie.getCookie('lang.curtius.com');
    jQuery('#planButton').html(eval('Internationalization.PlanBtn'+lang));
    jQuery('#artItemsTitle').html(eval('Internationalization.ArtItemTitle'+lang));

};

ContentWorksView.prototype.onBackToMap = function() {
    window.location = 'map.html';
};