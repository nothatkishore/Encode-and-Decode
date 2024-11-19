import express from 'express';
import desEncrypt from '../controller/desEncrypt.controller.js';
import desDecrypt from '../controller/desDecrypt.controller.js';

const router = express.Router();

router.post('/encrypt', desEncrypt);
router.post('/decrypt', desDecrypt);

export default router;