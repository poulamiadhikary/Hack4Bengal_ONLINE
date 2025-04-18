import { GoogleGenerativeAI } from '@google/generative-ai'

export const translateCode = async (req, res) => {
    const { source, lang } = req.body;

    try {
        const api = process.env.GEMINI_API;
        const genAI = new GoogleGenerativeAI(api);

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
        });

        const generationConfig = {
            temperature: 1,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 8192,
            responseModalities: [
            ],
            responseMimeType: "text/plain",
        };

        const chatSession = model.startChat({
            generationConfig,
            history: []
        });

        const result = await chatSession.sendMessage(`Translate the following code in ${lang}. No extra information, no extra formatting nothing. Just a string without any language mentioned in backticks. ${source}`);

        const responseText = result.response.text();

        return res.status(200).json({
            success: true,
            data: responseText
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}