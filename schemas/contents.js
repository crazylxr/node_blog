var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    title: String,
   //关联字段,分类id
    category: {
         type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    addTime: {
        type: Date,
        default: new Date()
    },

    views: {
      type: Number,
      default: 0
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    description: {
       type: String,
        defalut: ''
    },

    content: {
       type: String,
        default: ''
    },

    comments: {
        type: Array,
        default: []
    }
});