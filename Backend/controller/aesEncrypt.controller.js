import crypto from 'crypto';


// AES Key and IV (Initialization Vector)
const AES_KEY = Buffer.from('12345678901234567890123456789012', 'utf8'); // 32-byte key
const AES_IV = Buffer.from('1234567890123456', 'utf8'); // 16-byte IV

// AES encryption function
const aesEncrypt = (req, res) => {
    const text = req.body.text; // Plaintext to encrypt

    try {
        const cipher = crypto.createCipheriv('aes-256-cbc', AES_KEY, AES_IV);
        let encrypted = cipher.update(text, 'utf8', 'base64');
        encrypted += cipher.final('base64');

        res.status(200).json({
            status: encrypted
        });
    } catch (error) {
        res.status(500).json({ error: 'Encryption failed' });
    }
};

export default aesEncrypt;