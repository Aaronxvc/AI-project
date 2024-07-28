import express from 'express';
import OpenAI from 'openai'; // Correct import
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import natural from 'natural';
import { openDb } from './database.js';
import Fuse from 'fuse.js';

dotenv.config(); // This initializes the dotenv configuration

const app = express();
const port = process.env.PORT || 3000;

console.log('OpenAI API Key:', process.env.OPENAI_API_KEY);  // Log API key for verification

const openAIClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;
    
    if (!userMessage) {
        return res.status(400).json({ error: 'Message is required' });
    }

    // Tokenize the user message using natural
    const tokenizer = new natural.WordTokenizer();
    const tokens = tokenizer.tokenize(userMessage.toLowerCase());

    const db = await openDb();
    const responses = await db.all('SELECT * FROM responses');
    const fuse = new Fuse(responses, { keys: ['keyword'] });

    let botReply = "I'm not sure how to respond to that.";
    const bestMatch = fuse.search(tokens.join(' '))[0];

    if (bestMatch) {
        botReply = bestMatch.item.response;
    } else {
        try {
            const completion = await openAIClient.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are a helpful assistant and Cs developer." },
                    { role: "user", content: userMessage }
                ],
            });

            botReply = completion.choices[0].message.content;
        } catch (error) {
            console.error('Error while fetching response from OpenAI:', error.response ? error.response.data : error.message);
            botReply = "Failed to fetch response from OpenAI.";
        }
    }

    res.json({ reply: botReply });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
