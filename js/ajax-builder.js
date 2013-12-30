
window.addEventListener("popstate", function(e) {
    var toLoad = location.pathname + ' .content';
			$('.content').hide('fast',loadContent);
			$('#load').remove();
			$('#wrapper').append('<span id="load">LOADING...</span>');
			$('#load').fadeIn('normal');
			//	Set the new value of the URL bar	
			history.pushState(null, null, location.pathname);
			
			function loadContent() {
				$('#wrapper').load(toLoad,'',showNewContent());
			}

			function showNewContent() {
				$('.content').show('normal',hideLoader());
			}

			function hideLoader() {

				$('#load').fadeOut('normal');

				window.setTimeout(
					function(){

						if(location.pathname.indexOf('map.html') != -1) {
						    populateMap1();
						    displayingMap();
						    window.setTimeout(addingSpotLights, 100);
						    addingClicksFeatures();
						    window.setTimeout(localize, 250);					
						}
						parsingLinks.init();
					}
				, 50);

			}


});



















var s, 
	parsingLinks = {

		settings: {},

		init: function() {

			parsingLinks.settings = {
				numALinks: $("a").length, 
				aLinksList: $("a")
			}

			// kick things off			
			s = this.settings;
			this.bindUIActions();
		
		},

		bindUIActions: function() {
			s.aLinksList.on("click", function() {

				parsingLinks.changingCasualLinksToAjax(this);

				return false;				
			});
		},

		changingCasualLinksToAjax: function(numToGet) {

			//	Which element?
			var whichOne = numToGet;
			//	What is its href?
			var currentTarget = whichOne.href;
			//	What is its ID?
			var currentId = whichOne.id;
								  
			var toLoad = $(whichOne).attr('href')+' .content';


			$('.content').hide('fast',loadContent);
			$('#load').remove();
			$('#wrapper').append('<span id="load">LOADING...</span>');
			$('#load').fadeIn('normal');
			//	Set the new value of the URL bar	
			history.pushState(null, null, whichOne.href);
			
			function loadContent() {
				$('#wrapper').load(toLoad,'',showNewContent());
			}

			function showNewContent() {
				$('.content').show('normal',hideLoader());
			}

			function hideLoader() {

				$('#load').fadeOut('normal');

				window.setTimeout(
					function(){

						if(whichOne.href.indexOf('map.html') != -1) {
						    populateMap1();
						    displayingMap();
						    window.setTimeout(addingSpotLights, 100);
						    addingClicksFeatures();
						    window.setTimeout(localize, 250);					
						}
						parsingLinks.init();
					}
				, 50);

			}

			return false;

		}
};

$(function() {
	parsingLinks.init();
});