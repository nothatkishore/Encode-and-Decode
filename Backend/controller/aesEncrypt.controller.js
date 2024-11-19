import { webcrypto as crypto } from "crypto";
import express from "express";

const aesEncrypt = async (request, response) => {
    try {
        const text = request.params.text; 

        if (!text) {
            return response.status(400).json({ error: "Text parameter is required." });
        }

        const secretKey = "my_fixed_secret_key_123"; 
        const iv = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]); 
        const encoder = new TextEncoder();

        const key = await crypto.subtle.importKey(
            "raw",
            encoder.encode(secretKey), 
            "AES-GCM",
            false,
            ["encrypt"]
        );

        const encrypted = await crypto.subtle.encrypt(
            {
                name: "AES-GCM",
                iv: iv,
            },
            key,
            encoder.encode(text)
        );

        response.json({
            iv: Array.from(iv), 
            encrypted: Array.from(new Uint8Array(encrypted)), 
        });
    } catch (error) {
        console.error("Encryption Error:", error);
        response.status(500).json({ error: "Encryption failed." });
    }
};

export default aesEncrypt;