
const router = require('koa-router')();


router
    .get('/', async (ctx) => {
        let title = "sdfasdfasd";
        ctx.body="";
        var res = await DB.find('user', {});
        // console.log(res);
        await ctx.render('index', {
            title: title,
            list: res
        });
    })
    .get('/user', async (ctx) => {
        let title = "sdfasdfasd";
        ctx.body="";
        var res = await DB.find('user', {});
        // console.log(res);
        await ctx.render('index', {
            title: title,
            list: res
        });
    })
    .get('/news', async (ctx) => {
        let title = "sdfasdfasd";
        ctx.body="";
        var res = await DB.find('user', {});
        // console.log(res);
        await ctx.render('index', {
            title: title,
            list: res
        });
    })


    module.exports=router.routes();