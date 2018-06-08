// const DB = require('../../module/mongodb');
const Html = require('../../module/html');
const router = require('koa-router')();
const cheerio = require("cheerio");

router
    .get('/', async (ctx) => {
        let url = "",
            total, curpage;
        let typeid = ctx.request.query.typeid;
        let page = parseInt(ctx.request.query.page) + 1;
        if (typeid == 0) {
            url = 'http://www.okokzy.cc/?m=vod-index-pg-' + (page) + '.html';
        } else {
            url = 'http://www.okokzy.cc/?m=vod-type-id-' + typeid + '-pg-' + (page) + '.html';
        }
        let datalist = [];
        
        let html = await Html.getHtml(url);
        // console.log(html);

        var $ = cheerio.load(html);
        $("div.xing_vb>ul").each(function(i, e) {
            var tempTr = cheerio.load(e);
            if (i != 0) {
                var info = {};
                var url = tempTr("a").attr("href");
                info.url = (url);
                var title = tempTr("span.xing_vb4 > a").text();
                info.title = (title);
                var type = tempTr("span.xing_vb5").text();
                info.type = (type);
                var time = tempTr("li>span:nth-child(4)").text();
                info.time = (time);
                if (title != '') {
                    datalist.push(info);
                }
            }
        });
        total = html.match(/共(\d+)条数据/);
        
        await ctx.render('admin/okziyuan/index', {
            list: datalist,
            total: total[1],
            curpage: (page - 1),
            typeid: typeid
        });
    })
    .get('/info', async (ctx) => {
        let html = await Html.getHtml('http://www.okokzy.cc/' + ctx.request.query.url);
        var tempTr = cheerio.load(html);
        var info = {};
        info.img = tempTr("div.vodImg > img").attr("src");
        info.title = tempTr("div.vodInfo > div.vodh>h2").text();
        info.subtitle = tempTr("div.vodInfo > div.vodinfobox > ul > li:nth-child(1)").text();
        info.remark = tempTr("div.vodInfo > div.vodinfobox > ul > li:nth-child(4)").text();
        info.yanyuan = tempTr("div.vodInfo > div.vodinfobox > ul > li:nth-child(3)").text();
        info.daoyan = tempTr("div.vodInfo > div.vodinfobox > ul > li:nth-child(2)").text();
        info.type = tempTr("div.vodInfo > div.vodinfobox > ul > li:nth-child(4)").text();
        info.time = tempTr("div.vodInfo > div.vodinfobox > ul > li:nth-child(9)").text();

        var urlArr = Array();

        let regTemp = html.match(/<li><input type=\"checkbox\" name=\"copy_sel\" value=\"(.*?).m3u8\" checked=\"\" \/>((.*?).m3u8)</g);

        // console.log(regTemp);
        for (e in regTemp)
        {
            let eregTemp = regTemp[e].match(/<li><input type=\"checkbox\" name=\"copy_sel\" value=\"(.*?).m3u8\" checked=\"\" \/>((.*?).m3u8)</);
            // console.log(eregTemp[2]);
            urlinfo={};
            urlinfo.number = eregTemp[2].split("$")[0];
            urlinfo.address = eregTemp[2].split("$")[1];
            urlArr.push(urlinfo);
        }
        info.urladdress = urlArr;
        // console.log(info);
        await ctx.render('admin/okziyuan/info', {
            info: info,
        });
    })
    .all('/seach', async (ctx) => {
        let url = "",
            total, curpage;
        var wd = (ctx.request.body.wd);
        var typeid = 0;
        let page = 1;
        url = 'http://www.okokzy.cc/index.php?m=vod-search';
        let datalist = [];
        let html;
        if (wd == "" || wd == null) {
            html = await Html.getHtml(url);
        } else {
            html = await Html.postHtml(url, ctx.request.body);
        }
        total = html.match(/共(\d+)条数据/);
        if (total != 0) {
            var $ = cheerio.load(html);
            $("div.xing_vb>ul").each(function(i, e) {
                var tempTr = cheerio.load(e);
                if (i != 0) {
                    var info = {};
                    var url = tempTr("a").attr("href");
                    info.url = (url);
                    var title = tempTr("span.xing_vb4 > a").text();
                    info.title = (title);
                    var type = tempTr("span.xing_vb5").text();
                    info.type = (type);
                    var time = tempTr("li>span:nth-child(4)").text();
                    info.time = (time);
                    if (title != '') {
                        datalist.push(info);
                    }
                }
            });
        }
        await ctx.render('admin/okziyuan/index', {
            list: datalist,
            total: total[1],
            curpage: (page - 1),
            typeid: typeid
        });
    })

module.exports = router.routes();