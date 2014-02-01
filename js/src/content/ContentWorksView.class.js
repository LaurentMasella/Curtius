function ContentWorksView(){
	
}

ContentWorksView.prototype = new MainContentSmoothyView();

ContentWorksView.prototype.init = function(tag){
	MainContentView.prototype.init.call(this, tag);
	this.tag = jQuery(tag);
		
};


//on currentUpdated : quand notre vue s'affiche
ContentWorksView.prototype.onCurrentUpdated = function(){
	MainContentView.prototype.onCurrentUpdated.call(this);
	if(this.controller.model.current == this.id){
		this.checkLang();
		this.enableView();
	}else{
		this.disableView();
	}
}

//ondataupdated : quand les données du lifi on changé
ContentWorksView.prototype.onDataUpdated = function(){

	//Encore un peu de mal avec le parcours, est-ce que l'on veut changer de vue si jamais les données du lifi
	// ont changé et que l'on est sur cette page ? 
	// Si oui, alors on recuprère le current de hotspotcontroller, on verifie si il y a plusieurs oeuvres, si oui
	// on reste ici et on affiche displayItem, si non, on enregistre la valeur de l'oeuvre dans item de hotspot et
	//on redirige vers la vue detail

}

ContentWorksView.prototype.enableView = function(){
	jQuery('.spacerTd').first().remove();
	//enable events
	jQuery('#artworksinfos').bind('mousedown', jQuery.proxy(this.onClickTools, this));
	jQuery('#slideBGArtworks img').bind('mousedown', jQuery.proxy(this.onClickWork, this));
	jQuery('#planButton').bind('mousedown', jQuery.proxy(this.onBackToMap,this));
	//on écoute le changement de données du lifi que quand on est sur cette vue
	jQuery(this.hotSpotController.model).bind(HotSpotEvent.ON_CURRENT_UPDATED, jQuery.proxy(this.onDataUpdated, this));
	this.displayItems();
};


ContentWorksView.prototype.displayItems = function(){
	alert ('id Lifi : ' + this.hotSpotController.model.current.idLifi + 
		'Nombres oeuvres : ' + this.hotSpotController.model.current['oeuvre'].length);
};


ContentWorksView.prototype.disableView = function(){
	//disable events
	jQuery('#artworksinfos').unbind('mousedown', jQuery.proxy(this.onClickTools, this));
	jQuery('#slideBGArtworks img').unbind('mousedown', jQuery.proxy(this.onClickWork, this));
	jQuery('#planButton').unbind('mousedown', jQuery.proxy(this.onBackToMap,this)); 
};


ContentWorksView.prototype.onClickTools = function(){
	this.controller.setHistoryId(Repository.WORKS_ID);
	this.controller.setCurrent(Repository.TOOLS_ID);
};

ContentWorksView.prototype.onClickWork = function(tag){
	// ON ne bindera plus sur l'image mais sur le contenu généré dans display item via le json
	// au bind d'un element, il faudra enregistré la valeur d'une oeuvre dans item de hotspotcontroller, 
	// et rediriger vers detail view 
	this.controller.setCurrent(Repository.DETAIL_ID);
};

ContentWorksView.prototype.checkLang = function(){
	var lang = Cookie.getCookie('lang.curtius.com');
    jQuery('#planButton').html(eval('Internationalization.PlanBtn'+lang));
    jQuery('#artItemsTitle').html(eval('Internationalization.ArtItemTitle'+lang));

};

ContentWorksView.prototype.onBackToMap = function() {
    this.controller.setCurrent(Repository.MAP_ID);
};