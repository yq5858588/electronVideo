![输入图片说明](https://images.gitee.com/uploads/images/2019/0829/122609_e80313cf_383370.png "TIM截图20190829115917.png")
![输入图片说明](https://images.gitee.com/uploads/images/2019/0829/122619_f17441fa_383370.png "TIM截图20190829115944.png")
![输入图片说明](https://images.gitee.com/uploads/images/2019/0829/122628_ba9c4e35_383370.png "TIM截图20190829120000.png")
![输入图片说明](https://images.gitee.com/uploads/images/2019/0829/122634_2bd3bb56_383370.png "TIM截图20190829120009.png")
# electronVideo
# 超人影视5.2.2（2018-09-28）正式发布（更新了底层框架到electron3.0.1）
### 更新了底层框架到electron3.0.1
### 优化了播放器界面鼠标点击拖动的卡顿问题
### 由于更新了art-template到最新版本导致播放器无法运行，现在已经回退到4.10.2版本

# 超人影视5.2.1（2018-07-05）正式发布（最大资源无法访问更新）
### 修复了最大资源访问出错的问题

# 超人影视5.1（2018-06-22）正式发布
### 调整了播放器的整体界面，现在播放器最上边的边框变窄了，方便了放在右下角边看边工作

# 超人影视5.0（2018-06-03）正式发布（重大更新）
### 更新了底层播放器的原始库，以前是html5自带的播放器，现在修改成了videojs来播放
### 修改了播放器播放界面的展示样式，现在看起来更加漂亮

# 超人影视4.6（2018-06-01）正式发布
### 更新了播放器首页的界面颜色已经字体大小的调整
### 添加了酷播资源
### 添加了OK资源

# 超人影视4.5（2018-05-31）正式发布
### 大幅度更新，调整了所有资源的显示界面，现在的界面看起来更加清爽，操作起来也更加简单

# 超人影视4.4（2018-05-29）正式发布
### 更新了首页显示方式，现在显示看起来比较直观，播放视频也很方便
### 调整了播放器开始显示的大小

# 超人影视4.3（2018-05-28）正式发布
### 添加了急速云资源的搜索功能
### 添加了最大资源的搜索功能
### 添加了永久资源的搜索功能

# 超人影视4.2（2018-05-27）正式发布
### 添加了精品资源的搜索功能

# 超人影视4.0（2018-05-26）正式发布
### 集成了最大资源
### 增加了鼠标滚动调整音量大小的功能
### 增加了回车键切换全屏的功能
### 调整了播放器界面最上方资源库的样式

# 超人影视3.0（2018-05-26）正式发布
### 集成了永久资源

# 超人影视2.0（2018-05-25）正式发布
### 集成了极速云资源
### 增加了方向键调整声音以及播放进度的功能

# 超人影视1.0（2018-03-23）正式发布
### 集成了精品资源

自己做的一个超人影视，几万部电影可以在线观看，资源全部来自于网络，打开播放器，点击精品电影就可以浏览器万部电影，资源每天更新，现在第一个版本正式出炉，下一版本增加各大影视网站的视频资源，大家有什么问题可以到我的码云中心留言或者提问。
还有我的一个开源项目【超人数据库管理GUI】希望各位大拿能加入进来一起为开源做点贡献。
我的码云地址为：https://gitee.com/yq5858588


下载地址：https://pan.baidu.com/s/12X8p91ybsfNRfGFpoYhU8Q

npm install electron-builder -g  //安装打包环境

electron-builder --version  //查看打包环境版本

electron-builder -w --ia32     //打包命令
electron-builder -mwl     //打包打包所有平台


//打包的时候注意icon的大小  必须大于256*256
https://ai.baidu.com/aidemo?type=tns2&idx=1&tex=123&cuid=baidu_speech_demo&cod=2&lan=zh&ctp=1&pdt=1&spd=5&per=2&vol=5&pit=5
https://ai.baidu.com/aidemo?type=tns2&idx=1&tex=123&cuid=baidu_speech_demo&cod=2&lan=zh&ctp=1&pdt=1&spd=5&per=0&vol=5&pit=5
https://ai.baidu.com/aidemo?type=tns2&idx=1&tex=123&cuid=baidu_speech_demo&cod=2&lan=zh&ctp=1&pdt=1&spd=5&per=3&vol=5&pit=5 //深沉男声
https://ai.baidu.com/aidemo?type=tns2&idx=1&tex=123&cuid=baidu_speech_demo&cod=2&lan=zh&ctp=1&pdt=1&spd=5&per=4&vol=5&pit=5
http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=2&per=3&text=你要转换的文字