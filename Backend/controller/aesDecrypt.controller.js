import crypto from 'crypto';

const AES_KEY = Buffer.from('12345678901234567890123456789012', 'utf8'); // 32-byte key for AES-256
const AES_IV = Buffer.from('1234567890123456', 'utf8'); // 16-byte IV (used here)

// AES decryption function
const aesDecrypt = (req, res) => {
    const encryptedText = req.body.text; // Encrypted text (Base64)

    try {
        const decipher = crypto.createDecipheriv('aes-256-cbc', AES_KEY, AES_IV);
        let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
        decrypted += decipher.final('utf8');

        res.status(200).json({ status: decrypted.toString() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Decryption failed' });
    }
};

export default aesDecrypt;
