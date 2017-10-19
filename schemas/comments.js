var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
   username: String,
   postTime: Date,
   content: String,
   nickname: String,
   email: String,
   site: String,
   article_id: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Contents'
    }
})