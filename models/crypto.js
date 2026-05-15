const crypto = require('crypto');
const logger = require("../utils/logger.js");

const cryptoController = {
    encrypt(text, iv, key) {
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    },

    decrypt(text, iv, key) {
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
        let decrypted = decipher.update(text, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    },

    hashPassword(password) {
        const salt = crypto.randomBytes(16).toString('hex');;
        const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
        return {hash, salt};
    },

    verifyPassword(password, hash, salt) {
        const newHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
        return newHash === hash;
    }
};

module.exports = cryptoController;