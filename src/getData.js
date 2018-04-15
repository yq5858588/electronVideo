$(function() {
    if(Hls.isSupported()) {
        var video = document.getElementById('videoCon');
        var hls = new Hls();
        hls.loadSource(encodeURI('http:\/\/zaixian.jingpin88.com\/20180414\/tfRULoaD\/index.m3u8'));
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED,function() {
          video.play();
      });
     }

    $('#videoCon').on('waiting', function() {
        console.log('onwaiting执行成功!');
    });
    $('#videoCon').onprogress = $("#videoMsg").show();
    $('#videoCon').canplay = $("#videoMsg").hide();
})

function getDatas() {
    var request = require('request');
    var options = {
        url: 'http://www.jingpinzy.com/',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.221 Safari/537.36 SE 2.X MetaSr 1.0'
        }
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }

    request(options, callback);
}