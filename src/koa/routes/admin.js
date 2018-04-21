
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

router.use('/user', user);
router.use('/node', node);
router.use('/index', index);

module.exports = router.routes();