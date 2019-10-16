"use strict";

var bf = bf || {};
bf.smartretail = bf.smartretail || {};
bf.smartretail.admin = bf.smartretail.admin || {};

bf.smartretail.admin.components = {
    loadFileDrop: function (event) {
        bf.smartretail.admin.groups.loadFileDrop(event);
    }
};

bf.smartretail.admin.groups = {
    video: undefined,

    startSearch: function () {
        bf.smartretail.admin.core.setup();
        bf.smartretail.admin.groups.resetSearch();

        $('#webcam-tab').on('click', bf.smartretail.admin.groups.initVideo);

        $('#ButtonURL').on('click', bf.smartretail.admin.groups.loadImage);
        $('#ButtonData').on('click', bf.smartretail.admin.groups.loadImage);
        $('#FieldLocal').on('change', bf.smartretail.admin.groups.loadFile);
        $('#ButtonWebcam').on('click', bf.smartretail.admin.groups.takeSnapshot);
        $('#VideoPlayerContainer').on('click', bf.smartretail.admin.groups.takeSnapshot);
        $('#ButtonSwitchWebcam').on('click', bf.smartretail.admin.groups.switchWebcam);

        $('#Search').on('click', bf.smartretail.admin.groups.search);
        $('#Restart').on('click', bf.smartretail.admin.groups.restart);
    },

    resetSearch: function (e) {
        $('#ImageDisplayer').addClass('d-none');
        $('#ImageSelector').removeClass('d-none');
    },

    initVideo: function () {
        bf.smartretail.admin.core.initWebcam('VideoPlayer', true, function (video) {
            bf.smartretail.admin.groups.video = video;
        }, bf.smartretail.admin.groups.takeSnapshotHandleError);
    },

    loadImage: function (e) {
        e.preventDefault();
        e.stopPropagation();

        var $field = $($(this).data('field'));

        if (!$field.val()) {
            return;
        }

        bf.smartretail.admin.core.loadImage($field.val(), 'ImageContainer');
        bf.smartretail.admin.groups.setPhotoReady();
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
        bf.smartretail.admin.groups.setPhotoReady();
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
            bf.smartretail.admin.groups.setPhotoReady();
        }
    },

    takeSnapshot: function (e) {
        e.preventDefault();
        e.stopPropagation();

        $('#MessageWebcam').addClass('d-none');

        try {
            bf.smartretail.admin.core.takeSnapshot(bf.smartretail.admin.groups.video, 'ImageContainer', bf.smartretail.admin.groups.setPhotoReady, bf.smartretail.admin.groups.takeSnapshotHandleError);
        } catch (err) {
            bf.smartretail.admin.groups.takeSnapshotHandleError();
        }
    },

    takeSnapshotHandleError: function (message) {
        $('#MessageWebcam')
            .html(message || 'Something went wrong taking the snapshot.<br/>Please try again in a few minutes...')
            .removeClass('d-none');
    },

    switchWebcam: function () {
        bf.smartretail.admin.core.stopWebcam(bf.smartretail.admin.groups.video);

        bf.smartretail.admin.core.initWebcam('VideoPlayer', (bf.smartretail.admin.groups.video ? !bf.smartretail.admin.test.groups.rear : true), function (video) {
            bf.smartretail.admin.groups.video = video;
        }, bf.smartretail.admin.groups.takeSnapshotHandleError);
    },

    setPhotoReady: function () {
        $('#ImageSelector').find('input,textarea').val('');
        $('#ImageSelectorTab li:first-child a').tab('show');

        $('#ImageSelector').addClass('d-none');
        $('#ImageDisplayer').removeClass('d-none');

        setTimeout(bf.smartretail.admin.groups.search, 200);
    },

    restart: function (e) {
        $('#ImageDisplayer').addClass('d-none');
        $('#PanelSearch').addClass('d-none');
        $('#ImageSelector').removeClass('d-none');
        $("#InfoContainer").addClass('d-none');

        $('#ImageContainer').html('');
        $("#InfoContainer table tbody").html('');
    },

    search: function (e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        $("#InfoContainer table tbody").html('');

        var IMAGE = document.getElementById('ImageCanvas').toDataURL().slice(22);

        var data = new FormData();
        data.append('IMAGE', IMAGE);

        $('#PanelSearch').addClass('d-none');
        $('#Message').addClass('d-none');
        $("#InfoContainer").addClass('d-none');
        $('#Searching').removeClass('d-none');

        $.ajax({
            url: '/Admin/Groups/DoSearch/' + window.location.pathname.replace('/Admin/Groups/Search/', '') + '/',
            type: 'POST',
            data: data,
            async: true,
            cache: false,
            contentType: false,
            processData: false
        })
            .done(function (data) {
                $('#Searching').addClass('d-none');
                $('#PanelSearch').removeClass('d-none');

                bf.smartretail.admin.groups.showAnalisysInfo(data);
            })

            .fail(function (jqXHR, textStatus, errorThrown) {
                $('#Searching').addClass('d-none');
                $('#PanelSearch').removeClass('d-none');

                $('#Message')
                    .html('Ups! Something went wrong.<br/>Please try again in a few minutes...')
                    .removeClass('d-none');
            });
    },

    showAnalisysInfo: function (result) {
        if (result.length > 0) {
            $("#InfoContainer").removeClass('d-none');

            var tbody = $("#InfoContainer table tbody")[0];

            for (var i = 0; i < result.length; i++) {
                var color = bf.smartretail.admin.core.getColorForPercentage(result[i].Confidence);

                bf.smartretail.admin.core.drawFaceRectangle(
                    color,
                    result[i].FaceRectangle.Left,
                    result[i].FaceRectangle.Top,
                    result[i].FaceRectangle.Width,
                    result[i].FaceRectangle.Height
                );

                if (result[i].Confidence > 0) {
                    bf.smartretail.admin.core.addFaceName(
                        result[i].Fullname,
                        color,
                        result[i].FaceRectangle.Left + (result[i].FaceRectangle.Width / 2),
                        result[i].FaceRectangle.Top + result[i].FaceRectangle.Height + 15
                   );
                }

                var row = tbody.insertRow(tbody.rows.length);
                var cellId = row.insertCell(0);
                var cellFullname = row.insertCell(1);
                var cellConfidence = row.insertCell(2);

                cellId.innerHTML = result[i].Id;
                cellFullname.innerHTML = result[i].Fullname.trim() || '-Unknown-';
                cellConfidence.innerHTML = (result[i].Confidence * 100).toFixed(2) + '%'
            }
        } else {
            $('#Message')
                .html('No matches found in current group...')
                .removeClass('d-none');
        }
    }
}