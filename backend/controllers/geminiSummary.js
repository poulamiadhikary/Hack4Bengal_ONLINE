import jwt from 'jsonwebtoken';
import { Summary } from '../models/gemini.js';
import { GoogleGenerativeAI } from '@google/generative-ai'

export const summarize = async (req, res) => {
    const { prompt, limit, initial, token } = req.body;
    const secret = process.env.SECRET;

    const decoded = jwt.verify(token, secret);

    const id = decoded.id;

    try {
        const found = await Summary.findOne({ userId: id, initial: initial });

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
                responseMimeType: "text/plain",
            };

            let history = found.summaryHistory;

            const chatSession = model.startChat({
                generationConfig,
                history: history.map((summ) => ({
                    role: summ.role,
                    parts: [{ text: summ.message }]
                }))
            });

            const result = await chatSession.sendMessage(prompt);

            const resMess = result.response.text();
            //console.log(resMess);

            const userRes = { role: 'user', message: prompt };
            const modelRes = { role: 'model', message: resMess };

            found.summaryHistory.push(userRes, modelRes);

            await found.save();

            return res.status(201).json({
                success: true,
                data: found
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
                responseMimeType: "text/plain",
            };

            const chatSession = model.startChat({
                generationConfig,
                history: []
            });

            let FINAL_PROMPT = ''

            if (!limit) {
                FINAL_PROMPT = `${prompt}. Summarize this.`
            }
            else {
                FINAL_PROMPT = `${prompt}. Summarize this in ${limit} words`
            }

            const result = await chatSession.sendMessage(FINAL_PROMPT);

            const resMess = result.response.text();
            //console.log(resMess);

            const userRes = { role: 'user', message: prompt };
            const modelRes = { role: 'model', message: resMess };

            const convert = String(initial);

            const newSummary = new Summary({
                initial: convert,
                userId: id,
                summary: resMess,
                summaryHistory: [userRes, modelRes]
            });

            await newSummary.save();

            return res.status(200).json({
                success: true,
                data: newSummary
            });
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            success: false
        });
    }
}

export const fetchHistory = async (req, res) => {
    const { token } = req.query;

    const secret = process.env.SECRET;
    const decoded = jwt.verify(token, secret);
    const id = decoded.id;

    try {
        const found = await Summary.find({ userId: id });

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