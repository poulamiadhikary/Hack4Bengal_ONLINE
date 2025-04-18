import jwt from 'jsonwebtoken';
import { Code } from '../models/gemini.js';
import { GoogleGenerativeAI } from '@google/generative-ai'

export const generateCode = async (req, res) => {

    const { prompt, token, initial } = req.body;
    const secret = process.env.SECRET;

    const decoded = jwt.verify(token, secret);

    const id = decoded.id;

    try {
        const found = await Code.findOne({ userId: id, initial: initial });

        if (found !== null) {
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
                responseMimeType: "application/json",
            };

            let history = found.codeHistory;

            const chatSession = model.startChat({
                generationConfig,
                history: history.map((code) => ({
                    role: code.role,
                    parts: [{ text: code.message }]
                }))
            });

            const PROMPT = `${prompt}. Provide me the response in pure json object like this : {message: "okk, i got it, implement a binary search
            in c++", code: "ACTUAL_CODE"}. Do not include any text, markdown, or formatting or escape characters or triplr backticks. Just return raw JSON.`;

            const result = await chatSession.sendMessage(PROMPT);

            const resMess = result.response.text();
            //console.log(resMess);

            const parsed = JSON.parse(resMess);
            console.log(parsed);

            const message = parsed.message;
            const code = parsed.code;

            const stringCode = JSON.stringify(code);

            const userRes = { role: 'user', message: prompt };
            const modelRes = { role: 'model', message: message, code: stringCode };

            const foundHist = await Code.findOne({ userId: id, initial: initial });
            foundHist.codeHistory.push(userRes);
            foundHist.codeHistory.push(modelRes);
            await foundHist.save();

            //console.log(foundHist);

            return res.status(201).json({
                success: true,
                data: foundHist
            });
        }
        else {
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
                responseMimeType: "application/json",
            };

            const chatSession = model.startChat({
                generationConfig,
                history: []
            });

            const PROMPT = `${prompt}. Provide me the response in pure json object like this : {message: "okk, i got it, implement a binary search
            in c++", code: "ACTUAL_CODE"}. Do not include any text, markdown,  or formatting or escape characters or triplr backticks. Just return raw JSON.`;

            const result = await chatSession.sendMessage(PROMPT);

            const responseText = result.response.text();
            //console.log(responseText);

            const parsed = JSON.parse(responseText);
            //console.log(parsed);

            const message = parsed.message;
            const code = parsed.code;

            const stringCode = code;

            const newCode = new Code({
                initial: prompt,
                codeHistory: [{ role: 'user', message: prompt }, { role: 'model', message: message, code: stringCode }],
                userId: id
            });

            await newCode.save();
            //console.log(newCode);
            return res.status(200).json({
                success: true,
                data: newCode
            });
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}

export const fetchCodeHistory = async (req, res) => {
    const { token } = req.query;

    const secret = process.env.SECRET;
    const decoded = jwt.verify(token, secret);
    const id = decoded.id;

    try {
        const found = await Code.find({ userId: id });

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