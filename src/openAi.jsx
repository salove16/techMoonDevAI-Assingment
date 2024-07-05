import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from 'axios';
// require('dotenv').config()
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(GENAI_APIKEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});



export  async function run(prompts) {
  
  
    const result = await model.generateContent(prompts);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    const newData = {
        Timestamp: new Date().toISOString(), // Assuming a timestamp column
        Prompt:prompts ,
        Post: text,
      };
      
      await storeData(newData);
      const data = await readData();
      return data
  }
  

 

async function storeData(data) {
  // const url = "https://sheetdb.io/api/v1/l0a73d5kkzjyu";
  const response = await fetch(GOOGLE_SPREAD_SHEET_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  });

  if (!response.ok) {
    throw new Error('Failed to post data');
  }
}
export async function readData() {
    // const url = "https://sheetdb.io/api/v1/l0a73d5kkzjyu";
    const response = await fetch(GOOGLE_SPREAD_SHEET_API, {
      method: 'GET',
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
  
    return response.json();
  }
  






  