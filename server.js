import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import natural from 'natural';

dotenv.config(); // This initializes the dotenv configuration

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

    // Tokenize the user message using natural
    const tokenizer = new natural.WordTokenizer();
    const tokens = tokenizer.tokenize(userMessage.toLowerCase());

    // Static responses
    const staticResponses = {
        debug: "To debug code, start by checking for syntax errors and ensuring all variables are properly defined. Use console.log() statements to trace the execution flow and identify where the code may be failing.",
        snippet: "Here is a sample code snippet in JavaScript:\n\n```javascript\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet('World'));\n```",
        explain: "Programming concepts can be complex, but breaking them down into smaller parts can help. For example, a function in JavaScript is a reusable block of code that performs a specific task. You define it once and can call it multiple times with different inputs."
    };

    let botReply = "I'm not sure how to respond to that.";

    if (tokens.includes('debug')) {
        botReply = staticResponses.debug;
    } else if (tokens.includes('snippet')) {
        botReply = staticResponses.snippet;
    } else if (tokens.includes('explain')) {
        botReply = staticResponses.explain;
    } else {
        try {
            const completion = await openAIClient.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
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
