// In your auth.route.js
import express from 'express';
import { signup } from '../controllers/auth.controller.js';

const router = express.Router();

// Test route
router.get('/test', (req, res) => {
    res.json({ message: 'Auth route is working!' });
});

router.post('/signup', signup);

export default router;