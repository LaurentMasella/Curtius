function ContentMapView(){

}

ContentMapView.prototype = new MainContentSmoothyView();

ContentMapView.prototype.init = function(tag){
	MainContentView.prototype.init.call(this, tag);
	//dom/var
	this.tag = jQuery(tag);
	this.coordRDC = [];
	this.coord1 = [];
	this.coord2 = [];
	this.position = '';
	this.positionArray = '';
	this.zoomContainer = jQuery('#zoom_container');
    this.level = jQuery('.level');
    this.levels = jQuery('#levels');
    this.legend2 = jQuery('#legend2');
    this.legend3 = jQuery('#legend3');
    this.legend4 = jQuery('#legend4');
    this.legend5 = jQuery('#legend5');
    this.floorHeadBand = jQuery('#floorHeadBand');
	
};

ContentMapView.prototype.onCurrentUpdated = function(){
	MainContentView.prototype.onCurrentUpdated.call(this);
	if(this.controller.model.current == this.id){
	    this.checkLang();
		this.enableView();
	}else{
		this.disableView();
	}

};

ContentMapView.prototype.enableView = function(){
	this.initCoordonates();
	this.populateMap1();
	this.displayingMap();
	window.setTimeout(jQuery.proxy(this.addingSpotLights, this), 100);
	this.addingClicksFeatures();
	window.setTimeout(jQuery.proxy(this.localize,this), 250);
	window.setTimeout(jQuery.proxy(this.addingSpotInteraction,this), 100); 		
};

ContentMapView.prototype.disableView = function(){
	window.clearTimeout(jQuery.proxy(this.addingSpotLights, this), 100);
	this.removeClicksFeatures();
	window.clearTimeout(jQuery.proxy(this.localize,this), 250);
	window.clearTimeout(jQuery.proxy(this.addingSpotInteraction,this), 100);
	this.destroyCoordonates();	
};


ContentMapView.prototype.populateMapRDC = function(){
	// console.info('ContentMapView.prototype.populateMapRDC');
    for (var i = 1; i < this.coordRDC.length; i++) {
        jQuery('.landmarks').append('<div class="item mark"data-position="'+this.coordRDC[ i ]+'" data-show-at-zoom="0"><div class="lifiPointHolder" id="Lampe'+i+'"><div class="lifiPoint">'+i+'</div></div></div>');
    }
};

ContentMapView.prototype.populateMap1 = function(){
	// console.info('ContentMapView.prototype.populateMap1');
	var floor1Num = "";
    for (var i = 1; i < this.coord1.length; i++) {
        floor1Num = i+parseInt(this.coordRDC.length)-1;
        jQuery('.landmarks').append('<div class="item mark" data-position="'+this.coord1[ i ]+'" data-show-at-zoom="0"><div class="lifiPointHolder" id="Lampe'+floor1Num+'"><div class="lifiPoint">'+floor1Num+'</div></div></div>');
    }
};

ContentMapView.prototype.populateMap2 = function(){
	// console.info('ContentMapView.prototype.populateMap2');
	var floor2Num = "";
    for (var i = 1; i < this.coord2.length; i++) {
        floor2Num = i+parseInt(this.coordRDC.length)+parseInt(this.coord1.length)-1;
        jQuery('.landmarks').append('<div class="item mark" data-position="'+this.coord2[ i ]+'" data-show-at-zoom="0"><div class="lifiPointHolder" id="Lampe'+floor2Num+'"><div class="lifiPoint">'+floor2Num+'</div></div></div>');
    }
};

ContentMapView.prototype.addingSpotLights = function() {
	// console.info('ContentMapView.prototype.addingSpotLights');
    // Ajout artificiel de la borne actuelle en attendant de récupérer réelement l'info par Lifi
    // -----------------------------------------------------------------------------------------
    // (Lorsqu'on aura l'info Lifi il faudra Addclass lors de l'évènement Lifi 
    // sur la borne dont l'innerHtml correspond à la borne de l'évènement, retirer cette class de tout les autres, et ajouter une seconde class)
    var markcount = jQuery('.landmarks').find(".mark").length;
    if(markcount > 2) {
        var randomnumber = Math.floor(Math.random()*(markcount)+1);
        jQuery('.landmarks').find(".mark:nth-child("+randomnumber+")").addClass("currentLifiPoint");
        jQuery('.currentLifiPoint').css('z-index','10000000000000');
        jQuery('.currentLifiPoint').prevAll('.mark').addClass('visitedLifiPoint');
        // -----------------------------------------------------------------------------------------

        // Position de la prochaine borne (.nextLifiPoint)
        jQuery('.currentLifiPoint').next().addClass('nextLifiPoint');
    }
    else {
        jQuery('.landmarks').find(".mark:last-child").addClass("currentLifiPoint");

    }
     // Position de la dernière biorne consultée (.currentLifiPoint)
        this.position = (jQuery('.currentLifiPoint').attr('data-position'));
        this.positionArray = this.position.split(',');

};

ContentMapView.prototype.localize = function () {
	// console.info('ContentMapView.prototype.localize');
    this.zoomContainer.smoothZoom('focusTo',{
        x: this.positionArray[0],
        y: this.positionArray[1],
        zoom: 150,
        speed: 4
    });
            
};

ContentMapView.prototype.displayingMap = function() {
	// console.info('ContentMapView.prototype.displayingMap');
    this.zoomContainer.smoothZoom('destroy').css('background-image', 'url(zoom_assets/preloader.gif)').smoothZoom({
        image_url: 'img/lvl1.png',
        responsive: false,
        responsive_maintain_ratio: true,
        max_WIDTH: '',
        max_HEIGHT: '',
        zoom_BUTTONS_SHOW: false,
        pan_BUTTONS_SHOW: false,
        zoom_MAX:'150',
        initial_ZOOM: '150',
        border_SIZE: 0
    }); 
};
    

ContentMapView.prototype.addingSpotInteraction = function() {
	// console.info('ContentMapView.prototype.addingSpotInteraction');
	jQuery('.visitedLifiPoint, .currentLifiPoint').bind('mousedown',jQuery.proxy(this.onSpotMouseDown, this));

};

ContentMapView.prototype.onSpotMouseDown = function(){
	// console.info('ContentMapView.prototype.onSpotMouseDown');
	this.controller.setCurrent(Repository.WORKS_ID);
};

ContentMapView.prototype.removeClicksFeatures = function(){
	jQuery("#level1").unbind('mousedown', jQuery.proxy(this.onClickFeatures, this));
	jQuery("#level2").unbind('mousedown', jQuery.proxy(this.onClickFeatures, this));
	jQuery("#level3").unbind('mousedown', jQuery.proxy(this.onClickFeatures, this));
	jQuery("#localize").unbind('mousedown', jQuery.proxy(this.localize, this));
};

ContentMapView.prototype.addingClicksFeatures = function() {
	// console.info('ContentMapView.prototype.addingClicksFeatures')
	jQuery("#level1").bind('mousedown', jQuery.proxy(this.onClickFeatures, this));
	jQuery("#level2").bind('mousedown', jQuery.proxy(this.onClickFeatures, this));
	jQuery("#level3").bind('mousedown', jQuery.proxy(this.onClickFeatures, this));
	jQuery('#artworksinfosMap').bind('mousedown', jQuery.proxy(this.onClickTools, this));
	jQuery("#localize").bind('mousedown', jQuery.proxy(this.localize, this));

	for (var i = 0; i < this.coord1.length; i++) {
        jQuery('#lampe'+i).bind('mousedown', jQuery.proxy(this.onClickSpot, this));
    };
};

ContentMapView.prototype.onClickTools = function(){
	this.controller.setHistoryId(Repository.MAP_ID);
	this.controller.setCurrent(Repository.TOOLS_ID);
};

ContentMapView.prototype.onClickSpot = function(){
	jQuery.getJSON('data.json', function(data) {
        $.each( data, function( key, val ) {
            console.log(data[0]);
            console.log(val);
            console.log(val.idLiFi);
            console.log(val.Oeuvre[0].idOeuvre);
            console.log(val.Oeuvre[0].FichierImage);
        });
    });
};

ContentMapView.prototype.onClickFeatures = function(e){

	switch(jQuery(e.currentTarget).attr('id')){
		case 'level1':
			this.zoomContainer.smoothZoom('destroy').css('background-image', 'url(zoom_assets/preloader.gif)').smoothZoom({ 
	            image_url: 'img/lvl0.png',
	            zoom_MAX:'150'
	        }); 
	        jQuery('.landmarks').empty();
	        if(this.coordRDC.length){
	            this.populateMapRDC();
	            $('#zoom_container').smoothZoom('refreshAllLandmarks');
	            //window.setTimeout(AddingCurrentPos, 50);
	            window.setTimeout(jQuery.proxy(this.addingSpotLights,this), 100);
	            window.setTimeout(jQuery.proxy(this.localize,this), 250);
	            //openTools();
	            window.setTimeout(jQuery.proxy(this.addingSpotInteraction,this), 100);
	        }
	        this.level.removeClass('levelSelected');
	        jQuery('#level1').addClass('levelSelected');
	        this.floorHeadBand.css('background-color','#B3B2B2'); 
	        this.levels.css('border-color','#B3B2B2');
	        this.legend2.find('.mapIcon').css({'background':'url("img/info.png") 0 0 no-repeat','top':'15px','left':'10px'}); 
	        this.legend3.css({'background-position':'0 -158px','height':'80px','line-height':'80px','padding-top':'0'});
	        this.legend3.find('.mapIcon').css('background-position','0 -158px'); 
	        this.legend4.find('.mapIcon').css('background-position','0 -158px'); 
	        this.legend5.find('.mapIcon').css('background-position','0 -158px'); 
	        //window.setTimeout(checkLang, 10);
		break;
		case 'level2':
	        this.zoomContainer.smoothZoom('destroy').css('background-image', 'url(zoom_assets/preloader.gif)').smoothZoom({ 
	            image_url: 'img/lvl1.png',
	            zoom_MAX:'150'
	        }); 
	        jQuery('.landmarks').empty();
	        if(this.coord1.length){
	            this.populateMap1();
	            $('#zoom_container').smoothZoom('refreshAllLandmarks');
	            //window.setTimeout(AddingCurrentPos, 50);
	            window.setTimeout(jQuery.proxy(this.addingSpotLights,this), 100);
	            window.setTimeout(jQuery.proxy(this.localize,this), 250);
	            //openTools();
	            window.setTimeout(jQuery.proxy(this.addingSpotInteraction,this), 100);
	        }
	        this.level.removeClass('levelSelected');
	        jQuery('#level2').addClass('levelSelected');
	        this.floorHeadBand.css('background-color','#9bd3c3');
	        this.levels.css('border-color','#9bd3c3');
	        this.legend2.find('.mapIcon').css({'background':'url("img/mapIcons2.png") 0 -358px no-repeat','top':'33px','left':'5px'}); 
	        this.legend3.css({'background-position':'0 -158px','height':'60px','line-height':'normal','padding-top':'20px'});
	        this.legend3.find('.mapIcon').css('background-position','0 -58px'); 
	        this.legend4.find('.mapIcon').css('background-position','0 -108px'); 
	        this.legend5.find('.mapIcon').css('background-position','0 -208px');
	        //window.setTimeout(checkLang, 10);
		break;
		case 'level3':
			this.zoomContainer.smoothZoom('destroy').css('background-image', 'url(zoom_assets/preloader.gif)').smoothZoom({ 
	            image_url: 'img/lvl2.png',
	            zoom_MAX:'150'
	        }); 
	        jQuery('.landmarks').empty();
	        if(this.coord2.length){
	            this.populateMap2();
	            $('#zoom_container').smoothZoom('refreshAllLandmarks');
	            //window.setTimeout(AddingCurrentPos, 50);
	            window.setTimeout(jQuery.proxy(this.addingSpotLights,this), 100);
	            window.setTimeout(jQuery.proxy(this.localize,this), 250);
	            //openTools();
	            window.setTimeout(jQuery.proxy(this.addingSpotInteraction,this), 100);
	        }
	        this.level.removeClass('levelSelected');
	        jQuery('#level3').addClass('levelSelected');
	        this.floorHeadBand.css('background-color','#EACA81'); 
	        this.levels.css('border-color','#EACA81');
	        this.legend2.find('.mapIcon').css({'background':'url("img/mapIcons2.png") 0 -358px no-repeat','top':'33px','left':'5px'}); 
	        this.legend3.css({'background-position':'0 -158px','height':'60px','line-height':'normal','padding-top':'20px'});
	        this.legend3.find('.mapIcon').css('background-position','0 -58px'); 
	        this.legend4.find('.mapIcon').css('background-position','0 -108px'); 
	        this.legend5.find('.mapIcon').css('background-position','0 -208px');
	        //window.setTimeout(checkLang, 10);
		break;		
	}
};

ContentMapView.prototype.destroyCoordonates = function(){
	this.coordRDC = [];
	this.coord1 = [];
	this.coord2 = [];
};


ContentMapView.prototype.initCoordonates = function(){
	switch(Cookie.getCookie('visit.curtius.com')){
		case 'free':
		    this.coordRDC[ 1 ] = "1375,780";
		    this.coord1[ 1 ] = "448,493";
		    this.coord1[ 2 ] = "241,669";
		    this.coord1[ 3 ] = "406,641";
		    this.coord1[ 4 ] = "470,641";
		    this.coord1[ 5 ] = "271,751";
		    this.coord2[ 1 ] = "268,461";
		    this.coord2[ 2 ] = "321,500";
		    this.coord2[ 3 ] = "382,494";
		    this.coord2[ 4 ] = "497,486";
		break;
		case 'fast':
		    this.coordRDC[ 1 ] = "1375,780";
		    this.coord1[ 1 ] = "448,493";
		    this.coord1[ 2 ] = "241,669";
		    this.coord1[ 3 ] = "406,641";
		    this.coord1[ 4 ] = "470,641";
		    this.coord1[ 5 ] = "271,751";
		    this.coord2[ 1 ] = "268,461";
		    this.coord2[ 2 ] = "321,500";
		    this.coord2[ 3 ] = "382,494";
		    this.coord2[ 4 ] = "497,486";		
		break;
		case 'per':
		    this.coordRDC[ 1 ] = "1375,780";
		    this.coord1[ 1 ] = "448,493";
		    this.coord1[ 2 ] = "241,669";
		    this.coord1[ 3 ] = "406,641";
		    this.coord1[ 4 ] = "470,641";
		    this.coord1[ 5 ] = "271,751";
		    this.coord1[ 6 ] = "273,817";
		    this.coord1[ 7 ] = "225,926";
		    this.coord1[ 8 ] = "319,969";
		    this.coord1[ 9 ] = "319,1038";
		    this.coord1[ 10 ] = "252,1057";
		    this.coord1[ 11 ] = "473,1259";
		    this.coord1[ 12 ] = "271,1351";
		    this.coord1[ 13 ] = "737,452";
		    this.coord1[ 14 ] = "890,548";
		    this.coord1[ 15 ] = "960,539";
		    this.coord1[ 16 ] = "1086,515";
		    this.coord1[ 17 ] = "1146,539";
		    this.coord1[ 18 ] = "1376,366";
		    this.coord1[ 19 ] = "1444,347";
		    this.coord1[ 20 ] = "1512,343";
		    this.coord1[ 21 ] = "1585,366";
		    this.coord1[ 22 ] = "1657,283";
		    this.coord1[ 23 ] = "1302,604";
		    this.coord1[ 24 ] = "1308,664";
		    this.coord1[ 25 ] = "1273,753";
		    this.coord1[ 26 ] = "1313,814";
		    this.coord1[ 27 ] = "1444,836";
		    this.coord1[ 28 ] = "1514,836";
		    this.coord1[ 29 ] = "1350,909";
		    this.coord1[ 30 ] = "1414,911";
		    this.coord1[ 31 ] = "1474,912";
		    this.coord1[ 32 ] = "1727,897";
		    this.coord1[ 33 ] = "1727,963";
		    this.coord1[ 34 ] = "1320,968";
		    this.coord2[ 1 ] = "268,461";
		    this.coord2[ 2 ] = "321,500";
		    this.coord2[ 3 ] = "382,494";
		    this.coord2[ 4 ] = "497,486";
		    this.coord2[ 5 ] = "442,529";
		    this.coord2[ 6 ] = "237,582";
		    this.coord2[ 7 ] = "387,626";
		    this.coord2[ 8 ] = "436,588";
		    this.coord2[ 9 ] = "477,631";
		    this.coord2[ 10 ] = "264,1230";
		    this.coord2[ 11 ] = "269,1383";
		    this.coord2[ 12 ] = "471,1454";
		    this.coord2[ 13 ] = "753,486";
		    this.coord2[ 14 ] = "876,543";
		    this.coord2[ 15 ] = "927,388";
		    this.coord2[ 16 ] = "929,475";
		    this.coord2[ 17 ] = "974,430";
		    this.coord2[ 18 ] = "1002,490";
		    this.coord2[ 19 ] = "1070,408";
		    this.coord2[ 20 ] = "1153,463";
		    this.coord2[ 21 ] = "1263,324";
		    this.coord2[ 22 ] = "1392,389";
		    this.coord2[ 23 ] = "1366,261";
		    this.coord2[ 24 ] = "1402,304";
		    this.coord2[ 25 ] = "1441,255";
		    this.coord2[ 26 ] = "1558,242";
		    this.coord2[ 27 ] = "1598,351";
		    this.coord2[ 28 ] = "1391,433";
		    this.coord2[ 29 ] = "1338,508";
		    this.coord2[ 30 ] = "1344,623";
		    this.coord2[ 31 ] = "1358,697";
		    this.coord2[ 32 ] = "1358,758";
		    this.coord2[ 33 ] = "1362,818";
		    this.coord2[ 34 ] = "1366,880";
		    this.coord2[ 35 ] = "1375,945";
		    this.coord2[ 36 ] = "1440,941";
		    this.coord2[ 37 ] = "1537,829";
		    this.coord2[ 38 ] = "1532,915";
		    this.coord2[ 39 ] = "1734,789";
		    this.coord2[ 40 ] = "1780,834";
		    this.coord2[ 41 ] = "1696,980";
		    this.coord2[ 42 ] = "1760,978";		
		break;
		case 'scol':
		    this.coordRDC[ 1 ] = "1375,780";
		    this.coord1[ 1 ] = "448,493";
		    this.coord1[ 2 ] = "241,669";
		    this.coord1[ 3 ] = "406,641";
		    this.coord1[ 4 ] = "470,641";
		    this.coord1[ 5 ] = "271,751";
		    this.coord2[ 1 ] = "268,461";
		    this.coord2[ 2 ] = "321,500";
		    this.coord2[ 3 ] = "382,494";
		    this.coord2[ 4 ] = "497,486";		
		break;
	}
};

ContentMapView.prototype.checkLang = function(){
	var lang = Cookie.getCookie('lang.curtius.com');

    jQuery('.legendBlock p').html(eval('Internationalization.MapLegend'+lang));
    if(jQuery('#level1').hasClass('levelSelected')){
    	$('#legend2 span').html(eval('Internationalization.MapLvl1Legend2'+lang));
        $('#legend3 span').html(eval('Internationalization.MapLvl1Legend3'+lang));
        $('#legend4 span').html(eval('Internationalization.MapLvl1Legend4'+lang));
        $('#legend5 span').html(eval('Internationalization.MapLvl1Legend5'+lang));
    }
    else{
    	$('#legend2 span').html(eval('Internationalization.MapLvlDefLegend2'+lang));
        $('#legend3 span').html(eval('Internationalization.MapLvlDefLegend3'+lang));
        $('#legend4 span').html(eval('Internationalization.MapLvlDefLegend4'+lang));
        $('#legend5 span').html(eval('Internationalization.MapLvlDefLegend5'+lang));
    }
    $('#legend1 span').html(eval('Internationalization.MapLegend1'+lang));
    $('#legend6 span').html(eval('Internationalization.MapLegend6'+lang));
    $('#legend7 span').html(eval('Internationalization.MapLegend7'+lang));
    $('#legend8 span').html(eval('Internationalization.MapLegend8'+lang));
    $('#legendBlock6 p').html(eval('Internationalization.MapLegendBlock'+lang));
};