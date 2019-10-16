"use strict";

var bf = bf || {};
bf.smartretail = bf.smartretail || {};
bf.smartretail.admin = bf.smartretail.admin || {};

bf.smartretail.admin.components = {
    loadFileDrop: function (event) {
        bf.smartretail.admin.faces.loadFileDrop(event);
    }
};

bf.smartretail.admin.faces = {
    video: undefined,

    startList: function () {
        bf.smartretail.admin.core.setup();

        $('#FaceList tr').on('click', bf.smartretail.admin.faces.showFace);
    },

    startAdd: function () {
        bf.smartretail.admin.core.setup();
        bf.smartretail.admin.faces.resetAdd();

        $('#webcam-tab').on('click', bf.smartretail.admin.faces.initVideo);

        $('#ButtonURL').on('click', bf.smartretail.admin.faces.loadImage);
        $('#ButtonData').on('click', bf.smartretail.admin.faces.loadImage);
        $('#FieldLocal').on('change', bf.smartretail.admin.faces.loadFile);
        $('#ButtonWebcam').on('click', bf.smartretail.admin.faces.takeSnapshot);
        $('#VideoPlayerContainer').on('click', bf.smartretail.admin.faces.takeSnapshot);
        $('#ButtonSwitchWebcam').on('click', bf.smartretail.admin.faces.switchWebcam);

        $('#Change').on('click', bf.smartretail.admin.faces.changeFace);
        $('#Add').on('click', bf.smartretail.admin.faces.addFace);
    },

    resetAdd: function (e) {
        $('#ImageDisplayer').addClass('d-none');
        $('#ImageSelector').removeClass('d-none');

        bf.smartretail.admin.faces.disableButtons();
    },

    showFace: function (e) {
        var src = $(this).find('img').attr('src');

        var image = new Image();
        image.crossOrigin = "anonymous";
        image.className = 'mw-100';
        image.src = src;

        $('#ImageModalTitle').html($(this).find('td.fullname').html());

        $('#ImageModalContainer').html('');
        document.getElementById('ImageModalContainer').appendChild(image);
    },

    initVideo: function () {
        bf.smartretail.admin.core.initWebcam('VideoPlayer', true, function (video) {
            bf.smartretail.admin.faces.video = video;
        }, bf.smartretail.admin.faces.takeSnapshotHandleError);
    },

    loadImage: function (e) {
        e.preventDefault();
        e.stopPropagation();

        var $field = $($(this).data('field'));

        if (!$field.val()) {
            return;
        }

        bf.smartretail.admin.core.loadImage($field.val(), 'ImageContainer');
        bf.smartretail.admin.faces.setPhotoReady();
    },

    loadFile: function (e) {
        e.preventDefault();
        e.stopPropagation();

        if ($(this)[0].files.length != 1) {
            return;
        }

        var file = $(this)[0].files[0];

        if (!file.type.match('image.*')) {
            return;
        }

        bf.smartretail.admin.core.loadImage(URL.createObjectURL(file), 'ImageContainer');
        bf.smartretail.admin.faces.setPhotoReady();
    },

    loadFileDrop: function (e) {
        if (e.dataTransfer && e.dataTransfer.files.length) {
            e.preventDefault();
            e.stopPropagation();

            var file = e.dataTransfer.files[0];

            if (!file.type.match('image.*')) {
                bf.smartretail.admin.core.leaveDrag($('#DropLocal'));
                return;
            }

            bf.smartretail.admin.core.loadImage(URL.createObjectURL(file), 'ImageContainer');
            bf.smartretail.admin.faces.setPhotoReady();
        }
    },

    takeSnapshot: function (e) {
        e.preventDefault();
        e.stopPropagation();

        $('#MessageWebcam').addClass('d-none');

        try {
            bf.smartretail.admin.core.takeSnapshot(bf.smartretail.admin.faces.video, 'ImageContainer', bf.smartretail.admin.faces.setPhotoReady, bf.smartretail.admin.faces.takeSnapshotHandleError);
        } catch (err) {
            bf.smartretail.admin.faces.takeSnapshotHandleError();
        }
    },

    takeSnapshotHandleError: function (message) {
        $('#MessageWebcam')
            .html(message || 'Something went wrong taking the snapshot.<br/>Please try again in a few minutes...')
            .removeClass('d-none');
    },

    switchWebcam: function () {
        bf.smartretail.admin.core.stopWebcam(bf.smartretail.admin.faces.video);

        bf.smartretail.admin.core.initWebcam('VideoPlayer', (bf.smartretail.admin.faces.video ? !bf.smartretail.admin.faces.video.rear : true), function (video) {
            bf.smartretail.admin.faces.video = video;
        }, bf.smartretail.admin.faces.takeSnapshotHandleError);
    },

    setPhotoReady: function () {
        $('#ImageSelector').find('input,textarea').val('');
        $('#ImageSelectorTab li:first-child a').tab('show');

        $('#ImageSelector').addClass('d-none');
        $('#ImageDisplayer').removeClass('d-none');

        $('span[data-valmsg-for="Photo"]').html('');

        bf.smartretail.admin.faces.enableButtons();
    },

    changeFace: function (e) {
        $('#ImageDisplayer').addClass('d-none');
        $('#ImageSelector').removeClass('d-none');

        $('#ImageContainer').html('');

        bf.smartretail.admin.faces.disableButtons();
    },

    addFace: function (e) {
        e.preventDefault();
        e.stopPropagation();

        $('#div.validation-summary-errors ul').html('');

        if (!document.getElementById('ImageCanvas')) {
            $('span[data-valmsg-for="Photo"]').html("The field 'Photo' is mandatory");
            return;
        } else {
            $('span[data-valmsg-for="Photo"]').html('');
        }

        var image = document.getElementById('ImageCanvas').toDataURL().slice(22);

        var data = new FormData();
        data.append('PersonId', $('#PersonId').val());
        data.append('Photo', image);

        bf.smartretail.admin.faces.disableButtons();

        $.ajax({
            url: '/Admin/Faces/Add',
            type: 'POST',
            data: data,
            async: true,
            cache: false,
            contentType: false,
            processData: false
        })
            .done(function (data) {
                window.location.href = $('#Cancel').attr('href')
            })

            .fail(function (jqXHR, textStatus, errorThrown) {
                bf.smartretail.admin.faces.enableButtons();

                $('div.validation-summary-errors ul').html('<li>' + errorThrown + '</li>');
            });
    },

    enableButtons: function () {
        $('#Change').removeClass('disabled').attr('disabled', null);
        $('#Add').removeClass('disabled').attr('disabled', null);
        $('#Cancel').removeClass('disabled').attr('disabled', null);
    },

    disableButtons: function () {
        $('#Change').addClass('disabled').attr('disabled', 'disabled');
        $('#Add').addClass('disabled').attr('disabled', 'disabled');
        $('#Cancel').addClass('disabled').attr('disabled', 'disabled');
    }

}

