const express = require('express');
const router = express.Router();
const path = require('path');
const { checkAuthentication } = require('../middlewares/authMiddleware');


router.get('*^/$|/homepage(.html)?', async (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views', 'homepage.html'));
});

router.get('/aboutus(.html)?', async (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..',  'views', 'aboutus.html'));
});

router.get('/desserts(.html)?', async (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views', 'desserts.html'));
});

router.get('/maincourse(.html)?', async (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views', 'maincourse.html'));
});

router.get('/salads(.html)', async (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views', 'salads.html'));
});

router.get('/signin(.html)?', async (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views', 'signin.html'));
});

router.get('/signup(.html)?', async (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views', 'signup.html'));
})


module.exports = router;