(function(jQuery) {

    // VIEW LANDING 
    if(jQuery("#contentLanding").length != 0){
		var contentLandingPageView = new ContentLandingPageView();
		contentLandingPageView.init("#contentLanding");    	
    }

    if(jQuery(".page1").length != 0){
		var contentLangageView = new ContentLangageView();
		contentLangageView.init(".page1");    	
    }

    if(jQuery(".page2").length != 0){
		var contentVisitView = new ContentVisitView();
		contentVisitView.init(".page2");    	
    }

    if(jQuery(".page3").length != 0){
		var contentWorkingView = new ContentWorkingView();
		contentWorkingView.init(".page3");    	
    }

    if(jQuery("#mapView").length != 0){
		var contentMapView = new ContentMapView();
		contentMapView.init("#mapView");    	
    }

    if(jQuery("#oeuvresView").length != 0){
		var contentWorksView = new ContentWorksView();
		contentWorksView.init("#oeuvresView");    	
    }
    // VIEW DETAIL
    if(jQuery("#contentDetail").length != 0){
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
    }

})(jQuery);