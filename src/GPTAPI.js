const { Configuration, OpenAIApi } = require("openai");

export default function GPTAPI () {

    var caption = "What is one plus one?";

    const configuration = new Configuration({
        apiKey: "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",
    });

    const openai = new OpenAIApi(configuration);

    const callAPI = async () => {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "How are you?",
            max_tokens: 15,
            temperature: 0,
          });
        console.log(response)
    }

    callAPI();

    return (
        <h4>Hello</h4>
    )
}