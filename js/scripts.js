(function(jQuery) {

	var urlToJson = 'data_proj.json';

	// MAIN CONTROLLER
	// Controller général qui va permettre de définir quelle vue est à afficher, 
	// selon le click sur un bouton ou au chargement de l'appli
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
	// Controller qui va nous permettre de récupérer les data du json et du lifi, 
	//et d'envoyer des informations selon les mises à jour de celui-ci (onCurrentUpdated)
	var hotSpotController = new HotSpotController();
	hotSpotController.init();


	//Récupération du JSON
    $.getJSON(urlToJson,{
    	format:'json',
    })
      .done(function(data){
    	jQuery(data).each(jQuery.proxy(function(index,element){
			hotSpotController.model.scope[element['mapNumber']] = element;
    	},this));
    	// TEST EN CURRENT = 1
		//hotSpotController.setCurrent(hotSpotController.model.scope[1]);
    })
      .fail(function(){
		console.info('fail');
    });

    //Récupération du code lifi courant

    //var urlFile = '/sdcard/lifiID.txt';
    var urlFile =  'test/lifiID.txt';
    window.setInterval(function(){
    	if(jQuery(hotSpotController.model.scope).length != 0){
	    	var rawFile = new XMLHttpRequest();
	        rawFile.open("GET", urlFile, true);
	        rawFile.onreadystatechange = function ()
	        {
	            if(rawFile.readyState === 4) {
	                if(rawFile.status === 200 || rawFile.status == 0) {
	                    var allText = rawFile.responseText;
	                    var allTextArray = allText.split(" ");
	                    var currentValue = allTextArray[0];
	                    //Recherche du code lifi correspondant dans notre tableau (scope), et mise à jour de la
	                    //data courante de notre controleur
	                    for (var i = 1; i < jQuery(hotSpotController.model.scope).length; i++){
	                    	if(hotSpotController.model.scope[i] != undefined){
		                    	if(hotSpotController.model.scope[i].idLifi == currentValue){
		                    		hotSpotController.setCurrent(hotSpotController.model.scope[i]);
		                    	}	
	                    	}
	                    }
	                }
	            }
	        }
	        rawFile.send(null);
    	}
    }, 100)

    
    // VIEWS
	var contentLandingPageView = new ContentLandingPageView();
	//Ajout d'un id propre à la vue,
	//Permet de définir notamment le current du controller, et de faire des modifs sur une vue
	// seulement si cet id est égal au current du controller
	contentLandingPageView.id = Repository.LANDING_ID;
	//Ajout du controller General à ma vue
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
	//Ajout du controller de data sur les views voulues
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