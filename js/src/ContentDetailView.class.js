function ContentDetailView(){

}

ContentDetailView.prototype.init = function(tag){

	this.tag = jQuery(tag);
	console.info(this.tag);
	/*init data to change by json*/
	this.artworkTitle = this.tag.find('#artworkTitle span');
	this.artworkDetail = this.tag.find('#artworkDetail');
	this.artworkLink = this.tag.find('#artworkLinks');

	jQuery(this.controller.model).bind(HotSpotEvent.ON_CURRENT_UPDATED, jQuery.proxy(this.onCurrentUpdated, this));
	//this.initData();
};

ContentDetailView.prototype.onCurrentUpdated = function(){

	var currentData = this.controller.model.scope[this.controller.model.current];

	this.artworkTitle.html(currentData.oeuvre.parcours.chronologique.FR['titreOeuvre']);
	this.artworkDetail.html(currentData.oeuvre.parcours.chronologique.FR['DescriptionOeuvre']);
	this.artworkLink.html(currentData.oeuvre.sousOeuvres[0].details.FR['Descriptif']);
};