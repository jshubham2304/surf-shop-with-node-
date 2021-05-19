const Post = require('../models/post');
const Review = require('../models/review');

module.exports = {
	async reviewCreate(req, res, next) {
		let post =await Post.findById(req.params.id);
        // let req.body.review=
        let review  = await Review.create(req.body.review);
        post.reviews.push(review) ;
        post.save();
        req.session.success= "Review Created successully";
        res.redirect(`/posts/${post.id}`)
        
        
	},
	async reviewUpdate(req, res, next) {
		// redirect to show page
		res.redirect(`/posts/${post.id}`);
	},
	// Review Destroy
	async reviewDestory(req, res, next) {
		// await post.remove();
		res.redirect('/posts');
	}
}
