/*
RAPPEL:
------

- LOCALIZE est appelée avec un SetTimeout de 250ms, si les données mettent trop de de
temps à se charger et que localize ne fonctionne plus, chercher "localize"
- ADDINGCLICKSFEATURES idem avec un setTimeout de 100ms, chercher "addingClicksFeatures"

TODO :
------

- Mettre l'image à la bonne taille
- Avoir les bonnes images de chaque étage
- Faire la css de la légende et des Bubbles


- rendre la mark bonhomme fonctionnelle
- Ajouter des classes sur les bornes visitées.


- comment afficher les infos de la borne lifi ?

- Faire dépendre les tableaux de Bubbles du type de visite choisie





- Si la bulle cliquée à l'id Lampe[i] alors j'affiche la page contenant les infos de [i]
avec 'i' de 0 à tableau json length et i++


*/



/* ================================================================================ */
/* === CORDOVA ==================================================================== */
/* ================================================================================ */

// Initialisation --------------------------------------------------------------------

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

/* ================================================================================ */
/* === LANGUES / VISITES ========================================================== */
/* ================================================================================ */

// Déclenchement des effets hover ----------------------------------------------------

$( document ).ready(function() {

$('#fr, #free').hover(function() { $('#chooseSquare1').css('opacity','0.4'); }, function() { $('#chooseSquare1').css('opacity','0.2'); });
$('#eng, #fast').hover(function() { $('#chooseSquare2').css('opacity','0.4'); }, function() { $('#chooseSquare2').css('opacity','0.2'); });
$('#ned, #per').hover(function() { $('#chooseSquare3').css('opacity','0.4'); }, function() { $('#chooseSquare3').css('opacity','0.2'); });
$('#deu, #scol').hover(function() { $('#chooseSquare4').css('opacity','0.4'); }, function() { $('#chooseSquare4').css('opacity','0.2'); });

});

/* ================================================================================ */
/* === MAP ======================================================================== */
/* ================================================================================ */

// Tableaux de coordonnées -----------------------------------------------------------

var coord1 = [];
coord1[ 0 ] = "0,0";
coord1[ 1 ] = "469,547";
coord1[ 2 ] = "230,732";
coord1[ 3 ] = "398,657";
coord1[ 4 ] = "464,659";
coord1[ 5 ] = "295,793";
coord1[ 6 ] = "295,858";
coord1[ 7 ] = "223,956";
coord1[ 8 ] = "296,1017";
coord1[ 9 ] = "296,1085";
coord1[ 10 ] = "231,1130";
coord1[ 11 ] = "438,1277";
coord1[ 12 ] = "278,1392";
coord1[ 13 ] = "776,469";
coord1[ 14 ] = "878,577";
coord1[ 15 ] = "941,568";
coord1[ 16 ] = "1081,527";
coord1[ 17 ] = "1150,538";
coord1[ 18 ] = "1469,369";
coord1[ 19 ] = "1530,343";
coord1[ 20 ] = "1596,354";
coord1[ 21 ] = "1674,381";
coord1[ 22 ] = "1735,290";
coord1[ 23 ] = "1340,591";
coord1[ 24 ] = "1342,656";
coord1[ 25 ] = "1287,746";
coord1[ 26 ] = "1341,833";
coord1[ 27 ] = "1478,846";
coord1[ 28 ] = "1552,846";
coord1[ 29 ] = "1374,942";
coord1[ 30 ] = "1442,924";
coord1[ 31 ] = "1509,924";
coord1[ 32 ] = "1797,912";
coord1[ 33 ] = "1797,987";
coord1[ 34 ] = "1409,1009";

var coord2 = [];
coord2[ 0 ] = "0,0";
coord2[ 1 ] = "469,547";
coord2[ 2 ] = "230,732";
coord2[ 3 ] = "398,657";
coord2[ 4 ] = "464,659";
coord2[ 5 ] = "295,793";
coord2[ 6 ] = "295,858";
coord2[ 7 ] = "223,956";
coord2[ 8 ] = "296,1017";
coord2[ 9 ] = "296,1085";
coord2[ 10 ] = "231,1130";
coord2[ 11 ] = "438,1277";
coord2[ 12 ] = "278,1392";
coord2[ 13 ] = "776,469";
coord2[ 14 ] = "878,577";
coord2[ 15 ] = "941,568";
coord2[ 16 ] = "1081,527";
coord2[ 17 ] = "1150,538";
coord2[ 18 ] = "1469,369";
coord2[ 19 ] = "1530,343";
coord2[ 20 ] = "1596,354";
coord2[ 21 ] = "1674,381";
coord2[ 22 ] = "1735,290";

var coord3 = [];
coord3[ 0 ] = "1340,591";
coord3[ 1 ] = "1342,656";
coord3[ 2 ] = "1287,746";
coord3[ 3 ] = "1341,833";
coord3[ 4 ] = "1478,846";
coord3[ 5 ] = "1552,846";
coord3[ 6 ] = "1374,942";
coord3[ 7 ] = "1442,924";
coord3[ 8 ] = "1509,924";
coord3[ 9 ] = "1797,912";
coord3[ 10 ] = "1797,987";
coord3[ 11 ] = "1409,1009";

// Ajout des Bulles sur la map -------------------------------------------------------

function populateMap1() {
    for (var i = 0; i < coord1.length; i++) {
        $('.landmarks').append('<div class="item mark"data-position="'+coord1[ i ]+'" data-show-at-zoom="0"><div class="lifiPointHolder" id="Lampe'+i+'"><div class="lifiPoint">'+i+'</div></div></div>');
    }
};

function populateMap2() {
    for (var i = 0; i < coord2.length; i++) {
        $('.landmarks').append('<div class="item mark" data-position="'+coord2[ i ]+'" data-show-at-zoom="0"><div class="lifiPointHolder" id="Lampe'+i+'"><div class="lifiPoint">'+i+'</div></div></div>');
    }
};

function populateMap3() {
    for (var i = 0; i < coord3.length; i++) {
        $('.landmarks').append('<div class="item mark" data-position="'+coord3[ i ]+'" data-show-at-zoom="0"><div class="lifiPointHolder" id="Lampe'+i+'"><div class="lifiPoint">'+i+'</div></div></div>');
    }
};

function addingSpotLights() {
    // Ajout artificiel de la borne actuelle en attendant de récupérer réelement l'info par Lifi
    // -----------------------------------------------------------------------------------------
    // (Lorsqu'on aura l'info Lifi il faudra Addclass lors de l'évènement Lifi 
    // sur la borne dont l'innerHtml correspond à la borne de l'évènement, retirer cette class de tout les autres, et ajouter une seconde class)
    var markcount = $(".landmarks .mark").length;
    var randomnumber=Math.floor(Math.random()*(markcount+1));
    $(".landmarks .mark:nth-child("+randomnumber+")").addClass("currentLifiPoint");
    $('.currentLifiPoint').css('z-index','10000000000000');
    // -----------------------------------------------------------------------------------------

    $('.mark').first().addClass('manIcon');
    $('.manIcon').removeClass('mark');

    // Position de la dernière biorne consultée (.currentLifiPoint)
    position= ($('.currentLifiPoint').attr('data-position'));
    positionArray= position.split(',');

    // Position de l'icone Visiteur'
    iconXPos = parseInt(positionArray[0])+parseInt(30);
    iconYPos = parseInt(positionArray[1])-parseInt(80);
    iconPosition = [iconXPos,iconYPos];
    $('.manIcon').attr('data-position', iconPosition);

    // Position de la dernière borne consultée (.currentLifiPoint)
    $('.currentLifiPoint').next().addClass('nextLifiPoint');
};

var localize = function () {

    $('#zoom_container').smoothZoom('focusTo',{
        x: positionArray[0],
        y: positionArray[1],
        zoom: 150,
        speed: 4
    });
            
};

function displayingMap() {
    $('#zoom_container').smoothZoom('destroy').css('background-image', 'url(zoom_assets/preloader.gif)').smoothZoom({ 
        image_url: 'img/NIVEAU1.png',       
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
        
function addingClicksFeatures() {

    $('#level1').mousedown(function() {
        $('#zoom_container').smoothZoom('destroy').css('background-image', 'url(zoom_assets/preloader.gif)').smoothZoom({ 
            image_url: 'img/NIVEAU1+pastilles.png'
        }); 
        $('.landmarks').empty();
        populateMap1();
        $('#zoom_container').smoothZoom('refreshAllLandmarks');
        window.setTimeout(addingSpotLights, 100);
        window.setTimeout(localize, 250);
        $('.level').removeClass('levelSelected');
        $(this).addClass('levelSelected');
        $('#floorHeadBand').css('background-color','#0ca4cc');   
    });

    $('#level2').mousedown(function() {
        $('#zoom_container').smoothZoom('destroy').css('background-image', 'url(zoom_assets/preloader.gif)').smoothZoom({ 
            image_url: 'img/NIVEAU1.png'
        }); 
        $('.landmarks').empty();
        populateMap2();
        $('#zoom_container').smoothZoom('refreshAllLandmarks');
        window.setTimeout(addingSpotLights, 100);
        window.setTimeout(localize, 250);
        $('.level').removeClass('levelSelected');
        $(this).addClass('levelSelected');
        $('#floorHeadBand').css('background-color','#9bd3c3'); 
    });

    $('#level3').mousedown(function() {
        $('#zoom_container').smoothZoom('destroy').css('background-image', 'url(zoom_assets/preloader.gif)').smoothZoom({ 
            image_url: 'img/NIVEAU1.png'
        }); 
        $('.landmarks').empty();
        populateMap3();
        $('#zoom_container').smoothZoom('refreshAllLandmarks');
        window.setTimeout(addingSpotLights, 100);
        window.setTimeout(localize, 250);
        $('.level').removeClass('levelSelected');
        $(this).addClass('levelSelected');
        $('#floorHeadBand').css('background-color','#e9af60'); 
    });

    $('#localize').mousedown(function() {
        localize();
    }); 
/*
    $('.lifiPointHolder').mousedown(function() {
        $.getJSON('data.json', function(data) {
            $.each( data, function( key, val ) {
                console.log(val.idLiFi);
                console.log(val.Oeuvre[0].idOeuvre);
                console.log(val.Oeuvre[0].FichierImage);
            });
        });
    });  */

    for (var i = 0; i < coord1.length; i++) {
        $('#Lampe'+i).mousedown( function(){
            console.log('Youpi');
            $.getJSON('data.json', function(data) {
                $.each( data, function( key, val ) {
                    console.log(data[0]);
                    console.log(val);
                    console.log(val.idLiFi);
                    console.log(val.Oeuvre[0].idOeuvre);
                    console.log(val.Oeuvre[0].FichierImage);
                });
            });
        });
    };

};
  
/*
jQuery(function($){
    populateMap1();
    displayingMap();
    window.setTimeout(addingSpotLights, 100);
    addingClicksFeatures();
    window.setTimeout(localize, 250);
});
*/
/*
function displayWorkOfArt() {
    $.getJSON('data.json', function(jd) {
        console.log(
            jd.idLiFi+'<br/>'+
            jd.Oeuvre[0].idOeuvre+'<br/>'+
            jd.Oeuvre[0].FichierImage+'<br/>')

        $('#stage').html('<p> Name: ' + jd.name + '</p>');
        $('#stage').append('<p>Age : ' + jd.age+ '</p>');
        $('#stage').append('<p> Sex: ' + jd.sex+ '</p>');
    });
};
*/




/*


elemToBeGenerated += "<ul>";
        elemToBeGenerated += "<li>" + val.idLiFi + "</li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].idOeuvre + "</li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].FichierImage + "</li>";
        elemToBeGenerated += "<li></li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].Adulte.FR.ChapeauOeuvre + "</li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].Adulte.FR.LegendeImage + "</li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].Adulte.FR.TitreOeuvre + "</li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].Adulte.FR.DescriptionOeuvre + "</li>";
        elemToBeGenerated += "<li></li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].Adulte.EN.ChapeauOeuvre + "</li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].Adulte.EN.LegendeImage + "</li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].Adulte.EN.TitreOeuvre + "</li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].Adulte.EN.DescriptionOeuvre + "</li>";
        elemToBeGenerated += "<li></li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].Adulte.DE.ChapeauOeuvre + "</li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].Adulte.DE.LegendeImage + "</li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].Adulte.DE.TitreOeuvre + "</li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].Adulte.DE.DescriptionOeuvre + "</li>";
        elemToBeGenerated += "<li></li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].Adulte.DU.ChapeauOeuvre + "</li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].Adulte.DU.LegendeImage + "</li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].Adulte.DU.TitreOeuvre + "</li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].Adulte.DU.DescriptionOeuvre + "</li>";
        elemToBeGenerated += "<li></li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].Enfant.FR.ChapeauOeuvre + "</li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].Enfant.FR.LegendeImage + "</li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].Enfant.FR.TitreOeuvre + "</li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].Enfant.FR.DescriptionOeuvre + "</li>";
        elemToBeGenerated += "<li></li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].Enfant.EN.ChapeauOeuvre + "</li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].Enfant.EN.LegendeImage + "</li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].Enfant.EN.TitreOeuvre + "</li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].Enfant.EN.DescriptionOeuvre + "</li>";
        elemToBeGenerated += "<li></li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].Enfant.DE.ChapeauOeuvre + "</li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].Enfant.DE.LegendeImage + "</li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].Enfant.DE.TitreOeuvre + "</li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].Enfant.DE.DescriptionOeuvre + "</li>";
        elemToBeGenerated += "<li></li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].Enfant.DU.ChapeauOeuvre + "</li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].Enfant.DU.LegendeImage + "</li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].Enfant.DU.TitreOeuvre + "</li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].Enfant.DU.DescriptionOeuvre + "</li>";
        elemToBeGenerated += "<li></li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].SousOeuvres[0].Id + "</li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].SousOeuvres[0].Fichier + "</li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].SousOeuvres[0].Adulte.FR.Descriptif + "</li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].SousOeuvres[0].Adulte.FR.Legende + "</li>";
        elemToBeGenerated += "<li></li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].SousOeuvres[0].Adulte.EN.Descriptif + "</li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].SousOeuvres[0].Adulte.EN.Legende + "</li>";
        elemToBeGenerated += "<li></li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].SousOeuvres[0].Adulte.DE.Descriptif + "</li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].SousOeuvres[0].Adulte.DE.Legende + "</li>";
        elemToBeGenerated += "<li></li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].SousOeuvres[0].Adulte.DU.Descriptif + "</li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].SousOeuvres[0].Adulte.DU.Legende + "</li>";
        elemToBeGenerated += "<li></li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].SousOeuvres[0].Enfant.FR.Descriptif + "</li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].SousOeuvres[0].Enfant.FR.Legende + "</li>";
        elemToBeGenerated += "<li></li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].SousOeuvres[0].Enfant.EN.Descriptif + "</li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].SousOeuvres[0].Enfant.EN.Legende + "</li>";
        elemToBeGenerated += "<li></li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].SousOeuvres[0].Enfant.DE.Descriptif + "</li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].SousOeuvres[0].Enfant.DE.Legende + "</li>";
        elemToBeGenerated += "<li></li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].SousOeuvres[0].Enfant.DU.Descriptif + "</li>";
        elemToBeGenerated += "<li>" + val.Oeuvre[0].SousOeuvres[0].Enfant.DU.Legende + "</li>";
*/




