import axios from 'axios';

const ideaGeneratorOne= async (req, res) => {
  const { topic } = req.body;
  console.log(topic)
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `Generate blog ideas for: ${topic}` }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
          max_tokens: 10,
                temperature: 0.7,
        },
      }
    );
    res.status(200).json({ ideas: response.data.choices[0].message.content });
  } catch (error) {
    console.log(error.message)
    res.status(429).json({ error: error.message,message:error.message});
  }

}

export {ideaGeneratorOne}
