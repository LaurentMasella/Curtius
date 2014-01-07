/*
RAPPEL:
------

- LOCALIZE est appelée avec un SetTimeout de 250ms, si les données mettent trop de de
temps à se charger et que localize ne fonctionne plus, chercher "localize"
- ADDINGCLICKSFEATURES idem avec un setTimeout de 100ms, chercher "addingClicksFeatures"

TODO :
------

- Cabler langues
- Cabler JSON
- Enlever loader
- Avoir toutes les datas des visites et les json complets

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
coordRDC[ 1 ] = "1375,780";

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
coord2[ 24 ] = "1402,304";
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
    if(markcount > 2) {
        var randomnumber=Math.floor(Math.random()*(markcount+1));
        $(".landmarks .mark:nth-child("+randomnumber+")").addClass("currentLifiPoint");
        $('.currentLifiPoint').css('z-index','10000000000000');
        $('.currentLifiPoint').prevAll('.mark').addClass('visitedLifiPoint');
        // -----------------------------------------------------------------------------------------

        // Position de la prochaine borne (.nextLifiPoint)
        $('.currentLifiPoint').next().addClass('nextLifiPoint');
    }
    else {
        $(".landmarks .mark:last-child").addClass("currentLifiPoint");
    }
     // Position de la dernière biorne consultée (.currentLifiPoint)
        position= ($('.currentLifiPoint').attr('data-position'));
        positionArray= position.split(',');

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
        
function addingClicksFeatures() {

    $('.mark').mousedown(function() {
        window.location = 'oeuvres.html';
    });

    $('#level1').mousedown(function() {
        $('#zoom_container').smoothZoom('destroy').css('background-image', 'url(zoom_assets/preloader.gif)').smoothZoom({ 
            image_url: 'img/lvl0.png',
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
        $('#floorHeadBand').css('background-color','#E2DBD3'); 
        $('#levels').css('border-color','#E2DBD3');  
    });

    $('#level2').mousedown(function() {
        $('#zoom_container').smoothZoom('destroy').css('background-image', 'url(zoom_assets/preloader.gif)').smoothZoom({ 
            image_url: 'img/lvl1.png',
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
            image_url: 'img/lvl2.png',
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
        $('#floorHeadBand').css('background-color','#EACA81'); 
        $('#levels').css('border-color','#EACA81');
    });

    $('#localize').mousedown(function() {
        localize();
    }); 

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
/* === DETAIL VIEW ================================================================ */
/* ================================================================================ */

// Couleur des SVG
function svgColor(){ 
    $('#artworkLeft').find('path').attr({'stroke':'#000','fill':'#000'});
    $('#resize').find('path').attr({'stroke':'#fff','fill':'#fff'});
};
window.setTimeout(svgColor, 100);

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
        border_SIZE: 0
    }); 
};

window.setTimeout(
    function(){

        if(location.pathname.indexOf('detail.html') != -1) {
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
        border_SIZE: 0
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
        border_SIZE: 0
        });
});

/* ================================================================================ */
/* === ARTWORK VIEW =============================================================== */
/* ================================================================================ */

$('.spacerTd').first().remove();

$('#slideBGArtworks img').mousedown(function() {
    window.location.href = "detail.html";
});

/* ================================================================================ */
/* === LANGUAGES ================================================================== */
/* ================================================================================ */


var lang = "fr";

function changeLang() {
    $('#fr').mousedown(function() { lang="fr"; console.log(lang); });
    $('#eng').mousedown(function() { lang="eng"; console.log(lang); });
    $('#ned').mousedown(function() { lang="ned"; console.log(lang); });
    $('#deu').mousedown(function() { lang="deu"; console.log(lang); });
}; changeLang();

function checkLang() {
    repetition = setTimeout(checkLang,50);   // Lancement de checkLang(); toutes les secs

    if(lang=="fr"){
        // Visits
        $('#free').html('Visite libre');
        $('#fast').html('Visite rapide');
        $('#per').html('Visite par période');
        $('#scol').html('Visite scolaire');
        // Lifi Explanation
        $('#lifiTitle').html('Comment ça marche ?');
        $('#lifiSubtitle').html('C\'est facile !');
        $('#lifiStep1').html('Etape <span>1</span> :');
        $('#lifiStep2').html('Etape <span>2</span> :');
        $('#lifiTxt1').html('La technologie Lifi utilise la lumière<br/> pour transmettre des données en haut débit.');
        $('#lifiTxt2').html('Placez-vous sous une source lumineuse.');
        $('#lifiTxt3').html('Lorsque vous êtes devant une borne<br/> elle vous localise et affiche automatiquement<br/> sur votre tablette les informations sur l\'oeuvre<br/> qui est devant vous.');
        $('#lifiNext').html('Suivant');
        // Map
        $('.legendBlock p').html('choix du niveau');
        $('#legend1 span').html('Votre localisation');
        $('#legend2 span').html('Sens de la visite');
        $('#legend3 span').html('Oeuvres<br/>non visitées');
        $('#legend4 span').html('Oeuvres visitées');
        $('#legend5 span').html('Oeuvre suivante');
        $('#legend6 span').html('Toilettes');
        $('#legend7 span').html('Escaliers');
        $('#legend8 span').html('Ascenseurs');
        $('#legendBlock6 p').html('Ma position');
        // Artworks
        $('#planButton').html('plan');
        $('#artItemsTitle').html('Sélectionnez une oeuvre');
        // Detail
        $('#detailButton .buttonText').html('Détail');
        $('#linkedArtworksButton .buttonText').html('Oeuvres liées');
        // Tools
        $('#toolsHeadband').html('Changer de langue ou de visite');
        $('#toolsLeft #chooseVisit').html('Choisissez votre visite');
        $('#toolsRight #chooseLang').html('Choisissez votre langue');
        $('#toolsValidate p').html('Êtes-vous sûr(e) de votre choix ?');
        $('.cancel').html('Annulez');
        $('.validate').html('Validez');  
    }

    if(lang=="eng"){$
        // Visits
        $('#free').html('Free visit');
        $('#fast').html('Quick visit');
        $('#per').html('Visit by period');
        $('#scol').html('School visit');
        // Lifi Explanation
        $('#lifiTitle').html('');
        $('#lifiSubtitle').html('');
        $('#lifiStep1','#lifiStep2').html('');
        $('#lifiTxt1').html('');
        $('#lifiTxt2').html('');
        $('#lifiTxt3').html('');
        $('#lifiNext').html('');
        // Map
        $('.legendBlock p').html('');
        $('#legend1 span').html('');
        $('#legend2 span').html('');
        $('#legend3 span').html('');
        $('#legend4 span').html('');
        $('#legend5 span').html('');
        $('#legend6 span').html('');
        $('#legend7 span').html('');
        $('#legend8 span').html('');
        $('#legendBlock6 p').html('');
        // Artworks
        $('#planButton').html('map');
        $('#artItemsTitle').html('Select an artwork');
        // Detail
        $('#detailButton .buttonText').html('Detail');
        $('#linkedArtworksButton .buttonText').html('Linked artworks');
        // Tools
        $('#toolsHeadband').html('Change language or visit');
        $('#toolsLeft #chooseVisit').html('Choose a visit');
        $('#toolsRight #chooseLang').html('Choose a language');
        $('#toolsValidate p').html('Are you sure about your choice ?');
        $('.cancel').html('Cancel');
        $('.validate').html('Confirm');  
    }
    if(lang=="ned"){
        // Visits
        $('#free').html('');
        $('#fast').html('');
        $('#per').html('');
        $('#scol').html('');
        // Lifi Explanation
        $('#lifiTitle').html('');
        $('#lifiSubtitle').html('');
        $('#lifiStep1','#lifiStep2').html('');
        $('#lifiTxt1').html('');
        $('#lifiTxt2').html('');
        $('#lifiTxt3').html('');
        $('#lifiNext').html('');
        // Map
        $('.legendBlock p').html('');
        $('#legend1 span').html('');
        $('#legend2 span').html('');
        $('#legend3 span').html('');
        $('#legend4 span').html('');
        $('#legend5 span').html('');
        $('#legend6 span').html('');
        $('#legend7 span').html('');
        $('#legend8 span').html('');
        $('#legendBlock6 p').html('');
        // Artworks
        $('#planButton').html('');
        $('#artItemsTitle').html('');
        // Detail
        $('#detailButton .buttonText').html('');
        $('#linkedArtworksButton .buttonText').html('');
        // Tools
        $('#toolsHeadband').html('');
        $('#toolsLeft #chooseVisit').html('');
        $('#toolsRight #chooseLang').html('');
        $('#toolsValidate p').html('');
        $('.cancel').html('');
        $('.validate').html('');  
    }
    if(lang=="deu"){
        // Visits
        $('#free').html('');
        $('#fast').html('');
        $('#per').html('');
        $('#scol').html('');
        // Lifi Explanation
        $('#lifiTitle').html('');
        $('#lifiSubtitle').html('');
        $('#lifiStep1','#lifiStep2').html('');
        $('#lifiTxt1').html('');
        $('#lifiTxt2').html('');
        $('#lifiTxt3').html('');
        $('#lifiNext').html('');
        // Map
        $('.legendBlock p').html('');
        $('#legend1 span').html('');
        $('#legend2 span').html('');
        $('#legend3 span').html('');
        $('#legend4 span').html('');
        $('#legend5 span').html('');
        $('#legend6 span').html('');
        $('#legend7 span').html('');
        $('#legend8 span').html('');
        $('#legendBlock6 p').html('');
        // Artworks
        $('#planButton').html('');
        $('#artItemsTitle').html('');
        // Detail
        $('#detailButton .buttonText').html('');
        $('#linkedArtworksButton .buttonText').html('');
        // Tools
        $('#toolsHeadband').html('');
        $('#toolsLeft #chooseVisit').html('');
        $('#toolsRight #chooseLang').html('');
        $('#toolsValidate p').html('');
        $('.cancel').html('');
        $('.validate').html('');  
    }       
};
checkLang();

/* ================================================================================ */
/* === TOOLS ====================================================================== */
/* ================================================================================ */

function selectTools() {
    $('.lang').mousedown(function() { 
        $('.lang').parent().removeClass('paramSelected'); 
        $(this).parent().addClass('paramSelected'); 
    });
    $('.visit').mousedown(function() { 
        $('.visit').parent().removeClass('paramSelected'); 
        $(this).parent().addClass('paramSelected'); 
    });
}; selectTools();

function openTools() {
    $('#artworksinfos, #artworksinfosMap').mousedown(function() { 
        window.location = 'tools.html'; 
    });
}; openTools();

function closeTools() {
    $('.cancel, .validate').mousedown(function() { 
        event.preventDefault();
        history.back(1); 
    });
}; closeTools();

function backToMap() {
    $('#planButton').mousedown(function() { 
        window.location = 'map.html';
    });
}; backToMap();


