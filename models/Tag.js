
var mongoose = require('mongoose');
var tagsSchema = require(('../schemas/tags'));

module.exports =  mongoose.model('Tag', tagsSchema);
