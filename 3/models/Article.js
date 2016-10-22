const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
// var db = mongoose.connect('mongodb://localhost/message_board');//；连接数据库
// Define MessageSchema 
var ArticleSchema = new Schema({
  user_name: {
    type: String,
    required: true
  },
  content:{
  	type:String,
  	required:true
  },
  date: { type: Date, default: Date.now },
});
/**
 * Validations
 */
ArticleSchema.path('user_name').required(true,'user name cannot be blank');
ArticleSchema.path('content').required(true,'content  cannot be blank');
ArticleSchema.statics = { //静态方法
    fetch: function (cb) { // 取出所有数据
        return this
            .find ({}).sort('-date')
            .exec (cb);
    },
    fetchById: function (id, cb) { //根据_id找数据
        return this
            .findById (id)
            .exec (cb);
    }
};
exports.Article = mongoose.model('Article', ArticleSchema);