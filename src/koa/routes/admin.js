// const DB = require('../module/mongodb');
const router = require('koa-router')();
router
    .get('/', async (ctx) => {
        let title = "sdfasdfasd";
        ctx.body = "";
        var res = await DB.find('user', {});
        // console.log(res);
        await ctx.render('index', {
            title: title,
            list: res
        });
    })
var user = require('./admin/user');
var node = require('./admin/node');
var index = require('./admin/index');
var jisuyunbo = require('./admin/jisuyunbo');
var yongjiuyun = require('./admin/yongjiuyun');
var zuidaziyuan = require('./admin/zuidaziyuan');
var kuboziyuan = require('./admin/kuboziyuan');
var okziyuan = require('./admin/okziyuan');
router.use('/user', user);
router.use('/node', node);
router.use('/index', index);
router.use('/jisuyunbo', jisuyunbo);
router.use('/yongjiuyun', yongjiuyun);
router.use('/zuidaziyuan', zuidaziyuan);
router.use('/kuboziyuan', kuboziyuan);
router.use('/okziyuan', okziyuan);
module.exports = router.routes();
