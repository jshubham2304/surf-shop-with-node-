const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware');
const { getPosts , 
   newPosts, 
   createPosts,
   showPosts,
   editPosts,
   postUpdate, deletePost} = require('../controllers/posts');

/* GET posts index /posts */
router.get('/', errorHandler(getPosts));

/* GET posts new /posts/new */
router.get('/new', errorHandler(newPosts));

/* POST posts create /posts */
router.post('/',errorHandler( createPosts));

/* GET posts show /posts/:id */
router.get('/:id', errorHandler(showPosts));

/* GET posts edit /posts/:id/edit */
router.get('/:id/edit',errorHandler( editPosts));

/* PUT posts update /posts/:id */
router.put('/:id', errorHandler(postUpdate));

/* DELETE posts destroy /posts/:id */

router.delete('/:id', errorHandler(deletePost));


module.exports = router;
