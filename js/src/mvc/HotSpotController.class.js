function HotSpotController(){
	this.model = undefined;
}

HotSpotController.prototype.destroy = function(){
	if(this.model !== undefined){
		this.model.destroy();
		this.model = null;
	}
};

HotSpotController.prototype.init = function(){
	this.model = new HotSpotModel();
};

//curent
HotSpotController.prototype.setCurrent = function(current){
	if(this.model == undefined)
		return;
	if(this.model.current !== current)
		this.model.setCurrent(current);
};
//scope
HotSpotController.prototype.setScope = function(scope){
	this.model.setScope(scope);
};
//state
HotSpotController.prototype.setState = function(state){
	if(this.model == undefined)
		return;
	if(this.model.state !== state)
		this.model.setState(state);
};