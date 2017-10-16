## 桃园
在下桃翁，常年生活在桃园。我说说我建这个桃园的初心，我希望我能把我这个桃园建立得更大更完善。

我相信很多的同学跟我一样，都想自己写博客，跟那些大牛一样，既可以提升自己，巩固自己的知识，还可以把学到的分析给别人，最重要的时候可以装逼，提升自己的声望(说不定哪天阿里就问你是否有没有兴趣去阿里上班，不过我最想进的是腾讯，只能自己YY一下了)。

然后我从大二就开始搭建自己的博客，一直到现在我换过好几次博客，我用的博客流程从jekyll  -> hexo -> WordPress，当时看到一个学长在搞jekyll，我也去搞了一个，然后花了很多时间在选主题，觉得主题好看可以装逼。但是后来看到很多同学在用hexo，这个时候我喜欢上了简介的风格，而且网上都说hexo比jekyll好，我就选了hexo使用最多的主题next，现在站点还在([萧然自我](https://crazylxr.github.io/))。再后来我加了一个hack week的活动，教大家怎么大家搭建站点，我就在这学习中搭建我[wordpress博客](http://crazylxr.cn/)。因为我不会php，觉得有些地方还是不满意，我就觉得自己搭建一个博客。

在今年暑假就学了node，搭建了这个博客，但是我搭建这个博客的目的不仅仅是用来写博客，一个主要的目的是为了把我自己学到的一些东西用在上面来，可以让我学的知识有实践的地方，比如我看了一篇浏览器缓存的文章，我就可以把这个用到我的站点上来提升性能，这是我搭建这个博客的主要目的。我相信很多同学跟我一样，都有过类似的想法，但是觉得从0搭建一个博客可能有点费时间，所以我所用的技术栈比较简单，没有使用React、Vue等这些前端框架，前端就用jquery，boostrap做ssr。

如果有同学有兴趣可以fork过去一起完善。
## logo


![桃园.png](http://upload-images.jianshu.io/upload_images/2974893-d85235c0228cd640.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 官方主页
> [demo主页](http://www.lxrsuper.com)
## 简介 
该博客系统前台由jquery和swig模板引擎所搭建，后台采用bootstrap搭建，后端用node+expres+mongodb，我写这些项目主要是用来学习node
## 安装
### 克隆项目
```bash
git clone https://github.com/crazylxr/node_blog.git
```
### node和mongodb安装
[cneteros7.0安装教程](http://crazylxr.cn/cenos%E4%B8%8B%E5%AE%89%E8%A3%85node-js%E5%92%8Cmongodb/)。如果在其他环境请异步：[安装node.js](http://www.runoob.com/nodejs/nodejs-install-setup.html)、[安装mongodb](http://www.runoob.com/mongodb/mongodb-linux-install.html)
## 快速开始
### 启动mongodb
进入mongodb的bin目录
```bash
cd /usr/local/mongodb/bin   
```
启动mongodb，路径为博客安装地址的schemas路径
```bash
./mongod --dbpath /home/node_blog/schemas/ 
```
### 启动博客
进入博客的目录并启动博客
```
node app.js
```

## 功能列表
### 前台
* 博客列表分类查看
* 评论
* 统计阅读数量
* 统计评论数量
* 标签展示以及选择该便签的文章
### 后台
* 登录
* 用户管理
* 文章管理(仅支持markdown,不支持富文本)
* 分类管理
* 标签管理
## 截图

![image.png](http://upload-images.jianshu.io/upload_images/2974893-4aec2238f8d66292.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](http://upload-images.jianshu.io/upload_images/2974893-6fc8df794271d72a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## todolist
* 评论管理
* 添加文章添加图片
* 归档功能
* xss和csrf的防御
## 不足之处
界面还很丑，功能还不完善，等待正式发布。。。。
## FAQ
## Change Log