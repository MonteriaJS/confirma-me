import mongoose from 'mongoose';
import {Strategy as FacebookStrategy} from 'passport-facebook';
import userModel from '../models/user';
import config from '../config';

userModel(mongoose);

const User = mongoose.model('User');

export function passport (passport) {
    passport.serializeUser( (user, done) => {
        done(null, user);
    });

    passport.deserializeUser( (obj, done) => {
        done(null, obj);
    });

    passport.use(new FacebookStrategy({
        clientID: config.facebook.id,
        clientSecret: config.facebook.secret,
        callbackURL: '/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'photos', 'emails']
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({id: profile.id}, (err, user) => {
            if (err) throw(err);
            if (!err && user !== null) return done(null, user);

            const NewUser = new User({
                id: profile.id,
                name: profile.displayName,
                photo: profile.photos[0].value,
                email: profile.emails[0].value
            });
            NewUser.save( (err) => {
                if (err) throw(err);
                done(null, NewUser);
            });
        });
    }));
};