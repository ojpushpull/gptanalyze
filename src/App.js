import { Configuration, OpenAIApi } from "openai";


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }



  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "You are a psychotherapist analyze the users writing and give helpful advice based on cognitive based therapy abd evidence based therapy`/n/n I have been having lots of drug dreams lately. I dont know what to do ith my life or wwhy I feel so depressed. I struggle to stay sober and am just feeling so useless. I want to have a better life but keep falling back to my old havits and thought patterns. I feel like everyone else is happy but I am the only failure.",
      temperature: 0.5,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}




