import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import natural from 'natural';
import { openDb } from './database.js';
import Fuse from 'fuse.js';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config(); // Initialize dotenv

const app = express();
const port = process.env.PORT || 3000;

console.log('OpenAI API Key:', process.env.OPENAI_API_KEY);  // Log API key for verification

// Initialize OpenAI API client
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

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

    // Retrieve static responses from the database
    const db = await openDb();
    const responses = await db.all('SELECT * FROM responses');
    const fuse = new Fuse(responses, { keys: ['keyword'] });

    let botReply = "I'm not sure how to respond to that.";
    const bestMatch = fuse.search(tokens.join(' '))[0];

    if (bestMatch) {
        botReply = bestMatch.item.response;
    } else {
        try {
            const completion = await openai.createChatCompletion({
                model: "gpt-4",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: userMessage }
                ],
            });

            botReply = completion.data.choices[0].message.content;
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

