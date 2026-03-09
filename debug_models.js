const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env' });

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Just to get the object, though we want listModels which is on the client? 
        // Wait, the SDK doesn't have a direct listModels on the client instance in some versions?
        // Actually typically it's not on the client instance directly in the simplified SDK.
        // Let's try to just run a simple generation with a known working legacy model if available or just check the error details.

        // Actually, checking documentation (mental check):
        // Older SDK versions might behave differently.
        // Let's try to just use "gemini-pro" (we tried) or "gemini-1.0-pro"

        console.log("Testing gemini-1.5-flash...");
        const modelFlash = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const resultFlash = await modelFlash.generateContent("Hello");
        console.log("gemini-1.5-flash worked:", resultFlash.response.text());

    } catch (error) {
        console.error("gemini-1.5-flash failed:", error.message);
    }

    try {
        console.log("Testing gemini-pro...");
        const modelPro = genAI.getGenerativeModel({ model: "gemini-pro" });
        const resultPro = await modelPro.generateContent("Hello");
        console.log("gemini-pro worked:", resultPro.response.text());
    } catch (error) {
        console.error("gemini-pro failed:", error.message);
    }
}

listModels();
