import { webcrypto as crypto } from "crypto";
import express from "express";


const aesDecrypt = async (request, response) => {
    try {
        const { encrypted, iv } = request.body; 

        if (!encrypted || !iv) {
            return response.status(400).json({ error: "Both 'encrypted' and 'iv' are required in the request body." });
        }

        const secretKey = "my_fixed_secret_key_123"; // Fixed 16-byte secret key
        const decoder = new TextDecoder();

        // Import the fixed key as a cryptographic key for AES-GCM
        const key = await crypto.subtle.importKey(
            "raw",
            new TextEncoder().encode(secretKey), // Convert string to raw bytes
            "AES-GCM",
            false,
            ["decrypt"]
        );

        // Decrypt the data
        const decrypted = await crypto.subtle.decrypt(
            {
                name: "AES-GCM",
                iv: new Uint8Array(iv), // Convert IV back to Uint8Array
            },
            key,
            new Uint8Array(encrypted) // Convert encrypted data back to Uint8Array
        );

        // Send decrypted text as response
        response.json({
            decrypted: decoder.decode(decrypted), // Convert decrypted bytes to string
        });
    } catch (error) {
        console.error("Decryption Error:", error);
        response.status(500).json({ error: "Decryption failed." });
    }
};

export default aesDecrypt;