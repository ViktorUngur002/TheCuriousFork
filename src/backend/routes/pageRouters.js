const express = require('express');
const router = express.Router();
const path = require('path');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

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

router.get('/profile(.html)?', protect, async (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..',  'views', 'profile.html'));
});

router.get('/admin(.html)?', protect, isAdmin, async(req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views', 'admin.html'));
});

router.get('/addProduct(.html)?', protect, isAdmin, async(req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views', 'addProduct.html'));
});

router.get('/updateProduct(.html)?', protect, isAdmin, async(req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views', 'updateProduct.html'));
});

router.get('/deleteProduct(.html)?', protect, isAdmin, async(req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views', 'deleteProduct.html'));
});

router.get('/checkout(.html)?', protect, async(req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views', 'checkOut.html'));
});

router.get('/ordersAndUsers(.html)?', protect, isAdmin, async(req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views', 'ordersAndUsers.html'));
});

module.exports = router;