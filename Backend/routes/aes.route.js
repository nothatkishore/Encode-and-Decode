import express from 'express'
import aesEncrypt from '../controller/aesEncrypt.controller.js';
import aesDecrypt from '../controller/aesDecrypt.controller.js';

const router = express.Router();

router.post('/encrypt', aesEncrypt);
router.post('/decrypt', aesDecrypt);

export default router;