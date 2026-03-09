const https = require('https');
const fs = require('fs');
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
                fs.writeFileSync('model_debug_output.txt', `API Error: ${JSON.stringify(json.error, null, 2)}`);
            } else {
                const models = json.models
                    .filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent'))
                    .map(m => m.name);

                fs.writeFileSync('model_debug_output.txt', models.join('\n'));
                console.log("Written models to model_debug_output.txt");
            }
        } catch (e) {
            fs.writeFileSync('model_debug_output.txt', `Parse Error: ${e.message}\nRaw Data: ${data}`);
        }
    });

}).on("error", (err) => {
    fs.writeFileSync('model_debug_output.txt', `Request Error: ${err.message}`);
});
