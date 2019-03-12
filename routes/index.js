const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');
const SkillsController = require('../controller/skillsController');
const multer = require('multer');

let storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/uploads')
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname)
	}
});

let upload = multer({storage: storage});


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'SkillHub' });
});

router.get('/signup', function (req, res) {

    res.render('signup', {title: 'SkillHub:: Signup', message: req.flash('message')});
});

router.get('/skills', SkillsController.getAllUserController);
router.get('/graphics', SkillsController.getGraphics);
router.get('/software', SkillsController.getSoftware);
router.get('/fashion', SkillsController.getFashion);
router.get('/hair-stylist', SkillsController.getHairStylist);
router.get('/makeup', SkillsController.getMakeup);
router.get('/event', SkillsController.getEvent);
router.post('/signup',upload.single('image'), UserController.registerUser);
router.get('/profile', UserController.showProfile);
router.get('/signin', UserController.showLogin);
router.post('/signin', UserController.loginController);



module.exports = router;
