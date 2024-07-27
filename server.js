import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

console.log('OpenAI API Key:', process.env['OPENAI_API_KEY']);  // Log API key for verification

const openAIClient = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY']
});

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;
    
    if (!userMessage) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        const chatCompletion = await openAIClient.chat.completions.create({
            model: "gpt-4o-mini", // Change this to a model you have access to
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: userMessage }
            ]
        });

        res.json({ reply: chatCompletion.choices[0].message.content });
    } catch (error) {
        console.error('Error while fetching response from OpenAI:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch response from OpenAI.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
