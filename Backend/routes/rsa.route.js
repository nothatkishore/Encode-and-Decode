import express from 'express'
import rsaEncrypt from '../controller/rsaEncrypt.controller.js';
import rsaDecrypt from '../controller/rsaDecrypt.controller.js';

const router = express.Router();

router.post('/encrypt', rsaEncrypt);
router.post('/decrypt', rsaDecrypt);

export default router;