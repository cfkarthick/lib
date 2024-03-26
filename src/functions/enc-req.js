const { app } = require('@azure/functions');
const CryptoJS = require('crypto-js');

// Define your encryption and decryption keys
const encryptionKey = 'YourEncryptionKey'; // Replace with your encryption key
const decryptionKey = 'YourDecryptionKey'; // Replace with your decryption key

// Function to encrypt data
function encryptData(data) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), encryptionKey).toString();
}

// Function to decrypt data
// function decryptData(encryptedData) {
//     const bytes = CryptoJS.AES.decrypt(encryptedData, decryptionKey);
//     return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
// }

app.http('enc-req', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const name = request.query.get('name') || (await request.text()) || 'world';
        const encryptedResponse = encryptData(`Hello, ${name}!`);

        // Return encrypted response
        return {
            headers: {
                'Content-Type': 'text/plain',
                'Encryption': 'AES',
            },
            body: encryptedResponse
        };
    }
});
