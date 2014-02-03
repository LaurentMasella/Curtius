function ContentToolsView(){
	
}

ContentToolsView.prototype = new MainContentSmoothyView();

ContentToolsView.prototype.init = function(tag,e){
	MainContentView.prototype.init.call(this,tag);
	this.currentLangage = "";
	this.newLangage = "";
	this.valideBtn = this.tag.find('#toolsValidate .validate');
};

ContentToolsView.prototype.onCurrentUpdated = function(e){

	MainContentView.prototype.onCurrentUpdated.call(this);

	if(this.controller.model.current == this.id){

		this.currentLangage = Cookie.getCookie('lang.curtius.com');
		jQuery('.lang').parent().removeClass('paramSelected');
		jQuery('.lang').each(jQuery.proxy(function(index,element){
			if(jQuery(element).attr('id') == this.currentLangage){
				jQuery(element).parent().addClass('paramSelected');
			}
		},this));
		this.newLangage = this.currentLangage;
		this.checkLang();
		this.enableView();
	}else{
		this.disableView();
		this.currentLangage = "";
		this.newLangage = "";
	}

};

ContentToolsView.prototype.enableView = function(){

	jQuery('.lang').bind('mousedown', jQuery.proxy(this.onClickParam, this));
	this.valideBtn.bind('mousedown', jQuery.proxy(this.onClickValidate, this));
};

ContentToolsView.prototype.disableView = function(){
	jQuery('.lang').unbind('mousedown', jQuery.proxy(this.onClickParam, this));
	this.valideBtn.unbind('mousedown', jQuery.proxy(this.onClickValidate, this));
};

ContentToolsView.prototype.onClickParam = function(e){
	jQuery('.lang').parent().removeClass('paramSelected');
	jQuery(e.currentTarget).parent().addClass('paramSelected');
	this.newLangage = jQuery(e.currentTarget).attr('id');
};

ContentToolsView.prototype.onClickValidate = function(e){
		Cookie.setCookie('lang.curtius.com',this.newLangage,'365');
		var redirectBack = this.controller.model.historyId;
		this.controller.model.setHistoryId(null);
		this.controller.setCurrent(redirectBack);
};

ContentToolsView.prototype.checkLang = function(){
	var lang = Cookie.getCookie('lang.curtius.com');
	jQuery('#toolsValidate .validate').html(eval('Internationalization.ToolsBtnValidate'+lang));
	jQuery('#toolsHeadband').html(eval('Internationalization.ToolsChooseLang'+lang));
};
