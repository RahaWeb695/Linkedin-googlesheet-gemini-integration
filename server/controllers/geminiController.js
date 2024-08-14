// controllers/geminiController.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import Gemini from "../model/geminiModel.js";

const genAI = new GoogleGenerativeAI(process.env.GEN_AI_API_KEY);

function bufferToGenerativePart(buffer, mimeType) {
  return {
    inlineData: {
      data: buffer.toString("base64"),
      mimeType,
    },
  };
}

async function downloadImage(url) {
  const formattedUrl = url.replace(/"/g, ""); // Remove any quotes from the URL
  const response = await axios.get(formattedUrl, {
    responseType: "arraybuffer",
  });
  const mimeType = response.headers["content-type"];
  return { buffer: Buffer.from(response.data), mimeType };
}

//create gemini response
export const generateGeminiContent = async (req, res) => {
  try {
    const { title, imageUrls } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const imageParts = await Promise.all(
      imageUrls.map(async (url) => {
        const { buffer, mimeType } = await downloadImage(url);
        return bufferToGenerativePart(buffer, mimeType);
      })
    );

    const result = await model.generateContent([title, ...imageParts]);
    const response = await result.response;
    const text = await response.text();

    res.status(200).json(text);
  } catch (error) {
    // console.error("Error generating content with Gemini API:", error);
    res.status(500).json({ error: error.message });
  }
};

//add gemini response to database
export const geminiResponseToDatabase = async (req, res) => {
  try {
    const { user, title, imageUrls, response } = req.body;

    // console.log(user, title, imageUrls, response);

    const addGeminiToDatabase = await Gemini.create({
      user,
      title,
      imageUrls,
      response,
    });

    res
      .status(200)
      .json({ addGeminiToDatabase, message: "Gemini to Database success" });
  } catch (error) {
    console.error("Error sending content of Gemini to database:", error);
    res.status(500).json({ error: error.message });
  }
};
