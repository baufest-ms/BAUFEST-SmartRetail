"use strict";

var bf = bf || {};
bf.smartretail = bf.smartretail || {};

bf.smartretail.panel = {

    gender_es: {
        'male': 'Hombre',
        'female': 'Mujer',
    },

    emotions_es: {
        'Anger': 'Enojo',
        'Contempt': 'Desprecio',
        'Disgust': 'Asco',
        'Fear': 'Miedo',
        'Happiness': 'Felicidad',
        'Neutral': 'Neutralidad',
        'Sadness': 'Tristeza',
        'Surprise': 'Sorpresa'
    },

    init: function () {
        bf.smartretail.core.setup();

        $('#VideoPlayerContainer').on('click', bf.smartretail.panel.capture);
        $('#Do-Capture').on('click', bf.smartretail.panel.capture);
        $('#Do-PlayAgain').on('click', bf.smartretail.panel.play);
        $('#Do-Retry').on('click', bf.smartretail.panel.play);

        bf.smartretail.panel.play();
    },

    reset: function (e) {
        if (e) {
            e.preventDefault();
        }

        $('#Customer-Fullname').val('');
        $('#Customer-Email').val('');
        //$('#Customer-Gender').html('');
        //$('#Customer-Age').html('');
        //$('#Customer-Photo').attr('src', '');
        $('#Customer-Score').html('').css('color', '');
        $('#Customer-Emotion').html('');
        $('#Customer-Purchases').html('');
        $('#Customer-Visualizations').html('');

        $('#PictureCanvasContainer').addClass('d-none');
        $('#VideoPlayerContainer').removeClass('d-none');

        $('#Do-Capture i.fas').removeClass('disabled');

        $('#Panel-Products').addClass('d-none');
        $('#Panel-Msgs').addClass('d-none');
        $('#Panel-Wait').removeClass('d-none');

        $('#Area-WIP').addClass('d-none');
        $('#Area-Alert').addClass('d-none');

        $('#Show-Msg').html('');
    },

    play: function (e) {
        if (e) {
            e.preventDefault();
        }

        bf.smartretail.core.reset();

        bf.smartretail.panel.reset(e);
    },

    capture: function (e) {
        e.preventDefault();

        if (!$('#Panel-Wait').is(':visible')) {
            return;
        }

        $('#Panel-Wait').addClass('d-none');
        $('#Panel-Msgs').removeClass('d-none');
        $('#Area-WIP').removeClass('d-none');

        $('#VideoPlayerContainer').addClass('d-none');
        $('#PictureCanvasContainer').removeClass('d-none');

        $('#Do-Capture i.fas').addClass('disabled');

        try {
            bf.smartretail.core.analizePicture(bf.smartretail.panel.show, bf.smartretail.panel.handle);
        } catch (err) {
            bf.smartretail.panel.handle();
        }
    },

    show: function (result) {
        $('#Panel-Msgs').addClass('d-none');
        $('#Area-WIP').addClass('d-none');

        if (result.length == 1) {
            var color = bf.smartretail.core.getColorForPercentage(result[0].Confidence);

            bf.smartretail.core.drawFaceRectangle(
                color,
                result[0].FaceRectangle.Left,
                result[0].FaceRectangle.Top,
                result[0].FaceRectangle.Width,
                result[0].FaceRectangle.Height
            );

            if (result[0].Id > 0) {
                //bf.smartretail.core.addFaceName(
                //    result[0].Fullname,
                //    color,
                //    result[0].FaceRectangle.Left + (result[0].FaceRectangle.Width / 2),
                //    result[0].FaceRectangle.Top + result[0].FaceRectangle.Height + 17
                //);

                $('#Customer-Fullname').val(result[0].Fullname).trigger('focusin');
                $('#Customer-Email').val(result[0].Email).trigger('focusin');
                //$('#Customer-Gender').html(bf.smartretail.panel.gender_es[result[0].Gender]);
                //$('#Customer-Age').html(result[0].Age);
                //$('#Customer-Photo').attr('src', '/Home/GetCustomerPhoto/' + result[0].PhotoId);
                $('#Customer-Score').html((result[0].Confidence * 100).toFixed(2) + ' %');

                var emotion_score = 0;
                var emotion_desc = '-';
                $.each(bf.smartretail.panel.emotions_es, function (emotion, emotion_es) {
                    if (result[0].Emotions[emotion] > emotion_score) {
                        emotion_score = result[0].Emotions[emotion];
                        emotion_desc = emotion_es;
                    }
                });
                $('#Customer-Emotion').html(emotion_desc + ' (' + (emotion_score * 100).toFixed(2) + ' %)');

                for (var i = 0, html = ''; i < result[0].Purchases.length; i++) {
                    html = html + bf.smartretail.panel.buildCard(result[0].Purchases[i].Product);
                }
                $('#Customer-Purchases').html(html);

                for (var i = 0, html = ''; i < result[0].Visualizations.length; i++) {
                    html = html + bf.smartretail.panel.buildCard(result[0].Visualizations[i].Product);
                }
                $('#Customer-Visualizations').html(html);

                $('#Panel-Products').removeClass('d-none');

            } else {
                bf.smartretail.panel.handle('No se puede reconocer a la persona en la fotografía<br/>Por favor, volvé a tomar otra foto...');
            }
        } else if (result.length > 1) {
            bf.smartretail.panel.handle('Hemos detectado más de un rostro en la foto<br/>Por favor, volvé a tomar otra foto...');
        } else {
            bf.smartretail.panel.handle('¿Estás seguro de que saliste bien en la foto?<br/>No hemos podido detectar ningún rostro...');
        }
    },

    buildCard: function (product) {
        return '<div class="card">'
             + '	<img class="card-img-top" src="/Images/Products/' + product.Code + '.jpg" alt="' + product.Name + '">'
             + '	<div class="card-body">'
             + '		<div class="row">'
             + '			<div class="col-7 pr-0">'
             + '				<h3 class="card-title">' + product.Name + '</h3>'
             + '			</div>'
             + '			<div class="col-5 text-center">'
             + '				<p class="price">$ ' + product.Price + '</p>'
             + '			</div>'
             + '		</div>'
             + '		<div class="row">'
             + '			<div class="col-12">'
             + '				<p class="calif">'
             + '					<i class="fas fa-star selected"></i>'
             + '					<i class="fas fa-star selected"></i>'
             + '					<i class="fas fa-star selected"></i>'
             + '					<i class="fas fa-star selected"></i>'
             + '					<i class="fas fa-star"></i>'
             + '				</p>'
             + '			</div>'
             + '		</div>'
             + '		<p class="card-text">' + product.Description + '</p>'
             + '	</div>'
             + '</div>';
    },

    handle: function (message) {
        $('#Area-WIP').addClass('d-none');
        $("#Panel-Msgs").removeClass('d-none');

        $('#Show-Msg').html(message || 'Ups! Algo no ha salido como esperábamos.<br/>Por favor vuelve a intentarlo en unos minutos...');

        $('#Area-Alert').removeClass('d-none');
    }

};

$(function () {
    bf.smartretail.panel.init();
});