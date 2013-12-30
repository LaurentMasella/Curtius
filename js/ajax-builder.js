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
			console.log(s);
		
		},

		bindUIActions: function() {
			s.aLinksList.on("click", function() {

				parsingLinks.changingCasualLinksToAjax(this);

				return false;				
			});
		},

		changingCasualLinksToAjax: function(numToGet) {
			console.log(numToGet);
			//	Which element?
			var whichOne = numToGet;
			//	What is its href?
			var currentTarget = whichOne.href;
			//	What is its ID?
			var currentId = whichOne.id;
			console.log(currentId);
								  
			var toLoad = $(whichOne).attr('href')+' .content';
			$('.content').hide('fast',loadContent);
			$('#load').remove();
			$('#wrapper').append('<span id="load">LOADING...</span>');
			$('#load').fadeIn('normal');
			//	Set the new value of the URL bar	
			window.location.hash = $(whichOne).attr('href').substr(0,$(whichOne).attr('href').length-5);
			
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