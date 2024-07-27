import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openAIClient = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY']
});

const listModels = async () => {
    try {
        const response = await openAIClient.models.list();
        console.log('Available models:', response);
    } catch (error) {
        console.error('Error fetching models:', error.response ? error.response.data : error.message);
    }
};

listModels();
