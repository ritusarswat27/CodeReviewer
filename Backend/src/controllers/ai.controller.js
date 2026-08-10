import { generateAIResponse } from "../services/ai.service.js";

export const getResponse = async (req, res) => {
  try {
    const { code , mode , language } = req.body;

    if (!code) {
      return res.status(400).send("Prompt is required");
    }

    const response = await generateAIResponse(code , mode , language);

    res.json(response);
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).send("Something went wrong");
  }
};