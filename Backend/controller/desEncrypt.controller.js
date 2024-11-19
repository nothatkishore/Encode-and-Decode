import CryptoJS from 'crypto-js';

const desEncrypt = (req, res) => {
  try {
    const text = req.body.text;
    const key = CryptoJS.enc.Utf8.parse("12345678");
    const iv = CryptoJS.enc.Utf8.parse("12345678");

    // Perform encryption
    const encryptedMessage = CryptoJS.DES.encrypt(text, key, { iv: iv });

    // Extract the ciphertext as a string
    const ciphertext = encryptedMessage.toString();

    // Send the ciphertext as the response
    res.status(200).json({ status: ciphertext });
  } catch (error) {
    console.error("Encryption error:", error);
    res.status(500).json({ message: "Encryption failed", error: error.message });
  }
};

export default desEncrypt;
