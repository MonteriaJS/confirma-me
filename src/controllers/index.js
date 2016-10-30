import mongoose from 'mongoose';
import userModel from '../models/user';
userModel(mongoose);

const User = mongoose.model('User');


export function index ( req, res ) {
    res.render('index', {
        user: req.user
    });
};

export function logout ( req, res) {
    req.logout();
    res.redirect('/');
};