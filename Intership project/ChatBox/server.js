const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
    apiKey: "YOUR_OPENAI_API_KEY",
});
const openai = new OpenAIApi(configuration);

app.post('/chat', async (req, res) => {
    const { message } = req.body;
    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }],
        });

        res.json({ reply: response.data.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ reply: "Sorry, there was an error processing your message." });
    }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
