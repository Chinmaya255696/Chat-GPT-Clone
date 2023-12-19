const express = require('express');
const cors = require('cors');
require('dotenv').config();


const port = 8000;
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', function(req, res){
    res.send("hello world!");
}
)

app.post('/api/chat', async (req, res) => {
    const data = {
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: 'system',
                content: 'You are a helpful assistant.'
            },
            {
                role: 'user',
                content: 'Hi Ai assistant.'
            }
        ]
    };

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                ...data,
                // Use data.messages directly instead of ...messages
                messages: [
                    ...data.messages,
                ]
            })
        });

        const resdata = await response.json();
        console.log(resdata);
        res.send(resdata);
    } catch (error) {
        console.log(error, 'error');
        res.status(500).send({ error: 'Internal Server Error' });
    }
});



app.listen(port, () =>{
   console.log(`Example app listening at http://localhost:${port}`); 
})
