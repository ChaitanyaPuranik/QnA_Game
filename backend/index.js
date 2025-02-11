const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
require('dotenv').config()

app.use(express.json())
app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend'))); // Serve static files

// Serve frontend pages correctly
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html')); 
});

app.get('/game', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/game.html'));
});


app.post('/generate-question', async (req, res) => {
    try {
      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Secure your API key using environment variables
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: "Generate an academic question with a subtle error in the question or answer. Include subjects like math, science, or programming.",
          model: "gpt-4",
          max_tokens: 100,
        }),
      });
  
      const data = await response.json();
      const question = data.choices[0].text;
  
      // Send the generated question to the frontend
      res.json({ question });
    } catch (error) {
      console.error('Error fetching question from OpenAI:', error);
      res.status(500).json({ error: 'Failed to fetch question' });
    }
  });

app.listen(3000)