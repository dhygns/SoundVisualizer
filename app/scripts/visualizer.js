(function() {
    'use strict';

    function SoundVisualizerService() {
        
        var service = {};
        var audioCtx = null;
        var _stream = null;
        var intv = null;
        
        function drawCanvas(dataArray,bufferLength){
      
          var canvas = document.getElementById('visualizer');
          var canvasCtx = canvas.getContext("2d");
    
          var WIDTH = 300;
          var HEIGHT = 300;
    
          canvasCtx.fillStyle = 'rgb(242, 242, 242)';
          canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
    
          canvasCtx.lineWidth = 2;
          canvasCtx.beginPath();
    
          var sliceWidth = WIDTH * 1.0 / bufferLength;
          var x = 0;
    
          for(var i = 0; i < bufferLength; i++) {
            var data = dataArray[i];
            var v = data / 128.0;
            var y = v * HEIGHT/2;
    
            var r = data + 120 ;
            var g = 255 -  data ;
            var b = data / 3;
    
            canvasCtx.strokeStyle = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    
            if(i === 0) {
              canvasCtx.moveTo(x, y);
            } else {
              canvasCtx.lineTo(x, y);
            }
    
            x += sliceWidth;
          }
          canvasCtx.lineTo(canvas.width, canvas.height/2);
          canvasCtx.stroke();
        }
        
        service.start = function(){
          navigator.getUserMedia  = navigator.getUserMedia ||
                                  navigator.webkitGetUserMedia ||
                                  navigator.mozGetUserMedia ||
                                  navigator.msGetUserMedia;

          var audio = document.querySelector('audio');

          var errorCallback = function(e) {
            console.log('Reeeejected!', e);
          };

          if (navigator.getUserMedia) {
            navigator.getUserMedia({audio: true}, function(stream) {
              _stream = stream;
              audioCtx = new (window.AudioContext)()
              var source = audioCtx.createMediaStreamSource(_stream);
              var filter = audioCtx.createBiquadFilter();

              var analyser = audioCtx.createAnalyser();
              source.connect(analyser);
              filter.connect(audioCtx.destination);

              var bufferLength = analyser.frequencyBinCount;
              console.log(bufferLength);

              var dataArray = new Uint8Array(bufferLength);

              function draw() {
                analyser.getByteTimeDomainData(dataArray);
                drawCanvas(dataArray,bufferLength);
              };

              intv = setInterval(function(){ draw() }, 1000 / 30);

            }, errorCallback);
          }
      };

      service.stop = function(){
          clearInterval(intv);
          audioCtx.close();
          _stream.getAudioTracks()[0].stop();
      }
      return service;
    }

    

    angular.module('soundVisualizerApp')
    .factory('SoundVisualizerService', SoundVisualizerService);

}());
