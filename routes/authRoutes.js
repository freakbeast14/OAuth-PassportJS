const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login',{
        user: req.user
    });
});

router.get('/logout', (req, res) => {
    //passport
    req.logout();
    res.redirect('/');
});

router.get('/google', passport.authenticate('google',{
    scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile/')
});

module.exports = router;

