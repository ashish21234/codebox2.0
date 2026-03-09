import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
    try {
        const { code, prompt, exerciseContext } = await req.json();

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: "GEMINI_API_KEY is not configured" },
                { status: 500 }
            );
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        // List of models to try in order of preference
        const modelsToTry = [
            "gemini-2.5-flash",
            "gemini-2.0-flash",
            "gemini-2.0-flash-lite",
            "gemini-flash-latest"
        ];

        let lastError = null;
        let resultText = null;

        const finalPrompt = `
      You are an expert coding mentor. You are helping a student with a coding exercise.
      
      Exercise Context:
      Task: ${exerciseContext?.task || "N/A"}
      Content/Lesson: ${exerciseContext?.content || "N/A"}

      User Question: ${prompt}
      
      Student's Code:
      ${code}
      
      Provide a concise, helpful, and educational response. Do not just give the answer if it's a learning exercise, guide them based on the specific Task requirements.
    `;

        for (const modelName of modelsToTry) {
            try {
                console.log(`Trying model: ${modelName}`);
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent(finalPrompt);
                const response = await result.response;
                resultText = response.text();

                if (resultText) {
                    break; // Success!
                }
            } catch (error: any) {
                console.error(`Model ${modelName} failed:`, error.message);
                lastError = error;
                // Continue to next model
            }
        }

        if (!resultText) {
            return NextResponse.json(
                { error: "All AI models are currently busy or unavailable. Please try again later.", details: lastError?.message },
                { status: 429 }
            );
        }

        return NextResponse.json({ result: resultText });
    } catch (error) {
        console.error("AI Error:", error);
        return NextResponse.json(
            { error: "Failed to generate AI response" },
            { status: 500 }
        );
    }
}
