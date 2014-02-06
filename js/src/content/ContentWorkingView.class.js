function ContentWorkingView(){

}

ContentWorkingView.prototype = new MainContentSmoothyView();

ContentWorkingView.prototype.init = function(tag){
    MainContentView.prototype.init.call(this, tag);
	this.tag = jQuery(tag);
};

ContentWorkingView.prototype.onCurrentUpdated = function(){
    MainContentView.prototype.onCurrentUpdated.call(this);

    if(this.controller.model.current == this.id){
    	this.enableView();
    }else{
        this.disableView();
    }
};

ContentWorkingView.prototype.enableView = function(){
    this.checkLang();
    this.keyWords();
    window.setTimeout(this.popUp, 200);
    jQuery('#lifiNext').bind('mousedown', jQuery.proxy(this.onClick, this));
};


ContentWorkingView.prototype.disableView = function(){
    jQuery('#lifiNext').unbind('mousedown', jQuery.proxy(this.onClick, this));  
};

ContentWorkingView.prototype.onClick = function(){
    this.controller.setCurrent(Repository.MAP_ID);
};

ContentWorkingView.prototype.checkLang = function(){
    var lang = Cookie.getCookie('lang.curtius.com');
    // Lifi Explanation
    jQuery('#lifiTitle').html(eval('Internationalization.LifiExpTitle'+lang));
    jQuery('#lifiSubtitle').html(eval('Internationalization.LifiExpSubTitle'+lang));
    jQuery('#lifiStep1').html(eval('Internationalization.LifiExpStep1'+lang));
    jQuery('#lifiStep2').html(eval('Internationalization.LifiExpStep2'+lang));
    jQuery('#lifiTxt1').html(eval('Internationalization.LifiTxt1'+lang));
    jQuery('#lifiTxt2').html(eval('Internationalization.LifiTxt2'+lang));
    jQuery('#lifiTxt3').html(eval('Internationalization.LifiTxt3'+lang));
    jQuery('#lifiNext').html(eval('Internationalization.LifiBtnNext'+lang));
};

ContentWorkingView.prototype.keyWords = function(){
    $('.keywordPopup').remove();
    var lang = Cookie.getCookie('lang.curtius.com');
    $.ajax({    
        url: 'keyword'+lang+'.json',
        dataType: 'json',
        timeout: 5000,
        success: function(data, status) {
            $.each(data, function(i, item) { 
                if($('#wrapper:contains('+item.keyword+')')){
                    $("em").highlight(''+item.keyword+'', { element: 'a', className: 'open-popup-link keyword '+item.keyword+'', wordsOnly: true});
                    $('body a.'+item.keyword+'').attr({ href: '#'+item.keyword+'' });
                    $('#wrapper').append('<div class="keywordPopup white-popup mfp-hide" id="'+item.keyword+'">'+item.keytext+'</div>');
                }
            });
        },
        error: function() {
            console.log('There was an error loading the data.');
        }
    });

};

ContentWorkingView.prototype.popUp = function(){
    $('.open-popup-link').magnificPopup({
      type:'inline',
      removalDelay: 300,

      // Class that is added to popup wrapper and background
      // make it unique to apply your CSS animations just to this exact popup
      mainClass: 'mfp-fade',
      midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
    });
};