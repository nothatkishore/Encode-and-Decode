import express from 'express'
import rc4Encrypt from '../controller/rc4Encrypt.controller.js';
import rc4Decrypt from '../controller/rc4Decrypt.controller.js';

const router = express.Router();

router.post('/encrypt', rc4Encrypt);
router.post('/decrypt', rc4Decrypt);

export default router;