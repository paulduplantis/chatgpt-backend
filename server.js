const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
            prompt: message,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });

        res.json({ reply: response.data.choices[0].text });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch response from OpenAI' });
    }
});

// Test endpoint to verify environment variable
app.get('/test-api-key', (req, res) => {
    const apiKey = process.env.OPENAI_API_KEY;
    if (apiKey) {
        res.send(`OPENAI_API_KEY is set: ${apiKey}`);
    } else {
        res.send('OPENAI_API_KEY is not set');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
