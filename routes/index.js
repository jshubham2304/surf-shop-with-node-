const express = require('express');
const router = express.Router();

const {postRegister,postLogin,getLogOut} =  require('../controllers/index')
const {errorHandler} = require('../middleware/index')
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Surf Shop - Home' });
});

/* pOST register. */
router.post('/register', errorHandler( postRegister));

router.get('/register', (req, res, next) => {
  res.send('get / REGISTER');
});


/* GET register. */
router.get('/login',(req, res, next) => {
  res.send('GET / login');
});

/* Post register. */
router.post('/login', postLogin);

router.get(
  '/logout',getLogOut
);
/* GET Profile. */
router.get('/profile', (req, res, next) => {
  res.send('GET / profile');
});

/* PUT profile:/userid. */
router.put('/profile/:user_id', (req, res, next) => {
  res.send('Put / profile');
});

/* GET register. */
router.get('/login', (req, res, next) => {
  res.send('GET / login');
});

/* get forgotpassword. */
router.get('/forgot-pw', (req, res, next) => {
  res.send('get / forgotpass');
});
router.put('/forgot-pw', (req, res, next) => {
  res.send('PUt / forgotpass');
});
router.get('/reset-pw/:token', (req, res, next) => {
  res.send('get / resetpass');
});
router.put('/reset-pw/:token', (req, res, next) => {
  res.send('put / resetpass');
});




module.exports = router;
