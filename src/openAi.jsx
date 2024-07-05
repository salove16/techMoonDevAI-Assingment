import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(GENAI_APIKEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});


// Fetches the AI-generated post based on the provided prompt.
// This function interacts with an AI model to generate a post that continues
// from the given prompt text. It then retrieves and returns the generated post.
// 
// Parameters:
//   prompt (string): The initial text or prompt to start the generation process.
//
// Returns:
//   string: The AI-generated post that follows the provided prompt. 
export  async function run(prompts) {
  
  
    const result = await model.generateContent(prompts);
    const response = await result.response;
    const text = response.text();
    const newData = {
        Timestamp: new Date().toISOString(), // Assuming a timestamp column
        Prompt:prompts ,
        Post: text,
      };
      
      await storeData(newData);
      const data = await readData();
      return data
  }
  

 
// Handles a POST request to store data in a Google Spreadsheet.
async function storeData(data) {
  
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


// Handles a GET request to fetch data in a Google Spreadsheet.
export async function readData() {
   
    const response = await fetch(GOOGLE_SPREAD_SHEET_API, {
      method: 'GET',
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
  
    return response.json();
  }
  






  