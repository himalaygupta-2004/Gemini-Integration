const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//Basic Functioning of A.I model
// const prompt = "Explain how AI works";
// const generate = async () => {
//   try {
//     const result = await model.generateContent(prompt);
//     console.log(result.response.text());
//   } catch (error) {
//     console.log(error);
//   }
// };

// Creating a Api

app.post("/api/content", async (req, res) => {
  try {
    const data = req.body.questions;
    const result = await model.generateContent(data);
    res.send({
      Content: result.response.text(), // Send the generated content
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.listen(3000, () => {
  console.log("Server is live on Port 3000");
});
