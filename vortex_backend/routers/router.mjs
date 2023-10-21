import { Router } from 'express';
import '../database/dbConnection.mjs';

const router = Router();


router.get('/', (req, res) => {
    res.send('home page');
});

import assistant from '../controllers/assistant.mjs';
import user from '../controllers/user.js';


router.use(assistant);
router.use(user);


export default router;
