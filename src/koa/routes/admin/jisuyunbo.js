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
          url = 'http://www.caijizy.com/?m=vod-index-pg-' + (page) + '.html';
      } else {
          url = 'http://www.caijizy.com/?m=vod-type-id-' + typeid + '-pg-' + (page) + '.html';
      }
      let datalist = [];
      let html = await Html.getHtml(url);
      var $ = cheerio.load(html);
      $("#data_list>tr").each(function (i, e) {
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
      total = ($(".page_num").text()).match(/共(\d+)条数据/);
      // console.log(datalist);
      await ctx.render('admin/jisuyunbo/index', {
          list: datalist,
          total: total[1],
          curpage: (page - 1),
          typeid: typeid
      });
  })
  .get('/info', async (ctx) => {
      let html = await Html.getHtml('http://www.caijizy.com/' + ctx.request.query.url);
      var tempTr = cheerio.load(html);
      var info = {};
      info.img = tempTr(".videoPic>img").attr("src");
      info.title = tempTr(".videoDetail>li:nth-child(1)").text();
      info.subtitle = tempTr(".videoDetail>li:nth-child(2)").text();
      info.remark = tempTr(".videoDetail>li:nth-child(3)").text();
      info.yanyuan = tempTr(".videoDetail>li:nth-child(4)").text();
      info.daoyan = tempTr(".videoDetail>li:nth-child(5)").text();
      info.type = tempTr(".videoDetail>li:nth-child(6)").text();
      info.time = tempTr(".videoDetail>li:nth-child(9)>div").text();
      var tempTrUrl = html.match(/<!--前jsm3u8-->(.*?)<!--后jsm3u8-->/);
      var tempTrUrl = cheerio.load(tempTrUrl[1]);
      var urlArr = Array();
      tempTrUrl("li").each(function (i, e) {
          var tempTr = cheerio.load(e);
          var urlinfo = {};
          urlinfo.number = tempTr("input").val().split("$")[0];
          urlinfo.address = tempTr("input").val().split("$")[1];
          urlArr.push(urlinfo);
      });
      info.urladdress = urlArr;
      // console.log(info);
      await ctx.render('admin/jisuyunbo/info', {
          info: info,
      });
  })
  .all('/seach', async (ctx) => {
      let url = "",
        total, curpage;
      var wd = (ctx.request.body.wd);
      var typeid = 0;
      let page = 1;
      url = 'http://www.caijizy.com/index.php?m=vod-search';
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
          $("#data_list>tr").each(function (i, e) {
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
      }
      await ctx.render('admin/jisuyunbo/index', {
          list: datalist,
          total: total[1],
          curpage: (page - 1),
          typeid: typeid
      });
  })
module.exports = router.routes();
