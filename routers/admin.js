var express = require('express');
var router = express.Router();

var User = require('../models/User');
var Category = require('../models/Category');
var Content = require('../models/Contents');
var Tag = require('../models/Tag');

router.use(function (req, res, next) {
    if(!req.userInfo.isAdmin){
        res.end('不是管理员');
        return;
    }

    next();
});


/*
* 修改内容
* */
router.get('/content/edit', function (req, res) {
    var id = req.query.id || '';

    var categories = [];

    Category.find().sort({_id: -1}).then(function (rs) {
        categories = rs;

        return Content.findOne({
            _id: id
        }).populate('category');
    }).then(function (content) {
        console.log(content);
        if(!content){
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: "内容不存在"
            })
            // return Promise.reject();
        }else {
            res.render('admin/content_edit', {
                userInfo: req.userInfo,
                content: content,
                categories: categories
            })

        }
    })


})

//内容保存修改
router.post('/content/edit', function (req, res) {
    // console.log(req.body);
    var id = req.query.id || '';

    if(req.body.category == ''){
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: "内容不能为空"
        })
    }

    if(req.body.title == ''){
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: "标题不能为空"
        })
    }

    Content.update({
        _id: id
    },{
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        content: req.body.content
    }).then(function () {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '内容保存成功',
            url: '/admin/content'
        })
    })

})

//分类删除
router.get('/content/delete', function (req, res) {
    //获取要删除的分类的id
    var id = req.query.id || '';

    Content.remove({
        _id: id
    }).then(function () {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: "删除成功",
            url: '/admin/content'
        })
    });
})

//内容首页
router.get('/content', function (req, res) {
    /*
   * limit()：闲置获取的数据条款
   *
   * skip()：忽略数据的条数
   * */

    var page = Number(req.query.page || 1);
    var limit = 10;

    var pages = 0;

    Content.count().then(function (count) {
        //计算总页数
        pages = Math.ceil(count / limit);
        //取值不能超过pages
        page = Math.min(page, pages);
        //取值不能小于1
        page = Math.max(page, 1);

        var skip = (page - 1) * limit;

        Content.find().limit(limit).skip(skip).populate(['category','user']).then(function (contents) {

            res.render('admin/content_index', {
                userInfo: req.userInfo,
                contents: contents,
                page: page,
                count: count,
                pages: pages,
                limit: limit
            });
        });

    });

})

//内容添加
router.get('/content/add', function (req, res) {
    Category.find().sort({_id: -1}).then(function (categories) {
        Tag.find().sort({_id: -1}).then(function (tags) {
            console.log(tags);
            res.render('admin/content_add', {
                userInfo: req.userInfo,
                categories: categories,
                tags: tags
            })
        })
    })
})
//内容保存
router.post('/content/add', function (req, res) {
    console.log(req.body);
    if(req.body.category == ''){
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: "内容不能为空"
        })
    }

    if(req.body.title == ''){
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: "标题不能为空"
        })
    }

    console.log(req.body);

    //保存数据到数据库
    new Content({
        category: req.body.category,
        title: req.body.title,
        user: req.userInfo._id.toString(),
        description: req.body.description,
        content: req.body.content,
        tag: req.body.tags.split(',')
    }).save().then(function (rs) {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: "内容保存",
            url: "/admin/content"
        })
    });
})

//标签添加
router.post('/tag/add', function (req, res) {
    var name = req.body.name || "";

    if( !name ){
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: "名称不能为空",
            // url:
        });
        return;
    }
    
      //数据库中是否存在
    Tag.findOne({
        name:name
    }).then(function (rs) {
        if(rs){
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: "标签已经存在"
            })

            return Promise.reject();
        }else {
            return new Tag({name: name}).save()
        }
    }).then(function (newCategory) {
        res.render('admin/success',{
            userInfo: req.userInfo,
            message: "标签添加成功",
            url: '/admin/tag'
        });
    })
})

router.get('/tag/add', function (req, res) {
    res.render('admin/tag_add', {
        userInfo: req.userInfo
    });
})

/*
* 标签首页
* */
router.get('/tag', function (req, res) {
    /*
    * limit()：闲置获取的数据条款
    *
    * skip()：忽略数据的条数
    * */

    var page = Number(req.query.page || 1);
    var limit = 10;

    var pages = 0;

    Tag.count().then(function (count) {
        //计算总页数
        pages = Math.ceil(count / limit);
        //取值不能超过pages
        page = Math.min(page, pages);
        //取值不能小于1
        page = Math.max(page, 1);

        var skip = (page - 1) * limit;

        /**
         * 1:升序
         * -1：降序
         */
        Tag.find().sort({_id: -1}).limit(limit).skip(skip).then(function (tags) {

            res.render('admin/tag_index', {
                userInfo: req.userInfo,
                tags: tags,

                page: page,
                count: count,
                pages: pages,
                limit: limit
            });
        });

    });
})

/*
* 标签修改
* */
router.get('/tag/edit', function (req, res) {
    var id = req.query.id || '';

    Tag.findOne({
        _id: id
    }).then(function (tag) {
        if(!tag){
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: "标签信息不存在"
            })
        }else {
            res.render('admin/tag_edit', {
                userInfo: req.userInfo,
                tag: tag
            })
        }
    })
})

//标签修改保存
router.post('/tag/edit', function (req, res) {
    var id = req.query.id || '';
    var name = req.body.name || '';

    Tag.findOne({
        _id: id
    }).then(function (tag) {
        if(!tag){
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: "标签信息不存在"
            })
        }else {
            //要修改的标签名称是否已经在数据库中存在
            if(name == tag.name){
                res.render('admin/success', {
                    userInfo: req.userInfo,
                    message: "修改成功",
                    url: '/admin/tag'
                })
                return Promise.reject();
            }else {
                //判断修改的分类数据库中是否存在
                return Tag.findOne({
                    _id: {$ne: id},
                    name: name
                })
            }
        }
    }).then(function (sameTag) {
        if(sameTag){
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: "数据库已存在"
            })
            return Promise.reject();
        }else {
            return Tag.update({
                _id: id
            },{
                name: name
            })
        }
    }).then(function () {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: "修改成功",
            url: '/admin/tag'
        })
    })
})

//分类的保存
router.post('/category/add',function (req, res) {
    var name = req.body.name || "";

    if( !name ){
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: "名称不能为空",
            // url:
        });
        return;
    }

    //数据库中是否存在
    Category.findOne({
        name:name
    }).then(function (rs) {
        if(rs){
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: "分类已经存在"
            })

            return Promise.reject();
        }else {
            return new Category({name: name}).save()
        }
    }).then(function (newCategory) {
        res.render('admin/success',{
            userInfo: req.userInfo,
            message: "分类报错成功",
            url: '/admin/category'
        });
    })
})

//分类的添加
router.get('/category/add', function (req, res) {
    res.render('admin/category_add', {
        userInfo: req.userInfo
    });
})

//后台首页
router.get('/', function (req, res, next) {
    res.render('admin/index', {
        userInfo: req.userInfo
    });
})

//用户列表
router.get('/user',function (req, res) {

    /*
    * limit()：闲置获取的数据条款
    *
    * skip()：忽略数据的条数
    * */

    var page = Number(req.query.page || 1);
    var limit = 10;

    var pages = 0;

    User.count().then(function (count) {
        //计算总页数
        pages = Math.ceil(count / limit);
        //取值不能超过pages
        page = Math.min(page, pages);
        //取值不能小于1
        page = Math.max(page, 1);

        var skip = (page - 1) * limit;

        User.find().limit(limit).skip(skip).then(function (users) {

            res.render('admin/user_index', {
                userInfo: req.userInfo,
                users: users,

                page: page,
                count: count,
                pages: pages,
                limit: limit
            });
        });

    });




});

/*
* 分类首页
* */
router.get('/category', function (req, res) {

    /*
    * limit()：闲置获取的数据条款
    *
    * skip()：忽略数据的条数
    * */

    var page = Number(req.query.page || 1);
    var limit = 10;

    var pages = 0;

    Category.count().then(function (count) {
        //计算总页数
        pages = Math.ceil(count / limit);
        //取值不能超过pages
        page = Math.min(page, pages);
        //取值不能小于1
        page = Math.max(page, 1);

        var skip = (page - 1) * limit;

        /**
         * 1:升序
         * -1：降序
         */
        Category.find().sort({_id: -1}).limit(limit).skip(skip).then(function (categories) {

            res.render('admin/category_index', {
                userInfo: req.userInfo,
                categories: categories,

                page: page,
                count: count,
                pages: pages,
                limit: limit
            });
        });

    });
})

/*
* 分类修改
* */
router.get('/category/edit', function (req, res) {
    var id = req.query.id || '';

    Category.findOne({
        _id: id
    }).then(function (category) {
        if(!category){
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: "分类信息不存在"
            })
        }else {
            res.render('admin/category_edit', {
                userInfo: req.userInfo,
                category: category
            })
        }
    })
})

//分类修改保存
router.post('/category/edit', function (req, res) {
    var id = req.query.id || '';
    var name = req.body.name || '';

    Category.findOne({
        _id: id
    }).then(function (category) {
        if(!category){
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: "分类信息不存在"
            })
        }else {
            //要修改的分类名称是否已经在数据库中存在
            if(name == category.name){
                res.render('admin/success', {
                    userInfo: req.userInfo,
                    message: "修改成功",
                    url: '/admin/category'
                })
                return Promise.reject();
            }else {
                //判断修改的分类数据库中是否存在
                return Category.findOne({
                    _id: {$ne: id},
                    name: name
                })
            }
        }
    }).then(function (sameCategory) {
        if(sameCategory){
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: "数据库已存在"
            })
            return Promise.reject();
        }else {
            return Category.update({
                _id: id
            },{
                name: name
            })
        }
    }).then(function () {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: "修改成功",
            url: '/admin/category'
        })
    })
})

//分类删除
router.get('/category/delete', function (req, res) {
    //获取要删除的分类的id
    var id = req.query.id || '';

    Category.remove({
        _id: id
    }).then(function () {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: "删除成功",
            url: '/admin/category'
        })
    });
})

module.exports = router