$(document).ready(function () {
    
    "use strict";
    
    // Preloader
    
    $(window).load(function () { // makes sure the whole site is loaded
        $('.page-preloader spinner').fadeOut(); // will first fade out the loading animation
        $('.page-preloader').delay(350).fadeOut('slow');
        // will fade out the white DIV that covers the website.
        $('body').delay(350).css({
            'overflow': 'visible'
        });
    })
    
    // Animated typing text

    $(".animated-text").typed({
        strings: [
            "Innovación",
            "Desarrollo de Software",
            "Tecnología de Punta",
            "Soluciones Iot",
            "Automatización de procesos",
            "Electricidad y Electronica",
            "Y Mucho Mas"
        ],
        typeSpeed: 120,
        loop: true,
    });

    // PopUp Effect

    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    });

    $.extend(true, $.magnificPopup.defaults, {
        iframe: {
            patterns: {
                youtube: {
                    index: 'youtube.com/',
                    id: 'v=',
                    src: 'http://www.youtube.com/embed/%id%?autoplay=1'
                }
            }
        }
    });

    // Owl Clients

    $("#owl-clients").owlCarousel({

        autoPlay: 3000, //Set AutoPlay to 3 seconds

        items: 3,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3]

    });

    // Owl Testimonils

    $("#owl-testimonials").owlCarousel({
        navigation: false, // Show next and prev buttons
        slideSpeed: 600,
        paginationSpeed: 400,
        singleItem: true,
        transitionStyle: "goDown",
        autoPlay: true
    });


    $('#sendEmailCall').on('click', sendEmailCall);
    $('#sendEmailMessage').on('click', sendEmailMessage);

    // Snazzy Maps
    //google.maps.event.addDomListener(window, 'load', init);

    /*function init() {
        // Basic options for a simple Google Map
        // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
        var mapOptions = {
            // How zoomed in you want the map to start at (always required)
            zoom: 15,

            // The latitude and longitude to center the map (always required)
            center: new google.maps.LatLng(33.5912284, -7.5210958, 17.18), // Casablanca

            // Disables the default Google Maps UI components
            disableDefaultUI: true,
            scrollwheel: false,

            // How you would like to style the map. 
            // This is where you would paste any style found on Snazzy Maps.
            styles: [{
                "stylers": [{
                    "hue": "#f23c7e"
                }, {
                    "saturation": 150
                }]
            }, {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{
                    "lightness": 50
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            }]
        };

        // Get the HTML DOM element that will contain your map 
        // We are using a div with id="map" seen below in the <body>
        var mapElement = document.getElementById('map');

        // Create the Google Map using out element and options defined above
        var map = new google.maps.Map(mapElement, mapOptions);
        var myLatLng = new google.maps.LatLng(33.592501, -7.522318);
        // Custom Map Marker Icon - Customize the map-marker.png file to customize your icon
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: 'Hello World!'
        });
    }*/
    
});

function sendEmailCall() {
$('#sendEmailCall').attr("disabled", true);

    if($('#nombreCompleto').val() === "" || $('#nombreCompleto').val() === null ||  $('#cellPhone').val() === "" || $('#cellPhone').val() === null){
        setMsgSenEmail("El mensaje debe contener por lo menos el nombre y el numero telefonico");
        $('.status-send-email').show(1000);
        $('.status-send-email').css('background','#dec5bf');
        $('#sendEmailCall').attr("disabled", false);
    }else{
        var data = {
            action: "sendEmail", 
            nombreCompleto: $('#nombreCompleto').val() ,
            email:$('#email').val(), 
            cellPhone:$('#cellPhone').val(),
            mensaje: "Llamar a nuevo posible cliente"
        }
    
        generateAjax("POST", data, (call)=>{
    
            if(call.state === "SUCCES"){
                setMsgSenEmail("! Gracias por contactarnos, en breve un asesor se comunicará con tigo !");
                $('.status-send-email').show(1000);
            }else{
                setMsgSenEmail("En el momento no nos encontramos disponibles, por favor intentalo mas tarde o dejanos un mensaje "+ 
                               "<a href='#contact'> en el siguiente link </a>");
                $('.status-send-email').show(1000);
            }
    
            setTimeout(function(){
                $('.status-send-email').hide(1000);
            },5000)
            $('#sendEmailCall').attr("disabled", false);
        },
        (error)=>{
            setMsgSenEmail("En el momento no nos encontramos disponibles, por favor intentalo mas tarde");
            $('.status-send-email').show(1000);
            setTimeout(function(){
                $('.status-send-email').hide(1000);
            },10000)
    
            $('#sendEmailCall').attr("disabled", false);
        });
    }
}

function sendEmailMessage() {
    $('#sendEmailMessage').attr("disabled", true);
    debugger
    
        if($('.email').val() === "" || $('.email').val() === null ||  $('.mensaje').val() === "" || $('#mensaje').val() === null){
            setMsgSenEmailMesaage("Se debe digitar por lo menos el correo y el mensaje");
            $('.status-send-email-message').show(1000);
            $('.status-send-email-message').css('background','#dec5bf');
            $('#sendEmailMessage').attr("disabled", false);
        }else{
            var data = {
                action: "sendEmail", 
                nombreCompleto: $('.nombreCompleto').val() ,
                email:$('.email').val(), 
                cellPhone:"333333333",
                mensaje: $('.mensaje').val()
            }
        
            generateAjax("POST", data, (call)=>{
        
                if(call.state === "SUCCES"){
                    setMsgSenEmailMesaage("! Gracias por contactarnos, en breve un asesor se comunicará con tigo !");
                    $('.status-send-email-message').show(1000);
                }else{
                    setMsgSenEmailMesaage("En el momento no nos encontramos disponibles, por favor intentalo mas tarde o dejanos un mensaje "+ 
                                   "<a href='#contact'> en el siguiente link </a>");
                    $('.status-send-email-message').show(1000);
                }
        
                setTimeout(function(){
                    $('.status-send-email-message').hide(1000);
                },5000)
                $('#sendEmailMessage').attr("disabled", false);
            },
            (error)=>{
                setMsgSenEmailMesaage("En el momento no nos encontramos disponibles, por favor intentalo mas tarde");
                $('.status-send-email-message').show(1000);
                setTimeout(function(){
                    $('.status-send-email-message').hide(1000);
                },10000)
        
                $('#sendEmailMessage').attr("disabled", false);
            });
        }
    }

function setMsgSenEmail(message){
    $('.status-send-email').css('background','#93ef93');
    $('.status-send-email').html(message);
}

function setMsgSenEmailMesaage(message){
    $('.status-send-email-message').css('background','#93ef93');
    $('.status-send-email-message').html(message);
}

function cleanForms() {
   
        $('#nombreCompleto').val('');
        $('#email').val(''); 
        $('#cellPhone').val('');
        $('.nombreCompleto').val('');
        $('.email').val(''); 
        $('.mensaje').val('');
    
}


var urlServices = "http://giraldostecnologia.co/services/rest.php";
function generateAjax(tipo,data, funSuccess, funError){
  
    $.ajax({
        url : urlServices,
        type: tipo,
        data : data,
        success: function(data, textStatus, jqXHR)
        {

			funSuccess(JSON.parse(data));
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            funError(errorThrown);
        },
    });


}