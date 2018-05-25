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
            url = 'http://www.zuidazy.com/?m=vod-index-pg-' + (page) + '.html';
        } else {
            url = 'http://www.zuidazy.com/?m=vod-type-id-' + typeid + '-pg-' + (page) + '.html';
        }
        let datalist = [];
        let html = await Html.getHtml(url);

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
                if(title!=''){
                    datalist.push(info);
                }
            }
        });
        total =html.match(/共(\d+)条数据/);        
        await ctx.render('admin/zuidaziyuan/index', {
            list: datalist,
            total: total[1],
            curpage: (page - 1),
            typeid: typeid
        });
    })
    .get('/info', async (ctx) => {
        let html = await Html.getHtml('http://www.zuidazy.com/' + ctx.request.query.url);
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
        tempTr("#play_1 > ul > li").each(function(i, e) {
            var tempAddress = cheerio.load(e);
            var urlinfo = {};
            urlinfo.number = tempAddress.text().split("$")[0];
            urlinfo.address = tempAddress.text().split("$")[1];
            urlArr.push(urlinfo);
        });
        info.urladdress = urlArr;
        // console.log(info);
        await ctx.render('admin/zuidaziyuan/info', {
            info: info,
        });
    })

module.exports = router.routes();