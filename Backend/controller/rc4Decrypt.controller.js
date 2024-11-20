import CryptoJS from 'crypto-js';

// Hardcoded key for RC4 decryption
const RC4_KEY = 'mysecretkey12345';

// RC4 decryption function
const rc4Decrypt = (req, res) => {
    const encryptedText = req.body.text; // Encrypted text (Base64 encoded)

    try {
        if (!encryptedText) {
            return res.status(400).json({ error: 'No text provided for decryption' });
        }

        // Parse the key to ensure consistency with encryption
        const key = CryptoJS.enc.Utf8.parse(RC4_KEY);

        // Decrypt the Base64 encoded text using RC4 with the parsed key
        const decrypted = CryptoJS.RC4.decrypt(encryptedText, key);

        // Convert the decrypted data to a UTF-8 string
        const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

        if (!decryptedText) {
            throw new Error('Decryption resulted in empty text');
        }

        // Return the decrypted message
        res.status(200).json({ status: decryptedText });
    } catch (error) {
        console.error('Decryption failed:', error.message);
        res.status(500).json({ error: 'Decryption failed', details: error.message });
    }
};

export default rc4Decrypt;
