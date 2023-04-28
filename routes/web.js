import express from 'express'
import Controller from '../controllers/Controller.js';
import authMiddleware from '../middleware/authmiddleware.js';

const router = express.Router();
router.use(authMiddleware.checkUser);
router.get('/signup', Controller.signup);
router.get('/login', Controller.login);
router.post('/signup', Controller.signup_post);
router.post('/login', Controller.login_post);
router.get('/', Controller.home);
router.use(authMiddleware.authreq);
router.get('/blog', Controller.blogPage);
router.get('/addnote', Controller.addNote);
router.post('/addnote', Controller.addData);
router.get('/update/:id', Controller.editNote);
router.post('/update/:id', Controller.updateNote);
router.post('/delete/:id', Controller.deleteNote);
router.post('/favourite/:id', Controller.likeNote);
router.get('/favourites', Controller.favouriteNote);
router.get('/logout', Controller.logout);
export default router;