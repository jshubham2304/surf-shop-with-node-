const Post = require('../models/post');

module.exports = {
	async getPosts(req, res, next) {
		let posts = await Post.find({});
		res.render('posts/index', { posts });
	},
	newPosts(req,res,next){
		res.render(
			'posts/new'
		)
	},
	async createPosts(req,res,next){
		let post = await Post.create(req.body);
		res.redirect(`/posts/${post.id}`)
	},
	async showPosts(req, res, next) {
		let posts = await Post.findById(req.params.id);
		console.log(posts);
		res.render('posts/show', { posts });
	},
	async editPosts(req, res, next) {
		let posts = await Post.findById(req.params.id);
		
		res.render('posts/edit', { posts });
	},
	async postUpdate(req, res, next) {
		
		let posts = await Post.findByIdAndUpdate(req.params.id, req.body.posts,{new:true});
		
		res.redirect(`/posts/${posts.id}`)
	},
	async deletePost(req, res, next) {
		
		let posts = await Post.findByIdAndDelete(req.params.id);
		
		res.redirect(`/posts`)
	},
}