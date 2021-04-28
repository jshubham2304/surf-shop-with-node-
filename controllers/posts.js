const Post = require('../models/post');
const cloudinary = require('cloudinary');
cloudinary.config({
	cloud_name: 'dui7rjl7p',
	api_key: '997977887133522',
	api_secret: process.env.CLOUDINARY_SECRET
});

module.exports = {
	// Posts Index
	async postIndex(req, res, next) {
		let posts = await Post.find({});
		res.render('posts/index', { posts });
	},
	// Posts New
	postNew(req, res, next) {
		res.render('posts/new');
	},
	// Posts Create
	async postCreate(req, res, next) {
		req.body.post.images = [];
		for(const file of req.files) {
			let image = await cloudinary.v2.uploader.upload(file.path);
			req.body.post.images.push({
				url: image.secure_url,
				public_id: image.public_id
			});
		}
		let post = await Post.create(req.body.post);
		res.redirect(`/posts/${post.id}`);
	},
	// Posts Show
	async postShow(req, res, next) {
		let post = await Post.findById(req.params.id);
		res.render('posts/show', { post });
	},
	// Posts Edit
	async postEdit(req, res, next) {
		let post = await Post.findById(req.params.id);
		res.render('posts/edit', { post });
	},
	// Posts Update
	async postUpdate(req, res, next) {
		let post = await Post.findById(req.params.id);
		if(req.body.deleteImages && req.body.deleteImages.length ){
			let deleteImg  = req.body.deleteImages;
			for(const public_id of deleteImg){
				await cloudinary.v2.uploader.destroy(public_id);
				for(const image of post.images){
					if(image.public_id ===public_id){
						let index=  post.images.indexOf(image);
						post.images.splice(index,1);
					}
				}
			}
			if(req.files){
				for(const file of req.files) {
					let image = await cloudinary.v2.uploader.upload(file.path);
					post.images.push({
						url: image.secure_url,
						public_id: image.public_id
					});
				}
					
			}
		}
		// handle existing images
		post.description = req.body.post.description;
		post.price = req.body.post.price;
		post.location = req.body.post.location;
		//handle upload 
		post.save();
		res.redirect(`/posts/${post.id}`);
	},
	// Posts Destroy
	async postDestroy(req, res, next) {
		let post =await Post.findById(req.params.id);
		for(const image of post.images){
			await cloudinary.v2.uploader.destroy(image.public_id);		
		}
		await post.remove();
		res.redirect('/posts');
	}
}
