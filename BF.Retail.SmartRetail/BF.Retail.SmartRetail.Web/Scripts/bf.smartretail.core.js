"use strict";

var bf = bf || {};
bf.smartretail = bf.smartretail || {};

bf.smartretail.core = {
    videoPlayer: undefined,
    webcamStream: undefined,
    pictureCanvas: undefined,
    pictureCanvasContext: undefined,

    setup: function () {
        //bf.smartretail.core.initWebcam();
    },

    reset: function () {
        $('#PictureCanvasContainer').html('');

        bf.smartretail.core.pictureCanvas = undefined;
        bf.smartretail.core.pictureCanvasContext = undefined;

        bf.smartretail.core.initWebcam();
    },

    initWebcam: function () {
        // Older browsers might not implement mediaDevices at all, so we set an empty object first
        if (navigator.mediaDevices === undefined) {
            navigator.mediaDevices = {};
        }

        // Some browsers partially implement mediaDevices. We can't just assign an object with getUserMedia as it would overwrite existing properties.
        // Here, we will just add the getUserMedia property if it's missing.
        if (navigator.mediaDevices.getUserMedia === undefined) {
            navigator.mediaDevices.getUserMedia = function (constraints) {

                // First get ahold of the legacy getUserMedia, if present
                var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

                // Some browsers just don't implement it - return a rejected promise with an error to keep a consistent interface
                if (!getUserMedia) {
                    return Promise.reject(new Error('getUserMedia is not implemented in current browser'));
                }

                // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
                return new Promise(function (resolve, reject) {
                    getUserMedia.call(navigator, constraints, resolve, reject);
                });
            }
        }

        navigator.mediaDevices.getUserMedia({ audio: false, video: true })
            .then(function (stream) {
                bf.smartretail.core.videoPlayer = document.getElementById('VideoPlayer');

                // Older browsers may not have srcObject
                if ('srcObject' in bf.smartretail.core.videoPlayer) {
                    bf.smartretail.core.videoPlayer.srcObject = stream;
                } else {
                    // Avoid using this in new browsers, as it is going away.
                    bf.smartretail.core.videoPlayer.src = window.URL.createObjectURL(stream);
                }
                bf.smartretail.core.webcamStream = stream;
            })
            .catch(function (err) {
                console.log('The following error occured: ' + err.name + ' - ' + err.message);
            });
    },

    analizePicture: function (resolve, reject) {
        bf.smartretail.core.takeSnapshot(resolve, reject);
    },

    takeSnapshot: function (resolve, reject) {
        if (typeof InstallTrigger !== 'undefined' || !!window.StyleMedia) { //isFirefox || isEdge
            bf.smartretail.core.renderPicture(bf.smartretail.core.videoPlayer, bf.smartretail.core.videoPlayer.videoWidth, bf.smartretail.core.videoPlayer.videoHeight);

            bf.smartretail.core.webcamStream.getVideoTracks()[0].stop();

            bf.smartretail.core.callAPI(resolve, reject);
        } else {
            var imageCapture = new ImageCapture(bf.smartretail.core.webcamStream.getVideoTracks()[0]);

            imageCapture.grabFrame()
                .then(image => {
                    bf.smartretail.core.webcamStream.getVideoTracks()[0].stop();

                    bf.smartretail.core.renderPicture(image, image.width, image.height);

                    bf.smartretail.core.callAPI(resolve, reject);
                })
                .catch(function (err) {
                    console.log('The following error occured: ' + err.name + ' - ' + err.message);
                });
        }
    },

    renderPicture: function (picture, width, height) {
        bf.smartretail.core.pictureCanvas = document.createElement('canvas');
        bf.smartretail.core.pictureCanvas.setAttribute('id', 'PictureCanvas');
        bf.smartretail.core.pictureCanvas.width = width;
        bf.smartretail.core.pictureCanvas.height = height;
        bf.smartretail.core.pictureCanvas.className = 'w-100';

        document.getElementById('PictureCanvasContainer').appendChild(bf.smartretail.core.pictureCanvas);

        bf.smartretail.core.pictureCanvasContext = bf.smartretail.core.pictureCanvas.getContext('2d');
        bf.smartretail.core.pictureCanvasContext.drawImage(picture, 0, 0);
    },

    callAPI: function (resolve, reject) {
        var picture = bf.smartretail.core.pictureCanvas.toDataURL().slice(22);

        var data = new FormData();
        data.append('IMAGE', picture);

        $.ajax({
            url: '/Home/Search',
            type: 'POST',
            data: data,
            async: true,
            cache: false,
            contentType: false,
            processData: false
        })
            .done(function (data) {
                resolve(data);
            })

            .fail(function (jqXHR, textStatus, errorThrown) {
                reject();
            });
    },

    drawFaceRectangle: function (color, left, top, width, height) {
        bf.smartretail.core.pictureCanvasContext.beginPath();
        bf.smartretail.core.pictureCanvasContext.lineWidth = '6';
        bf.smartretail.core.pictureCanvasContext.strokeStyle = color;
        bf.smartretail.core.pictureCanvasContext.rect(left - 5, top - 5, width + 10, height + 10);
        bf.smartretail.core.pictureCanvasContext.stroke();
    },

    addFaceName: function (name, color, left, top) {
        var fontSize = 30;
        var fontFace = 'Arial';
        var lineHeight = fontSize * 1.286;

        bf.smartretail.core.pictureCanvasContext.font = fontSize + 'px ' + fontFace;
        var textWidth = bf.smartretail.core.pictureCanvasContext.measureText(name).width;

        bf.smartretail.core.pictureCanvasContext.fillStyle = color;
        bf.smartretail.core.pictureCanvasContext.fillRect(left - (textWidth / 2) - 10, top - 5, textWidth + 20, lineHeight + 5);

        bf.smartretail.core.pictureCanvasContext.fillStyle = 'black'
        bf.smartretail.core.pictureCanvasContext.textAlign = 'center';
        bf.smartretail.core.pictureCanvasContext.textBaseline = "top";
        bf.smartretail.core.pictureCanvasContext.fillText(name, left, top);
    },

    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    getColorForPercentage: function (pct) {
        // Based on https://jsfiddle.net/JeancarloFontalvo/1sco9Lpe/3/

        var percentColors = [
            { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
            { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
            { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } }];

        for (var i = 1; i < percentColors.length - 1; i++) {
            if (pct < percentColors[i].pct) {
                break;
            }
        }
        var lower = percentColors[i - 1];
        var upper = percentColors[i];
        var range = upper.pct - lower.pct;
        var rangePct = (pct - lower.pct) / range;
        var pctLower = 1 - rangePct;
        var pctUpper = rangePct;
        var color = {
            r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
            g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
            b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
        };
        return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
    }
};
