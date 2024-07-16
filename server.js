const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('ChatGPT backend server is running.');
});

app.post('/api/chat', async (req, res) => { // Updated the route to /api/chat
  const { message } = req.body;

  try {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: message,
      max_tokens: 100
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });

    const reply = response.data.choices[0].text.trim();
    res.json({ reply });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to get a response from ChatGPT.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
