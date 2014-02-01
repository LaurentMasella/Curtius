function ContentDetailView(){

}

ContentDetailView.prototype = new MainContentSmoothyView();

ContentDetailView.prototype.init = function(tag){
    MainContentView.prototype.init.call(this,tag);
	this.tag = jQuery(tag);
	/*init data to change by json*/
	this.artworkTitle = this.tag.find('#artworkTitle span');
	this.artworkDetail = this.tag.find('#artworkDetail');
	this.artworkLink = this.tag.find('#artworkLinks');
	this.detailButton = jQuery('#detailButton');
	this.linkedArtworksButton = jQuery('#linkedArtworksButton');
    this.displayingSVG();
    this.displayingArtImage();
};


ContentDetailView.prototype.onCurrentUpdated = function(){
    MainContentView.prototype.onCurrentUpdated.call(this);
    if(this.controller.model.current == this.id){
        this.enableView();
    }else{
        this.disableView();
    }
};

ContentDetailView.prototype.enableView = function(){
    //events
    this.detailButton.bind('mousedown', jQuery.proxy(this.onClickedDetail, this));
    this.linkedArtworksButton.bind('mousedown', jQuery.proxy(this.onClickedLinkedArt, this));
    jQuery('#zoomLauncher').bind('mousedown', jQuery.proxy(this.onZoomLauncher,this));
    jQuery('#zoomBack, .si-icon-maximize-rotate svg').bind('mousedown', jQuery.proxy(this.onZoomBack,this));
    jQuery('.si-icon-hamburger-cross, .si-icon-hamburger-cross2').bind('mousedown', jQuery.proxy(this.onClickIcon, this));
    jQuery('#planButton').bind('mousedown', jQuery.proxy(this.onBackToMap,this));
    jQuery('#artworkinfos').bind('mousedown', jQuery.proxy(this.onClickTools, this));
    jQuery(this.hotSpotController.model).bind(HotSpotEvent.ON_CURRENT_UPDATED, jQuery.proxy(this.onDataUpdated, this));
    //this.initData();
    window.setTimeout(jQuery.proxy(this.svgColor,this), 100);
};

ContentDetailView.prototype.disableView = function(){
    //events
    this.detailButton.unbind('mousedown', jQuery.proxy(this.onClickedDetail, this));
    this.linkedArtworksButton.unbind('mousedown', jQuery.proxy(this.onClickedLinkedArt, this));
    jQuery('#zoomLauncher').unbind('mousedown', jQuery.proxy(this.onZoomLauncher,this));
    jQuery('#zoomBack, .si-icon-maximize-rotate svg').unbind('mousedown', jQuery.proxy(this.onZoomBack,this));
    jQuery('.si-icon-hamburger-cross, .si-icon-hamburger-cross2').unbind('mousedown', jQuery.proxy(this.onClickIcon, this));
    jQuery('#planButton').unbind('mousedown', jQuery.proxy(this.onBackToMap,this));
    jQuery('#artworkinfos').unbind('mousedown', jQuery.proxy(this.onClickTools, this));    
    jQuery(this.hotSpotController.model).unbind(HotSpotEvent.ON_CURRENT_UPDATED, jQuery.proxy(this.onDataUpdated, this));
    //this.initData();
    window.clearTimeout(jQuery.proxy(this.svgColor,this), 100);
};

ContentDetailView.prototype.onDataUpdated = function(){

	var currentData = this.controller.model.scope[this.controller.model.current];

    // ANCIENNE VERSION !
	// this.artworkTitle.html(currentData.oeuvre.parcours.chronologique.FR['titreOeuvre']);
	// this.artworkDetail.html(currentData.oeuvre.parcours.chronologique.FR['DescriptionOeuvre']);
	// this.artworkLink.html(currentData.oeuvre.sousOeuvres[0].details.FR['Descriptif']);
    
};

ContentDetailView.prototype.onClickTools = function(){
    this.controller.setHistoryId(Repository.DETAIL_ID);
    this.controller.setCurrent(Repository.TOOLS_ID);
};

ContentDetailView.prototype.displayingSVG = function(){
    [].slice.call( document.querySelectorAll( '#resize > .si-icon' ) ).forEach( function( el ) {
        var svgicon = new svgIcon( el, svgIconConfig );
    } );

    new svgIcon( document.querySelector( '.si-icon-hamburger-cross' ), svgIconConfig, { 
        easing : mina.elastic, 
        speed: 600,
        size : { w : 50, h : 50 }
    } );

    new svgIcon( document.querySelector( '.si-icon-hamburger-cross2' ), svgIconConfig, { 
        easing : mina.elastic, 
        speed: 600,
        size : { w : 50, h : 50 }
    } );
};
/* ================================================================================ */
/* === DETAIL VIEW ================================================================ */
/* ================================================================================ */

// Couleur des SVG
ContentDetailView.prototype.svgColor = function(){
    jQuery('#artworkLeft').find('path').attr({'stroke':'#000','fill':'#000'});
    jQuery('#resize').find('path').attr({'stroke':'#fff','fill':'#fff'});
};

ContentDetailView.prototype.onClickedDetail = function(){
	jQuery('.si-icon-hamburger-cross').click();
    if(jQuery('.si-icon-hamburger-cross').hasClass('si-icon-unselected')){
        // Bouton noir
        jQuery('.si-icon-hamburger-cross').find('path').attr('stroke','#fff');
        jQuery('#detailButton').css('background-color','#000');
        jQuery('#detailButton').css('color','#fff');
        jQuery('.si-icon-hamburger-cross').removeClass('si-icon-unselected');
        jQuery('.si-icon-hamburger-cross').addClass('si-icon-selected');
        // Fenêtres à droite
        jQuery('#artworkZoomHolder').removeClass('goLeft');
        jQuery('#artworkZoomHolder').addClass('goRight');
        jQuery('#artworkDetail').removeClass('goLeft').css('opacity','1');
        jQuery('#artworkDetail').addClass('goRight');
        // Autre bouton blanc
        // Autre fenêtre à gauche
        if(jQuery('.si-icon-hamburger-cross2').hasClass('si-icon-selected')){
            //jQuery('.si-icon-hamburger-cross2').click();
            jQuery('#linkedArtworksButton').mousedown();
            jQuery('.si-icon-hamburger-cross2').find('path').attr('stroke','#000');
            jQuery('#linkedArtworksButton').css('background-color','#fff');
            jQuery('#linkedArtworksButton').css('color','#000');
            jQuery('#artworkLinks').removeClass('goRight').css('opacity','0');;
            jQuery('#artworkLinks').addClass('goLeft');
            jQuery('#artworkZoomHolder').removeClass('goLeft');
            jQuery('#artworkZoomHolder').addClass('goRight');
        }
    }
    else {
        // Bouton blanc
        jQuery('.si-icon-hamburger-cross').find('path').attr('stroke','#000');
        jQuery('#detailButton').css('background-color','#fff');
        jQuery('#detailButton').css('color','#000');
        jQuery('.si-icon-hamburger-cross').removeClass('si-icon-selected');
        jQuery('.si-icon-hamburger-cross').addClass('si-icon-unselected');
        // Fenêtres à gauche
        jQuery('#artworkZoomHolder').removeClass('goRight');
        jQuery('#artworkZoomHolder').addClass('goLeft');
        jQuery('#artworkDetail').removeClass('goRight').css('opacity','0');
        jQuery('#artworkDetail').addClass('goLeft');
    };
};

ContentDetailView.prototype.onClickedLinkedArt = function(){
    jQuery('.si-icon-hamburger-cross2').click();
    if(jQuery('.si-icon-hamburger-cross2').hasClass('si-icon-unselected')){
        // Bouton noir
        jQuery('.si-icon-hamburger-cross2').find('path').attr('stroke','#fff');
        jQuery('#linkedArtworksButton').css('background-color','#000');
        jQuery('#linkedArtworksButton').css('color','#fff');
        jQuery('.si-icon-hamburger-cross2').removeClass('si-icon-unselected');
        jQuery('.si-icon-hamburger-cross2').addClass('si-icon-selected');
        // Fenêtre à droite
        jQuery('#artworkZoomHolder').removeClass('goLeft');
        jQuery('#artworkZoomHolder').addClass('goRight');
        jQuery('#artworkLinks').removeClass('goLeft').css('opacity','1');
        jQuery('#artworkLinks').addClass('goRight');
        // Autre bouton blanc
        // Autre fenêtre à gauche
        if(jQuery('.si-icon-hamburger-cross').hasClass('si-icon-selected')){
            //jQuery('.si-icon-hamburger-cross').click();
            jQuery('#detailButton').mousedown();
            jQuery('.si-icon-hamburger-cross').find('path').attr('stroke','#000');
            jQuery('#detailButton').css('background-color','#fff');
            jQuery('#detailButton').css('color','#000');
            jQuery('#artworkDetail').removeClass('goRight').css('opacity','0');;
            jQuery('#artworkDetail').addClass('goLeft');
            jQuery('#artworkZoomHolder').removeClass('goLeft');
            jQuery('#artworkZoomHolder').addClass('goRight');
        }
    }
    else {
        // Bouton blanc
        jQuery('.si-icon-hamburger-cross2').find('path').attr('stroke','#000');
        jQuery('#linkedArtworksButton').css('background-color','#fff');
        jQuery('#linkedArtworksButton').css('color','#000');
        jQuery('.si-icon-hamburger-cross2').removeClass('si-icon-selected');
        jQuery('.si-icon-hamburger-cross2').addClass('si-icon-unselected');
        // Fenêtres à gauche
        jQuery('#artworkZoomHolder').removeClass('goRight');
        jQuery('#artworkZoomHolder').addClass('goLeft');
        jQuery('#artworkLinks').removeClass('goRight').css('opacity','0');
        jQuery('#artworkLinks').addClass('goLeft');
    };
    
};

ContentDetailView.prototype.displayingArtImage = function() {
    jQuery('#artworkZoom').smoothZoom({ 
        image_url: 'img/oeuvre.jpg',
        width: 400,
        height: 525,
        responsive: false,
        responsive_maintain_ratio: true,
        max_WIDTH: '',
        max_HEIGHT: '',
        zoom_BUTTONS_SHOW: false,
        pan_BUTTONS_SHOW: false,
        zoom_MAX:'150',
        initial_ZOOM: '0',
        border_SIZE: 0
    }); 
};


ContentDetailView.prototype.onZoomLauncher = function() {
    var opacityCheck = jQuery('#artworkLinks').css('opacity');
    var opacityCheck2 = jQuery('#artworkDetail').css('opacity');
    if( opacityCheck == '1' || opacityCheck2 == '1' ){
        jQuery('#artworkZoomHolder').css('left','-250px');
    }
    else{
        jQuery('#artworkZoomHolder').css('left','140px');
    }
    jQuery('#artworkZoomHolder').css({'width':'+=600px','height':'+=100px','top':'-=50px'});
    jQuery('#artworkZoom').css({'width':'+=600px','height':'+=100px'});
    jQuery('#artworkLinks').css('opacity','0');
    jQuery('#artworkDetail').css('opacity','0');
    jQuery('#artworkLeft').css('opacity','0');
    jQuery('#zoomBack').css('display','block');
    jQuery('#planButton').css('display','none');    
    jQuery(this).css('display','none');
    jQuery('.si-icon-maximize-rotate').click();
    jQuery('#artworkZoom').smoothZoom('destroy').css('background-image', 'url(zoom_assets/preloader.gif)').smoothZoom({ 
        image_url: 'img/oeuvre.jpg',
        width: 1000,
        height: 625,
        responsive: false,
        responsive_maintain_ratio: true,
        max_WIDTH: '',
        max_HEIGHT: '',
        zoom_BUTTONS_SHOW: false,
        pan_BUTTONS_SHOW: false,
        zoom_MAX:'150',
        initial_ZOOM: '0',
        border_SIZE: 0
    }); 
};

ContentDetailView.prototype.onZoomBack = function() {
    if(jQuery('.si-icon-hamburger-cross').hasClass('si-icon-selected')){
        jQuery('#artworkDetail').css('opacity','1');
    }
    if(jQuery('.si-icon-hamburger-cross2').hasClass('si-icon-selected')){
        jQuery('#artworkLinks').css('opacity','1');
    }
    jQuery('#artworkLeft').css('opacity','1');
    jQuery('#artworkZoomHolder').css({'width':'-=600px','height':'-=100px','top':'+=50px','left':'440px'});
    jQuery('#artworkZoom').css({'width':'-=600px','height':'-=100px'});
    jQuery('#zoomBack').css('display','none');
    jQuery('#planButton').css('display','block');
    jQuery('#zoomLauncher').css('display','block');
    jQuery('.si-icon-maximize-rotate').click();
    jQuery('#artworkZoom').smoothZoom('destroy').css('background-image', 'url(zoom_assets/preloader.gif)').smoothZoom({ 
        image_url: 'img/oeuvre.jpg',
        width: 400,
        height: 525,
        responsive: false,
        responsive_maintain_ratio: true,
        max_WIDTH: '',
        max_HEIGHT: '',
        zoom_BUTTONS_SHOW: false,
        pan_BUTTONS_SHOW: false,
        zoom_MAX:'150',
        initial_ZOOM: '0',
        border_SIZE: 0
    });
};

ContentDetailView.prototype.onClickIcon = function(e){
	jQuery(e.currentTarget).click();
};

ContentDetailView.prototype.onBackToMap = function() {
    this.controller.setCurrent(Repository.MAP_ID);
};