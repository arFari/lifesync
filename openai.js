const { OpenAI } = require("openai");

const openai = new OpenAI({
    apiKey: "sk-proj-S9JM9B6MJU4RfyAY4zpXT3BlbkFJI77VtNsNYAWKhfHb2V0m",
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

main();