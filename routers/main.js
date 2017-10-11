var express = require('express');
var router = express.Router();
var Category = require('../models/Category');
var Content = require('../models/Contents');
var marked = require('marked');

var data;

//处理通用数据
router.use(function (req, res, next) {
    data = {
        userInfo: req.userInfo,
        categries: [],
    }

    Category.find().then(function (categries) {
      data.categries = categries;
      next();
    })
});

router.get('/', function (req, res, next) {
    Object.assign(data,{
         category: req.query.category || '',
         page : Number(req.query.page || 1),
         limit : 4,
         pages : 0,
         count:0
     });

    var where = {};
    if(data.category){
        where.category = data.category;
    }

    Content.where(where).count().then(function (count) {
        data.count = count;
        data.pages = Math.ceil(data.count / data.limit);
        data.page = Math.min( data.page, data.pages);
        data.page = Math.max( data.page, 1);

        var limit = data.limit;
        var skip = (data.page - 1) * data.limit;


        return Content.where(where).find().limit(limit).skip(skip).populate(['category', 'user']).sort({
            addTime: -1
        });
    }).then(function (contents) {
        data.contents = contents;
        res.render('main/index',data);
    }).catch(function (e) {
        console.log(e);
    })


})

router.get('/view',function (req, res) {
    var contentId = req.query.contentid || '';
    
    Content.findOne({
        _id: contentId
    }).then(function (content) {
        data.content = content;

        content.views++;
        content.save();
      
        res.render('main/view', data);
    })
})
module.exports = router;
