/*
RAPPEL:
------

- LOCALIZE est appelée avec un SetTimeout de 250ms, si les données mettent trop de de
temps à se charger et que localize ne fonctionne plus, chercher "localize"
- ADDINGCLICKSFEATURES idem avec un setTimeout de 100ms, chercher "addingClicksFeatures"

TODO :
------

- Avoir les bonnes images de chaque étage
- Faire la css des bulles

- comment afficher les infos de la borne lifi ?
- Faire dépendre les tableaux de Bubbles du type de visite choisie
--> Si la bulle cliquée à l'id Lampe[i] alors j'affiche la page contenant les infos de [i]
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
/* === MAP ======================================================================== */
/* ================================================================================ */

// Tableaux de coordonnées -----------------------------------------------------------

var coordRDC = [];

var coord1 = [];
coord1[ 1 ] = "448,493";
coord1[ 2 ] = "241,669";
coord1[ 3 ] = "406,641";
coord1[ 4 ] = "470,641";
coord1[ 5 ] = "271,751";
coord1[ 6 ] = "273,817";
coord1[ 7 ] = "225,926";
coord1[ 8 ] = "319,969";
coord1[ 9 ] = "319,1038";
coord1[ 10 ] = "252,1057";
coord1[ 11 ] = "473,1259";
coord1[ 12 ] = "271,1351";
coord1[ 13 ] = "737,452";
coord1[ 14 ] = "890,548";
coord1[ 15 ] = "960,539";
coord1[ 16 ] = "1086,515";
coord1[ 17 ] = "1146,539";
coord1[ 18 ] = "1376,366";
coord1[ 19 ] = "1444,347";
coord1[ 20 ] = "1512,343";
coord1[ 21 ] = "1585,366";
coord1[ 22 ] = "1657,283";
coord1[ 23 ] = "1302,604";
coord1[ 24 ] = "1308,664";
coord1[ 25 ] = "1273,753";
coord1[ 26 ] = "1313,814";
coord1[ 27 ] = "1444,836";
coord1[ 28 ] = "1514,836";
coord1[ 29 ] = "1350,909";
coord1[ 30 ] = "1414,911";
coord1[ 31 ] = "1474,912";
coord1[ 32 ] = "1727,897";
coord1[ 33 ] = "1727,963";
coord1[ 34 ] = "1320,968";

var coord2 = [];
coord2[ 1 ] = "268,461";
coord2[ 2 ] = "321,500";
coord2[ 3 ] = "382,494";
coord2[ 4 ] = "497,486";
coord2[ 5 ] = "442,529";
coord2[ 6 ] = "237,582";
coord2[ 7 ] = "387,626";
coord2[ 8 ] = "436,588";
coord2[ 9 ] = "477,631";
coord2[ 10 ] = "264,1230";
coord2[ 11 ] = "269,1383";
coord2[ 12 ] = "471,1454";
coord2[ 13 ] = "753,486";
coord2[ 14 ] = "876,543";
coord2[ 15 ] = "927,388";
coord2[ 16 ] = "929,475";
coord2[ 17 ] = "974,430";
coord2[ 18 ] = "1002,490";
coord2[ 19 ] = "1070,408";
coord2[ 20 ] = "1153,463";
coord2[ 21 ] = "1263,324";
coord2[ 22 ] = "1310,282";
coord2[ 23 ] = "1366,261";
coord2[ 24 ] = "1402,354";
coord2[ 25 ] = "1441,255";
coord2[ 26 ] = "1558,242";
coord2[ 27 ] = "1598,351";
coord2[ 28 ] = "1391,433";
coord2[ 29 ] = "1338,508";
coord2[ 30 ] = "1344,623";
coord2[ 31 ] = "1358,697";
coord2[ 32 ] = "1358,758";
coord2[ 33 ] = "1362,818";
coord2[ 34 ] = "1366,880";
coord2[ 35 ] = "1375,945";
coord2[ 36 ] = "1440,941";
coord2[ 37 ] = "1537,829";
coord2[ 38 ] = "1532,915";
coord2[ 39 ] = "1734,789";
coord2[ 40 ] = "1780,834";
coord2[ 41 ] = "1696,980";
coord2[ 42 ] = "1760,978";

// Ajout des Bulles sur la map -------------------------------------------------------

function populateMapRDC() {
    for (var i = 0; i < coordRDC.length; i++) {
        $('.landmarks').append('<div class="item mark"data-position="'+coordRDC[ i ]+'" data-show-at-zoom="0"><div class="lifiPointHolder" id="Lampe'+i+'"><div class="lifiPoint">'+i+'</div></div></div>');
    }
};

function populateMap1() {
    for (var i = 0; i < coord1.length; i++) {
        floor1Num = i+parseInt(coordRDC.length);
        $('.landmarks').append('<div class="item mark" data-position="'+coord1[ i ]+'" data-show-at-zoom="0"><div class="lifiPointHolder" id="Lampe'+floor1Num+'"><div class="lifiPoint">'+floor1Num+'</div></div></div>');
    }
};

function populateMap2() {
    for (var i = 0; i < coord2.length; i++) {
        floor2Num = i+parseInt(coordRDC.length)+parseInt(coord1.length)-1;
        $('.landmarks').append('<div class="item mark" data-position="'+coord2[ i ]+'" data-show-at-zoom="0"><div class="lifiPointHolder" id="Lampe'+floor2Num+'"><div class="lifiPoint">'+floor2Num+'</div></div></div>');
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
    $('.currentLifiPoint').prevAll('.mark').addClass('visitedLifiPoint');
    // -----------------------------------------------------------------------------------------

    // Position de la dernière biorne consultée (.currentLifiPoint)
    position= ($('.currentLifiPoint').attr('data-position'));
    positionArray= position.split(',');

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
        image_url: 'img/NIVEAU1+440.png',       
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
            image_url: 'img/NIVEAU1+440.png',
            zoom_MAX:'150'
        }); 
        $('.landmarks').empty();
        if(coordRDC.length){
            populateMapRDC();
            $('#zoom_container').smoothZoom('refreshAllLandmarks');
            window.setTimeout(addingSpotLights, 100);
            window.setTimeout(localize, 250);
        }
        $('.level').removeClass('levelSelected');
        $(this).addClass('levelSelected');
        $('#floorHeadBand').css('background-color','#0ca4cc'); 
        $('#levels').css('border-color','#0ca4cc');  
    });

    $('#level2').mousedown(function() {
        $('#zoom_container').smoothZoom('destroy').css('background-image', 'url(zoom_assets/preloader.gif)').smoothZoom({ 
            image_url: 'img/NIVEAU1+440.png',
            zoom_MAX:'150'
        }); 
        $('.landmarks').empty();
        if(coord1.length){
            populateMap1();
            $('#zoom_container').smoothZoom('refreshAllLandmarks');
            window.setTimeout(addingSpotLights, 100);
            window.setTimeout(localize, 250);
        }
        $('.level').removeClass('levelSelected');
        $(this).addClass('levelSelected');
        $('#floorHeadBand').css('background-color','#9bd3c3');
        $('#levels').css('border-color','#9bd3c3'); 
    });

    $('#level3').mousedown(function() {
        $('#zoom_container').smoothZoom('destroy').css('background-image', 'url(zoom_assets/preloader.gif)').smoothZoom({ 
            image_url: 'img/NIVEAU1+440.png',
            zoom_MAX:'150'
        }); 
        $('.landmarks').empty();
        if(coord2.length){
            populateMap2();
            $('#zoom_container').smoothZoom('refreshAllLandmarks');
            window.setTimeout(addingSpotLights, 100);
            window.setTimeout(localize, 250);
        }
        $('.level').removeClass('levelSelected');
        $(this).addClass('levelSelected');
        $('#floorHeadBand').css('background-color','#e9af60'); 
        $('#levels').css('border-color','#e9af60');
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

/* ================================================================================ */
/* === ARTWORK VIEW =============================================================== */
/* ================================================================================ */

// Couleur des SVG
function bidule(){ 
    $('#artworkLeft').find('path').attr({'stroke':'#000','fill':'#000'});
    $('#resize').find('path').attr({'stroke':'#fff','fill':'#fff'});
};
window.setTimeout(bidule, 100);

// --- BOUTON DETAIL ------------------------------------ //

/*
$('.si-icon-hamburger-cross').mousedown(function() {
    if($(this).hasClass('si-icon-unselected')){
        // Bouton noir
        $(this).find('path').attr('stroke','#fff');
        $('#detailButton').css('background-color','#000');
        $('#detailButton').css('color','#fff');
        $(this).removeClass('si-icon-unselected');
        $(this).addClass('si-icon-selected');
        // Fenêtres à droite
        $('#artworkZoomHolder').removeClass('goLeft');
        $('#artworkZoomHolder').addClass('goRight');
        $('#artworkDetail').removeClass('goLeft').css('opacity','1');
        $('#artworkDetail').addClass('goRight');
        // Autre bouton blanc
        // Autre fenêtre à gauche
        if($('.si-icon-hamburger-cross2').hasClass('si-icon-selected')){
            $('.si-icon-hamburger-cross2').click();
            $('.si-icon-hamburger-cross2').mousedown();
            $('.si-icon-hamburger-cross2').find('path').attr('stroke','#000');
            $('#linkedArtworksButton').css('background-color','#fff');
            $('#linkedArtworksButton').css('color','#000');
            $('#artworkLinks').removeClass('goRight').css('opacity','0');;
            $('#artworkLinks').addClass('goLeft');
            $('#artworkZoomHolder').removeClass('goLeft');
            $('#artworkZoomHolder').addClass('goRight');
        }
    }
    else {
        // Bouton blanc
        $(this).find('path').attr('stroke','#000');
        $('#detailButton').css('background-color','#fff');
        $('#detailButton').css('color','#000');
        $(this).removeClass('si-icon-selected');
        $(this).addClass('si-icon-unselected');
        // Fenêtres à gauche
        $('#artworkZoomHolder').removeClass('goRight');
        $('#artworkZoomHolder').addClass('goLeft');
        $('#artworkDetail').removeClass('goRight').css('opacity','0');
        $('#artworkDetail').addClass('goLeft');
    };
    
});

// --- BOUTON OEUVRES LIEES ------------------------------------ //

$('.si-icon-hamburger-cross2').mousedown(function() {
    if($(this).hasClass('si-icon-unselected')){
        // Bouton noir
        $(this).find('path').attr('stroke','#fff');
        $('#linkedArtworksButton').css('background-color','#000');
        $('#linkedArtworksButton').css('color','#fff');
        $(this).removeClass('si-icon-unselected');
        $(this).addClass('si-icon-selected');
        // Fenêtre à droite
        $('#artworkZoomHolder').removeClass('goLeft');
        $('#artworkZoomHolder').addClass('goRight');
        $('#artworkLinks').removeClass('goLeft').css('opacity','1');
        $('#artworkLinks').addClass('goRight');
        // Autre bouton blanc
        // Autre fenêtre à gauche
        if($('.si-icon-hamburger-cross').hasClass('si-icon-selected')){
            $('.si-icon-hamburger-cross').click();
            $('.si-icon-hamburger-cross').mousedown();
            $('.si-icon-hamburger-cross').find('path').attr('stroke','#000');
            $('#detailButton').css('background-color','#fff');
            $('#detailButton').css('color','#000');
            $('#artworkDetail').removeClass('goRight').css('opacity','0');;
            $('#artworkDetail').addClass('goLeft');
            $('#artworkZoomHolder').removeClass('goLeft');
            $('#artworkZoomHolder').addClass('goRight');
        }
    }
    else {
        // Bouton blanc
        $(this).find('path').attr('stroke','#000');
        $('#linkedArtworksButton').css('background-color','#fff');
        $('#linkedArtworksButton').css('color','#000');
        $(this).removeClass('si-icon-selected');
        $(this).addClass('si-icon-unselected');
        // Fenêtres à gauche
        $('#artworkZoomHolder').removeClass('goRight');
        $('#artworkZoomHolder').addClass('goLeft');
        $('#artworkLinks').removeClass('goRight').css('opacity','0');
        $('#artworkLinks').addClass('goLeft');
    };
    
});
*/

// --- BOUTON DETAIL ------------------------------------ //

$('#detailButton').mousedown(function() {
    $('.si-icon-hamburger-cross').click();
    if($('.si-icon-hamburger-cross').hasClass('si-icon-unselected')){
        // Bouton noir
        $('.si-icon-hamburger-cross').find('path').attr('stroke','#fff');
        $('#detailButton').css('background-color','#000');
        $('#detailButton').css('color','#fff');
        $('.si-icon-hamburger-cross').removeClass('si-icon-unselected');
        $('.si-icon-hamburger-cross').addClass('si-icon-selected');
        // Fenêtres à droite
        $('#artworkZoomHolder').removeClass('goLeft');
        $('#artworkZoomHolder').addClass('goRight');
        $('#artworkDetail').removeClass('goLeft').css('opacity','1');
        $('#artworkDetail').addClass('goRight');
        // Autre bouton blanc
        // Autre fenêtre à gauche
        if($('.si-icon-hamburger-cross2').hasClass('si-icon-selected')){
            //$('.si-icon-hamburger-cross2').click();
            $('#linkedArtworksButton').mousedown();
            $('.si-icon-hamburger-cross2').find('path').attr('stroke','#000');
            $('#linkedArtworksButton').css('background-color','#fff');
            $('#linkedArtworksButton').css('color','#000');
            $('#artworkLinks').removeClass('goRight').css('opacity','0');;
            $('#artworkLinks').addClass('goLeft');
            $('#artworkZoomHolder').removeClass('goLeft');
            $('#artworkZoomHolder').addClass('goRight');
        }
    }
    else {
        // Bouton blanc
        $('.si-icon-hamburger-cross').find('path').attr('stroke','#000');
        $('#detailButton').css('background-color','#fff');
        $('#detailButton').css('color','#000');
        $('.si-icon-hamburger-cross').removeClass('si-icon-selected');
        $('.si-icon-hamburger-cross').addClass('si-icon-unselected');
        // Fenêtres à gauche
        $('#artworkZoomHolder').removeClass('goRight');
        $('#artworkZoomHolder').addClass('goLeft');
        $('#artworkDetail').removeClass('goRight').css('opacity','0');
        $('#artworkDetail').addClass('goLeft');
    };
    
});

// --- BOUTON OEUVRES LIEES ------------------------------------ //

$('#linkedArtworksButton').mousedown(function() {
    $('.si-icon-hamburger-cross2').click();
    if($('.si-icon-hamburger-cross2').hasClass('si-icon-unselected')){
        // Bouton noir
        $('.si-icon-hamburger-cross2').find('path').attr('stroke','#fff');
        $('#linkedArtworksButton').css('background-color','#000');
        $('#linkedArtworksButton').css('color','#fff');
        $('.si-icon-hamburger-cross2').removeClass('si-icon-unselected');
        $('.si-icon-hamburger-cross2').addClass('si-icon-selected');
        // Fenêtre à droite
        $('#artworkZoomHolder').removeClass('goLeft');
        $('#artworkZoomHolder').addClass('goRight');
        $('#artworkLinks').removeClass('goLeft').css('opacity','1');
        $('#artworkLinks').addClass('goRight');
        // Autre bouton blanc
        // Autre fenêtre à gauche
        if($('.si-icon-hamburger-cross').hasClass('si-icon-selected')){
            //$('.si-icon-hamburger-cross').click();
            $('#detailButton').mousedown();
            $('.si-icon-hamburger-cross').find('path').attr('stroke','#000');
            $('#detailButton').css('background-color','#fff');
            $('#detailButton').css('color','#000');
            $('#artworkDetail').removeClass('goRight').css('opacity','0');;
            $('#artworkDetail').addClass('goLeft');
            $('#artworkZoomHolder').removeClass('goLeft');
            $('#artworkZoomHolder').addClass('goRight');
        }
    }
    else {
        // Bouton blanc
        $('.si-icon-hamburger-cross2').find('path').attr('stroke','#000');
        $('#linkedArtworksButton').css('background-color','#fff');
        $('#linkedArtworksButton').css('color','#000');
        $('.si-icon-hamburger-cross2').removeClass('si-icon-selected');
        $('.si-icon-hamburger-cross2').addClass('si-icon-unselected');
        // Fenêtres à gauche
        $('#artworkZoomHolder').removeClass('goRight');
        $('#artworkZoomHolder').addClass('goLeft');
        $('#artworkLinks').removeClass('goRight').css('opacity','0');
        $('#artworkLinks').addClass('goLeft');
    };
    
});

// Hack pour corriger le double lancement lorsqu'on clic sur le svg, on relance le clic une fois ici.
$('.si-icon-hamburger-cross, .si-icon-hamburger-cross2').mousedown(function() {
    $(this).click();
});

// --- ZOOM IMAGE ------------------------------------ //

function displayingArtImage() {
    $('#artworkZoom').smoothZoom({ 
        image_url: 'img/oeuvre.jpg',
        width: 400,
        responsive: false,
        responsive_maintain_ratio: true,
        max_WIDTH: '',
        max_HEIGHT: '',
        zoom_BUTTONS_SHOW: false,
        pan_BUTTONS_SHOW: false,
        zoom_MAX:'150',
        initial_ZOOM: '0',
        border_SIZE: 0,
    }); 
};

window.setTimeout(
    function(){

        if(location.pathname.indexOf('oeuvres.html') != -1) {
            displayingArtImage();                   
        }
    }
, 50);

$('#zoomLauncher').mousedown(function() {
    var opacityCheck = $('#artworkLinks').css('opacity');
    var opacityCheck2 = $('#artworkDetail').css('opacity');
    if( opacityCheck == '1' || opacityCheck2 == '1' ){
        $('#artworkZoomHolder').css('left','-250px');
    }
    else{
        $('#artworkZoomHolder').css('left','140px');
    }
    $('#artworkZoomHolder').css({'width':'+=600px','height':'+=100px','top':'-=50px'});
    $('#artworkZoom').css({'width':'+=600px','height':'+=100px'});
    $('#artworkLinks').css('opacity','0');
    $('#artworkDetail').css('opacity','0');
    $('#artworkLeft').css('opacity','0');
    $('#zoomBack').css('display','block');
    $('#planButton').css('display','none');    
    $(this).css('display','none');
    $('.si-icon-maximize-rotate').click();
    $('#artworkZoom').smoothZoom('destroy').css('background-image', 'url(zoom_assets/preloader.gif)').smoothZoom({ 
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
        border_SIZE: 0,
        }); 
});

$('#zoomBack, .si-icon-maximize-rotate svg').mousedown(function() {
    if($('.si-icon-hamburger-cross').hasClass('si-icon-selected')){
        $('#artworkDetail').css('opacity','1');
    }
    if($('.si-icon-hamburger-cross2').hasClass('si-icon-selected')){
        $('#artworkLinks').css('opacity','1');
    }
    $('#artworkLeft').css('opacity','1');
    $('#artworkZoomHolder').css({'width':'-=600px','height':'-=100px','top':'+=50px','left':'440px'});
    $('#artworkZoom').css({'width':'-=600px','height':'-=100px'});
    $('#zoomBack').css('display','none');
    $('#planButton').css('display','block');
    $('#zoomLauncher').css('display','block');
    $('.si-icon-maximize-rotate').click();
    $('#artworkZoom').smoothZoom('destroy').css('background-image', 'url(zoom_assets/preloader.gif)').smoothZoom({ 
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
        border_SIZE: 0,
        });
});













/*
jQuery(function($){
    populateMap1();
    displayingMap();
    window.setTimeout(addingSpotLights, 100);
    addingClicksFeatures();
    window.setTimeout(localize, 250);
});
*/

