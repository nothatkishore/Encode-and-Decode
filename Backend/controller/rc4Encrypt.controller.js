import CryptoJS from 'crypto-js';

// Hardcoded key for RC4 encryption
const RC4_KEY = 'mysecretkey12345';

// RC4 encryption function
const rc4Encrypt = (req, res) => {
    const plaintext = req.body.text; // Plaintext to encrypt

    try {
        // Parse the key to ensure consistency with decryption
        const key = CryptoJS.enc.Utf8.parse(RC4_KEY);

        // Encrypt the plaintext using RC4 with the parsed key
        const encrypted = CryptoJS.RC4.encrypt(plaintext, key);

        // Return the encrypted message in Base64 format
        res.status(200).json({ status: encrypted.toString() });
    } catch (error) {
        console.error('Encryption failed:', error.message);
        res.status(500).json({ error: 'Encryption failed' });
    }
};

export default rc4Encrypt;
