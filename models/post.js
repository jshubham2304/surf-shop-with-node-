const mongoose = require('mongoose');
const mongoosePagination = require('mongoose-paginate');
const Review  = require('../models/review');
const Schema = mongoose.Schema;


const PostSchema = new Schema({
	title: String,
	price: String,
	description: String,
	images: [ { url: String, public_id: String } ],
	location: String,
	coordinates: Array,
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	reviews: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Review'
		}
	]
});
PostSchema.pre('remove',async function(){
	await Review.remove({
		_id:{
			$in:this.reviews
		}
	});
});
PostSchema.plugin(mongoosePagination);
module.exports = mongoose.model('Post', PostSchema);
