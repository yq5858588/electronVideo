const Koa = require('koa');
const path = require('path');
const router = require('koa-router')();
const views = require('koa-views');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const render = require('koa-art-template');
// const DB = require('./module/mongodb');

//引入子路由
var admin = require('./routes/admin');
var api = require('./routes/api');

router.use('/admin', admin);
router.use('/api', api);

const app = new Koa();

app.use(static(__dirname + "/static"));
app.use(bodyParser());

// app.use(views(__dirname + '/views', { extension: 'ejs' })); //配置模板引擎后缀名ejs
// app.use(views(__dirname + '/views', {
//     map: {
//         html: 'ejs'
//     }
// }));

render(app, {
    root: path.join(__dirname, 'views'),   // 视图的位置
    extname: '.html',  // 后缀名
    debug: process.env.NODE_ENV !== 'production'  //是否开启调试模式
});

// app.use(async (ctx, next) => {
//     // console.log(new Date().toLocaleString());

//     ctx.state = {
//         session: "asdf",
//         username: "张三"
//     }

//     await next();
//     if (ctx.status == 404) {
//         ctx.body = "404";
//     }
// })

router
    .get('/', async (ctx) => {
        let title = "sdfasdfasd";

        var res = await DB.find('user', {});
        // console.log(res);
        await ctx.render('index', {
            title: title,
            list: res
        });
    })
    .get('/add', async (ctx) => {
        let title = "sdfasdfasd";
        await ctx.render('add', {
            title: title
        });
    })
    .post('/doAdd', async (ctx) => {
        let title = "sdfasdfasd";
        // ctx.body = ctx.request.body.username;
        let res = await DB.insert('user', ctx.request.body);
        console.log(res.result);
        try {
            if (res.result.ok) {
                ctx.redirect('/')
            }
        } catch (err) {
            console.log(err);
            ctx.redirect('/add');
        }

    })
    .get('/edit', async (ctx) => {
        let user = "sdfasdfasd";
        let id = ctx.query.id;
        let res = await DB.find('user', {'_id': DB.getObjectId(id)});

        await ctx.render('edit', {
            list: res[0]
        });
    })
    .post('/doEdit', async (ctx) => {
        let id = ctx.request.body.id;
        let username = ctx.request.body.username;
        let name = ctx.request.body.name;
        let age = ctx.request.body.age;
        let sex = ctx.request.body.sex;

        let res = await DB.update('user', {'_id': DB.getObjectId(id)}, {
            username, name, age, sex
        });
        console.log(res.result);
        try {
            if (res.result.ok) {
                ctx.redirect('/')
            }
        } catch (err) {
            console.log(err);
            ctx.redirect('/edit');
        }

    })
    .get('/delete', async (ctx) => {
        let user = "sdfasdfasd";
        let id = ctx.query.id;
        let res = await DB.remove('user', {'_id': DB.getObjectId(id)});

        if (res.result.ok) {
            ctx.redirect('/')
        } else {
            ctx.redirect('/')
        }
    })
    .get('/news', async (ctx) => {
        let arr = ['sdfg', 'sdfg', 'sdfg', 'ffgggg'];
        let cont = "<h2>sdfgsdfgsdfg</h2>";
        await ctx.render('news', {
            list: arr,
            cont: cont
        });
    })
    .get('/newscon/:aid/:cid', async (ctx) => {

        console.log(ctx.params);

        console.log(ctx.query);

        console.log();

        ctx.body = "she啥拉伸的空间分是";
    })

app.use(router.routes()); //启动路由
app.use(router.allowedMethods());
let appport = RandomNumBoth(3000, 65533);
app.listen(41601);
console.log("http://127.0.0.1:41601");

function RandomNumBoth(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.round(Rand * Range); //四舍五入
    return num;
}
