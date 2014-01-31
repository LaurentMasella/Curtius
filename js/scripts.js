(function(jQuery) {

	// MAIN CONTROLLER
	MainContentController.getInstance().setScope(
		new Array(
			Repository.LANDING_ID,
			Repository.PAGE1_ID,
			Repository.PAGE2_ID,
			Repository.PAGE3_ID,
			Repository.MAP_ID,
			Repository.WORKS_ID)
		);

	// HotSpotController
	var hotSpotController = new HotSpotController();
	hotSpotController.init();

    // VIEWS
	var contentLandingPageView = new ContentLandingPageView();
	contentLandingPageView.id = Repository.LANDING_ID;
	contentLandingPageView.controller = MainContentController.getInstance();
	contentLandingPageView.init("#contentLanding");    	

	var contentLangageView = new ContentLangageView();
	contentLangageView.id = Repository.PAGE1_ID;
	contentLangageView.controller = MainContentController.getInstance();
	contentLangageView.init("#langage");    	

	var contentVisitView = new ContentVisitView();
	contentVisitView.id = Repository.PAGE2_ID;
	contentVisitView.controller = MainContentController.getInstance();
	contentVisitView.init("#visit");

	var contentWorkingView = new ContentWorkingView();
	contentWorkingView.id = Repository.PAGE3_ID;
	contentWorkingView.controller = MainContentController.getInstance();
	contentWorkingView.init("#howItWork");    	

	var contentMapView = new ContentMapView();
	contentMapView.id = Repository.MAP_ID;
	contentMapView.controller = MainContentController.getInstance();
	contentMapView.hotSpotController = hotSpotController;
	contentMapView.init("#mapView");    	

	var contentWorksView = new ContentWorksView();
	contentWorksView.id = Repository.WORKS_ID;
	contentWorksView.controller = MainContentController.getInstance();
	contentWorksView.hotSpotController = hotSpotController;
	contentWorksView.init("#oeuvresView");    

	var contentDetailView = new ContentDetailView();
	contentDetailView.id = Repository.DETAIL_ID;
	contentDetailView.controller = MainContentController.getInstance();
	contentDetailView.hotSpotController = hotSpotController;
	contentDetailView.init("#contentDetail");

	var contentToolsView = new ContentToolsView();
	contentToolsView.id = Repository.TOOLS_ID;
	contentToolsView.controller = MainContentController.getInstance();
	contentToolsView.init("#tools");  

	//INIT WITH FIRST VIEW AS CURRENT
    MainContentController.getInstance().setCurrent(Repository.LANDING_ID);
    	

  //   // VIEW DETAIL
  //   if(jQuery("#contentDetail").length != 0){


		// // getData JSON
		// var urlToJson = 'detailData.json';
	 //    $.getJSON(urlToJson,{
	 //    	format:'json',
	 //    })
	 //      .done(function(data){
	    	
	 //    	jQuery(data['Lifi']).each(jQuery.proxy(function(index,element){
		// 		//hotSpotController.model.scope.push(element);
		// 		hotSpotController.model.scope[element['idLifi']] = element;
	 //    	},this));
		// 	hotSpotController.setCurrent(17);
	 //    })
	 //      .fail(function(){
		// 	console.info('fail');
	 //    });

		// // Init detailView for all content of working details
		// var contentDetailView = new ContentDetailView();
		// contentDetailView.controller = hotSpotController;
		// contentDetailView.init("#contentDetail");
    // }

})(jQuery);