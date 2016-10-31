import { Router } from 'express';
import {index, logout} from '../controllers/index';
import passport from 'passport';

const router = Router();
router.route('/').get(index);

router.route('/auth/facebook').get(passport.authenticate('facebook', {scope: ['email']}));

router.route('/auth/facebook/callback').get(passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/'
}));

router.route('/logout').get(logout);

export default router;
