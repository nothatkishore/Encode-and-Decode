import CryptoJS from 'crypto-js';

// DES decryption function
const desDecrypt = (req, res) => {
  try {
    const { text } = req.body; // Encrypted text (Base64 format)

    if (!text) {
      return res.status(400).json({ error: "No text provided for decryption" });
    }

    // Ensure the key and IV are 8 bytes (for DES)
    const key = CryptoJS.enc.Utf8.parse('12345678'); // 8-byte key
    const iv = CryptoJS.enc.Utf8.parse('12345678');  // 8-byte IV (use the same as encryption)

    // Decrypt the text
    const decrypted = CryptoJS.DES.decrypt(text, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    // Convert decrypted data to a UTF-8 string
    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

    // Check if decryption was successful
    if (!decryptedText) {
      return res.status(400).json({ error: "Decryption failed. Invalid data or key." });
    }

    // Send the decrypted text as the response
    res.status(200).json({ status: decryptedText });
  } catch (error) {
    console.error("Decryption error:", error.message);
    res.status(500).json({ error: "Internal server error during decryption." });
  }
};

export default desDecrypt;
