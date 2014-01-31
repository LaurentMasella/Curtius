(function(jQuery) {

	var urlToJson = 'detailData.json';

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

    $.getJSON(urlToJson,{
    	format:'json',
    })
      .done(function(data){
    	jQuery(data['Lifi']).each(jQuery.proxy(function(index,element){
			hotSpotController.model.scope[element['mapNumber']] = element;
    	},this));
    	// TEST EN CURRENT = 1
		hotSpotController.setCurrent(hotSpotController.model.scope[1]);
    })
      .fail(function(){
		console.info('fail');
    });

      
      // TEST EN INCREMENTANT LE CURRENT
 	//  var i = 0;
	//  window.setInterval(function(){
	// 	i ++;
	// 	hotSpotController.setCurrent(hotSpotController.model.scope[i]);
	// 	console.info(hotSpotController.model	i]);
	// }, 10000);
    
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

})(jQuery);