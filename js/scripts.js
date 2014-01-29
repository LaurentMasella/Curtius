(function(jQuery) {

	// HotSpotController
	var hotSpotController = new HotSpotController();
	hotSpotController.init();

	// getData JSON
	var urlToJson = 'detailData.json';
    $.getJSON(urlToJson,{
    	format:'json',
    })
      .done(function(data){
    	
    	jQuery(data['Lifi']).each(jQuery.proxy(function(index,element){
			//hotSpotController.model.scope.push(element);
			hotSpotController.model.scope[element['idLifi']] = element;
    	},this));
		hotSpotController.setCurrent(17);
    })
      .fail(function(){
		console.info('fail');
    });

	// Init detailView for all content of working details
	var contentDetailView = new ContentDetailView();
	contentDetailView.controller = hotSpotController;
	contentDetailView.init("#contentDetail");

})(jQuery);