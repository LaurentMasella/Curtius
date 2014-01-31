function ContentWorksView(){
	
}

ContentWorksView.prototype = new MainContentSmoothyView();

ContentWorksView.prototype.init = function(tag){
	MainContentView.prototype.init.call(this, tag);
	this.tag = jQuery(tag);

};

ContentWorksView.prototype.onCurrentUpdated = function(){
	MainContentView.prototype.onCurrentUpdated.call(this);
	if(this.controller.model.current == this.id){
		this.checkLang();
		this.enableView();
	}else{
		this.disableView();
	}
}

ContentWorksView.prototype.enableView = function(){
	jQuery('.spacerTd').first().remove();
	//enable events
	jQuery('#slideBGArtworks img').bind('mousedown', jQuery.proxy(this.onClickWork, this));
	jQuery('#planButton').bind('mousedown', jQuery.proxy(this.onBackToMap,this)); 
};

ContentWorksView.prototype.disableView = function(){
	//disable events
	jQuery('#slideBGArtworks img').unbind('mousedown', jQuery.proxy(this.onClickWork, this));
	jQuery('#planButton').unbind('mousedown', jQuery.proxy(this.onBackToMap,this)); 
};

ContentWorksView.prototype.onClickWork = function(tag){
	this.controller.setCurrent(Repository.DETAIL_ID);
};

ContentWorksView.prototype.checkLang = function(){
	var lang = Cookie.getCookie('lang.curtius.com');
    jQuery('#planButton').html(eval('Internationalization.PlanBtn'+lang));
    jQuery('#artItemsTitle').html(eval('Internationalization.ArtItemTitle'+lang));

};

ContentWorksView.prototype.onBackToMap = function() {
    window.location = 'map.html';
};