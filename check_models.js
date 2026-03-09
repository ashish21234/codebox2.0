const https = require('https');
require('dotenv').config({ path: '.env' });

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("No API Key found in .env");
    process.exit(1);
}

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.error) {
                console.error("API Error:", json.error);
            } else {
                console.log("--- START MODEL LIST ---");
                json.models.forEach(m => {
                    if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent')) {
                        console.log(m.name);
                    }
                });
                console.log("--- END MODEL LIST ---");
            }
        } catch (e) {
            console.error("Error parsing JSON:", e);
            console.log("Raw output:", data);
        }
    });

}).on("error", (err) => {
    console.error("Error: " + err.message);
});
