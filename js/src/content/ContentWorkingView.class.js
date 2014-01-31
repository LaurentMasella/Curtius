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