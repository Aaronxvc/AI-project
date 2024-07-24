const express = require('express');
const bodyParser = require('body-parser');
const natural = require('natural');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const tokenizer = new natural.WordTokenizer();

app.post('/nlp', (req, res) => {
    const input = req.body.input;
    const tokens = tokenizer.tokenize(input);
    // Add more advanced NLP processing here

    let response = "I'm not sure what you mean.";
    if (tokens.includes('hello')) {
        response = "Hello!";
    } else if (tokens.includes('goodbye')) {
        response = "Goodbye!";
    } else if (tokens.includes('html')) {
        response = "HTML stands for HyperText Markup Language.";
    } else if (tokens.includes('css')) {
        response = "CSS stands for Cascading Style Sheets.";
    } else if (tokens.includes('javascript')) {
        response = "JavaScript is a programming language used for web development.";
    }
    
    res.json({ response });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
