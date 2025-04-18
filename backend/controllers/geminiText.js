import jwt from 'jsonwebtoken';
import { Text } from '../models/gemini.js';
import { GoogleGenerativeAI } from '@google/generative-ai'

export const generateText = async (req, res) => {

    const { prompt, token, initial } = req.body;
    const secret = process.env.SECRET;

    console.log(initial);

    const decoded = jwt.verify(token, secret);
    //console.log(decoded);

    const id = decoded.id;

    try {

        const foundHist = await Text.findOne({ initial: initial, userId: id });
        //console.log(foundHist);

        if (foundHist !== null) {
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

            let history = foundHist.textHistory;

            const chatSession = model.startChat({
                generationConfig,
                history: history.map((text)=> ({
                    role: text.role,
                    parts: [{text: text.message}]
                }))
            });

            const result = await chatSession.sendMessage(prompt);

            const resMess = result.response.text();
            //console.log(resMess);

            const userRes = {role: 'user', message: prompt};
            const modelRes = {role: 'model', message: resMess};

            const found = await Text.findOne({ userId: id, initial: initial});
            found.textHistory.push(userRes);
            found.textHistory.push(modelRes);
            await found.save();

            return res.status(201).json({
                success: true,
                data: found
            });
        }
        else{
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

            const result = await chatSession.sendMessage(prompt);

            //console.log(result.response.text());
            const responseText = result.response.text();

            const newText = new Text({
                initial: prompt,
                message: responseText,
                textHistory: [{role: 'user', message: prompt}, {role: 'model', message: responseText}],
                userId: id
            });

            await newText.save();

            return res.status(200).json({
                success: true,
                data: newText
            });
        }

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }
}

export const getText = async (req, res) => {

    const { token } = req.query;

    const secret = process.env.SECRET;
    const decoded = jwt.verify(token, secret);
    const id = decoded.id;

    try {
        const found = await Text.find({userId: id});

        return res.status(200).json({
            success: true,
            data: found
        });
    } catch (err) {
        console.log(err.mesage);
        return res.status(500).json({
            success: false,
        });
    }
}