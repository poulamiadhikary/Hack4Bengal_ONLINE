import express from 'express';
import { generateText, getText } from '../controllers/geminiText.js';
import { generateCode, fetchCodeHistory } from '../controllers/geminiCode.js';
import { summarize, fetchHistory } from '../controllers/geminiSummary.js';
import { translateCode } from '../controllers/geminiTranslate.js';

const router = express.Router();

router.post('/gemini/text', generateText);
router.get('/gemini/text', getText);

router.post('/gemini/code', generateCode);
router.get('/gemini/code', fetchCodeHistory);

router.post('/translate/code', translateCode);

router.post('/gemini/summary', summarize);
router.get('/gemini/summarize', fetchHistory);

export default router;