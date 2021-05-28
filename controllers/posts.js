const Post = require('../models/post');
const cloudinary = require('cloudinary');
cloudinary.config({
	cloud_name: 'dui7rjl7p',
	api_key: '997977887133522',
	api_secret: 'LKlfvudwOdhWgSpHIT6Usi8omjw'
});

module.exports = {
	// Posts Index
	async postIndex(req, res, next) {
		let posts = await Post.paginate({},{
			page:req.query.page||1,
			limit:10
			
		});
		posts.page = Number(posts.page);
		res.render('posts/index', { posts, title: 'Posts Index' });
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
		req.session.success = 'Post created successfully!';
		res.redirect(`/posts/${post.id}`);
	},
	// Posts Show
	async postShow(req, res, next) {
		let post =  await Post.findById(req.params.id).populate({
			path:'reviews',
			options:{sort :{'_id':-1}}
			
		});
		console.log(post);
		res.render('posts/show', { post });
	},
	// Posts Edit
	async postEdit(req, res, next) {
		let post = await Post.findById(req.params.id);
		res.render('posts/edit', { post });
	},
	// Posts Update
	async postUpdate(req, res, next) {
		// find the post by id
		let post = await Post.findById(req.params.id);
		// check if there's any images for deletion
		if(req.body.deleteImages && req.body.deleteImages.length) {			
			// assign deleteImages from req.body to its own variable
			let deleteImages = req.body.deleteImages;
			// loop over deleteImages
			for(const public_id of deleteImages) {
				// delete images from cloudinary
				await cloudinary.v2.uploader.destroy(public_id);
				// delete image from post.images
				for(const image of post.images) {
					if(image.public_id === public_id) {
						let index = post.images.indexOf(image);
						post.images.splice(index, 1);
					}
				}
			}
		}
		// check if there are any new images for upload
		if(req.files) {
			// upload images
			for(const file of req.files) {
				let image = await cloudinary.v2.uploader.upload(file.path);
				// add images to post.images array
				post.images.push({
					url: image.secure_url,
					public_id: image.public_id
				});
			}
		}
		// check if location was updated
		if(req.body.post.location !== post.location) {
			post.location = req.body.post.location;
		}
		// update the post with any new properties
		post.title = req.body.post.title;
		post.description = req.body.post.description;
		post.price = req.body.post.price;
		// save the updated post into the db
		post.save();
		// redirect to show page
		res.redirect(`/posts/${post.id}`);
	},
	// Posts Destroy
	async postDestroy(req, res, next) {
		let post = await Post.findById(req.params.id);
		for(const image of post.images) {
			await cloudinary.v2.uploader.destroy(image.public_id);
		}
		await post.remove();
		res.redirect('/posts');
	}
}
