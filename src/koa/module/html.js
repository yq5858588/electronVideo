var cheerio = require("cheerio");
var urlPar = require("url");

class Html {

    static getInstance() { /*1、单例  多次实例化实例不共享的问题*/
        if (!Html.instance) {
            Html.instance = new Html();
        }
        return Html.instance;
    }
    getHtml(url) {
        return new Promise((resolve, reject) => {
            var request = require('request');
            var options = {
                url: url,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.221 Safari/537.36 SE 2.X MetaSr 1.0'
                }
            };
            request(options, (error, response, body) => {
                if (error) {
                    reject(err);
                    return;
                }
                resolve(body);
            })
        })

    }
}

module.exports = Html.getInstance();
/*
function getDatas() {
    var html = getHtml('http://www.jingpinzy.com/', (error, response, body) => {
        // console.log(error);
        // console.log(response.statusCode);
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(body);
            $("#data_list>tr").each(function(i, e) {
                var tempTr = cheerio.load(e);
                var info = {};
                var url = tempTr("td:nth-child(1)>a").attr("href");
                info.url = (url);
                var title = tempTr("td:nth-child(1)").text();
                info.title = (title);
                var type = tempTr("td:nth-child(2)").text();
                info.type = (type);
                var time = tempTr("td:nth-child(5)").text();
                info.time = (time);
                datalist.push(info);
            });
            renderTemp(datalist);
        };
    });
}

function renderTemp(datalist) {
    template.helper('getSubstr', function(str) {
        // console.log(str);
        var temp = str.split('-');
        // console.log(temp);
        return temp[1];
    });
    document.getElementById('indexdatalist').innerHTML = template('indexdatalist_test', { "list": datalist });
}

function showDatainfo(url) {
    var urlnew = "http://www.jingpinzy.com" + url;
    location.href = "datainfo.html?url=" + urlnew;
}

function getDataInfo(url) {
    url = urlPar.parse(url, true)
    var html = getHtml(url.query.url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            var tempTr = cheerio.load(body);

            var info = {};
            var img = tempTr(".videoPic>img").attr("src");
            $("#infoimg").src = img;
            var title = tempTr(".videoDetail>li:nth-child(1)").text();
            $("#infotitle").text(title);

            var infosubtitle = tempTr(".videoDetail>li:nth-child(2)").text();
            $("#infosubtitle").text(infosubtitle);

            var inforemark = tempTr(".videoDetail>li:nth-child(3)").text();
            $("#inforemark").text(inforemark);

            var infoyanyuan = tempTr(".videoDetail>li:nth-child(4)").text();
            $("#infoyanyuan").text(infoyanyuan);

            var infodaoyan = tempTr(".videoDetail>li:nth-child(5)").text();
            $("#infodaoyan").text(infodaoyan);

            var infotype = tempTr(".videoDetail>li:nth-child(6)").text();
            $("#infotype").text(infotype);

            var infotime = tempTr(".videoDetail>li:nth-child(9)>div").text();
            $("#infotime").text(infotime);

            var urladdress = tempTr(".movievod>ul>li:nth-child(2)").text();

            $("#infobutton").bind("click", function() {
                // playVideo(urladdress.split("$")[1]);
                console.log(urladdress.split("$")[1]);
            });
        };
    });
}

function getHtml(url, callback) {
    var request = require('request');
    var options = {
        url: url,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.221 Safari/537.36 SE 2.X MetaSr 1.0'
        }
    };
    request(options, (error, response, body) => {
        callback(error, response, body);
    })
}*/